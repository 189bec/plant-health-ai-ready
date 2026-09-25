# Plant Health AI

A modern, full-stack agricultural dashboard for AI-based plant disease detection and live sensor monitoring.

## Directory Structure

```
plant-health-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── netlify.toml        # Deployment config for Netlify
│
├── backend/
│   ├── main.py             # FastAPI entrypoint
│   ├── requirements.txt
│   ├── models/
│   │   └── best.onnx       # YOUR YOLOv5 MODEL HERE
│   ├── inference/          # ONNX inference pipeline (NMS, bounding boxes)
│   ├── sensors/            # Sensor data service (mocked for now)
│   ├── websocket/          # Live WebSocket manager for sensors
│   └── render.yaml         # Deployment config for Render
│
└── README.md
```

## Setup Instructions

### 1. Backend Setup
1. **CRITICAL:** Place your trained YOLOv5s ONNX model in `backend/models/best.onnx`.
2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```
3. Run the FastAPI server:
```bash
python main.py
```
*(The backend will start on http://localhost:8000)*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*(The frontend will start on http://localhost:5173)*

## Deployment

### Frontend (Netlify / Vercel)
The `frontend/` directory is pre-configured with a `netlify.toml` file.
1. Connect your GitHub repo to Netlify or Vercel.
2. Set the Root Directory to `frontend`.
3. The build command is `npm run build` and output directory is `dist`.

### Backend (Render)
The `backend/` directory contains a `render.yaml` Blueprint.
1. Connect your GitHub repo to Render.
2. Render will automatically detect `render.yaml` and configure a Python Web Service.
3. Make sure to update the `fetch()` URL in `frontend/src/components/PlantAnalysis.jsx` to point to your new Render URL instead of localhost.
