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
      title: "Ahorro e inversión básica",
      icon: PiggyBank,
      color: "bg-gradient-to-r from-[#FF4D00] to-[#E64500]",
      content: "Aprende la regla 50/30/20: 50% gastos básicos, 30% gustos, 20% ahorro e inversión. La diferencia entre ahorrar e invertir puede triplicar tu patrimonio.",
      duration: "3 min",
      points: 10
    },
    {
      id: 2,
      title: "Portafolios de inversión",
      icon: PieChart,
      color: "bg-gradient-to-r from-orange-600 to-red-700",
      content: "Diversifica tu dinero: CETES para seguridad, Afore para retiro, ETFs para crecimiento. Nunca pongas todos los huevos en la misma canasta.",
      duration: "4 min",
      points: 15
    },
    {
      id: 3,
      title: "Planifica tu retiro",
      icon: Calendar,
      color: "bg-gradient-to-r from-[#FFB800] to-[#FF8C00]",
      content: "Nunca es tarde para empezar. Con $500 al mes desde los 30 años a 12% anual, puedes tener más de $2 millones a los 65.",
      duration: "5 min",
      points: 20
    },
    {
      id: 4,
      title: "Riesgo vs rendimiento",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-purple-600 to-purple-900",
      content: "Mayor riesgo = mayor rendimiento potencial. Los jóvenes pueden tomar más riesgo, los mayores deben ser conservadores. Conoce tu perfil.",
      duration: "4 min",
      points: 15
    },
    {
      id: 5,
      title: "Protección financiera",
      icon: Shield,
      color: "bg-gradient-to-r from-red-600 to-red-900",
      content: "Antes de invertir, crea un fondo de emergencia de 3-6 meses de gastos. Solo invierte dinero que no necesites en el corto plazo.",
      duration: "4 min",
      points: 15
    }
  ];

  const totalProgress = (completedLessons.length / lessons.length) * 100;
  const totalPoints = completedLessons.reduce((sum, id) => {
    const lesson = lessons.find(l => l.id === id);
    return sum + (lesson?.points || 0);
  }, 0);

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

        {/* Progress Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-[#FF4D00]/20 to-red-900/30 border-2 border-[#FF4D00]/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white mb-1">Tu progreso</h3>
              <p className="text-gray-400">{completedLessons.length} de {lessons.length} lecciones</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-[#FFB800]" size={24} />
              <span className="text-white">{totalPoints}</span>
            </div>
          </div>
          <Progress value={totalProgress} className="h-3 mb-2" />
          <p className="text-sm text-gray-400 text-right">{totalProgress.toFixed(0)}% completado</p>
        </Card>

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
                      
                      <div className="flex gap-2 mb-3">
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                          {lesson.duration}
                        </Badge>
                        <Badge className="bg-[#FFB800]/20 text-[#FFB800] border-[#FFB800]/30">
                          +{lesson.points} pts
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{lesson.content}</p>
                      
                      {!isCompleted ? (
                        <Button 
                          onClick={() => completeLesson(lesson.id)}
                          className="w-full bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white"
                        >
                          Completar lección
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      ) : (
                        <div className="bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-lg p-3 text-center">
                          <p className="text-[#FF4D00] text-sm">✓ Lección completada</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Achievement */}
        {completedLessons.length === lessons.length && (
          <Card className="mt-6 p-6 bg-gradient-to-r from-[#FFB800]/20 to-[#FF4D00]/20 border-2 border-[#FFB800]">
            <div className="text-center">
              <div className="mb-3">
                <Star className="text-[#FFB800] mx-auto" size={48} />
              </div>
              <h3 className="text-white mb-2">¡Felicidades!</h3>
              <p className="text-gray-300">
                Has completado todas las lecciones básicas. Ganaste {totalPoints} puntos. 
                ¡Sigue así y mejora tu futuro financiero!
              </p>
            </div>
          </Card>
        )}

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
