from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import io
from inference.detector import PlantDetector
from websocket.sensor_socket import SensorSocketManager

app = FastAPI(title="Plant Health AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

detector = PlantDetector()
sensor_socket_manager = SensorSocketManager()

@app.get("/")
def root():
    return {"status": "FastAPI is running! Use /docs for Swagger UI."}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/reload")
def reload_model():
    global detector
    try:
        detector = PlantDetector()
        return {"status": "success", "session": str(detector.session)}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        detections = detector.predict(image_bytes)
        
        if not detections:
            return {
                "success": False,
                "disease": None,
                "confidence": 0,
                "status": "no_detection",
                "bbox": None
            }
            
        best_detection = detections[0]
        conf = best_detection["confidence"]
        
        if conf < 50:
            status = "Low confidence"
        else:
            status = "Disease detected"
            
        return {
            "success": True,
            "disease": best_detection["class_name"],
            "confidence": round(conf, 2),
            "status": status,
            "bbox": {
                "x1": best_detection["bbox"][0],
                "y1": best_detection["bbox"][1],
                "x2": best_detection["bbox"][2],
                "y2": best_detection["bbox"][3]
            }
        }
    except Exception as e:
        print(f"[ERROR] Inference failed: {str(e)}")
        return {"success": False, "error": str(e)}

@app.websocket("/ws/sensors")
async def websocket_endpoint(websocket: WebSocket):
    await sensor_socket_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        sensor_socket_manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
