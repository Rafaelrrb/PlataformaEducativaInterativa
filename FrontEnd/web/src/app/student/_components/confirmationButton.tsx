"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ComfirmationButtonProps {
  coins: number;
}

export function ComfirmationButton({ coins }: ComfirmationButtonProps){
  const router = useRouter();
  const token = localStorage.getItem("token");
  const stringCoin = localStorage.getItem("coins")
  

  const handleUpdateCoins = async () => {
    const totalCoins = Number(stringCoin)+coins
    console.log(totalCoins)
    
    try {
      const response = await axios.patch(
        'http://localhost:3000/students/virtualCoins',
        {
          virtualCoins: totalCoins,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      router.push(`/student`);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return(
      
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleUpdateCoins}
          >
            Concluir
        </button>

  )

}