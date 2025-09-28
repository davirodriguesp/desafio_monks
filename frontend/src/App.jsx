import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// Componente principal da aplicação React
// Este componente gerencia o estado de autenticação do usuário (role) e decide qual página renderizar.
export default function App() {
  // `role` armazena o papel do usuário (ex: 'admin', 'user') ou null se não estiver autenticado.
  // `setRole` é a função para atualizar o estado `role`.
  const [role, setRole] = useState(null);
  // `showRegister` controla se o formulário de registro deve ser exibido na LoginPage.
  // `setShowRegister` é a função para atualizar o estado `showRegister`.
  const [showRegister, setShowRegister] = useState(false);

  // Se o usuário não estiver autenticado (role é null), renderiza a LoginPage.
  // Passa `setRole` para que a LoginPage possa atualizar o estado de autenticação após o login.
  // Passa `showRegister` e `setShowRegister` para controlar a exibição do formulário de registro.
  if (!role) {
    return <LoginPage setRole={setRole} showRegister={showRegister} setShowRegister={setShowRegister} />;
  }

  // Se o usuário estiver autenticado (role não é null), renderiza a DashboardPage.
  // Passa `role` para que a DashboardPage saiba o papel do usuário e possa ajustar a interface.
  // Passa `setRole` para que a DashboardPage possa permitir o logout (definindo role como null).
  return <DashboardPage role={role} setRole={setRole} />;
}