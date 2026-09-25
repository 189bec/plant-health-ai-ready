from fastapi import WebSocket, WebSocketDisconnect
from sensors.sensor_service import SensorService
import asyncio
import json

class SensorSocketManager:
    def __init__(self):
        self.active_connections = []
        self.sensor_service = SensorService()
        self.is_running = False

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        
        if not self.is_running:
            self.is_running = True
            asyncio.create_task(self.broadcast_loop())

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if not self.active_connections:
            self.is_running = False

    async def broadcast_loop(self):
        while self.is_running:
            data = self.sensor_service.get_latest_data()
            
            # Create a copy to iterate safely
            for connection in list(self.active_connections):
                try:
                    await connection.send_text(json.dumps(data))
                except Exception:
                    self.disconnect(connection)
            await asyncio.sleep(0.25)
