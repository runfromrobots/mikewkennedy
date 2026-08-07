#!/usr/bin/env python3
"""
Sync iNaturalist observations to plant accessions database.
Pulls observations from The Orboretum place and stores them as accessions.
"""

import json
import os
from datetime import datetime
from pathlib import Path
import urllib.request
import urllib.error

# iNaturalist API endpoint and place ID for The Orboretum
INATURALIST_API = "https://api.inaturalist.org/v1"
PLACE_ID = 237476  # The Orboretum place ID
TAXA_IDS = "47126"  # Plantae taxon ID for filtering to plants only

def fetch_observations(per_page=200, page=1):
    """Fetch plant observations from iNaturalist."""
    url = (
        f"{INATURALIST_API}/observations"
        f"?place_id={PLACE_ID}"
        f"&taxon_id={TAXA_IDS}"
        f"&per_page={per_page}"
        f"&page={page}"
        f"&order_by=observed_on"
        f"&order=desc"
    )

    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode())
            return data.get('results', [])
    except urllib.error.URLError as e:
        print(f"Error fetching iNaturalist data: {e}")
        return []

def observation_to_accession(obs):
    """Convert an iNaturalist observation to an accession record."""
    taxon = obs.get('taxon', {})

    # Build accession ID from observation ID
    accession_id = f"ORB-{obs['id']}"

    # Extract coordinates from geojson field (GeoJSON format is [longitude, latitude])
    geojson = obs.get('geojson', {})
    coords = geojson.get('coordinates')
    if coords and len(coords) >= 2:
        longitude, latitude = coords[0], coords[1]
    else:
        latitude = obs.get('latitude')
        longitude = obs.get('longitude')

    # Skip observations without coordinates
    if latitude is None or longitude is None:
        return None

    return {
        "accession_id": accession_id,
        "inaturalist_id": obs['id'],
        "inaturalist_url": f"https://www.inaturalist.org/observations/{obs['id']}",
        "common_name": taxon.get('preferred_common_name', ''),
        "scientific_name": taxon.get('name', ''),
        "taxa_rank": taxon.get('rank', 'species'),
        "observed_date": obs.get('observed_on', ''),
        "added_date": datetime.now().isoformat(),
        "latitude": latitude,
        "longitude": longitude,
        "place_guess": obs.get('place_guess', ''),
        "observer": obs.get('user', {}).get('login', 'Unknown'),
        "photos": [
            {
                "url": f"https://static.inaturalist.org/photos/{f['id']}/medium.jpg",
                "square_url": f"https://static.inaturalist.org/photos/{f['id']}/square.jpg",
                "original_url": f"https://static.inaturalist.org/photos/{f['id']}/original.jpg"
            }
            for f in obs.get('photos', [])
        ],
        "description": obs.get('description', ''),
        "quality_grade": obs.get('quality_grade', ''),
    }

def load_existing_accessions():
    """Load existing accessions from JSON file."""
    accessions_file = Path('data/plant-accessions.json')
    if accessions_file.exists():
        with open(accessions_file, 'r') as f:
            data = json.load(f)
            return {acc['inaturalist_id']: acc for acc in data.get('accessions', [])}
    return {}

def save_accessions(accessions_list):
    """Save accessions to JSON file."""
    Path('data').mkdir(exist_ok=True)

    accessions_file = Path('data/plant-accessions.json')

    data = {
        "metadata": {
            "name": "The Orboretum Plant Collection",
            "description": "Living plant collection documented via iNaturalist",
            "last_updated": datetime.now().isoformat(),
            "place_id": PLACE_ID,
            "place_url": f"https://www.inaturalist.org/places/{PLACE_ID}",
            "total_accessions": len(accessions_list)
        },
        "accessions": accessions_list
    }

    with open(accessions_file, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"Saved {len(accessions_list)} accessions to {accessions_file}")

def main():
    """Main sync function."""
    print("Starting iNaturalist sync...")

    # Load existing accessions
    existing = load_existing_accessions()
    print(f"Found {len(existing)} existing accessions")

    # Fetch all plant observations
    all_accessions = {}
    page = 1
    total_fetched = 0

    while True:
        print(f"Fetching page {page}...")
        obs_list = fetch_observations(per_page=200, page=page)

        if not obs_list:
            break

        for obs in obs_list:
            acc = observation_to_accession(obs)
            if acc is not None:  # Only include observations with coordinates
                all_accessions[obs['id']] = acc
                total_fetched += 1

        page += 1

    print(f"Fetched {total_fetched} plant observations from iNaturalist")

    # Sort by observed date (newest first)
    sorted_accessions = sorted(
        all_accessions.values(),
        key=lambda x: x['observed_date'],
        reverse=True
    )

    # Save to file
    save_accessions(sorted_accessions)

if __name__ == '__main__':
    main()
