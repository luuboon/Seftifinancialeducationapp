import { useState } from "react";
import { ProfileForm, ProfileData } from "./ProfileForm";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface EditProfileProps {
  currentProfile: ProfileData;
  userEmail: string;
  onCancel: () => void;
  onSave: () => void;
}

export function EditProfile({ currentProfile, userEmail, onCancel, onSave }: EditProfileProps) {
  const handleProfileSubmit = (data: ProfileData) => {
    // Obtener usuarios de localStorage
    const usersJson = localStorage.getItem("sefti_users");
    if (!usersJson) return;

    const users = JSON.parse(usersJson);
    const userIndex = users.findIndex((u: any) => u.email === userEmail);
    
    if (userIndex !== -1) {
      // Actualizar el perfil del usuario
      users[userIndex].profile = data;
      localStorage.setItem("sefti_users", JSON.stringify(users));
      onSave();
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-6 left-6 z-10">
        <Button
          onClick={onCancel}
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2" size={18} />
          Cancelar
        </Button>
      </div>
      <ProfileForm onSubmit={handleProfileSubmit} initialData={currentProfile} />
    </div>
  );
}
