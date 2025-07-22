"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  sender: "user" | "ai" | "system";
  content: string;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

const MorvsChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfContent, setPdfContent] = useState<string>(""); // Store parsed PDF
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Google Font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Load PDF.js via CDN
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Load chat from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem("morvs_messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save chat to localStorage
  useEffect(() => {
    localStorage.setItem("morvs_messages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const displayMessage: Message = { sender: "user", content: trimmed };
    setMessages((prev) => [...prev, displayMessage]);
    setInput("");
    setLoading(true);

    const combinedContent = pdfContent
      ? `${trimmed}\n\nHere is the content of a related PDF:\n${pdfContent.slice(0, 2000)}`
      : trimmed;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_KEY", // Replace with your API key
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            { role: "system", content: "You are Morvs, a helpful AI assistant." },
            ...messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : msg.sender === "ai" ? "assistant" : "system",
              content: msg.content,
            })),
            { role: "user", content: combinedContent },
          ],
          temperature: 0.7,
          stream: true,
        }),
      });

      if (!response.ok || !response.body) {
        const errorText = await response.text();
        console.error("Error from Groq:", errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiText = "";
      let buffer = "";

      const typingMessage: Message = { sender: "ai", content: "Morvs is typing..." };
      setMessages((prev) => [...prev, typingMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;

          const cleaned = line.replace("data: ", "");
          if (cleaned === "[DONE]") continue;

          try {
            const json = JSON.parse(cleaned);
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              aiText += content;

              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  sender: "ai",
                  content: aiText + "▌",
                };
                return updated;
              });
            }
          } catch (err) {
            console.warn("Skipping malformed chunk:", cleaned);
          }
        }
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "ai",
          content: aiText.trim(),
        };
        return updated;
      });
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "ai",
          content: "Morvs: Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("morvs_messages");
    setPdfContent("");
  };

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !window.pdfjsLib) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      try {
        const pdf = await window.pdfjsLib.getDocument(typedArray).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        console.log("📄 Parsed PDF:\n", fullText);
        setPdfContent(fullText); // Save for next user message

        setMessages((prev) => [
          ...prev,
          { sender: "system", content: "1 PDF uploaded." },
        ]);
      } catch (error) {
        console.error("Error reading PDF:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#001F1F] text-white p-4 flex flex-col">
      <h1
        className="text-4xl font-bold text-center text-cyan-400 mb-4 tracking-wide shadow-md"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        MORVS <span className="text-green-400">AI</span>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow"
      >
        <Card className="bg-[#0D1117] border border-cyan-800 shadow-xl max-w-3xl mx-auto">
          <CardContent className="p-4 h-[500px] flex flex-col">
            <ScrollArea className="flex-grow overflow-y-auto pr-2">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "ml-auto bg-cyan-600 text-white"
                        : msg.sender === "ai"
                        ? "mr-auto bg-gray-800 text-green-400"
                        : "mr-auto bg-yellow-800 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
                {loading && (
                  <div className="mr-auto bg-gray-800 text-green-400 px-4 py-2 rounded-lg text-sm shadow-sm animate-pulse">
                    Morvs is typing...
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex mt-4 space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something to Morvs..."
                className="flex-grow bg-[#0A0F14] border-cyan-600 text-white"
              />
              <Button onClick={handleSend} className="bg-cyan-700 hover:bg-cyan-800">
                Send
              </Button>
              <Button onClick={clearChat} className="bg-red-700 hover:bg-red-800">
                Clear
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-yellow-700 hover:bg-yellow-800"
              >
                Upload PDF
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={handlePDFUpload}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <footer className="text-center text-sm mt-4 text-gray-400">
        © Made by Sourav Upadhyay – Morvs AI Interface
      </footer>
    </div>
  );
};

export default MorvsChat;
