import { useState, useEffect } from "react";
import { Welcome } from "./components/Welcome";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProfileView } from "./components/ProfileView";
import { EditProfile } from "./components/EditProfile";
import { ProfileData } from "./components/ProfileForm";
import { Recommendations } from "./components/Recommendations";
import { GoalSimulator } from "./components/GoalSimulator";
import { EducationModule } from "./components/EducationModule";
import { BottomNav } from "./components/BottomNav";
import { initializeDemoData } from "./utils/demoData";

type Screen = "welcome" | "profile" | "editProfile" | "recommendations" | "simulator" | "learn";
type AuthScreen = "login" | "register";

interface User {
  email: string;
  password: string;
  name: string;
  profile: ProfileData;
  createdAt: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [activeTab, setActiveTab] = useState("home");

  // Initialize demo data and check if user is already logged in
  useEffect(() => {
    // Initialize demo data for hackathon
    initializeDemoData();
    
    const currentUserEmail = localStorage.getItem("sefti_current_user");
    if (currentUserEmail) {
      const usersJson = localStorage.getItem("sefti_users");
      if (usersJson) {
        const users: User[] = JSON.parse(usersJson);
        const user = users.find((u) => u.email === currentUserEmail);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      }
    }
  }, []);

  const handleLogin = (email: string) => {
    const usersJson = localStorage.getItem("sefti_users");
    if (usersJson) {
      const users: User[] = JSON.parse(usersJson);
      const user = users.find((u) => u.email === email);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    }
  };

  const handleRegister = (email: string) => {
    const usersJson = localStorage.getItem("sefti_users");
    if (usersJson) {
      const users: User[] = JSON.parse(usersJson);
      const user = users.find((u) => u.email === email);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sefti_current_user");
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentScreen("welcome");
    setActiveTab("home");
  };

  const handleEditProfile = () => {
    setCurrentScreen("editProfile");
  };

  const handleProfileUpdated = () => {
    // Recargar el usuario actualizado
    const currentUserEmail = localStorage.getItem("sefti_current_user");
    if (currentUserEmail) {
      const usersJson = localStorage.getItem("sefti_users");
      if (usersJson) {
        const users: User[] = JSON.parse(usersJson);
        const user = users.find((u) => u.email === currentUserEmail);
        if (user) {
          setCurrentUser(user);
          setCurrentScreen("profile");
          setActiveTab("profile");
        }
      }
    }
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
    
    // Update active tab based on screen
    if (screen === "welcome") setActiveTab("home");
    else if (screen === "recommendations") setActiveTab("recommendations");
    else if (screen === "learn") setActiveTab("learn");
    else if (screen === "profile") setActiveTab("profile");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Map tabs to screens
    if (tab === "home") setCurrentScreen("welcome");
    else if (tab === "recommendations") setCurrentScreen("recommendations");
    else if (tab === "learn") setCurrentScreen("learn");
    else if (tab === "profile") setCurrentScreen("profile");
  };

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (authScreen === "login") {
      return (
        <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-red-950 overflow-y-auto">
          <div className="max-w-md mx-auto min-h-full">
            <Login 
              onLogin={handleLogin} 
              onSwitchToRegister={() => setAuthScreen("register")} 
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-red-950 overflow-y-auto">
          <div className="max-w-md mx-auto min-h-full">
            <Register 
              onRegister={handleRegister} 
              onSwitchToLogin={() => setAuthScreen("login")} 
            />
          </div>
        </div>
      );
    }
  }


  return (
    <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-red-950 overflow-y-auto relative">
      <div className="max-w-md mx-auto min-h-full relative">
        {/* Main Content */}
        {currentScreen === "welcome" && (
          <Welcome 
            onNavigate={handleNavigate} 
            userName={currentUser?.name}
            profileData={currentUser?.profile}
          />
        )}
        
        {currentScreen === "profile" && currentUser && (
          <ProfileView 
            userEmail={currentUser.email}
            userName={currentUser.name}
            profileData={currentUser.profile}
            onLogout={handleLogout}
            onEdit={handleEditProfile}
          />
        )}

        {currentScreen === "editProfile" && currentUser && (
          <EditProfile
            currentProfile={currentUser.profile}
            userEmail={currentUser.email}
            onCancel={() => setCurrentScreen("profile")}
            onSave={handleProfileUpdated}
          />
        )}
        
        {currentScreen === "recommendations" && (
          <Recommendations 
            onNavigate={handleNavigate} 
            userProfile={currentUser?.profile || null} 
          />
        )}
        
        {currentScreen === "simulator" && <GoalSimulator />}
        
        {currentScreen === "learn" && <EducationModule />}

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
