import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Send, Bot, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente financiero SEFTI. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickQuestions = [
    "¿Cómo armo mi portafolio de inversión?",
    "¿Qué es mejor: CETES o Afore?",
    "¿Cuánto necesito para retirarme?",
    "¿Cuál es mi perfil de riesgo?"
  ];

  const aiResponses: { [key: string]: string } = {
    "portafolio": "Un buen portafolio debe diversificarse según tu edad y perfil de riesgo. Si eres joven (20-40 años), puedes tener 60% en inversiones de crecimiento (Afore, ETFs) y 40% en opciones seguras (CETES, Hey Banco). Si eres mayor, invierte más en opciones conservadoras.",
    "cetes": "CETES es ideal para tu fondo de emergencia: seguro, líquido y con buenos rendimientos (~10.5%). Tu Afore es para el retiro a largo plazo con mejores rendimientos (~12-18%). ¡Combínalos! CETES para corto plazo, Afore para tu futuro.",
    "retiro": "Para retirarte con $10,000 mensuales necesitas aproximadamente $3 millones. Suena mucho, pero con $500 mensuales desde los 30 años a 12% anual, puedes lograrlo. Cuanto antes empieces, menos necesitas aportar. Usa nuestra calculadora de retiro.",
    "riesgo": "Tu perfil de riesgo depende de tu edad, ingreso y tolerancia. Conservador (proteger capital), Moderado (balance), o Agresivo (máximo crecimiento). Los jóvenes pueden ser agresivos, los mayores de 50 deben ser conservadores. Completa tu perfil para una recomendación personalizada.",
    "inversion": "Empieza con $100 en CETES desde la app CETES Directo para aprender. Luego abre tu Afore y haz aportaciones voluntarias de $200-500 mensuales. Si quieres más rendimiento, considera ETFs como NAFTRAC con $1,000 en BBVA. Diversifica siempre."
  };

  const sendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };

    // Generate AI response
    let aiResponse = "Entiendo tu pregunta. Te recomiendo visitar nuestras lecciones educativas o ver tu portafolio personalizado para obtener una respuesta más detallada.";
    
    const lowerText = messageText.toLowerCase();
    if (lowerText.includes("portafolio") || lowerText.includes("diversif")) {
      aiResponse = aiResponses["portafolio"];
    } else if (lowerText.includes("cetes") || lowerText.includes("afore")) {
      aiResponse = aiResponses["cetes"];
    } else if (lowerText.includes("retiro") || lowerText.includes("jubila") || lowerText.includes("necesito")) {
      aiResponse = aiResponses["retiro"];
    } else if (lowerText.includes("riesgo") || lowerText.includes("perfil")) {
      aiResponse = aiResponses["riesgo"];
    } else if (lowerText.includes("inver") || lowerText.includes("empez") || lowerText.includes("cómo")) {
      aiResponse = aiResponses["inversion"];
    }

    const aiMessage: Message = {
      id: messages.length + 2,
      text: aiResponse,
      sender: "ai",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 flex flex-col pb-20 overflow-y-auto">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-[#FF4D00] to-[#E64500] p-3 rounded-full shadow-lg shadow-[#FF4D00]/30">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white">Chat Financiero</h1>
            <p className="text-sm text-gray-400">Siempre aquí para ayudarte</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className={`flex-shrink-0 ${message.sender === "ai" ? "bg-gradient-to-br from-[#FF4D00] to-[#E64500]" : "bg-gray-700"}`}>
                <AvatarFallback className="text-white">
                  {message.sender === "ai" ? <Bot size={20} /> : <User size={20} />}
                </AvatarFallback>
              </Avatar>

              <div className={`flex-1 max-w-[80%] ${message.sender === "user" ? "flex justify-end" : ""}`}>
                <Card className={`p-4 ${
                  message.sender === "user" 
                    ? "bg-gradient-to-r from-[#FF4D00] to-[#E64500] text-white border-[#FF4D00]" 
                    : "bg-gray-800 border-gray-700"
                }`}>
                  <p className={`text-sm ${message.sender === "user" ? "text-white" : "text-gray-200"}`}>
                    {message.text}
                  </p>
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-400 mb-3">Preguntas frecuentes:</p>
          <div className="grid grid-cols-1 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => sendMessage(question)}
                className="justify-start text-left h-auto py-3 px-4 border-[#FF4D00]/30 hover:bg-[#FF4D00]/10 hover:border-[#FF4D00] bg-gray-800"
              >
                <span className="text-sm text-gray-300">{question}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-6 pb-4 bg-gray-900 border-t border-gray-800 pt-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta..."
            className="flex-1 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
          />
          <Button 
            onClick={() => sendMessage()}
            className="bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white px-4"
            disabled={!inputValue.trim()}
          >
            <Send size={20} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          SEFTI está aquí 24/7 para ayudarte con tus dudas financieras
        </p>
      </div>
    </div>
  );
}
