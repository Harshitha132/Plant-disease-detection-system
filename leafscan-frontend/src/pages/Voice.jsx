import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Bot, User } from "lucide-react";
import plant from "../assets/plant.png";

const diseaseInfo = {

  Early_Blight: {
    treatment:
      "Apply fungicide and remove infected leaves.",
    recovery:
      "7 to 10 days.",
    fertilizer:
      "Use balanced NPK fertilizer."
  },

  Late_Blight: {
    treatment:
      "Use copper fungicide and destroy infected plants.",
    recovery:
      "10 to 15 days.",
    fertilizer:
      "Use potassium-rich fertilizer."
  },

  Leaf_Mold: {
    treatment:
      "Improve ventilation and apply fungicide.",
    recovery:
      "7 to 14 days.",
    fertilizer:
      "Use organic compost."
  },

  Bacterial_Spot: {
    treatment:
      "Apply copper-based bactericide.",
    recovery:
      "10 to 15 days.",
    fertilizer:
      "Use balanced NPK fertilizer."
  },

  Apple_Scab: {
    treatment:
      "Apply fungicide and remove infected leaves.",
    recovery:
      "10 to 15 days.",
    fertilizer:
      "Use compost and organic manure."
  },

  Black_Rot: {
    treatment:
      "Prune infected areas and apply fungicide.",
    recovery:
      "10 to 20 days.",
    fertilizer:
      "Use balanced fertilizer."
  },

  Cedar_Apple_Rust: {
    treatment:
      "Apply rust-control fungicide.",
    recovery:
      "10 to 15 days.",
    fertilizer:
      "Use nitrogen-rich fertilizer."
  },

  Powdery_Mildew: {
    treatment:
      "Use sulfur spray or neem oil.",
    recovery:
      "7 to 14 days.",
    fertilizer:
      "Avoid excess nitrogen."
  },

  Common_Rust: {
    treatment:
      "Apply fungicide and remove infected leaves.",
    recovery:
      "7 to 14 days.",
    fertilizer:
      "Use balanced fertilizer."
  },

  Gray_Leaf_Spot: {
    treatment:
      "Apply fungicide and improve airflow.",
    recovery:
      "10 to 15 days.",
    fertilizer:
      "Use potassium-rich fertilizer."
  },

  Esca: {
    treatment:
      "Remove infected wood and improve plant health.",
    recovery:
      "Several weeks.",
    fertilizer:
      "Use compost and micronutrients."
  },

  Leaf_Blight: {
    treatment:
      "Apply fungicide and remove infected leaves.",
    recovery:
      "7 to 14 days.",
    fertilizer:
      "Use balanced NPK fertilizer."
  },

  Leaf_Scorch: {
    treatment:
      "Increase watering and reduce heat stress.",
    recovery:
      "5 to 10 days.",
    fertilizer:
      "Use organic compost."
  },

  Healthy: {
    treatment:
      "No treatment required.",
    recovery:
      "Plant is healthy.",
    fertilizer:
      "Continue regular nutrition."
  }

};

function Voice() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Google Chrome");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const currentInput = input;

    const userMessage = {
      type: "user",
      text: currentInput,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const latestDisease =
      localStorage.getItem("latestDisease") ||
      "Healthy";

    let reply = "";

    const question =
      currentInput.toLowerCase();

    if (
      question.includes("treatment") ||
      question.includes("medicine")
    ) {
      reply =
        diseaseInfo[latestDisease]?.treatment ||
        "Treatment not available.";
    }

    else if (
      question.includes("recovery")
    ) {
      reply =
        diseaseInfo[latestDisease]?.recovery ||
        "Recovery information unavailable.";
    }

    else if (
      question.includes("fertilizer")
    ) {
      reply =
        diseaseInfo[latestDisease]?.fertilizer ||
        "Fertilizer recommendation unavailable.";
    }

    else if (
      question.includes("disease")
    ) {
      reply =
        `Detected disease is ${latestDisease}`;
    }

    else {
      reply =
        `Detected disease is ${latestDisease}. Ask about treatment, fertilizer or recovery.`;
    }

    const aiMessage = {
      type: "ai",
      text: reply,
    };

    setMessages((prev) => [
      ...prev,
      aiMessage,
    ]);

    const speech =
      new SpeechSynthesisUtterance(reply);

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="text-center mb-6">

        <motion.img
          src={plant}
          alt="plant"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="w-24 mx-auto"
        />

        <h1 className="text-4xl font-bold mt-4">
          LeafScan Voice Assistant
        </h1>

      </div>

      <div className="max-w-4xl mx-auto bg-white/10 rounded-xl p-4 h-[500px] overflow-y-auto">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`mb-4 flex ${
              msg.type === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div className="bg-white/10 p-3 rounded-xl max-w-md">

              {msg.type === "user"
                ? <User />
                : <Bot />}

              <p>{msg.text}</p>

            </div>

          </div>

        ))}

      </div>

      <div className="max-w-4xl mx-auto flex gap-3 mt-4">

        <button
          onClick={startListening}
          className="bg-green-500 p-4 rounded-full"
        >
          <Mic />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Ask about disease..."
          className="flex-1 p-4 rounded-full bg-white/10 text-white"
        />

        <button
          onClick={sendMessage}
          className="bg-cyan-500 p-4 rounded-full"
        >
          <Send />
        </button>

      </div>

    </div>
  );
}

export default Voice;