
import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  UploadCloud,
  ScanSearch,
} from "lucide-react";

import plant from "../assets/plant.png";

function Upload() {

  const navigate = useNavigate();

 const [image, setImage] = useState(null);

const [imageFile, setImageFile] = useState(null);

const [loading, setLoading] = useState(false);
const [crop, setCrop] = useState("tomato");

  // IMAGE UPLOAD
 const handleImageUpload = (e) => {

  const file = e.target.files[0];

  if (file) {

    setImageFile(file);

    setImage(
      URL.createObjectURL(file)
    );

  }

};

  // DETECT DISEASE
const detectDisease = async () => {

  if (!imageFile) {
    alert("Please upload an image");
    return;
  }

  setLoading(true);

  try {

    const formData = new FormData();

formData.append(
  "file",
  imageFile
);

formData.append(
  "crop",
  crop
);

    const predictionResponse =
      await axios.post(
        "http://127.0.0.1:5001/predict",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
      console.log(
  "Prediction Response:",
  predictionResponse.data
);

    const diseaseName =
      predictionResponse.data.disease;

    const confidence =
      predictionResponse.data.confidence;

    const plantName =
      diseaseName.split("_")[0];

    let solution =
      "Apply recommended treatment.";

    const severity =
      Math.max(
        0,
        100 - Math.floor(confidence)
      );

    const recoveryPercentage =
      100 - severity;

    const expectedRecoveryDays =
      Math.ceil(
        severity / 10
      );

    const existing =
      JSON.parse(
        localStorage.getItem(
          "plantRecoveryHistory"
        )
      ) || [];

    const currentDay =
      existing.length + 1;

    existing.push({

      day: currentDay,

      image,

      disease:
        diseaseName,

      severity,

      recommendation:
        solution,

      recoveryPercentage,

      expectedRecoveryDays,

    });

    localStorage.setItem(
      "plantRecoveryHistory",
      JSON.stringify(existing)
    );

    const total =
      Number(
        localStorage.getItem(
          "totalScans"
        )
      ) || 0;

    localStorage.setItem(
      "totalScans",
      total + 1
    );

    if (severity === 0) {

      const healthy =
        Number(
          localStorage.getItem(
            "healthyPlants"
          )
        ) || 0;

      localStorage.setItem(
        "healthyPlants",
        healthy + 1
      );

    } else {

      const diseased =
        Number(
          localStorage.getItem(
            "diseasedPlants"
          )
        ) || 0;

      localStorage.setItem(
        "diseasedPlants",
        diseased + 1
      );

    }

    localStorage.setItem(
      "latestDisease",
      diseaseName
    );

    localStorage.setItem(
      "latestPlant",
      plantName
    );

    localStorage.setItem(
      "latestSolution",
      solution
    );

    localStorage.setItem(
      "latestSeverity",
      severity
    );

    setLoading(false);
    localStorage.setItem(
  "predictionResult",
  JSON.stringify(
    predictionResponse.data
  )
);

    navigate("/result");

  } catch (error) {

    console.log(error);

    alert(
      "Prediction failed. Check Flask server."
    );

    setLoading(false);

  }

};

  return (

    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center px-4 py-6">

      {/* BACKGROUND */}
      <div className="absolute top-[-250px] left-[-250px] w-[500px] h-[500px] bg-green-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full"></div>

      {/* PARTICLES */}
<div className="absolute inset-0 overflow-hidden">
</div>

      {/* LOGO */}
      <div className="relative w-[170px] h-[170px] flex items-center justify-center z-10 mb-6">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="absolute w-full h-full rounded-full border border-cyan-400/30"
        ></motion.div>

        <div className="absolute w-[120px] h-[120px] bg-green-400/20 blur-3xl rounded-full"></div>

        <motion.img
          src={plant}
          alt="plant"
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
          className="w-[90px] relative z-10 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]"
        />

      </div>

      {/* HEADING */}
      <div className="text-center mb-6 z-10">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent">

          AI Leaf Scanner

        </h1>

        <p className="text-gray-400 mt-2 text-base">

          Upload leaf image for disease detection

        </p>

      </div>

      {/* CARD */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[30px] p-6 shadow-[0_0_35px_rgba(255,255,255,0.08)] z-10 text-center w-[520px] max-w-full"
      >
        <div className="mb-6">

  <select
    value={crop}
    onChange={(e) => setCrop(e.target.value)}
    className="w-full p-4 rounded-xl bg-white text-black font-semibold"
  >

    <option value="tomato">Tomato</option>

    <option value="potato">Potato</option>

    <option value="pepper">Pepper</option>

    <option value="corn">Corn</option>

    <option value="apple">Apple</option>

    <option value="grape">Grape</option>

    <option value="peach">Peach</option>

    <option value="cherry">Cherry</option>

    <option value="strawberry">Strawberry</option>

  </select>

</div>
        {!image && (

          <>

            <UploadCloud
              size={65}
              className="mx-auto text-cyan-400"
            />

            <h2 className="text-white text-3xl font-bold mt-4">

              Upload Plant Image

            </h2>

            <p className="text-gray-400 mt-3 text-lg">

              Select a leaf image from your device

            </p>

            <label className="mt-8 inline-block px-10 py-4 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-black font-bold cursor-pointer text-lg">

              Choose Image

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />

            </label>

          </>

        )}

        {image && (

          <>

            <img
              src={image}
              alt="preview"
              className="w-[340px] mx-auto rounded-[25px]"
            />

            <button
              onClick={detectDisease}
              className="mt-6 px-10 py-4 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-black font-bold flex items-center gap-3 mx-auto text-lg"
            >

              <ScanSearch size={24} />

              Detect Disease

            </button>

          </>

        )}

      </motion.div>

      {/* LOADING */}
      {loading && (

        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center">

          <motion.img
            src={plant}
            alt="plant"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="w-[120px] drop-shadow-[0_0_35px_rgba(34,197,94,0.8)]"
          />

          <h2 className="text-4xl font-bold text-green-400 mt-6 animate-pulse">

            Processing Disease...

          </h2>

        </div>

      )}

    </div>

  );
}

export default Upload;
