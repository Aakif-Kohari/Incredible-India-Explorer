/**
 * js-modules/weather-service.js
 * Fetches daily forecasts from Open-Meteo (https://open-meteo.com) — free,
 * no API key required, matching the "no backend" approach this project
 * already uses for routing (see docs/ROUTE_PLANNER.md, which uses the
 * free OSRM demo server the same way).
 *
 * Responses are cached in localStorage per lat/lng with a TTL, since
 * forecasts don't need to be re-fetched on every render and Open-Meteo's
 * public endpoint is a shared resource other sites also rely on.
 *
 * DOM/network-facing by design — kept separate from weather-core.js so the
 * rule logic in that file stays unit-testable without mocking fetch.
 */
(function (root) {
    "use strict";

    const CACHE_PREFIX = "weatherCache:";
    const HOURLY_CACHE_PREFIX = "weatherHourlyCache:";
    const CACHE_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours — forecasts change faster than routes, so a shorter TTL than route-planner's 7-day cache
    const FORECAST_DAYS = 16; // Open-Meteo's max daily-forecast horizon
    const HOURLY_FORECAST_DAYS = 3; // hourly detail is only really actionable for the next few days; keeps the response small

    function cacheKey(prefix, lat, lng) {
        return prefix + lat.toFixed(2) + ":" + lng.toFixed(2);
    }

    function readCache(prefix, lat, lng) {
        try {
            const raw = localStorage.getItem(cacheKey(prefix, lat, lng));
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed.fetchedAt !== "number") return null;
            if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
            return parsed.forecast;
        } catch (e) {
            return null;
        }
    }

    function writeCache(prefix, lat, lng, forecast) {
        try {
            localStorage.setItem(cacheKey(prefix, lat, lng), JSON.stringify({ fetchedAt: Date.now(), forecast }));
        } catch (e) {
            // Storage full/unavailable — forecast just won't be cached this session.
        }
    }

    function buildForecastUrl(lat, lng) {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lng,
            daily: "weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
            timezone: "auto",
            forecast_days: String(FORECAST_DAYS)
        });
        return "https://api.open-meteo.com/v1/forecast?" + params.toString();
    }

    function buildHourlyForecastUrl(lat, lng) {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lng,
            hourly: "weathercode,temperature_2m,precipitation_probability",
            timezone: "auto",
            forecast_days: String(HOURLY_FORECAST_DAYS)
        });
        return "https://api.open-meteo.com/v1/forecast?" + params.toString();
    }

    function normalizeResponse(json) {
        const daily = json && json.daily;
        if (!daily || !Array.isArray(daily.time)) return [];
        return daily.time.map((date, i) => ({
            date,
            weatherCode: daily.weathercode ? daily.weathercode[i] : null,
            tempMaxC: daily.temperature_2m_max ? daily.temperature_2m_max[i] : null,
            tempMinC: daily.temperature_2m_min ? daily.temperature_2m_min[i] : null,
            precipProbability: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : null
        }));
    }

    /**
     * Groups Open-Meteo's flat hourly arrays into one entry per day, each
     * holding its own array of hourly slots — shape:
     * `[{ date, hours: [{ time, weatherCode, tempC, precipProbability }] }]`.
     * Grouped (rather than left flat) so weather-core.js's
     * `summarizeHourlyRisk()` can work a single day at a time, matching
     * how the daily forecast is already consumed one day at a time.
     */
    function normalizeHourlyResponse(json) {
        const hourly = json && json.hourly;
        if (!hourly || !Array.isArray(hourly.time)) return [];

        const byDate = new Map();
        hourly.time.forEach((isoDateTime, i) => {
            const [date, time] = isoDateTime.split("T");
            if (!byDate.has(date)) byDate.set(date, []);
            byDate.get(date).push({
                time: time ? time.slice(0, 5) : isoDateTime,
                weatherCode: hourly.weathercode ? hourly.weathercode[i] : null,
                tempC: hourly.temperature_2m ? hourly.temperature_2m[i] : null,
                precipProbability: hourly.precipitation_probability ? hourly.precipitation_probability[i] : null
            });
        });

        return Array.from(byDate.entries()).map(([date, hours]) => ({ date, hours }));
    }

    /** Fetch (or reuse cached) forecast for one lat/lng. Returns a Promise<forecastDay[]>. */
    async function fetchForecast(lat, lng) {
        const cached = readCache(CACHE_PREFIX, lat, lng);
        if (cached) return cached;

        const res = await fetch(buildForecastUrl(lat, lng));
        if (!res.ok) {
            throw new Error("Weather API responded with status " + res.status);
        }
        const json = await res.json();
        const forecast = normalizeResponse(json);
        writeCache(CACHE_PREFIX, lat, lng, forecast);
        return forecast;
    }

    /**
     * Fetch (or reuse cached) hour-by-hour forecast for one lat/lng, grouped
     * by day. Returns a Promise<{date, hours: Array}[]>. Used to explain
     * *when* during a poor-weather day conditions are worst (see
     * weather-core.js#summarizeHourlyRisk), not to replace the daily
     * suitability scoring.
     */
    async function fetchHourlyForecast(lat, lng) {
        const cached = readCache(HOURLY_CACHE_PREFIX, lat, lng);
        if (cached) return cached;

        const res = await fetch(buildHourlyForecastUrl(lat, lng));
        if (!res.ok) {
            throw new Error("Weather API responded with status " + res.status);
        }
        const json = await res.json();
        const forecast = normalizeHourlyResponse(json);
        writeCache(HOURLY_CACHE_PREFIX, lat, lng, forecast);
        return forecast;
    }

    /**
     * Fetch forecasts for a list of destinations ({id, lat, lng, name}[]).
     * Failures are isolated per-destination (one bad forecast doesn't fail
     * the whole itinerary) — callers get both the successful map and a list
     * of which destinations failed, so the UI can toast a partial-failure
     * message rather than silently dropping data or crashing.
     *
     * @returns {Promise<{forecastsByDestId: Object, failed: Array<{id,name,error}>}>}
     */
    async function fetchForecastsForDestinations(destinations) {
        const forecastsByDestId = {};
        const failed = [];

        const results = await Promise.allSettled(
            destinations.map((d) => fetchForecast(d.lat, d.lng).then((forecast) => ({ id: d.id, forecast })))
        );

        results.forEach((result, i) => {
            const dest = destinations[i];
            if (result.status === "fulfilled") {
                forecastsByDestId[result.value.id] = result.value.forecast;
            } else {
                failed.push({ id: dest.id, name: dest.name, error: result.reason ? result.reason.message : "Unknown error" });
            }
        });

        return { forecastsByDestId, failed };
    }

    const api = {
        CACHE_TTL_MS,
        FORECAST_DAYS,
        HOURLY_FORECAST_DAYS,
        buildForecastUrl,
        buildHourlyForecastUrl,
        normalizeResponse,
        normalizeHourlyResponse,
        fetchForecast,
        fetchHourlyForecast,
        fetchForecastsForDestinations,
        _readCache: readCache,
        _writeCache: writeCache
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }
    if (typeof window !== "undefined") {
        window.WeatherService = api;
    }
})(typeof window !== "undefined" ? window : globalThis);