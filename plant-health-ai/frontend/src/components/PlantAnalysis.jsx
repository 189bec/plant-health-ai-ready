import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, Scan } from 'lucide-react';

const PlantAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    setResult(null);
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success && data.disease) {
        setResult({
          disease: data.disease,
          confidence: `${data.confidence}%`,
          status: data.status,
          image: previewUrl,
          bbox: data.bbox
        });
      } else if (data.error) {
        setResult({
          disease: 'Backend Error',
          confidence: null,
          status: data.error,
          image: previewUrl,
          bbox: null
        });
      } else {
        setResult({
          disease: 'No reliable disease detected',
          confidence: 'N/A',
          status: 'No detection',
          image: previewUrl,
          bbox: null
        });
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Failed to connect to the backend. Make sure the FastAPI server is running.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-sage-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Scan className="text-sage-600" size={20} />
          Plant Disease Analysis
        </h2>
        <div className="text-right">
          <p className="text-xs font-bold text-terracotta-700 uppercase bg-terracotta-50 px-2 py-0.5 rounded">AI Model: YOLOv5</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Model format: ONNX</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        
        {/* Upload Area */}
        <div className="flex-1 border-2 border-dashed border-sage-300 rounded-xl bg-sage-50/50 p-6 flex flex-col items-center justify-center text-center transition-colors hover:bg-sage-50 hover:border-sage-400 relative">
          <input 
            type="file" 
            accept="image/jpeg, image/png" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="bg-white p-3 rounded-full shadow-sm mb-3 border border-sage-100">
            <UploadCloud className="text-sage-500" size={28} />
          </div>
          <h3 className="text-sm font-bold text-gray-700 mb-1">
            {selectedFile ? selectedFile.name : "Click or Drag to upload"}
          </h3>
          <p className="text-xs text-gray-500 mb-4">Supports JPG, PNG (Max 5MB)</p>
          
          <button 
            onClick={handleUpload}
            disabled={analyzing || !selectedFile}
            className="bg-sage-600 hover:bg-sage-800 text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2 relative z-10"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              'Analyze Plant Image'
            )}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="flex-1 bg-cream-50 rounded-xl overflow-hidden border border-cream-200 relative animate-in fade-in zoom-in duration-300">
            <div className="relative h-40 w-full bg-gray-200 border-b border-cream-200">
              <img src={result.image} alt="Analyzed leaf" className="w-full h-full object-cover" />
              {/* Bounding box rendering based on backend data */}
              {result.bbox && (
                <div 
                  className="absolute border-2 border-terracotta-500 bg-terracotta-500/20 rounded"
                  style={{
                    left: `${(result.bbox.x1 / 640) * 100}%`,
                    top: `${(result.bbox.y1 / 640) * 100}%`,
                    width: `${((result.bbox.x2 - result.bbox.x1) / 640) * 100}%`,
                    height: `${((result.bbox.y2 - result.bbox.y1) / 640) * 100}%`
                  }}
                >
                </div>
              )}
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs text-terracotta-600 font-bold mb-1">{result.status}</p>
                  <h3 className="text-md font-bold text-gray-900">{result.disease}</h3>
                </div>
                {result.status !== "No detection" && (
                  <div className={`p-1 rounded-full ${result.status === 'Low confidence' ? 'bg-yellow-50' : 'bg-terracotta-50'}`}>
                    <CheckCircle2 className={result.status === 'Low confidence' ? 'text-yellow-500' : 'text-terracotta-600'} size={20} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-3">
                {result.status !== "no_detection" && !result.status.includes("Error") && result.confidence && (
                  <>
                    <div className="flex-1 bg-cream-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${result.status === 'Low confidence' ? 'bg-yellow-500' : 'bg-terracotta-500'}`} 
                        style={{ width: result.confidence }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-700">Conf: {result.confidence}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {!result && !analyzing && (
          <div className="flex-1 bg-cream-50 rounded-xl border border-cream-100 flex flex-col items-center justify-center p-6 text-center">
            <Scan size={32} className="text-terracotta-300 mb-3 opacity-50" />
            <p className="text-sm font-medium text-gray-400">Upload an image to see YOLOv5 ONNX detection results.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlantAnalysis;
