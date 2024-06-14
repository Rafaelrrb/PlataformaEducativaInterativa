"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { Header } from "./_components/header";

interface videoClassesPorps {
  id: string,
	title: string,
	description: string,
	category: string,
	teacherId: string 
}

interface issuesPorps {
  id: string,
	statement: string,
	answerOptions: string,
	correctAnswer: string,
	teacherId: string 
}

interface profileTeacherPorps{
  id: string,
	email: string,
	name: string,
	password: string,
	institution: string,
	videoClasses: [videoClassesPorps],
  issues: [issuesPorps]

}

export default function Teacher() {
  const router = useRouter();
  const [profile, setProfile] = useState<profileTeacherPorps | null>(null);
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.push("/"); 
      return;
    }

    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if (!decodedToken || decodedToken.role !== "teacher") {
      router.push("/"); 
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/teachers/profile/`, {
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

  return (
    <>
    <Header/>
    <div className="flex justify-center items-center h-screen ">
      
      <div className="bg-white p-8 rounded shadow-md text-gray-700">
      <h1 className="text-2xl mb-4">Pefil do Professor</h1>
      {profile ? (
        <div className="flex gap-4">
          <div>
            <h2>Video Aulas</h2>
              {profile.videoClasses && profile.videoClasses.length > 0 ? (
                profile.videoClasses.map((videoClass: any) => (
                  <div key={videoClass.id}>
                    <h3>{videoClass.title}</h3>
                    <p>{videoClass.description}</p>
                    <video controls>
                      <source src={videoClass.videoUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                ))
              ) : (
                <p>Não há aulas de vídeo disponíveis</p>
              )}
          </div>

          <div>
            <h2>Questões</h2>
              {profile.issues && profile.issues.length > 0 ? (
                profile.issues.map((issue: any) => (
                  <div key={issue.id}>
                    <p>{issue.statement}</p>
                    <p>{issue.answerOptions}</p>
                    <p>{issue.correctAnswer}</p>
                  </div>
                ))
              ) : (
                <p>Não há quetões disponíveis</p>
              )}
          </div>
        </div>
        
      ) : (
        <p>Carregando...</p>
      )}
      </div>
    </div>
    </>
  );
}