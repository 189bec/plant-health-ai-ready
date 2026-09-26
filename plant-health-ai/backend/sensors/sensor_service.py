import time
import random
import threading

class SensorService:
    def __init__(self):
        self.electrode_voltage = 1.90
        self.soil_moisture = 42.0
        self.water_level = 78.0
        self.lora_snr = 7.5
        self.lora_rssi = -85
        self.manual_override = False
        self.spike_active = False
        self.spike_start_time = 0
        self.lock = threading.Lock()

    def update_data(self, voltage=None, moisture=None, water=None, snr=None, rssi=None):
        with self.lock:
            self.manual_override = True
            if voltage is not None: self.electrode_voltage = voltage
            if moisture is not None: self.soil_moisture = moisture
            if water is not None: self.water_level = water
            if snr is not None: self.lora_snr = snr
            if rssi is not None: self.lora_rssi = rssi

    def trigger_touch_spike(self):
        """Simulate a leaf touch event (sudden bioelectric potential spike)"""
        with self.lock:
            self.spike_active = True
            self.spike_start_time = time.time()
            self.manual_override = False # Let simulation handle the spike

    def get_latest_data(self):
        with self.lock:
            if not self.manual_override:
                # Handle spike logic (lasts for ~2 seconds)
                if self.spike_active:
                    elapsed = time.time() - self.spike_start_time
                    if elapsed < 0.5:
                        # Sharp rise
                        self.electrode_voltage = 2.8 + random.uniform(-0.1, 0.1)
                    elif elapsed < 1.5:
                        # Exponential decay back to baseline
                        self.electrode_voltage = max(1.90, self.electrode_voltage - 0.2)
                    else:
                        self.spike_active = False
                        self.electrode_voltage = 1.90
                else:
                    # Normal stable baseline drift (Graphite electrodes have some baseline drift)
                    self.electrode_voltage = max(1.7, min(2.1, self.electrode_voltage + random.uniform(-0.02, 0.02)))
                
                self.soil_moisture = max(0, min(100, self.soil_moisture + random.uniform(-0.1, 0.1)))
                self.water_level = max(0, min(100, self.water_level + random.uniform(-0.05, 0.05)))
                self.lora_snr = max(5.0, min(12.0, self.lora_snr + random.uniform(-0.5, 0.5)))
                self.lora_rssi = max(-120, min(-50, self.lora_rssi + random.randint(-2, 2)))

            return {
                "electrode_voltage": round(self.electrode_voltage, 3),
                "soil_moisture": round(self.soil_moisture, 1),
                "water_level": round(self.water_level, 1),
                "lora_snr": round(self.lora_snr, 1),
                "lora_rssi": int(self.lora_rssi),
                "timestamp": int(time.time() * 1000)
            }

    def get_historical_drift(self):
        """Returns 5 days of simulated historical data showing baseline drift from withheld water"""
        history = []
        base_time = int(time.time() * 1000) - (5 * 24 * 3600 * 1000)
        
        # Day 1-2: Watered, stable baseline (around 1.9V)
        # Day 3-5: Withheld water, baseline drift + higher variance (stress)
        
        voltage = 1.90
        moisture = 60.0
        
        for day in range(5):
            for hour in range(24):
                timestamp = base_time + (day * 24 + hour) * 3600 * 1000
                if day < 2:
                    # Healthy
                    voltage = 1.90 + random.uniform(-0.05, 0.05)
                    moisture = max(40, moisture - random.uniform(0.5, 1.5))
                else:
                    # Stressed - increasing baseline drift and dropping moisture
                    voltage = voltage + random.uniform(0.02, 0.08) # Drift upwards due to polarization/stress
                    moisture = max(5, moisture - random.uniform(1.0, 2.5))
                
                history.append({
                    "timestamp": timestamp,
                    "electrode_voltage": round(voltage, 3),
                    "soil_moisture": round(moisture, 1)
                })
                
        return history
