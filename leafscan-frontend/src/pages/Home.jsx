import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  Upload,
  Camera,
  Mic,
  Activity,
  LayoutDashboard,
} from "lucide-react";

import plant from "../assets/plant.png";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">

      {/* Background Glow */}
      <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] bg-green-500/20 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-purple-500/20 blur-[180px] rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
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

      {/* Rotating Plant */}
      <div className="relative w-[240px] h-[240px] flex items-center justify-center mb-8 z-10">

        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className="absolute w-full h-full rounded-full border border-cyan-400/30"
        ></motion.div>

        {/* Glow */}
        <div className="absolute w-[170px] h-[170px] bg-green-400/20 blur-3xl rounded-full"></div>

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
          className="w-[120px] relative z-10 drop-shadow-[0_0_40px_rgba(34,197,94,0.8)]"
        />

      </div>

      {/* Heading */}
      <div className="text-center mb-10 z-10">

        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
          LeafScan AI
        </h1>

        <p className="text-gray-400 mt-3 text-xl">
          Smart Plant Disease Detection System
        </p>

      </div>

      {/* Tabs */}
      <div className="flex gap-8 overflow-x-auto w-full px-8 justify-center z-10 pb-4">

        {/* Upload */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-8 w-[300px] min-w-[300px] text-center shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >

          <Upload
            size={65}
            className="mx-auto text-green-400"
          />

          <h2 className="text-white text-3xl font-bold mt-5">
            Upload
          </h2>

          <p className="text-gray-400 text-base mt-4">
            Upload leaf image
          </p>

          <button
            onClick={() => navigate("/upload")}
            className="mt-7 w-full py-4 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold text-lg"
          >
            Upload
          </button>

        </motion.div>

        {/* Camera */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-8 w-[300px] min-w-[300px] text-center shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >

          <Camera
            size={65}
            className="mx-auto text-cyan-400"
          />

          <h2 className="text-white text-3xl font-bold mt-5">
            Camera
          </h2>

          <p className="text-gray-400 text-base mt-4">
            Open live camera
          </p>

          <button
            onClick={() => navigate("/camera")}
            className="mt-7 w-full py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold text-lg"
          >
            Camera
          </button>

        </motion.div>

        {/* Voice */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-8 w-[300px] min-w-[300px] text-center shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >

          <Mic
            size={65}
            className="mx-auto text-purple-400"
          />

          <h2 className="text-white text-3xl font-bold mt-5">
            Voice AI
          </h2>

          <p className="text-gray-400 text-base mt-4">
            Speak with AI
          </p>

          <button
            onClick={() => navigate("/voice")}
            className="mt-7 w-full py-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-black font-bold text-lg"
          >
            Voice
          </button>

        </motion.div>

        {/* Dashboard */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-8 w-[300px] min-w-[300px] text-center shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >

          <LayoutDashboard
            size={65}
            className="mx-auto text-pink-400"
          />

          <h2 className="text-white text-3xl font-bold mt-5">
            Dashboard
          </h2>

          <p className="text-gray-400 text-base mt-4">
            AI analytics
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-7 w-full py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-black font-bold text-lg"
          >
            Dashboard
          </button>

        </motion.div>

      </div>

    </div>

  );
}

export default Home;