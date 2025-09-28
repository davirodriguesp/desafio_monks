import Navbar from "../components/NavBar"; 
import MetricsTable from "../components/MetricsTable"; 

// Componente DashboardPage: representa a página principal do dashboard.
// É renderizado após o login bem-sucedido.
// Recebe `role` (papel do usuário) e `setRole` (função para logout) do componente pai (App.jsx).
export default function DashboardPage({ role, setRole }) {
  return (
    <div className="min-h-screen bg-gray-50"> {/* Container principal com altura mínima da tela e fundo cinza claro */}
      {/* Renderiza o Navbar, passando o papel do usuário e a função de logout */}
      <Navbar setRole={setRole} role={role} />
      
      {/* Container para o conteúdo principal do dashboard, centralizado e com padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seção de cabeçalho do dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2"> {/* Título principal */}
            Dashboard de Performance
          </h1>
          <p className="text-gray-600"> {/* Descrição */}
            Monitore as métricas de suas campanhas de marketing digital
          </p>
        </div>
        
        {/* Renderiza a tabela de métricas, passando o papel do usuário para controle de acesso/visualização */}
        <MetricsTable role={role} />
      </div>
    </div>
  );
}