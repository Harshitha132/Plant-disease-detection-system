import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Zap,
} from "lucide-react";

import plant from "../assets/plant.png";

function Splash() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-green-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Plant Section */}
      <div className="relative flex items-center justify-center mb-20 mt-6">

        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className="absolute w-[280px] h-[280px] rounded-full border border-cyan-400/30"
        ></motion.div>

        {/* Glow */}
        <div className="absolute w-[220px] h-[220px] bg-green-400/20 blur-3xl rounded-full"></div>

        {/* Rotating Plant */}
        <motion.img
          src={plant}
          alt="plant"
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
          className="w-[150px] object-contain z-10 drop-shadow-[0_0_40px_rgba(34,197,94,0.7)]"
        />

      </div>

      {/* Main Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[30px] px-10 py-8 text-center shadow-[0_0_30px_rgba(255,255,255,0.08)] z-10 w-[700px] max-w-full">

        {/* Title */}
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
          LeafScan AI
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-xl mt-3">
          Smart Plant Disease Detection System
        </p>

        {/* Features */}
        <div className="flex justify-center items-center gap-8 mt-6 flex-wrap">

          <div className="flex items-center gap-2 text-green-300 text-lg">
            <Leaf size={20} />
            <span>AI Powered</span>
          </div>

          <div className="flex items-center gap-2 text-cyan-300 text-lg">
            <ShieldCheck size={20} />
            <span>Accurate</span>
          </div>

          <div className="flex items-center gap-2 text-purple-300 text-lg">
            <Zap size={20} />
            <span>Instant Results</span>
          </div>

        </div>

        {/* Button */}
        <motion.button
          onClick={() => navigate("/home")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-white text-xl font-bold shadow-[0_0_40px_rgba(168,85,247,0.7)] flex items-center gap-3 mx-auto"
        >
          Move On
          <ArrowRight size={26} />
        </motion.button>

      </div>
    </div>
  );
}

export default Splash;