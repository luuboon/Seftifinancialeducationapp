import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export interface CarouselItem {
  id: number;
  title: string;
  company: string;
  description: string;
  risk: string;
  returnRate: string;
  minAmount: string;
  color: string;
  logo?: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
  onSelectItem: (item: CarouselItem) => void;
}

export function Carousel3D({ items, onSelectItem }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const getItemStyle = (index: number) => {
    const diff = index - currentIndex;
    const total = items.length;
    
    // Normalize difference to handle wrapping
    let normalizedDiff = diff;
    if (Math.abs(diff) > total / 2) {
      normalizedDiff = diff > 0 ? diff - total : diff + total;
    }

    // Center item - tarjeta principal
    if (normalizedDiff === 0) {
      return {
        x: "0%",
        scale: 1,
        rotateY: 0,
        z: 0,
        opacity: 1,
        zIndex: 10,
      };
    }
    // Left item - tarjeta a la izquierda
    else if (normalizedDiff === -1) {
      return {
        x: "-65%",
        scale: 0.85,
        rotateY: 15,
        z: -80,
        opacity: 0.75,
        zIndex: 5,
      };
    }
    // Right item - tarjeta a la derecha
    else if (normalizedDiff === 1) {
      return {
        x: "65%",
        scale: 0.85,
        rotateY: -15,
        z: -80,
        opacity: 0.75,
        zIndex: 5,
      };
    }
    // Far items - tarjetas lejanas (ocultas)
    else {
      return {
        x: normalizedDiff > 0 ? "150%" : "-150%",
        scale: 0.5,
        rotateY: normalizedDiff > 0 ? -45 : 45,
        z: -200,
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  return (
    <div className="relative w-full py-12 px-2 overflow-visible">
      {/* 3D Container */}
      <div 
        className="relative h-[540px] flex items-center justify-center overflow-visible px-2"
        style={{ perspective: "1000px" }}
      >
        {items.map((item, index) => {
          const style = getItemStyle(index);
          const isCenter = index === currentIndex;

          return (
            <motion.div
              key={item.id}
              className="absolute w-full max-w-sm cursor-pointer px-2"
              initial={false}
              animate={{
                x: style.x,
                scale: style.scale,
                rotateY: style.rotateY,
                z: style.z,
                opacity: style.opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 0.8,
              }}
              style={{
                zIndex: style.zIndex,
                transformStyle: "preserve-3d",
                pointerEvents: style.opacity > 0 ? "auto" : "none",
              }}
              onClick={() => {
                if (isCenter) {
                  onSelectItem(item);
                } else if (style.opacity > 0) {
                  // Si es una tarjeta lateral visible, navegar a ella
                  setCurrentIndex(index);
                }
              }}
            >
                <div 
                  className={`bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl overflow-hidden border-2 transition-all duration-300 ${
                    isCenter ? "border-[#FF4D00]" : "border-gray-700/30"
                  }`}
                  style={{
                    boxShadow: isCenter 
                      ? "0 25px 80px rgba(255, 77, 0, 0.5), 0 10px 40px rgba(255, 77, 0, 0.3)" 
                      : "0 15px 40px rgba(0, 0, 0, 0.4), 0 5px 20px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  {/* Card Header */}
                  <div className="bg-black/30 backdrop-blur-sm p-6 border-b border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-white/80 text-sm mb-1">{item.company}</p>
                        <h3 className="text-white">{item.title}</h3>
                      </div>
                      {item.logo && (
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-xs">{item.logo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-white/90 text-sm mb-4">{item.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-black/20 rounded-lg p-3">
                        <span className="text-white/70 text-sm">Riesgo</span>
                        <span className="text-white">{item.risk}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/20 rounded-lg p-3">
                        <span className="text-white/70 text-sm">Rentabilidad</span>
                        <span className="text-[#FF4D00]">{item.returnRate}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/20 rounded-lg p-3">
                        <span className="text-white/70 text-sm">Desde</span>
                        <span className="text-white">{item.minAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button - Only show on center card */}
                  {isCenter && (
                    <div className="p-6 pt-0">
                      <Button 
                        className="w-full bg-[#FF4D00] hover:bg-[#E64500] text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                      >
                        Ver detalles
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          onClick={handlePrev}
          variant="outline"
          className="rounded-full w-12 h-12 p-0 border-[#FF4D00]/50 hover:bg-[#FF4D00]/10 hover:border-[#FF4D00]"
        >
          <ChevronLeft className="text-[#FF4D00]" size={24} />
        </Button>
        
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? "w-8 bg-[#FF4D00]" 
                  : "w-2 bg-gray-400"
              }`}
            />
          ))}
        </div>
        
        <Button
          onClick={handleNext}
          variant="outline"
          className="rounded-full w-12 h-12 p-0 border-[#FF4D00]/50 hover:bg-[#FF4D00]/10 hover:border-[#FF4D00]"
        >
          <ChevronRight className="text-[#FF4D00]" size={24} />
        </Button>
      </div>

      {/* Current Item Info */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">Desliza para explorar más opciones</p>
      </div>
    </div>
  );
}
