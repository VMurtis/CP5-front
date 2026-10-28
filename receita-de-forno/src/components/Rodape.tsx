

function Rodape() {
  return (
    <footer className="bg-gray-300 px-4 dark:bg-gray-900">
      <div className="mx-auto mt-6 max-w-6xl border-t border-gray-100 pt-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} Receita de Forno. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}

export default Rodape;
