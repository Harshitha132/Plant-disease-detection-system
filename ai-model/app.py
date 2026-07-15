from flask import Flask, request, jsonify
from flask_cors import CORS

import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

# ==========================
# CLASS LABELS
# ==========================

CLASS_LABELS = {

    "apple": [
        "Healthy",
        "Apple_Scab",
        "Black_Rot",
        "Cedar_Apple_Rust"
    ],

    "cherry": [
        "Healthy",
        "Powdery_Mildew"
    ],

    "corn": [
        "Healthy",
        "Common_Rust",
        "Gray_Leaf_Spot",
        "Blight"
    ],

    "grape": [
        "Healthy",
        "Black_Rot",
        "Esca",
        "Leaf_Blight"
    ],

    "peach": [
        "Healthy",
        "Bacterial_Spot"
    ],

    "pepper": [
        "Healthy",
        "Bacterial_Spot"
    ],

    "potato": [
        "Healthy",
        "Early_Blight",
        "Late_Blight"
    ],

    "strawberry": [
        "Healthy",
        "Leaf_Scorch"
    ],

    "tomato": [
        "Healthy",
        "Early_Blight",
        "Late_Blight",
        "Leaf_Mold"
    ]
}

# ==========================
# LOAD MODELS
# ==========================

print("Loading models...")

models = {

    "apple": tf.keras.models.load_model(
        "models/apple_model.h5",
        compile=False
    ),

    "cherry": tf.keras.models.load_model(
        "models/cherry_model.h5",
        compile=False
    ),

    "corn": tf.keras.models.load_model(
        "models/corn_model.h5",
        compile=False
    ),

    "grape": tf.keras.models.load_model(
        "models/grape_model.h5",
        compile=False
    ),

    "peach": tf.keras.models.load_model(
        "models/peach_model.h5",
        compile=False
    ),

    "pepper": tf.keras.models.load_model(
        "models/pepper_model.h5",
        compile=False
    ),

    "potato": tf.keras.models.load_model(
        "models/potato_model.h5",
        compile=False
    ),

    "strawberry": tf.keras.models.load_model(
        "models/strawberry_model.h5",
        compile=False
    ),

    "tomato": tf.keras.models.load_model(
        "models/tomato_model.h5",
        compile=False
    )
}

print("✅ All Models Loaded Successfully")

# ==========================
# IMAGE PREPROCESSING
# ==========================

def preprocess_image(image):

    image = image.resize((256, 256))

    image = np.array(image)

    image = image / 255.0

    image = np.expand_dims(
        image,
        axis=0
    )

    return image

# ==========================
# HOME ROUTE
# ==========================

@app.route("/")
def home():

    return jsonify({
        "message":
        "LeafScan AI Backend Running"
    })

# ==========================
# PREDICT ROUTE
# ==========================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        crop = request.form.get("crop")

        if crop not in models:
            return jsonify({
                "success": False,
                "message": "Invalid crop selected"
            })

        if "file" not in request.files:
            return jsonify({
                "success": False,
                "message": "No image uploaded"
            })

        file = request.files["file"]

        image = Image.open(file).convert("RGB")

        image = preprocess_image(image)

        prediction = models[crop].predict(image)

        class_index = int(np.argmax(prediction))

        confidence = float(np.max(prediction)) * 100

        disease_name = CLASS_LABELS[crop][class_index]

        print("\n========== PREDICTION ==========")
        print("Crop:", crop)
        print("Class Index:", class_index)
        print("Disease:", disease_name)
        print("Confidence:", confidence)
        print("Raw Prediction:", prediction)
        print("================================\n")

        return jsonify({
            "success": True,
            "crop": crop,
            "disease": disease_name,
            "predicted_index": class_index,
            "confidence": round(confidence, 2)
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        })
# ==========================
# RUN APP
# ==========================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )