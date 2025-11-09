import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { PiggyBank, TrendingUp, Calendar, Shield, Star, CheckCircle, ChevronRight, PieChart } from "lucide-react";

export function EducationModule() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: "¿Sabías que...",
      icon: PiggyBank,
      color: "bg-gradient-to-r from-[#FF4D00] to-[#E64500]",
      content: "verificar que la fuente sea fidedigno, ya que esto puede evitar que roben.",
    },
    {
      id: 2,
      title: "¿Sabías que...",
      icon: PieChart,
      color: "bg-gradient-to-r from-orange-600 to-red-700",
      content: "la ciberseguridad es como un sistema de alarmas para proteger tu vida digital? Defiende tu información personal, dinero en línea y datos importantes de hackers y virus.",
    }
  ];

  const totalProgress = (completedLessons.length / lessons.length) * 100;
 

  const completeLesson = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 pb-20 overflow-y-auto">
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white mb-2">Aprende Finanzas</h1>
          <p className="text-gray-400">Microlecciones diseñadas para trabajadores como tú</p>
        </div>

        {/* Progress Card - ELIMINADO */}

        {/* Lessons */}
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const Icon = lesson.icon;
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <Card 
                key={lesson.id} 
                className={`overflow-hidden transition-all ${
                  isCompleted ? 'border-2 border-[#FF4D00]/50 bg-[#FF4D00]/5' : 'border-gray-800 bg-gray-900/50'
                }`}
              >
                <div className={`h-1 ${lesson.color}`}></div>
                
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${lesson.color} p-3 rounded-xl text-white flex-shrink-0`}>
                      <Icon size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white">{lesson.title}</h3>
                        {isCompleted && (
                          <CheckCircle className="text-[#FF4D00]" size={24} />
                        )}
                      </div>
                      
                      {/* BADGES DE DURACIÓN Y PUNTOS - ELIMINADOS */}
                      
                      <p className="text-gray-300 text-sm mb-4">{lesson.content}</p>
                      
                      {/* BOTÓN COMPLETAR LECCIÓN - ELIMINADO */}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Achievement - ELIMINADO */}

        {/* Tips */}
        <Card className="mt-6 p-5 bg-gray-800 border-gray-700 text-white">
          <h3 className="mb-3">💡 Sabías que...</h3>
          <p className="text-sm text-gray-300">
            Solo el 32% de los mexicanos tiene una Afore y solo el 15% hace aportaciones voluntarias. 
            Iniciar hoy puede significar la diferencia entre retirarte con dignidad o seguir trabajando toda tu vida.
          </p>
        </Card>
       
      </div>
    </div>
  );
}