📊 Monks Analytics Dashboard

✨ Visão Geral do Projeto

Este projeto é uma aplicação fullstack desenvolvida para simular um Dashboard de Performance para campanhas de marketing digital, denominado Monks Analytics. Ele oferece funcionalidades de autenticação (login e registro) e uma interface para visualização de métricas, com diferenciação de acesso para usuários comuns e administradores. O backend é construído com Node.js e Express, enquanto o frontend utiliza React para uma experiência de usuário moderna e interativa.

O objetivo principal é demonstrar a integração entre um servidor Node.js que serve dados (incluindo filtros, ordenação e paginação) e uma aplicação React que consome e exibe esses dados de forma dinâmica. A aplicação também ilustra o uso de autenticação baseada em papéis (roles) para controlar o acesso a informações sensíveis, como custos de campanha.

🚀 Funcionalidades Principais

O Monks Analytics oferece as seguintes funcionalidades:

•
Autenticação de Usuários:

•
Login: Usuários podem fazer login com credenciais existentes.

•
Registro: Novos usuários podem se cadastrar, escolhendo entre os papéis de user (usuário comum) ou admin (administrador).

•
Controle de Acesso Baseado em Papéis (RBAC): Diferenciação de funcionalidades e visualização de dados com base no papel do usuário logado.



•
Dashboard de Métricas:

•
Visualização de Dados: Exibe uma tabela com métricas de campanhas de marketing digital (impressões, cliques, conversões, CTR, etc.).

•
Filtros: Permite filtrar as métricas por data.

•
Ordenação: Possibilidade de ordenar a tabela por qualquer coluna disponível.

•
Paginação: Navegação entre páginas de resultados para lidar com grandes volumes de dados.

•
Estatísticas Agregadas: Apresenta cards com totais e médias de métricas importantes (ex: Total de Impressões, CTR Médio).

•
Dados Sensíveis: A coluna cost_micros (custo em micro-centavos) é visível apenas para usuários com o papel de admin.



•
Tecnologias Modernas:

•
Backend: API RESTful robusta com Node.js e Express.

•
Frontend: Interface de usuário dinâmica e reativa com React.

•
Estilização: Utiliza Tailwind CSS para um design responsivo e personalizável.

•
Ícones: Biblioteca Lucide React para ícones vetoriais.



📸 Demonstração

Para uma melhor compreensão da aplicação em funcionamento, adicione aqui capturas de tela (screenshots) ou um GIF/vídeo curto mostrando as principais funcionalidades, como:

•
A tela de login e registro.

•
O dashboard com as métricas, filtros e paginação.

•
A diferença na visualização de dados entre um usuário admin e um user (especialmente a coluna de custos).

(Exemplo: Adicione um link para um vídeo no YouTube ou um GIF animado aqui)

🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

Backend:

•
Node.js: Ambiente de execução JavaScript server-side.

•
Express.js: Framework web para Node.js, utilizado para construir a API RESTful.

•
CORS: Middleware para habilitar o Cross-Origin Resource Sharing.

•
CSV-Parser: Biblioteca para leitura e processamento de arquivos CSV.

•
FS (File System): Módulo nativo do Node.js para interação com o sistema de arquivos (leitura/escrita de CSVs).

Frontend:

•
React: Biblioteca JavaScript para construção de interfaces de usuário.

•
Vite: Ferramenta de build frontend rápida e otimizada.

•
Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

•
Lucide React: Biblioteca de ícones moderna e personalizável.

Gerenciamento de Pacotes:

•
npm: Gerenciador de pacotes padrão para Node.js.

💻 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o backend e o frontend na sua máquina local.

Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

•
Node.js: Versão 14 ou superior. Você pode baixá-lo em nodejs.org.

•
npm: Geralmente vem junto com a instalação do Node.js.

•
Git: Para clonar o repositório. Baixe em git-scm.com.

Passos de Configuração

1.
Clone o repositório:

2.
Acesse a pasta raiz do projeto:

🔹 Rodando o Backend

O backend é responsável por servir a API que fornece os dados de métricas e gerencia a autenticação.

1.
Navegue até o diretório do backend:

2.
Instale as dependências do backend:

3.
Inicie o servidor backend:

🔹 Rodando o Frontend

O frontend é a aplicação React que consome a API do backend e exibe o dashboard.

1.
Abra um novo terminal e navegue de volta para a pasta raiz do projeto, depois para o diretório do frontend:

2.
Instale as dependências do frontend:

3.
Inicie a aplicação frontend:

Credenciais de Teste

Para testar as funcionalidades de login e os diferentes papéis, utilize as seguintes credenciais:

•
Administrador:

•
Email: admin@monks.com

•
Senha: admin123



•
Usuário Comum:

•
Email: user@monks.com

•
Senha: user123



📁 Estrutura do Projeto

Plain Text


Desafio_Monks/
│
├── backend/             ## Código do servidor (Node.js + Express)
│   ├── metrics.csv      ## Arquivo CSV com dados de métricas de exemplo
│   ├── users.csv        ## Arquivo CSV para persistência de usuários (criado/atualizado no registro)
│   ├── server.js        ## Ponto de entrada da API RESTful
│   └── package.json     ## Metadados e dependências do backend
│
├── frontend/            ## Aplicação React
│   ├── public/          ## Arquivos estáticos (HTML, imagens, etc.)
│   ├── src/             ## Código-fonte da aplicação React
│   │   ├── components/  ## Componentes reutilizáveis (NavBar, MetricsTable, StatsCard)
│   │   ├── pages/       ## Páginas da aplicação (LoginPage, DashboardPage)
│   │   └── App.jsx      ## Componente raiz da aplicação React
│   └── package.json     ## Metadados e dependências do frontend
│
└── README.md            ## Este arquivo de documentação


📋 Como Contribuir

Contribuições são muito bem-vindas! Se você deseja melhorar este projeto, siga os passos abaixo:

1.
Faça um Fork do repositório para sua conta no GitHub.

2.
Clone o seu Fork para sua máquina local.

3.
Crie uma nova branch para sua feature ou correção de bug:

4.
Faça suas alterações e teste-as cuidadosamente.

5.
Commit suas alterações com uma mensagem clara e descritiva:

6.
Envie suas alterações para o seu Fork no GitHub:

7.
Abra um Pull Request (PR) do seu Fork para o repositório original, descrevendo suas alterações e o problema que elas resolvem.

📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

🙋‍♂️ Autor

Feito com ❤️ e 💻 por Davi Rodrigues

Conecte-se comigo:
👉 [LinkedIn](https://www.linkedin.com/in/davi-rodrigues-petronilho-aa4b9319a/) 
