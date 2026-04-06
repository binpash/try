#!/usr/bin/env python3
import argparse
import random
from datetime import datetime, timedelta
from math import cos, pi

continent_locations = {
    "Europe": [
        ("Greece",         "Athens",        19.0),
        ("Germany",        "Berlin",         9.0),
        ("France",         "Paris",         12.0),
        ("United Kingdom", "London",        11.0),
    ],
    "Middle East": [
        ("Israel",         "Tel Aviv",      20.0),
        ("UAE",            "Dubai",         28.0),
        ("Saudi Arabia",   "Riyadh",        27.0),
        ("Iran",           "Tehran",        17.0),
    ],
    "Asia": [
        ("China",          "Beijing",       13.0),
        ("Japan",          "Tokyo",         16.0),
        ("India",          "Mumbai",        27.0),
        ("South Korea",    "Seoul",         12.5),
    ],
    "Africa": [
        ("Egypt",          "Cairo",         22.0),
        ("Kenya",          "Nairobi",       18.0),
        ("Ghana",          "Accra",         27.0),
        ("South Africa",   "Johannesburg",  17.0),
    ],
    "North America": [
        ("United States",  "New York",      13.0),
        ("United States",  "Los Angeles",   18.0),
        ("Canada",         "Toronto",        9.0),
        ("Mexico",         "Mexico City",   16.0),
    ],
    "South America": [
        ("Brazil",         "São Paulo",     21.0),
        ("Argentina",      "Buenos Aires",  17.0),
        ("Colombia",       "Bogotá",        14.0),
        ("Chile",          "Santiago",      16.0),
    ],
    "Oceania": [
        ("Australia",      "Sydney",        18.0),
        ("Australia",      "Melbourne",     15.0),
        ("New Zealand",    "Auckland",      16.0),
    ],
}

size_days = {
    "min": 365*5,
    "small": 365 * 15,
    "full": 365 * 30,
}


def synthetic_temperature(date: datetime, latitude: float) -> float:
    day_of_year = date.timetuple().tm_yday
    peak_day = 196 if latitude >= 0 else 15
    baseline = 25 - 0.30 * abs(latitude)
    amplitude = 7 + 0.10 * abs(latitude)
    seasonal = amplitude * cos(2 * pi * (day_of_year - peak_day) / 365)
    noise = random.gauss(0, 2)
    return round(baseline + seasonal + noise, 1)


def generate_dataset(start_date: datetime, num_days: int, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8") as fh:
        for continent, locs in continent_locations.items():
            for day_offset in range(num_days):
                date = start_date + timedelta(days=day_offset)
                for country, city, lat in locs:
                    temp = synthetic_temperature(date, lat)
                    fh.write(
                        f"{date.month}\t{date.day}\t{date.year}\t"
                        f"{temp}\t{country}\t{city}\t{continent}\n"
                    )


if __name__ == "__main__":
    random.seed(42)
    parser = argparse.ArgumentParser(
        description="Generate consecutive, continent-grouped temperature data."
    )
    parser.add_argument("output_file", help="Destination .txt file")
    parser.add_argument(
        "--size",
        choices=size_days,
        default="min",
        help="Dataset scale: min | small | mid | full",
    )
    parser.add_argument(
        "--start_date", default="1995-01-01", help="Start date (YYYY-MM-DD)"
    )

    args = parser.parse_args()
    start_dt = datetime.strptime(args.start_date, "%Y-%m-%d")
    num_days = size_days[args.size]

    generate_dataset(start_dt, num_days, args.output_file)
