"""
build-map-data.py

Regenerates ../map-data.js from real Indian state boundary data so the map
used in the Spice Route Challenge stays geographically accurate.

Source data: district-level GeoJSON from the public "india-maps-data" dataset
(https://github.com/udit-001/india-maps-data), which is itself built from the
Survey of India / Census 2011 district boundaries. Districts are dissolved
into their parent state using Shapely, simplified slightly for a smaller
payload, and projected with a simple equirectangular projection (scaled by
cos(mean latitude) so shapes keep the correct aspect ratio).

Usage:
    pip install shapely --break-system-packages
    curl -O https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/india.geojson
    python3 build-map-data.py india.geojson ../map-data.js
"""

import json
import math
import sys
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

SCALE = 22.0  # pixels per degree of longitude at the reference latitude


def build(src_path: str, out_path: str) -> None:
    data = json.load(open(src_path))

    # 1. Group districts by state
    by_state = {}
    for feature in data["features"]:
        st = feature["properties"]["st_nm"]
        geom = shape(feature["geometry"])
        if not geom.is_valid:
            geom = geom.buffer(0)
        by_state.setdefault(st, []).append(geom)

    # 2. Dissolve each state's districts into one polygon, simplify a touch
    dissolved = {}
    for st, geoms in by_state.items():
        merged = unary_union(geoms).simplify(0.01, preserve_topology=True)
        dissolved[st] = merged

    # 3. Compute the true bounding box across all states (used for projection)
    minx = miny = float("inf")
    maxx = maxy = float("-inf")
    for geom in dissolved.values():
        gminx, gminy, gmaxx, gmaxy = geom.bounds
        minx, miny = min(minx, gminx), min(miny, gminy)
        maxx, maxy = max(maxx, gmaxx), max(maxy, gmaxy)

    mean_lat = (miny + maxy) / 2
    cos_lat = math.cos(math.radians(mean_lat))

    def project(lon, lat):
        x = (lon - minx) * SCALE * cos_lat
        y = (maxy - lat) * SCALE  # flip Y so north is up
        return round(x, 2), round(y, 2)

    def ring_to_path(coords):
        pts = [project(lon, lat) for lon, lat in coords]
        return "M " + " L ".join(f"{x},{y}" for x, y in pts) + " Z"

    def geom_to_path(geom_dict):
        parts = []
        if geom_dict["type"] == "Polygon":
            for ring in geom_dict["coordinates"]:
                parts.append(ring_to_path(ring))
        elif geom_dict["type"] == "MultiPolygon":
            for poly in geom_dict["coordinates"]:
                for ring in poly:
                    parts.append(ring_to_path(ring))
        return " ".join(parts)

    width = round((maxx - minx) * SCALE * cos_lat, 2)
    height = round((maxy - miny) * SCALE, 2)

    states_out = {}
    for st, geom in dissolved.items():
        rep_point = geom.representative_point()  # guaranteed inside the shape
        cx, cy = project(rep_point.x, rep_point.y)
        states_out[st] = {
            "path": geom_to_path(mapping(geom)),
            "cx": cx,
            "cy": cy,
        }

    payload = {"width": width, "height": height, "states": states_out}

    with open(out_path, "w") as f:
        f.write(
            "// Auto-generated from real India district-level GeoJSON "
            "(udit-001/india-maps-data),\n"
            "// dissolved to state boundaries with shapely and projected to "
            "SVG coordinates.\n"
            "// This guarantees geographically accurate state shapes/"
            "positions. Regenerate with scripts/build-map-data.py.\n"
            "const INDIA_MAP = "
        )
        json.dump(payload, f)
        f.write(";\n")

    print(f"Wrote {out_path}: {len(states_out)} states, canvas {width}x{height}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 build-map-data.py <input.geojson> <output map-data.js>")
        sys.exit(1)
    build(sys.argv[1], sys.argv[2])
