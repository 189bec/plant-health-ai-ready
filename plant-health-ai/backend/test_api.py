import requests
import numpy as np
import cv2
import json

# Create a dummy image
img = np.zeros((640, 640, 3), dtype=np.uint8)
cv2.imwrite("dummy.jpg", img)

# Send request
url = "http://localhost:8000/predict"
with open("dummy.jpg", "rb") as f:
    files = {"file": ("dummy.jpg", f, "image/jpeg")}
    try:
        response = requests.post(url, files=files)
        print("Status Code:", response.status_code)
        print("Response JSON:", response.text)
    except Exception as e:
        print("Error connecting:", e)
