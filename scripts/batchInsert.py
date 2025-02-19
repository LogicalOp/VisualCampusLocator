import os
import json
import numpy as np
import asyncpg
import asyncio
from cloudinary.uploader import upload
from sklearn.preprocessing import normalize
from cloudinary.utils import cloudinary_url

# Database connection and insertion methods
async def connect_to_db():
    return await asyncpg.connect(
        user="postgres",
        password="postgres",
        database="postgres",
        host="localhost",
        port="5432"
    )

async def insert_entry(conn, filename, cloud_url, normalized_vector, unnormalized_vector):
    try:
        await conn.execute('''
            INSERT INTO image_descriptors (filename, cloud_url, normalized_vector, unnormalized_vector)
            VALUES ($1, $2, $3, $4)
        ''', filename, cloud_url, json.dumps(normalized_vector), json.dumps(unnormalized_vector))
        print(f"Entry inserted successfully for {filename}")
    except Exception as e:
        print(f"Error inserting entry for {filename}: {e}")

# Cloudinary configuration
import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
  cloud_name = 'don9ruggm',
  api_key = '846679456163419',
  api_secret = 'g1UiEl_YgY-kbuAIOZiO8SZs_P4'
)

# Upload images and insert vectors
async def process_images_and_vectors():
    conn = await connect_to_db()
    try:
        base_image_path = "../data/Images"
        base_descriptor_path = "../data/Vectors"

        for filename in os.listdir(base_image_path):
            if filename.endswith('.jpg') or filename.endswith('.png'):
                image_path = os.path.join(base_image_path, filename)
                # Format the descriptor filename to match the image filename
                descriptor_filename = filename.replace('.jpg', '.npy').replace('.png', '.npy')
                descriptor_filename = descriptor_filename.replace('AulaMaxima', 'AulaMaxima_').replace('Eolas', 'Eolas_').replace('Iontas', 'Iontas_').replace('LogicHouse', 'LogicHouse_')
                descriptor_path = os.path.join(base_descriptor_path, descriptor_filename)

                # Upload image to Cloudinary
                result = cloudinary.uploader.upload(image_path)
                cloud_url = result['secure_url']

                # Load vectors
                unnormalized_vector = np.load(descriptor_path)
                normalized_vector = normalize(unnormalized_vector.reshape(1, -1)).flatten()

                # Insert entry into the database
                await insert_entry(conn, filename, cloud_url, normalized_vector.tolist(), unnormalized_vector.tolist())

    finally:
        await conn.close()

# Run the process
asyncio.run(process_images_and_vectors())