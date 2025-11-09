import { Home, Lightbulb, BookOpen, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Casa", icon: Home },
    { id: "recommendations", label: "Recomendaciones", icon: Lightbulb },
    { id: "learn", label: "Aprender", icon: BookOpen },
    { id: "profile", label: "Perfil", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-gray-700 px-2 py-2 max-w-md mx-auto backdrop-blur-sm">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-[#FF4D00]/20 text-[#FF4D00] shadow-lg shadow-[#FF4D00]/20" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs ${isActive ? "font-medium" : ""}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
