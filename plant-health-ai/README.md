# ByteBenders | Plant Health Edge AI 🌿

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Python: 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)
![React: 18.x](https://img.shields.io/badge/react-18.x-cyan.svg)
![LoRa: Ready](https://img.shields.io/badge/LoRa-Ready-orange.svg)

An edge-autonomous, two-way, battery-deployable LoRa system fusing **bioelectric plant potential sensing** with **YOLO-based Edge-AI vision**. Built for the Nirmaan Hackathon.

## 🏆 The Gap & Our Novelty

Existing systems are either:
1. **Sensor + LoRa + Cloud Dashboards:** Strong on monitoring, weak on decision-making.
2. **Camera + Edge-AI:** Strong on vision, isolated from field sensors.

**ByteBenders Novelty:** We fuse *"sensing"* and *"seeing"*. By charting baseline drift in the **same plant** over 5 days of withheld water, we catch water stress **2 to 4 days** before it is visibly apparent to a camera or human eye.

## 🚀 Features

- **Bioelectric Sensing:** Graphite/Carbon rod electrodes reading micro-to-milliVolt potentials directly from plant tissue.
- **LoRa Chirp Integration:** Fully simulated hardware payload ingestion bridging ESP32/MCU ADCs via Linear FM chirp (SF=12, BW=125kHz) to a central dashboard.
- **YOLOv5 Edge AI:** Dedicated ONNX inference pipeline for on-device/edge plant disease detection via visual bounding boxes.
- **Live vs Historical Analysis:** Interactive UI demonstrating live plant leaf touch spikes alongside 5-day historical baseline drift for causation proof.
- **Earth-Toned UI:** Custom Tailwind CSS configuration (`terracotta`, `sage`, `cream`) for a highly professional, agricultural-focused presentation.

## 📂 Directory Structure

```text
plant-health-ai/
├── frontend/
│   ├── src/
│   │   ├── components/       # React UI Components (Dashboard, BioelectricChart, SystemArchitecture)
│   │   ├── index.css         # Tailwind directives
│   │   └── App.jsx
│   ├── tailwind.config.js    # Earthy terracotta/sage/cream palette
│   └── package.json
│
├── backend/
│   ├── main.py               # FastAPI entrypoint (LoRa Ingestion & AI endpoints)
│   ├── requirements.txt      
│   ├── models/
│   │   └── best.onnx         # YOLOv5 ONNX model
│   ├── inference/            # Edge AI detection pipeline
│   ├── sensors/              # Bioelectric state and LoRa metadata manager
│   └── websocket/            # Live telemetry broadcasting
│
├── LICENSE
└── README.md
```

## 🛠️ Setup Instructions

### 1. Backend (FastAPI + AI Engine)
1. **Model Provisioning:** Ensure your trained YOLOv5s ONNX model is in `backend/models/best.onnx`.
2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```
3. Run the backend server:
```bash
python main.py
```
*(The API will be available at http://localhost:8000)*

### 2. Frontend (React Dashboard)
1. In a new terminal, install Node.js dependencies:
```bash
cd frontend
npm install
```
2. Start the development server:
```bash
npm run dev
```
*(The dashboard will be available at http://localhost:5173)*

## 📡 Hardware & Physics Context

### LoRa Chirp Physics
* **Chirp Equation:** `f(t) = f_0 + (B/T)t`
* **Processing Gain:** Spreading energy over bandwidth **B** and time **T** yields a processing gain of `G_p = 10 log10(2^SF) dB`. With SF=12, we achieve ~36 dB gain, allowing signal recovery 4,000x weaker than the noise floor.

### Bioelectric Electrodes
* **Material:** Graphite/Carbon rods (Non-phytotoxic, polarizable, robust for field deployments).
* **Acquisition:** Normalizing baseline drift via instrumentation amplifiers (e.g., INA333) and digital high-pass filtering.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
