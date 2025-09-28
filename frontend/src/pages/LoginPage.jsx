import { useState } from "react";
import { BarChart3 } from "lucide-react"; 

// Componente LoginPage: responsável pela autenticação (login e registro) de usuários.
// Recebe `setRole` para atualizar o estado de autenticação no componente pai (App.jsx).
// Recebe `showRegister` e `setShowRegister` para controlar a exibição do formulário de registro.
export default function LoginPage({ setRole, showRegister, setShowRegister }) {
  // Estados locais para gerenciar os campos do formulário e o feedback ao usuário.
  const [email, setEmail] = useState(""); // Estado para o email do usuário
  const [password, setPassword] = useState(""); // Estado para a senha do usuário
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar a senha (apenas no registro)
  const [selectedRole, setSelectedRole] = useState("user"); // Estado para o tipo de usuário (admin/user), padrão 'user'
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [success, setSuccess] = useState(""); // Estado para mensagens de sucesso
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar se uma requisição está em andamento

  // Função `handleLogin`: lida com o envio do formulário de login.
  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário
    setIsLoading(true); // Ativa o estado de carregamento
    setError(""); // Limpa qualquer mensagem de erro anterior

    try {
      // Faz uma requisição POST para a API de login.
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define o tipo de conteúdo como JSON
        body: JSON.stringify({ email, password }), // Envia email e senha no corpo da requisição
      });

      // Se a resposta não for bem-sucedida (status 2xx), lança um erro.
      if (!res.ok) throw new Error("Credenciais inválidas");

      const data = await res.json(); 
      setRole(data.role); // Atualiza o papel do usuário no estado global da aplicação (App.jsx)
    } catch (err) {
      setError(err.message); // Exibe a mensagem de erro capturada
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento, independentemente do sucesso ou falha
    }
  };

  // Função `handleRegister`: lida com o envio do formulário de registro.
  const handleRegister = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    setIsLoading(true); // Ativa o estado de carregamento
    setError(""); 
    setSuccess(""); 

    // Verifica se as senhas coincidem antes de prosseguir com o registro.
    if (password !== confirmPassword) {
      setError("Senhas não coincidem");
      setIsLoading(false); // Desativa o carregamento
      return; // Interrompe a função
    }

    try {
      // Faz uma requisição POST para a API de registro.
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
          role: selectedRole // Envia email, senha e o papel selecionado
        }),
      });

      // Se a resposta não for bem-sucedida, tenta extrair a mensagem de erro da resposta da API.
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao cadastrar");
      }

      setSuccess("Usuário cadastrado com sucesso! Faça login."); // Exibe mensagem de sucesso
      setShowRegister(false); // Volta para o formulário de login
      // Limpa os campos do formulário após o registro bem-sucedido.
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
    } catch (err) {
      setError(err.message); // Exibe a mensagem de erro
    } finally {
      setIsLoading(false); // Desativa o carregamento
    }
  };

  // Renderização do componente LoginPage.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            {/* Ícone e título da aplicação */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Monks Analytics</h1>
            {/* Texto dinâmico que muda entre 'Crie sua conta' e 'Acesse o dashboard' */}
            <p className="text-gray-600">
              {showRegister ? "Crie sua conta" : "Acesse o dashboard de performance"}
            </p>
          </div>

          {/* Exibição de mensagens de erro, se houver */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Exibição de mensagens de sucesso, se houver */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          <div className="space-y-6">
            {/* Campo de Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo de Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Campos de Confirmação de Senha e Tipo de Usuário (exibidos apenas no registro) */}
            {showRegister && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Usuário
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white focus:bg-white"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </>
            )}

            {/* Botão de Login/Cadastro */}
            <button
              onClick={showRegister ? handleRegister : handleLogin} // Chama a função correta baseada em `showRegister`
              disabled={isLoading} // Desabilita o botão enquanto a requisição está em andamento
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? ( // Exibe um spinner e texto de carregamento se `isLoading` for true
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {showRegister ? "Cadastrando..." : "Entrando..."}
                </div>
              ) : ( // Caso contrário, exibe o texto normal do botão
                showRegister ? "Cadastrar" : "Entrar"
              )}
            </button>

            {/* Botão para alternar entre Login e Cadastro */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowRegister(!showRegister); // Alterna o estado `showRegister`
                  // Limpa mensagens de erro/sucesso e campos do formulário ao alternar
                  setError("");
                  setSuccess("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showRegister ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
              </button>
            </div>
          </div>

          {/* Credenciais de teste (exibidas apenas no modo login) */}
          {!showRegister && (
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Credenciais de teste:</p>
              <p>Admin: admin@monks.com / admin123</p>
              <p>User: user@monks.com / user123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}