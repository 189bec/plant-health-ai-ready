from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import io
from inference.detector import PlantDetector
from websocket.sensor_socket import SensorSocketManager

app = FastAPI(title="Plant Health AI Backend - LoRa & Edge AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

detector = PlantDetector()
sensor_socket_manager = SensorSocketManager()

class LoRaPayload(BaseModel):
    electrode_voltage: float = None
    soil_moisture: float = None
    water_level: float = None
    lora_snr: float = None
    lora_rssi: int = None

@app.get("/")
def root():
    return {"status": "FastAPI is running! Use /docs for Swagger UI."}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/sensors/history")
def get_sensor_history():
    """Returns 5-day historical drift data for the Demo"""
    history = sensor_socket_manager.sensor_service.get_historical_drift()
    return {"success": True, "data": history}

@app.post("/api/sensors/spike")
def trigger_spike():
    """Triggers a simulated leaf-touch bioelectric spike"""
    sensor_socket_manager.sensor_service.trigger_touch_spike()
    return {"success": True, "message": "Spike triggered"}

@app.post("/api/sensors/data")
def receive_lora_data(payload: LoRaPayload):
    """Ingest real LoRa gateway data"""
    sensor_socket_manager.sensor_service.update_data(
        voltage=payload.electrode_voltage,
        moisture=payload.soil_moisture,
        water=payload.water_level,
        snr=payload.lora_snr,
        rssi=payload.lora_rssi
    )
    return {"success": True, "message": "Data ingested via LoRa"}

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
