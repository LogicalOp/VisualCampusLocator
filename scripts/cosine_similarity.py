import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import normalize
import os

# Function to extract labels (location, id) from the file names
def extract_label(file_name):
    base_name = file_name.replace('.npy', '')
    components = base_name.split('_')
    label = {
        'location': components[0],
        'id': components[1],
        # condition: components[2]
        # time: components[3]
    }
    return label

# Function to calculate cosine similarity between two vectors and return top-K most similar matches
def find_top_k_matches(query_descriptor, descriptor_files, base_dir, k=10):
    global_descriptors = []
    labels = []

    for file in descriptor_files:
        file_path = os.path.join(base_dir, file)
        descriptor = np.load(file_path)

        if descriptor.ndim > 1:
            descriptor = descriptor.flatten()

        global_descriptors.append(descriptor)
        labels.append(extract_label(file))

    # Ensure global_descriptors is a 2D array
    if len(global_descriptors) == 0:
        return ValueError("No descriptors were loaded")
    
    global_descriptors = np.array(global_descriptors)

    # Reshape if needed
    if global_descriptors.ndim == 1:
        global_descriptors = global_descriptors.reshape(1, -1)
    
    # Normalize descriptors ( Using sklaern normalize function)
    query_descriptor = normalize(query_descriptor.reshape(1, -1)).flatten()
    global_descriptors = normalize(global_descriptors)

    # Calculate cosine similarity
    similarities = cosine_similarity(query_descriptor.reshape(1, -1), global_descriptors)

    # Get top-K matches
    top_k_indices = np.argsort(similarities[0])[-k:][::-1]
    top_k_matches = [(labels[i], similarities[0][i]) for i in top_k_indices]

    return top_k_matches