"use client";

import { useState } from "react";
import axios from "axios";

const AiChatPage: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post("/api/askQuestion", { question });
      console.log(response);
      // setAiResponse(response.data.aiResponse);
    } catch (error) {
      console.error("Error asking question: ", error);
    }
  };

  return (
    <div className="">
      <h1>Ask Ai Chat</h1>
      <div className="flex flex-col items-center">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-80 h-24 p-2 border rounded-md resize-none"
        />
        <button
          className="mt-2 px-4 bg-blue-500 text-white rounded"
          onClick={handleAskQuestion}
        >
          Ask
        </button>
        <div>
          <h2>AI Response: </h2>
          <p>{aiResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default AiChatPage;
