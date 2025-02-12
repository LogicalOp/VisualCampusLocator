import asyncpg
import asyncio
import numpy as np
import json

async def test_fetch():
    conn = await asyncpg.connect(
        user="postgres",
        password="postgres",
        database="postgres",
        host="localhost",
        port="5432"
    )

    try:
        result = await conn.fetch("SELECT * FROM images")
        print(result)
    finally:
        await conn.close()
    
asyncio.run(test_fetch());