import cv2
import numpy as np

def letterbox(im, new_shape=(640, 640), color=(114, 114, 114), auto=False, scaleFill=False, scaleup=True, stride=32):
    shape = im.shape[:2]
    if isinstance(new_shape, int):
        new_shape = (new_shape, new_shape)

    r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])
    if not scaleup:
        r = min(r, 1.0)

    ratio = r, r
    new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
    dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]
    
    if auto:
        dw, dh = np.mod(dw, stride), np.mod(dh, stride)
    elif scaleFill:
        dw, dh = 0.0, 0.0
        new_unpad = (new_shape[1], new_shape[0])
        ratio = new_shape[1] / shape[1], new_shape[0] / shape[0]

    dw /= 2
    dh /= 2

    if shape[::-1] != new_unpad:
        im = cv2.resize(im, new_unpad, interpolation=cv2.INTER_LINEAR)
    
    top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
    left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
    im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)
    return im, ratio, (dw, dh)

def preprocess_image(image_bytes):
    if isinstance(image_bytes, bytes) and image_bytes.startswith(b"data:image"):
        import base64
        image_bytes = base64.b64decode(image_bytes.split(b",")[1])

    nparr = np.frombuffer(image_bytes, np.uint8)
    img0 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img0 is None:
        raise ValueError("Failed to decode image")

    img = letterbox(img0, new_shape=(640, 640))[0]
    
    # BGR to RGB, HWC to CHW
    img = img[:, :, ::-1].transpose(2, 0, 1)
    img = np.ascontiguousarray(img)

    img = img.astype(np.float32)
    img /= 255.0
    if len(img.shape) == 3:
        img = np.expand_dims(img, axis=0)
        
    return img, img0
