import numpy as np
import asyncpg
import asyncio
import json
import os
from cosine_similarity import find_top_k_matches
from database import connect_to_db, fetch_all_entries, fetch_entry_by_id
from epipolar_geometry import feature_match_and_filter

# Load Query descriptor
# TODO: Retrieve from descriptor generation
test_file = r"C:\Users\dylan\Documents\Programming\VisualCampusLocator\data\Vectors\Eolas_001.npy"
query_descriptor = np.load(test_file)
if query_descriptor.ndim > 1:
    query_descriptor = query_descriptor.flatten()

# Fetch descriptors from the database and find top-K matches
async def main():
    conn = await connect_to_db()
    try:
        entries = await fetch_all_entries(conn)
        vectors = [
            {
                'id': entry['id'],
                'filename': entry['filename'],
                'normalized_vector': json.loads(entry['normalized_vector']),
                'unnormalized_vector': json.loads(entry['unnormalized_vector'])
            }
            for entry in entries
        ]

        # Find top-K matches
        top_k_matches = find_top_k_matches(query_descriptor, vectors, k=10)

        # Define paths
        query_img_path = r"C:\Users\dylan\Documents\Programming\VisualCampusLocator\data\Images\Eolas001.jpg"  # Update with the correct query image path

        # Iterate through top-K matches and pass to epipolar geometry
        for i, (label, score) in enumerate(top_k_matches):
            match_img_path = f"../data/Images/{label['filename']}"
            kp1, kp2, good_matches, mask, img1, img2 = feature_match_and_filter(query_img_path, match_img_path)

            num_matches = len(good_matches)
            num_inliers = np.sum(mask) if mask is not None else 0
            inlier_ratio = num_inliers / num_matches if num_matches > 0 else 0

            # Define thresholds
            num_match_thresh = 20
            inlier_ratio_thresh = 0.15

            # Check if the match meets the thresholds
            if num_matches >= num_match_thresh and inlier_ratio >= inlier_ratio_thresh:
                result = await fetch_entry_by_id(conn, label['id'])
                ans = {
                    "cloud_url": result['cloud_url'],
                    "filename": os.path.splitext(result['filename'])[0]
                }
                print(json.dumps(ans))
                return ans
            else:
                print(f"Rejected Match {i+1}: ID {label['id']}, Filename {label['filename']} with score {score}")
                print(f"Number of Matches: {num_matches}, Inlier Ratio: {inlier_ratio:.4f}")

        print("No valid matches found.")
        return None
    finally:
        await conn.close()

# Run the main function
if __name__ == "__main__":
    asyncio.run(main())