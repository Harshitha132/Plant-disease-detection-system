import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  ScanLine,
  ShieldCheck,
  AlertTriangle,
  History,
  RotateCcw,
} from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  // INITIALIZE STORAGE
  if (!localStorage.getItem("totalScans")) {

    localStorage.setItem(
      "totalScans",
      "0"
    );
  }

  if (!localStorage.getItem("healthyPlants")) {

    localStorage.setItem(
      "healthyPlants",
      "0"
    );
  }

  if (!localStorage.getItem("diseasedPlants")) {

    localStorage.setItem(
      "diseasedPlants",
      "0"
    );
  }

  // GET VALUES
  const totalScans =
    Number(
      localStorage.getItem(
        "totalScans"
      )
    );

  const healthyPlants =
    Number(
      localStorage.getItem(
        "healthyPlants"
      )
    );

  const diseasedPlants =
    Number(
      localStorage.getItem(
        "diseasedPlants"
      )
    );

  // HEALTH %
  const healthPercentage =
    totalScans > 0
      ? Math.round(
          (healthyPlants / totalScans) * 100
        )
      : 0;
      const diseasedPercentage =
  totalScans > 0
    ? Math.round(
        (diseasedPlants / totalScans) * 100
      )
    : 0;
    const cropStatus =
  healthPercentage >= 80
    ? "Excellent"
    : healthPercentage >= 50
    ? "Moderate"
    : "Critical";

  // LATEST DATA
  const latestDisease =
    localStorage.getItem(
      "latestDisease"
    ) || "";

  const latestPlant =
    localStorage.getItem(
      "latestPlant"
    ) || "";

  const latestSolution =
    localStorage.getItem(
      "latestSolution"
    ) || "";

  // RESET DASHBOARD
  const resetDashboard = () => {

    localStorage.setItem(
      "totalScans",
      "0"
    );

    localStorage.setItem(
      "healthyPlants",
      "0"
    );

    localStorage.setItem(
      "diseasedPlants",
      "0"
    );

    localStorage.removeItem(
      "latestDisease"
    );

    localStorage.removeItem(
      "latestPlant"
    );

    localStorage.removeItem(
      "latestSolution"
    );

    window.location.reload();
  };

  return (

    <div className="min-h-screen bg-black overflow-hidden relative px-6 py-8">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] bg-green-500/20 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-purple-500/20 blur-[180px] rounded-full"></div>

      {/* FLOATING PARTICLES */}
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

      {/* HEADER */}
      <div className="relative z-10 text-center mb-10">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent">

          AI Crop Health Dashboard

        </h1>

        <p className="text-gray-400 text-lg mt-3">

          Real-Time Plant Disease Monitoring 🌿

        </p>

      </div>

      {/* RESET BUTTON */}
      <div className="relative z-10 flex justify-end mb-6">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetDashboard}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border border-red-400/20 text-red-400 text-lg font-bold"
        >

          <RotateCcw size={22} />

          Reset Dashboard

        </motion.button>

      </div>

      {/* TOP CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL SCANS */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[30px] p-7 shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-lg">

                Total Scans

              </p>

              <h2 className="text-7xl font-black text-cyan-400 mt-4">

                {totalScans}

              </h2>

            </div>

            <div className="w-[80px] h-[80px] rounded-full bg-cyan-500/20 flex items-center justify-center">

              <ScanLine
                size={42}
                className="text-cyan-400"
              />

            </div>

          </div>

        </motion.div>

        {/* HEALTHY */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[30px] p-7 shadow-[0_0_35px_rgba(34,197,94,0.15)]"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-lg">

                Healthy Plants

              </p>

              <h2 className="text-7xl font-black text-cyan-400 mt-4">

                {healthyPlants}

              </h2>

            </div>

            <div className="w-[80px] h-[80px] rounded-full bg-green-500/20 flex items-center justify-center">

              <ShieldCheck
                size={42}
                className="text-green-400"
              />

            </div>

          </div>

        </motion.div>

        {/* DISEASED */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[30px] p-7 shadow-[0_0_35px_rgba(239,68,68,0.15)]"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-lg">

                Diseased Plants

              </p>

              <h2 className="text-7xl font-black text-red-400 mt-4">
  {diseasedPlants}
</h2>

            </div>

            <div className="w-[80px] h-[80px] rounded-full bg-red-500/20 flex items-center justify-center">

              <AlertTriangle
                size={42}
                className="text-red-400"
              />

            </div>

          </div>

        </motion.div>

      </div>

      {/* SECOND SECTION */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

       {/* PIE CHART / HEALTH OVERVIEW */}
<motion.div
  whileHover={{ scale: 1.01 }}
  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[35px] p-8 shadow-[0_0_35px_rgba(255,255,255,0.08)]"
>
  <h2 className="text-3xl font-bold text-white mb-10">
    Overall Crop Health
  </h2>

  <div className="flex flex-col items-center">

    {/* DONUT CHART */}
    <div
      className="relative w-[280px] h-[280px] rounded-full"
      style={{
        background: `conic-gradient(
          #22c55e 0% ${healthPercentage}%,
          #ef4444 ${healthPercentage}% 100%
        )`,
      }}
    >
      <div className="absolute inset-[35px] bg-black rounded-full flex flex-col items-center justify-center border border-white/10">

        <h2 className="text-5xl font-bold text-white">
          {healthPercentage}%
        </h2>

        <p className="text-gray-400 mt-2">
          Crop Health
        </p>

      </div>
    </div>

    {/* LEGEND */}
    <div className="grid grid-cols-2 gap-6 mt-8">

      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-cyan-500"></div>
        <span className="text-cyan-400 font-semibold">
          Total Scans: {totalScans}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-green-500"></div>
        <span className="text-green-400 font-semibold">
          Healthy: {healthyPlants}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-red-500"></div>
        <span className="text-red-400 font-semibold">
          Diseased: {diseasedPlants}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
        <span className="text-yellow-400 font-semibold">
          Health %: {healthPercentage}
        </span>
      </div>

    </div>

    {/* STATUS */}
    <div className="mt-8">

      <span
        className={`px-5 py-2 rounded-full font-bold ${
          cropStatus === "Excellent"
            ? "bg-green-500/20 text-green-400"
            : cropStatus === "Moderate"
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {cropStatus}
      </span>

    </div>

  </div>

</motion.div>

        {/* ALERTS */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[35px] p-8 shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >

          <h2 className="text-3xl font-bold text-white mb-8">

            AI Alerts & Recommendations

          </h2>

          {/* EMPTY */}
          {totalScans === 0 && (

            <div className="bg-white/5 border border-white/10 rounded-[25px] p-6 text-center">

              <p className="text-gray-400 text-xl">

                No alerts detected 🌿

              </p>

            </div>

          )}

          {/* HEALTHY */}
          {totalScans > 0 &&
            latestDisease === "Healthy" && (

            <div className="bg-green-500/10 border border-green-400/20 rounded-[25px] p-6">

              <h3 className="text-green-400 text-2xl font-bold">

                ✅ Healthy Crop

              </h3>

              <p className="text-gray-300 mt-3 text-lg">

                No disease detected in recent scan.

              </p>

            </div>

          )}

          {/* DISEASE */}
          {totalScans > 0 &&
            latestDisease !== "Healthy" &&
            latestDisease !== "" && (

            <div className="space-y-5">

              <div className="bg-red-500/10 border border-red-400/20 rounded-[25px] p-5">

                <h3 className="text-red-400 text-2xl font-bold">

                  ⚠️ High Risk Detected

                </h3>

                <p className="text-gray-300 mt-3 text-lg">

                  {latestDisease} found in {latestPlant}

                </p>

              </div>

              <div className="bg-green-500/10 border border-green-400/20 rounded-[25px] p-5">

                <h3 className="text-green-400 text-2xl font-bold">

                  🌿 Recommendation

                </h3>

                <p className="text-gray-300 mt-3 text-lg">

                  {latestSolution}

                </p>

              </div>

              <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-[25px] p-5">

                <h3 className="text-cyan-400 text-2xl font-bold">

                  📊 Crop Status

                </h3>

                <p className="text-gray-300 mt-3 text-lg">

                  {healthPercentage > 70
                    ? "Healthy Crop Condition"
                    : "Disease Risk Increasing"}

                </p>

              </div>

            </div>

          )}

        </motion.div>

      </div>
{/* QUICK ACTIONS */}
<div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

  <button
    onClick={() => navigate("/camera")}
    className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-5 text-cyan-400 font-bold"
  >
    📷 Camera Scan
  </button>

  <button
    onClick={() => navigate("/upload")}
    className="bg-green-500/10 border border-green-400/20 rounded-2xl p-5 text-green-400 font-bold"
  >
    📤 Upload Image
  </button>

  <button
    onClick={() => navigate("/voice")}
    className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-5 text-purple-400 font-bold"
  >
    🎤 Voice Assistant
  </button>

  <button
    onClick={() => navigate("/history")}
    className="bg-yellow-500/10 border border-yellow-400/20 rounded-2xl p-5 text-yellow-400 font-bold"
  >
    📜 History
  </button>

</div>
      {/* HISTORY */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/history")}
        className="relative z-10 mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-[35px] p-8 shadow-[0_0_35px_rgba(255,255,255,0.08)] cursor-pointer"
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">

              Recent Disease Detections

            </h2>

          <p className="text-gray-400 text-lg mt-3">

  {latestDisease
    ? `Latest Detection: ${latestDisease}`
    : "No detections yet 🌿"}

</p>

          </div>

          <div className="w-[80px] h-[80px] rounded-full bg-cyan-500/20 flex items-center justify-center">

            <History
              size={40}
              className="text-cyan-400"
            />

          </div>

        </div>

      </motion.div>

      {/* FOOTER */}
      <div className="relative z-10 text-center mt-10 text-gray-500 text-lg">

        AI Smart Agriculture Dashboard 🌿

      </div>

    </div>

  );
}

export default Dashboard;