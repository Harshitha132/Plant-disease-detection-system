import { useLocation } from "react-router-dom";

import {
  AlertTriangle,
  ShieldCheck,
  Activity,
  Stethoscope,
  Bug,
} from "lucide-react";

function Result() {

  const location = useLocation();

  const image = location.state?.image;
  const result = JSON.parse(
  localStorage.getItem(
    "predictionResult"
  )
);

const disease =
  result?.disease || "Unknown";

const confidence =
  result?.confidence || 0;

const crop =
  result?.crop || "Unknown";

  return (

    <div className="min-h-screen bg-black overflow-hidden relative text-white flex flex-col items-center px-4 py-5">

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

      {/* Project Title */}
      <div className="text-center z-10 mb-4">

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
          LeafScan AI
        </h1>

        <p className="text-gray-400 text-base mt-2">
          Smart Plant Disease Detection System
        </p>

      </div>

      {/* Main Result Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[28px] p-5 w-full max-w-[900px] shadow-[0_0_40px_rgba(255,255,255,0.08)] z-10">

        {/* Image Section */}
        <div className="flex flex-col items-center">

          {image && (

            <div className="relative">

              {/* Uploaded Image */}
              <img
                src={image}
                alt="preview"
                className="w-[320px] h-[190px] object-cover rounded-[18px] border border-white/20 shadow-[0_0_25px_rgba(34,197,94,0.3)]"
              />

              {/* Disease Badge */}
              <div className="absolute top-3 left-3 bg-red-500 px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.7)]">

                <AlertTriangle
                  size={16}
                  className="text-white"
                />

                <span className="font-bold text-white text-xs">
                  Disease Detected
                </span>

              </div>

            </div>

          )}

          {/* Disease Name */}
         <h2 className="text-2xl font-bold text-red-400 mt-4">
  {crop} - {disease}
</h2>

          <p className="text-gray-400 mt-1 text-sm">
  AI Confidence: {confidence}%
</p>

        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-5">

          {/* Symptoms */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[18px] p-4">

            <div className="flex items-center gap-2 mb-3">

              <Stethoscope
                size={20}
                className="text-orange-400"
              />

              <h3 className="text-lg font-bold text-orange-300">
                Symptoms
              </h3>

            </div>

            <p className="text-gray-300 leading-6 text-sm">
              Brown circular spots appear on leaves with yellow edges.
              Disease spreads rapidly during humid conditions.
            </p>

          </div>

          {/* Causes */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[18px] p-4">

            <div className="flex items-center gap-2 mb-3">

              <Bug
                size={20}
                className="text-red-400"
              />

              <h3 className="text-lg font-bold text-red-300">
                Causes
              </h3>

            </div>

            <p className="text-gray-300 leading-6 text-sm">
              Fungal infection caused by excess moisture,
              poor airflow and contaminated soil.
            </p>

          </div>

          {/* Treatment */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[18px] p-4">

            <div className="flex items-center gap-2 mb-3">

              <ShieldCheck
                size={20}
                className="text-green-400"
              />

              <h3 className="text-lg font-bold text-green-300">
                Treatment
              </h3>

            </div>

            <p className="text-gray-300 leading-6 text-sm">
              Apply fungicide weekly and remove infected leaves.
              Maintain proper sunlight and avoid overwatering.
            </p>

          </div>

          {/* Confidence */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[18px] p-4">

            <div className="flex items-center gap-2 mb-3">

              <Activity
                size={20}
                className="text-cyan-400"
              />

              <h3 className="text-lg font-bold text-cyan-300">
                Confidence
              </h3>

            </div>

            <p className="text-gray-300 leading-6 text-sm">
            AI model prediction confidence level:
approximately {confidence}% accurate.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Result;