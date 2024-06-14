"use client"
import { FormEvent, useEffect, useState } from 'react';
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from 'axios';
import { Header } from "../_components/header";
import { useRouter } from 'next/navigation';

export  default function VideoClass(){
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
     
    if (!token) {
      router.push("/"); 
      return;
    }

    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if (!decodedToken || decodedToken.role !== "teacher") {
      router.push("/"); 
      return;
    }
  }, [router]);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        const response = await axios.post(
          'http://localhost:3000/teachers/videoClass/',
          {
            title,
            description,
            category,
            videoUrl
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
  
        console.log(response);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    };
 

  return (
    <>
      <Header/>
      <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-gray-700">Upload de Aulas</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Titulo:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder=""
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Descrição:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder=""
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Categoria:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              placeholder=""
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Link do video:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="videoUrl"
              type="url"
              placeholder=""
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
      
    </>
  )
}

