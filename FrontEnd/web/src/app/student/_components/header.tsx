"use client";
import { Logout } from "@/app/(home)/_components/logout";
import Link from "next/link";

export function Header() {
  return (

    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center h-16 shadow-md px-4">
      <div className="flex-1"></div>
      <div className="flex gap-4 justify-center">
        <Link href="/student">
          <h1 className="text-lg font-bold">Perfil</h1>
        </Link>
        <Link href="/student/videoclass">
          <h1 className="text-lg font-bold">Assistir Aulas</h1>
        </Link>
        <Link href="/student/issue">
          <h1 className="text-lg font-bold">Realizar Simulados</h1>
        </Link>
      </div>
      <div className="flex-1 flex justify-end">
        <Logout />
      </div>
    </div>
  );
}