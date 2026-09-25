import numpy as np

def xywh2xyxy(x):
    y = np.copy(x)
    y[:, 0] = x[:, 0] - x[:, 2] / 2
    y[:, 1] = x[:, 1] - x[:, 3] / 2
    y[:, 2] = x[:, 0] + x[:, 2] / 2
    y[:, 3] = x[:, 1] + x[:, 3] / 2
    return y

def box_iou(box1, box2):
    a1 = box1[:, None, :]
    a2 = box2[None, :, :]
    
    tl = np.maximum(a1[..., :2], a2[..., :2])
    br = np.minimum(a1[..., 2:], a2[..., 2:])
    hw = np.maximum(br - tl, 0)
    inter = hw[..., 0] * hw[..., 1]
    
    area1 = (a1[..., 2] - a1[..., 0]) * (a1[..., 3] - a1[..., 1])
    area2 = (a2[..., 2] - a2[..., 0]) * (a2[..., 3] - a2[..., 1])
    union = area1 + area2 - inter
    return inter / union

def non_max_suppression(prediction, conf_thres=0.25, iou_thres=0.45):
    candidates = prediction[..., 4] > conf_thres
    output = [np.zeros((0, 6))] * prediction.shape[0]
    
    for xi, x in enumerate(prediction):
        x = x[candidates[xi]]
        if not x.shape[0]:
            continue
            
        x[:, 5:] *= x[:, 4:5]
        box = xywh2xyxy(x[:, :4])
        
        i, j = np.nonzero(x[:, 5:] > conf_thres)
        x = np.concatenate((box[i], x[i, j + 5, None], j[:, None].astype(np.float32)), axis=1)
        
        if not x.shape[0]:
            continue
            
        x = x[x[:, 4].argsort()[::-1]]
        
        keep = []
        while x.shape[0]:
            keep.append(x[0])
            if x.shape[0] == 1:
                break
            ious = box_iou(np.expand_dims(x[0, :4], axis=0), x[1:, :4])[0]
            x = x[1:][ious < iou_thres]
            
        output[xi] = np.array(keep)
    return output

def scale_coords(img1_shape, coords, img0_shape):
    gain = min(img1_shape[0] / img0_shape[0], img1_shape[1] / img0_shape[1])
    pad = (img1_shape[1] - img0_shape[1] * gain) / 2, (img1_shape[0] - img0_shape[0] * gain) / 2

    coords[:, [0, 2]] -= pad[0]
    coords[:, [1, 3]] -= pad[1]
    coords[:, :4] /= gain
    
    coords[:, 0] = np.clip(coords[:, 0], 0, img0_shape[1])
    coords[:, 1] = np.clip(coords[:, 1], 0, img0_shape[0])
    coords[:, 2] = np.clip(coords[:, 2], 0, img0_shape[1])
    coords[:, 3] = np.clip(coords[:, 3], 0, img0_shape[0])
    
    return coords
