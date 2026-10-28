import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const AlternarTema = () => {
  const [dark, setDark] = useState(() => {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo !== null) {
      return temaSalvo === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("tema", dark ? "dark" : "light");
  }, [dark]);

  const alterarTema = () => {
    setDark((temaAtual) => !temaAtual);
  };

  return (
    <div className="hidden sm:block">
      <button
        type="button"
        onClick={alterarTema}
        aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
        className="cursor-pointer"
      >
        {dark ? (
          <SunIcon className="h-7 w-7 text-gray-100" />
        ) : (
          <MoonIcon className="h-7 w-7 text-gray-500" />
        )}
      </button>
    </div>
  );
};

export default AlternarTema;
