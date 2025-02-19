import numpy as np
import cv2
import os
from cosine_similarity import extract_label, find_top_k_matches
from epipolar_geometry import feature_match_and_filter

# path to global descriptors
# TODO: fetch from database once populated
base_dir = "C:\\Users\\dylan\\Documents\\Programming\\AnyLoc\\demo\\data\\Campus\\global_descriptors\\gd"
descriptor_files = [file for file in os.listdir(base_dir) if file.endswith('.npy')]

# Load Query descriptor
# TODO: Retrieve from descriptor generation
test_file = "C:\\Users\\dylan\\Documents\\Programming\\AnyLoc\\demo\\data\\Campus\\global_descriptors\\Test\\Eolas_064.npy"
query_descriptor = np.load(test_file)
if query_descriptor.ndim > 1:
    query_descriptor = query_descriptor.flatten()

# Find top-K matches
try:
    top_matches = find_top_k_matches(query_descriptor, descriptor_files, base_dir, k=10)

    # Print results
    # TODO: REMOVE PRINTS
    for i, (label, score) in enumerate(top_matches):
        print(f"Match {i+1}: {label['location']}_{label['id']} with score {score}")
except ValueError as e:
    print(f"Error: {e}")

# IMAGE PATHS
# TODO: PASS FROM PREVIOUS STEP
query_img_path = "C:\\Users\\dylan\\Documents\\Programming\\AnyLoc\\demo\\data\\Campus\\Images\\Test\\Eolas064.jpg"
match_img_path = "C:\\Users\\dylan\\Documents\\Programming\\AnyLoc\\demo\\data\\Campus\\Images\\Eolas\\Eolas003.jpg"

# Check Images using epipolar geometry
kp1, kp2, good_matches, mask, img1, img2 = feature_match_and_filter(query_img_path, match_img_path)

print(f"Valid matches found: {len(good_matches)}")