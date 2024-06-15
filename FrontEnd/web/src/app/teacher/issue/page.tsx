"use client"
import { FormEvent, useEffect, useState } from 'react';
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from 'axios';
import { Header } from "../_components/header";
import { useRouter } from 'next/navigation';

export  default function Issue(){
  const router = useRouter();
  const [statement, setStatement] = useState('');
  const [answerOptions, setAnswerOptions] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

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
          'http://localhost:3000/teachers/issue',
          {
            statement,
            answerOptions,
            correctAnswer
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
  
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
            Enunciado:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="statement"
              type="text"
              placeholder=""
              onChange={(e) => setStatement(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Opções de resposta:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="answerOptions"
              type="text"
              placeholder="coloque // entre as alternativas"
              onChange={(e) => setAnswerOptions(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Resposta correta:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="correctAnswer"
              type="text"
              placeholder=""
              onChange={(e) => setCorrectAnswer(e.target.value)}
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
