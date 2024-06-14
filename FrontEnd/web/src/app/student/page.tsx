"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { Header } from "./_components/header";

interface profileStudentPorps{
  id: string,
	email: string,
	name: string,
	password: string,
	institution: string,
	virtualCoins: number
}

export default function Student() {
  const router = useRouter();
  const [profile, setProfile] = useState<profileStudentPorps | null>(null);
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.push("/"); 
      return;
    }

    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if (!decodedToken || decodedToken.role !== "student") {
      router.push("/"); 
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/students/profile/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        setProfile(response.data);
        
      } catch (error) {
        console.error("Erro ao buscar informações do perfil:", error);
      }
    };

    fetchProfile();
  }, [router]);

  localStorage.setItem("coins", String(profile?.virtualCoins));

  return (
    <>
    <Header/>
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md text-gray-700">
      <h1 className="text-2xl mb-4">Pefil do aluno</h1>
      {profile ? (
        <div>
          <p>Nome: {profile.name}</p>
          <p>Moedas: {profile.virtualCoins}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      </div>
    </div>
    </>
  );
}
