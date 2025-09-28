import {  LogOut, BarChart3 } from "lucide-react"; 

// Componente NavBar: barra de navegação superior da aplicação.
// Recebe `setRole` (para logout) e `role` (para exibir o papel do usuário) do componente pai.
export default function NavBar({ setRole, role }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200"> {/* Estilos para a barra de navegação */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Container para centralizar o conteúdo */}
        <div className="flex justify-between items-center h-16"> {/* Layout flexível para alinhar itens */}
          <div className="flex items-center space-x-3"> {/* Seção esquerda: logo e título */}
            <BarChart3 className="w-8 h-8 text-blue-600" /> {/* Ícone do logo */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">Monks Analytics</h1> {/* Título da aplicação */}
              <p className="text-xs text-gray-500">Dashboard de Performance</p> {/* Subtítulo */}
            </div>
          </div>
          
          <div className="flex items-center space-x-4"> {/* Seção direita: papel do usuário e botão de logout */}
            <div className="flex items-center space-x-2"> {/* Exibição do papel do usuário */}
              {/* Indicador visual do papel (vermelho para admin, verde para user) */}
              <div className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></div>
              {/* Texto do papel do usuário, capitalizado */}
              <span className="text-sm font-medium text-gray-700 capitalize">{role}</span>
            </div>
            <button
              onClick={() => setRole(null)} // Ao clicar, define o papel como null, efetivando o logout
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50" // Estilos do botão de logout
            >
              <LogOut className="w-4 h-4" /> {/* Ícone de logout */}
              <span className="text-sm font-medium">Sair</span> {/* Texto do botão */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
