import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Logo } from "./Logo";
import { ProfileForm, ProfileData } from "./ProfileForm";
import { AlertCircle, UserPlus, ArrowLeft } from "lucide-react";

interface RegisterProps {
  onRegister: (email: string) => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [step, setStep] = useState<"credentials" | "profile">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!email || !password || !confirmPassword || !name) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Verificar si el usuario ya existe
    const usersJson = localStorage.getItem("sefti_users");
    if (usersJson) {
      const users = JSON.parse(usersJson);
      if (users.find((u: any) => u.email === email)) {
        setError("Este correo ya está registrado");
        return;
      }
    }

    // Pasar al siguiente paso
    setStep("profile");
  };

  const handleProfileSubmit = (profileData: ProfileData) => {
    // Obtener usuarios existentes o crear array vacío
    const usersJson = localStorage.getItem("sefti_users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Crear nuevo usuario
    const newUser = {
      email,
      password,
      name,
      profile: profileData,
      createdAt: new Date().toISOString()
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem("sefti_users", JSON.stringify(users));
    localStorage.setItem("sefti_current_user", email);

    // Registrar exitoso
    onRegister(email);
  };

  if (step === "profile") {
    return (
      <div className="relative">
        <div className="absolute top-6 left-6 z-10">
          <Button
            onClick={() => setStep("credentials")}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2" size={18} />
            Volver
          </Button>
        </div>
        <ProfileForm onSubmit={handleProfileSubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-white mb-2">Crear cuenta</h1>
          <p className="text-gray-200">
            Únete a SEFTI y comienza tu camino financiero
          </p>
        </div>

        {/* Register Card */}
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={18} />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <Label htmlFor="name" className="text-white mb-2">
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="register-email" className="text-white mb-2">
                Correo electrónico
              </Label>
              <Input
                id="register-email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="register-password" className="text-white mb-2">
                Contraseña
              </Label>
              <Input
                id="register-password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password" className="text-white mb-2">
                Confirmar contraseña
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white py-6 rounded-xl shadow-lg shadow-[#FF4D00]/30"
            >
              <UserPlus className="mr-2" size={20} />
              Continuar al perfil
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-[#FF4D00] hover:text-[#FFB800] transition-colors"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
