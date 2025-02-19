import numpy as np
from sklearn.preprocessing import normalize
from sklearn.metrics.pairwise import cosine_similarity

# Cosine similarity threshold (adjustable)
SIMILARITY_THRESHOLD = 0.38855427503585815

# Function to find top-K matches with threshold filtering
def find_top_k_matches(query_descriptor, vectors, k=5):
    """
    Given a query descriptor, find the top-K most similar images in the dataset.
    
    :param query_descriptor: Descriptor of the query image
    :param vectors: List of dictionaries containing 'id', 'filename', 'normalized_vector'
    :param k: Number of top matches to retrieve
    :return: List of top-K matches with similarity scores and labels
    """
    global_descriptors = [vector['normalized_vector'] for vector in vectors]
    labels = [{'id': vector['id'], 'filename': vector['filename']} for vector in vectors]

    # Ensure global_descriptors is a 2D NumPy array
    if len(global_descriptors) == 0:
        raise ValueError("No descriptors were loaded! Check your dataset path.")

    global_descriptors = np.array(global_descriptors)

    # Reshape if needed (ensure it's a 2D array)
    if global_descriptors.ndim == 1:
        global_descriptors = global_descriptors.reshape(-1, 1)

    # Normalize descriptors
    query_descriptor = normalize(query_descriptor.reshape(1, -1)).flatten()
    global_descriptors = normalize(global_descriptors)

    # Compute cosine similarity
    similarities = cosine_similarity(query_descriptor.reshape(1, -1), global_descriptors)

    # Filter matches using threshold
    valid_matches = [
        (labels[i], similarities[0][i]) for i in range(len(labels)) if similarities[0][i] >= SIMILARITY_THRESHOLD
    ]

    # Sort in descending order and keep top-K matches
    valid_matches.sort(key=lambda x: x[1], reverse=True)
    top_k_matches = valid_matches[:k]

    return top_k_matches