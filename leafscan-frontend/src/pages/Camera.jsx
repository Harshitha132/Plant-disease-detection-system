import { useRef, useState } from "react";

import Webcam from "react-webcam";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  ScanSearch,
  RotateCcw,
  RefreshCw,
} from "lucide-react";

import plant from "../assets/plant.png";

function CameraPage() {

  const webcamRef = useRef(null);

  const navigate = useNavigate();

  const [startCamera, setStartCamera] = useState(false);

  const [capturedImage, setCapturedImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [cameraMode, setCameraMode] = useState("environment");

  // Open Camera
  const openCamera = () => {

    setStartCamera(true);
  };

  // Capture Image
  const captureImage = () => {

    const imageSrc = webcamRef.current.getScreenshot();

    setCapturedImage(imageSrc);

    setStartCamera(false);
  };

  // Retake Image
  const retakeImage = () => {

    setCapturedImage(null);

    setStartCamera(true);
  };

  // Detect Disease
  const detectDisease = () => {

  setLoading(true);

  setTimeout(() => {

    const totalScans =
      Number(localStorage.getItem("totalScans")) || 0;

    localStorage.setItem(
      "totalScans",
      totalScans + 1
    );

    const healthyPlants =
      Number(localStorage.getItem("healthyPlants")) || 0;

    localStorage.setItem(
      "healthyPlants",
      healthyPlants + 1
    );

    navigate("/result", {
      state: {
        image: capturedImage,
      },
    });

  }, 3000);
};

  return (

    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[450px] h-[450px] bg-green-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[450px] h-[450px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Rotating Leaf */}
      <div className="relative w-[150px] h-[150px] flex items-center justify-center z-10 mb-3">

        {/* Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="absolute w-full h-full rounded-full border border-cyan-400/30"
        ></motion.div>

        {/* Glow */}
        <div className="absolute w-[100px] h-[100px] bg-green-400/20 blur-3xl rounded-full"></div>

        {/* Leaf */}
        <motion.img
          src={plant}
          alt="plant"
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
          className="w-[75px] relative z-10 drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]"
        />

      </div>

      {/* Heading */}
      <div className="text-center mb-4 z-10">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
          AI Camera Scanner
        </h1>

        <p className="text-gray-400 mt-1 text-sm">
          Capture leaf image for disease detection
        </p>

      </div>

      {/* BEFORE CAMERA OPEN */}
      {!startCamera && !capturedImage && (

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[28px] p-5 text-center shadow-[0_0_30px_rgba(255,255,255,0.08)] z-10 w-[380px] max-w-full"
        >

          <Camera
            size={45}
            className="mx-auto text-cyan-400"
          />

          <h2 className="text-white text-xl font-bold mt-3">
            Open Plant Camera
          </h2>

          <p className="text-gray-400 mt-1 text-sm">
            Scan leaf using AI
          </p>

          <button
            onClick={openCamera}
            className="mt-5 px-7 py-2 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-black font-bold"
          >
            Open Camera
          </button>

        </motion.div>

      )}

      {/* CAMERA SECTION */}
      {startCamera && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[28px] p-4 shadow-[0_0_30px_rgba(255,255,255,0.08)] z-10 text-center"
        >

          {/* Webcam */}
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: cameraMode,
            }}
            className="w-[400px] max-w-full rounded-[20px]"
          />

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">

            {/* Switch Camera */}
            <button
              onClick={() =>
                setCameraMode(
                  cameraMode === "user"
                    ? "environment"
                    : "user"
                )
              }
              className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold flex items-center gap-2"
            >

              <RefreshCw size={16} />

              Switch

            </button>

            {/* Capture */}
            <button
              onClick={captureImage}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-black font-bold flex items-center gap-2"
            >

              <Camera size={16} />

              Capture

            </button>

          </div>

        </motion.div>

      )}

      {/* IMAGE PREVIEW */}
      {capturedImage && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[28px] p-4 shadow-[0_0_30px_rgba(255,255,255,0.08)] z-10 text-center"
        >

          {/* Preview Image */}
          <img
            src={capturedImage}
            alt="captured"
            className="w-[400px] max-w-full rounded-[20px]"
          />

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">

            {/* Retake */}
            <button
              onClick={retakeImage}
              className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold flex items-center gap-2"
            >

              <RotateCcw size={16} />

              Retake

            </button>

            {/* Detect */}
            <button
              onClick={detectDisease}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-black font-bold flex items-center gap-2"
            >

              <ScanSearch size={16} />

              Detect Disease

            </button>

          </div>

        </motion.div>

      )}

      {/* LOADING SCREEN */}
      {loading && (

        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center">

          {/* Rotating Leaf */}
          <motion.img
            src={plant}
            alt="plant"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="w-[90px] drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]"
          />

          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-green-400 mt-5 animate-pulse">
            Processing Disease...
          </h2>

        </div>

      )}

    </div>

  );
}

export default CameraPage;