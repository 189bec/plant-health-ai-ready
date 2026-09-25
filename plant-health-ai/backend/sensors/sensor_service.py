import time
import random

class SensorService:
    def __init__(self):
        self.electrode_voltage = 1.90
        self.soil_moisture = 42.0
        self.water_level = 78.0

    def get_latest_data(self):
        self.electrode_voltage = max(1.7, min(2.1, self.electrode_voltage + random.uniform(-0.05, 0.05)))
        self.soil_moisture = max(0, min(100, self.soil_moisture + random.uniform(-1.0, 1.0)))
        self.water_level = max(0, min(100, self.water_level + random.uniform(-0.5, 0.5)))

        return {
            "electrode_voltage": round(self.electrode_voltage, 2),
            "soil_moisture": round(self.soil_moisture, 1),
            "water_level": round(self.water_level, 1),
            "timestamp": int(time.time() * 1000)
        }
