import urllib.request
import urllib.parse
import sys

url = 'http://localhost:8000/health'
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        print("Health check:", response.read().decode())
except Exception as e:
    print("Health check failed:", e)

url = 'http://localhost:8000/predict'
import mimetypes
import uuid

boundary = uuid.uuid4().hex
headers = {'Content-Type': f'multipart/form-data; boundary={boundary}'}

with open('dummy.jpg', 'rb') as f:
    img_data = f.read()

body = (
    f'--{boundary}\r\n'
    f'Content-Disposition: form-data; name="file"; filename="dummy.jpg"\r\n'
    f'Content-Type: image/jpeg\r\n\r\n'
).encode('utf-8') + img_data + f'\r\n--{boundary}--\r\n'.encode('utf-8')

try:
    req = urllib.request.Request(url, data=body, headers=headers, method='POST')
    with urllib.request.urlopen(req) as response:
        print("Predict Response:", response.read().decode())
except urllib.error.HTTPError as e:
    print("Predict failed with HTTP Error:", e.code, e.read().decode())
except Exception as e:
    print("Predict failed:", e)
