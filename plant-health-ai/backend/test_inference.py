import asyncio
from fastapi import UploadFile
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__)))
from inference.detector import PlantDetector

detector = PlantDetector()

async def test():
    # Simulate the base64 string being sent as bytes
    data_url = b"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBx"
    
    try:
        detections = detector.predict(data_url)
        print("Success:", detections)
    except Exception as e:
        print("Exception caught:", str(e))

asyncio.run(test())
