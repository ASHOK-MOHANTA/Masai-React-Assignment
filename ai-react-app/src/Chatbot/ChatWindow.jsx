import React, { useEffect, useRef, useState } from "react";
import { Behavior, GoogleGenAI } from "@google/genai";
import {
  Maximize,
  Maximize2,
  Minimize,
  Minimize2,
  Sparkle,
  X,
} from "lucide-react";
import ChatMessage from "./ChatMessage";
const genai = new GoogleGenAI({
  apiKey: "AIzaSyCGX38ri9bG9P4n_xghBtyTVDOfxrPYh6o",
});

const ChatWindow = ({ isOpen, onClick }) => {
  const [username, setUsername] = useState("Guest"); // fixed typo: setUsename -> setUsername
  const [userInitial, setUserInitial] = useState("G");
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setMinimized] = useState(false);
  const chatWindowRef = useRef(null);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  // This useEffect will run when user open chat window
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(
        localStorage.getItem("name") || '{"name":"Guest"}'
      );
      setUsername(userDetails?.name || "Guest");
      setUserInitial((userDetails.name || "G").charAt(0).toUpperCase());
      setMessage([
        {
          text: `Hi ${
            userDetails.name || "Guest"
          } I'm your AI Assistant Powered by Ashok. How Can I help You?`,
          isBot: true,
        },
      ]);
    };
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  // this useEffect will handle closing of the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target)
      ) {
        onClick(); // logic fix: onclose was not defined, changed to onClick (the prop)
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClick]);

  //   This will help us to scroll message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ Behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small timeout ensures DOM is rendered before focus
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const usermessage = input.trim();
    setInput("");
    setMessage((prev) => [...prev, { text: usermessage, isBot: false }]);
    setLoading(true);

    try {
      const result = await genai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: usermessage,
      });
      const reply = result.text;
      setMessage((prev) => [...prev, { text: reply, isBot: true }]);
    } catch (error) {
      console.log("Error:", error);
      setMessage((prev) => [
        ...prev,
        { text: "I'm sorry, i'm run into an error.", isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const hadelKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      ref={chatWindowRef}
      className={`fixed ${
        isMinimized ? "bottom-4" : "bottom-20"
      } right-4 w-80 bg-gray-900 rounded-2xl shadow-2xl border-gray-700 overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-lg border ${
        isMinimized ? "h-14" : "h-[450px]"
      }`}
    >
      {/* Header Part */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-600 text-white p-3 flex items-center justify-center">
        <div className="flex items-center gap-2 ">
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ">
            <Sparkle size={30} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-white">AI Assistant</h3>
            <p>
              Wellcome,{" "}
              {username.length > 15 ? `${username.slice(0, 15)}...` : username}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(!isMinimized)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onClick}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-[clac(100%-8rem)] overflow-y-auto p-3 space-y-3 bg-gray-900 ">
            {message.map((message, index) => {
              <div key={index} className="flex items-start gap-2 text-white">
                {message.isBot ? (
                  <ChatMessage message={message.text} isBot={true} />
                ) : (
                  <div className="flex items-start gap-2 justify-end w-full text-white">
                    <div className="flex-1">
                      <ChatMessage message={message.text} isBot={false} />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-800 to-purple-600 text-white">
                      {userInitial}
                    </div>
                  </div>
                )}
              </div>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
