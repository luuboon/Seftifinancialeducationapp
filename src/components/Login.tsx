import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Logo } from "./Logo";
import { AlertCircle, LogIn } from "lucide-react";

interface LoginProps {
  onLogin: (email: string) => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Verificar que los campos no estén vacíos
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    // Obtener usuarios de localStorage
    const usersJson = localStorage.getItem("sefti_users");
    if (!usersJson) {
      setError("No hay usuarios registrados. Por favor regístrate primero.");
      return;
    }

    const users = JSON.parse(usersJson);
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    // Login exitoso
    localStorage.setItem("sefti_current_user", email);
    onLogin(email);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-black via-gray-900 to-red-950 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-white mb-2">Bienvenido a SEFTI</h1>
          <p className="text-gray-200">
            Tu asistente financiero personal
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={18} />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-white mb-2">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white mb-2">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-700 bg-black/30 text-white placeholder:text-gray-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#E64500] hover:to-[#CC3D00] text-white py-6 rounded-xl shadow-lg shadow-[#FF4D00]/30"
            >
              <LogIn className="mr-2" size={20} />
              Iniciar sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes cuenta?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-[#FF4D00] hover:text-[#FFB800] transition-colors"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
