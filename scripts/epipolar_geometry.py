import cv2
import numpy as np

def feature_match_and_filter(img1_path, img2_path):
    # Load images
    img1 = cv2.imread(img1_path, cv2.IMREAD_GRAYSCALE)
    img2 = cv2.imread(img2_path, cv2.IMREAD_GRAYSCALE)

    # SIFT Feature detector
    sift = cv2.SIFT_create()

    # Detect and compute descriptors
    kp1, des1 = sift.detectAndCompute(img1, None)
    kp2, des2 = sift.detectAndCompute(img2, None)

    # FLANN Match
    index_params = dict(algorithm=1, trees=5)
    search_params = dict(checks=50)
    flann = cv2.FlannBasedMatcher(index_params, search_params)

    matches = flann.knnMatch(des1, des2, k=2)

    # Lowe's ratio test
    good_matches = []
    pts1 = []
    pts2 = []

    for m, n in matches:
        if m.distance < 0.7 * n.distance:
            good_matches.append(m)
            pts1.append(kp1[m.queryIdx].pt)
            pts2.append(kp2[m.trainIdx].pt)

    pts1 = np.float32(pts1)
    pts2 = np.float32(pts2)

    # RANSAC to refine matches
    if len(pts1) > 8:
        H, mask = cv2.findHomography(pts1, pts2, cv2.RANSAC, 5.0)
        matches_mask = mask.ravel().tolist()
    else:
        matches_mask = None
    
    return kp1, kp2, good_matches, matches_mask, img1, img2