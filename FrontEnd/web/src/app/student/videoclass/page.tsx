"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { Header } from "../_components/header";
import { ComfirmationButton } from "../_components/confirmationButton";

interface videoClassesPorps {
  id: string,
	title: string,
	description: string,
	category: string,
	teacherId: string 
}

export default function VideoClass(){
  const router = useRouter();
  const [videoClass, setVideoClass] = useState<videoClassesPorps[]|null>(null);
  
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

    const fetchVideoClass = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/students/videoClass/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        setVideoClass(response.data);
      } catch (error) {
        console.error("Erro ao buscar informações do perfil:", error);
      }
    };

    fetchVideoClass();
  }, [router]);


  return(
    <>
    <Header/>
    <div className="flex justify-center items-center h-screen ">
      
      <div className="bg-white p-8 rounded shadow-md text-gray-700">
      <h1 className="text-2xl mb-4">Video Aulas</h1>
      {videoClass ? (
        <div >
          <div className="flex flex-col gap-4">
              {videoClass && videoClass.length > 0 ? (
                videoClass.map((videoClass: any) => (
                  <div key={videoClass.id}>
                    <h3>{videoClass.title}</h3>
                    <p>{videoClass.description}</p>
                    <video controls>
                      <source src={videoClass.videoUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>

                    <ComfirmationButton coins={10}/>

                  </div>
                ))
              ) : (
                <p>Não há aulas de vídeo disponíveis</p>
              )}
          </div>
        </div>
        
      ) : (
        <p>Carregando...</p>
      )}
      </div>
    </div>
    </>
  )
}