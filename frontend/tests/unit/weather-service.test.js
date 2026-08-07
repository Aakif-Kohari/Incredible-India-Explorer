/**
 * weather-service.test.js
 * Tests for js-modules/weather-service.js's pure, network-free surface:
 * URL construction and response normalization for both the existing
 * daily forecast and the new (issue #1029) hourly forecast. Actual
 * fetch()/localStorage behavior isn't exercised here — see
 * weather-core.test.js for the rule-based logic these forecasts feed
 * into.
 */

import { describe, it, expect } from 'vitest';
import Service from '../../frontend/js-modules/weather-service.js';

describe('weather-service: buildForecastUrl', () => {
    it('includes lat/lng and the daily params Open-Meteo expects', () => {
        const url = Service.buildForecastUrl(26.9124, 75.7873);
        expect(url).toContain('latitude=26.9124');
        expect(url).toContain('longitude=75.7873');
        expect(url).toContain('daily=');
        expect(url).toContain('weathercode');
        expect(url).toContain(`forecast_days=${Service.FORECAST_DAYS}`);
    });
});

describe('weather-service: buildHourlyForecastUrl', () => {
    it('includes lat/lng and the hourly params Open-Meteo expects', () => {
        const url = Service.buildHourlyForecastUrl(26.9124, 75.7873);
        expect(url).toContain('latitude=26.9124');
        expect(url).toContain('longitude=75.7873');
        expect(url).toContain('hourly=');
        expect(url).toContain('precipitation_probability');
        expect(url).toContain(`forecast_days=${Service.HOURLY_FORECAST_DAYS}`);
    });

    it('requests a shorter horizon for hourly than daily forecasts', () => {
        // Hourly responses are much larger per day than daily ones, so the
        // service intentionally asks for fewer days of hourly detail.
        expect(Service.HOURLY_FORECAST_DAYS).toBeLessThan(Service.FORECAST_DAYS);
    });
});

describe('weather-service: normalizeResponse', () => {
    it('maps Open-Meteo daily arrays into one object per date', () => {
        const json = {
            daily: {
                time: ['2026-08-01', '2026-08-02'],
                weathercode: [0, 65],
                temperature_2m_max: [32, 27],
                temperature_2m_min: [22, 21],
                precipitation_probability_max: [5, 90]
            }
        };
        const forecast = Service.normalizeResponse(json);
        expect(forecast).toHaveLength(2);
        expect(forecast[0]).toEqual({ date: '2026-08-01', weatherCode: 0, tempMaxC: 32, tempMinC: 22, precipProbability: 5 });
        expect(forecast[1].weatherCode).toBe(65);
    });

    it('returns an empty array for a missing/malformed response', () => {
        expect(Service.normalizeResponse({})).toEqual([]);
        expect(Service.normalizeResponse(null)).toEqual([]);
        expect(Service.normalizeResponse({ daily: {} })).toEqual([]);
    });
});

describe('weather-service: normalizeHourlyResponse', () => {
    it('groups flat hourly arrays by date, preserving time-of-day', () => {
        const json = {
            hourly: {
                time: ['2026-08-01T00:00', '2026-08-01T01:00', '2026-08-02T00:00'],
                weathercode: [0, 65, 3],
                temperature_2m: [24, 23, 25],
                precipitation_probability: [5, 88, 10]
            }
        };
        const grouped = Service.normalizeHourlyResponse(json);
        expect(grouped).toHaveLength(2);

        const day1 = grouped.find((d) => d.date === '2026-08-01');
        expect(day1.hours).toHaveLength(2);
        expect(day1.hours[0]).toEqual({ time: '00:00', weatherCode: 0, tempC: 24, precipProbability: 5 });
        expect(day1.hours[1].time).toBe('01:00');
        expect(day1.hours[1].weatherCode).toBe(65);

        const day2 = grouped.find((d) => d.date === '2026-08-02');
        expect(day2.hours).toHaveLength(1);
    });

    it('returns an empty array for a missing/malformed response', () => {
        expect(Service.normalizeHourlyResponse({})).toEqual([]);
        expect(Service.normalizeHourlyResponse(null)).toEqual([]);
        expect(Service.normalizeHourlyResponse({ hourly: {} })).toEqual([]);
    });
});
