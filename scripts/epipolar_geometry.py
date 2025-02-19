import cv2
import numpy as np

def feature_match_and_filter(img1_path, img2_path, min_matches=15, min_inlier_ratio=0.2):
    """
    Extracts SIFT features and finds valid matches using Lowe's ratio test followed by RANSAC filtering.
    Incorporates thresholds for the minimum number of matches and inlier ratio.
    
    :param img1_path: Path to the query image
    :param img2_path: Path to the matched image
    :param min_matches: Minimum number of good matches required (default=15)
    :param min_inlier_ratio: Minimum ratio of inliers required after RANSAC (default=0.2)
    :return: Tuple (kp1, kp2, good_matches, matches_mask, img1, img2)
             where matches_mask is None if the thresholds are not met.
    """
    # Load images in grayscale
    img1 = cv2.imread(img1_path, cv2.IMREAD_GRAYSCALE)
    img2 = cv2.imread(img2_path, cv2.IMREAD_GRAYSCALE)

    # SIFT feature detector
    sift = cv2.SIFT_create()

    # Detect and compute descriptors
    kp1, des1 = sift.detectAndCompute(img1, None)
    kp2, des2 = sift.detectAndCompute(img2, None)

    # FLANN matcher parameters
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

    # RANSAC to refine matches if we have enough points
    if len(pts1) > 8:
        H, mask = cv2.findHomography(pts1, pts2, cv2.RANSAC, 5.0)
        matches_mask = mask.ravel().tolist()
        
        num_good = len(good_matches)
        num_inliers = np.sum(mask)
        inlier_ratio = num_inliers / num_good if num_good > 0 else 0

        # Check thresholds: minimum number of matches and inlier ratio
        if num_good < min_matches or inlier_ratio < min_inlier_ratio:
            # Thresholds not met: mark as invalid (return None for matches_mask)
            matches_mask = None
        # Else, keep matches_mask as computed
        
    else:
        matches_mask = None  # Not enough points to compute homography

    return kp1, kp2, good_matches, matches_mask, img1, img2