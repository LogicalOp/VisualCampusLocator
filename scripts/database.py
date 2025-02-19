import asyncpg
import json
import numpy as np

async def connect_to_db():
    return await asyncpg.connect(
        user="postgres",
        password="postgres",
        database="postgres",
        host="localhost",
        port="5432"
    )

async def fetch_entry_by_id(conn, entry_id):
    try:
        result = await conn.fetchrow("SELECT * FROM image_descriptors WHERE id = $1", entry_id)
        return result
    except Exception as e:
        print(f"Error fetching entry by ID: {e}")
        return None

async def fetch_all_entries(conn):
    try:
        result = await conn.fetch("SELECT * FROM image_descriptors")
        return result
    except Exception as e:
        print(f"Error fetching all entries: {e}")
        return []

async def insert_entry(conn, filename, cloud_url, normalized_vector, unnormalized_vector):
    try:
        await conn.execute('''
            INSERT INTO image_descriptors (filename, cloud_url, normalized_vector, unnormalized_vector)
            VALUES ($1, $2, $3, $4)
        ''', filename, cloud_url, json.dumps(normalized_vector), json.dumps(unnormalized_vector))
        print("Entry inserted successfully")
    except Exception as e:
        print(f"Error inserting entry: {e}")

# Export the methods
__all__ = ['connect_to_db', 'fetch_entry_by_id', 'fetch_all_entries', 'insert_entry']