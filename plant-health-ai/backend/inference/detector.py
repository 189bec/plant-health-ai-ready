import onnxruntime as ort
import numpy as np
from inference.preprocessing import preprocess_image
from inference.postprocessing import non_max_suppression, scale_coords

CLASSES = [
    "Apple Scab Leaf", "Apple leaf", "Apple rust leaf", "Bell_pepper leaf",
    "Bell_pepper leaf spot", "Blueberry leaf", "Cherry leaf", "Corn Gray leaf spot",
    "Corn leaf blight", "Corn rust leaf", "Peach leaf", "Potato leaf",
    "Potato leaf early blight", "Potato leaf late blight", "Raspberry leaf",
    "Soyabean leaf", "Squash Powdery mildew leaf", "Strawberry leaf",
    "Tomato Early blight leaf", "Tomato Septoria leaf spot", "Tomato leaf",
    "Tomato leaf bacterial spot", "Tomato leaf late blight", "Tomato leaf mosaic virus",
    "Tomato leaf yellow virus", "Tomato mold leaf", "Tomato two spotted spider mites leaf",
    "grape leaf", "grape leaf black rot"
]

class PlantDetector:
    def __init__(self, model_path="models/best.onnx"):
        self.model_path = model_path
        try:
            self.session = ort.InferenceSession(self.model_path)
            self.input_name = self.session.get_inputs()[0].name
            print(f"Loaded ONNX model: {model_path}")
        except Exception as e:
            self.session = None
            print(f"Could not load ONNX model at {model_path}. Please ensure the file exists. Error: {e}")

    def predict(self, image_bytes):
        if self.session is None:
            print("[FATAL ERROR] ONNX Session is None. The best.onnx file is missing or invalid (it is currently just a 128-byte placeholder!).")
            raise RuntimeError("Model not loaded.")

        img_tensor, original_img = preprocess_image(image_bytes)
        print(f"\n==================================================")
        print(f"ONNX INFERENCE DEBUGGING")
        print(f"==================================================")
        print(f"ONNX Input Shape: {img_tensor.shape}")
        print(f"ONNX Input Dtype: {img_tensor.dtype}")

        outputs = self.session.run(None, {self.input_name: img_tensor})
        predictions = outputs[0]
        
        print(f"ONNX Output Shape: {predictions.shape}")
        print(f"ONNX Output Dtype: {predictions.dtype}")
        
        print(f"Output Min: {np.min(predictions)}")
        print(f"Output Max: {np.max(predictions)}")
        print(f"Output Mean: {np.mean(predictions)}")
        print(f"First prediction row (first 5 vals): {predictions[0, 0, :5]}")
        
        # Calculate combined confidence
        obj_scores = predictions[0, :, 4]
        cls_scores = np.max(predictions[0, :, 5:], axis=1)
        combined_conf = obj_scores * cls_scores
        
        max_obj = float(np.max(obj_scores))
        max_cls = float(np.max(cls_scores))
        max_comb = float(np.max(combined_conf))
        
        print(f"Maximum objectness: {max_obj:.4f}")
        print(f"Maximum class score: {max_cls:.4f}")
        print(f"Maximum combined confidence: {max_comb:.4f}")
        
        print("\nTOP 10 RAW PREDICTIONS (Before Filtering):")
        top_indices = np.argsort(combined_conf)[::-1][:10]
        for idx in top_indices:
            c_obj = obj_scores[idx]
            cls_id = np.argmax(predictions[0, idx, 5:])
            c_cls = predictions[0, idx, 5 + cls_id]
            c_comb = combined_conf[idx]
            print(f"Class ID {cls_id:2d} | Obj: {c_obj:.4f} | Cls Score: {c_cls:.4f} | Combined: {c_comb:.4f}")

        # NMS
        conf_thres = 0.05
        candidates = predictions[..., 4] > conf_thres
        print(f"\nDetections before NMS (obj > {conf_thres}): {np.sum(candidates)}")
        
        detections = non_max_suppression(predictions, conf_thres=conf_thres, iou_thres=0.45)
        print(f"Detections after NMS: {len(detections[0])}")
        
        results = []
        if len(detections[0]):
            det = detections[0]
            # The frontend expects coordinates in 640x640 scale
            # det[:, :4] = scale_coords(img_tensor.shape[2:], det[:, :4], original_img.shape)
            
            for *xyxy, conf, cls_id in det:
                results.append({
                    "class_id": int(cls_id),
                    "class_name": CLASSES[int(cls_id)],
                    "confidence": float(conf) * 100,
                    "bbox": [int(x) for x in xyxy]
                })
                
        return results
