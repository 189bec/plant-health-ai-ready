import onnxruntime as ort

model_path = r"c:\Users\risha\OneDrive\Documents\nirmaan hackthon\plant-health-ai\backend\models\best.onnx"
try:
    session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {e}")
