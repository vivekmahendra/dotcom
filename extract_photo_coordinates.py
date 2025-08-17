#!/usr/bin/env python3
"""
Extract GPS coordinates and dates from photos in Supabase storage.
This script downloads photos from your Supabase bucket and extracts their EXIF data.
"""

import requests
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
import io
import json
from datetime import datetime
from typing import Optional, Tuple, Dict

# Configuration - Update with your Supabase URL
SUPABASE_URL = "https://vdknvlzooopdyxshpplj.supabase.co"
BUCKET_NAME = "website-assets"
FOLDER_NAME = "about"

# List of photos to process
PHOTOS = [
    "photo-1.jpg",
    "photo-2.heic",
    "photo-3.jpg",
    "photo-4.heic",
    "photo-5.jpg",
    "photo-6.jpg",
    "photo-7.jpg",
    "photo-8.jpg",
    "photo-9.heic"
]

def get_decimal_from_dms(dms, ref):
    """Convert GPS coordinates from DMS to decimal degrees"""
    degrees = dms[0]
    minutes = dms[1] / 60.0
    seconds = dms[2] / 3600.0
    
    decimal = degrees + minutes + seconds
    
    if ref in ['S', 'W']:
        decimal = -decimal
        
    return decimal

def extract_metadata_from_image(image_data: bytes) -> Dict:
    """Extract GPS coordinates and date from image EXIF data"""
    result = {"coordinates": None, "date": None}
    
    try:
        # Open image from bytes
        img = Image.open(io.BytesIO(image_data))
        
        # Get EXIF data
        exifdata = img._getexif()
        
        if not exifdata:
            return result
            
        # Parse EXIF data
        gps_data = {}
        date_taken = None
        
        for tag_id, value in exifdata.items():
            tag = TAGS.get(tag_id, tag_id)
            
            # Look for DateTime tags
            if tag == "DateTime":
                date_taken = value
            elif tag == "DateTimeOriginal":
                date_taken = value  # Prefer original date
            elif tag == "DateTimeDigitized":
                if not date_taken:  # Use digitized date as fallback
                    date_taken = value
            
            # Look for GPSInfo tag
            if tag == "GPSInfo":
                for gps_tag_id, gps_value in value.items():
                    gps_tag = GPSTAGS.get(gps_tag_id, gps_tag_id)
                    gps_data[gps_tag] = gps_value
        
        # Process date if found
        if date_taken:
            try:
                # Parse EXIF date format (YYYY:MM:DD HH:MM:SS)
                dt = datetime.strptime(date_taken, "%Y:%m:%d %H:%M:%S")
                # Format as friendly date
                result["date"] = dt.strftime("%B %d, %Y")
            except:
                result["date"] = date_taken  # Keep original if parsing fails
        
        # Extract latitude and longitude
        if gps_data:
            lat = None
            lon = None
            
            if "GPSLatitude" in gps_data and "GPSLatitudeRef" in gps_data:
                lat = get_decimal_from_dms(gps_data["GPSLatitude"], gps_data["GPSLatitudeRef"])
                
            if "GPSLongitude" in gps_data and "GPSLongitudeRef" in gps_data:
                lon = get_decimal_from_dms(gps_data["GPSLongitude"], gps_data["GPSLongitudeRef"])
                
            if lat is not None and lon is not None:
                result["coordinates"] = {"lat": lat, "lng": lon}
                
    except Exception as e:
        print(f"Error extracting metadata: {e}")
    
    return result

def fetch_photo_from_supabase(filename: str) -> Optional[bytes]:
    """Fetch photo from Supabase storage"""
    url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{FOLDER_NAME}/{filename}"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.content
        else:
            print(f"Failed to fetch {filename}: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error fetching {filename}: {e}")
    
    return None

def main():
    """Main function to process all photos"""
    results = []
    
    print("Extracting metadata (GPS coordinates and dates) from photos...")
    print("-" * 50)
    
    for photo in PHOTOS:
        print(f"\nProcessing {photo}...")
        
        # For HEIC files, we'll need special handling
        if photo.endswith('.heic'):
            print(f"  ⚠️  HEIC format - may need conversion or manual extraction")
            results.append({
                "filename": photo,
                "coordinates": None,
                "date": None,
                "note": "HEIC format requires special handling"
            })
            continue
        
        # Fetch photo from Supabase
        image_data = fetch_photo_from_supabase(photo)
        
        if image_data:
            # Extract metadata
            metadata = extract_metadata_from_image(image_data)
            
            if metadata["coordinates"]:
                print(f"  ✓ Found coordinates: {metadata['coordinates']['lat']:.6f}, {metadata['coordinates']['lng']:.6f}")
            else:
                print(f"  ✗ No GPS data found in EXIF")
            
            if metadata["date"]:
                print(f"  ✓ Found date: {metadata['date']}")
            else:
                print(f"  ✗ No date found in EXIF")
            
            results.append({
                "filename": photo,
                "coordinates": metadata["coordinates"],
                "date": metadata["date"],
                "note": "Extracted from EXIF" if metadata["coordinates"] or metadata["date"] else "No metadata found"
            })
        else:
            print(f"  ✗ Could not fetch photo from Supabase")
            results.append({
                "filename": photo,
                "coordinates": None,
                "date": None,
                "note": "Failed to fetch from Supabase"
            })
    
    print("\n" + "=" * 50)
    print("RESULTS - Update your about.tsx with this metadata:")
    print("=" * 50)
    
    for result in results:
        print(f"\n{result['filename']}:")
        if result.get("coordinates"):
            print(f"  coordinates: {{ lat: {result['coordinates']['lat']}, lng: {result['coordinates']['lng']} }}")
        else:
            print(f"  coordinates: None")
        
        if result.get("date"):
            print(f"  date: \"{result['date']}\"")
        else:
            print(f"  date: None")
        
        if result.get("note"):
            print(f"  note: {result['note']}")
    
    # Save results to JSON file
    with open('photo_coordinates.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print("\n✓ Results saved to photo_coordinates.json")

if __name__ == "__main__":
    main()