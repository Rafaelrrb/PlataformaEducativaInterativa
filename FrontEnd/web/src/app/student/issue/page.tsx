"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { Header } from "../_components/header";
import { ComfirmationButton } from "../_components/confirmationButton";

interface issuesPorps {
  id: string,
	statement: string,
	answerOptions: string,
	correctAnswer: string,
	teacherId: string 
}


export default function VideoClass(){
  const router = useRouter();
  const [issues, setIssues] = useState<issuesPorps[]|null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    
    if (!token) {
      router.push("/"); 
      return;
    }

    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if (!decodedToken || decodedToken.role !== "student") {
      router.push("/"); 
      return;
    }

    const fetchIssue = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/students/issue/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        setIssues(response.data);
      } catch (error) {
        console.error("Erro ao buscar informações do perfil:", error);
      }
    };

    fetchIssue();
  }, [router]);

  const handleAnswerChange = (issueId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [issueId]: option }));
  };

  const handleSubmit = () => {
    let correctAnswersCount = 0;
    issues?.forEach((issue) => {
      if (answers[issue.id] === issue.correctAnswer) {
        correctAnswersCount++;
      }
    });
    setScore(correctAnswersCount);
    setIsSubmitted(true);
  };

  return(
    <>
    <Header/>
    <div className="flex justify-center items-center h-screen ">
      
      <div className="bg-white p-8 rounded shadow-md text-gray-700">
      <div>
      <h2 className="font-bold">Questões</h2>
      {issues && issues.length > 0 ? (
        issues.map((issue) => {
          const options = issue.answerOptions.split('//');
          return (
            <div key={issue.id} className="mb-4">
              <p className="font-bold">{issue.statement}</p>
              {options.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="radio"
                      name={`issue-${issue.id}`}
                      value={option}
                      checked={answers[issue.id] === option}
                      onChange={() => handleAnswerChange(issue.id, option)}
                      disabled={isSubmitted} 
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          );
        })
      ) : (
        <p>Não há questões disponíveis</p>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar Respostas
      </button>
      {score !== null && (
        <>
          <p className="mt-4">Você acertou {score} de {issues?.length} questões.</p>
          <ComfirmationButton coins={score}/>
        </>
      )}
    </div>
      </div>
    </div>
    </>
  )
}