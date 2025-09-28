# 📊 Monks Analytics Dashboard

## ✨ Visão Geral do Projeto

Este projeto é uma aplicação **fullstack** desenvolvida para simular um **Dashboard de Performance** para campanhas de marketing digital, denominado **Monks Analytics**.

Ele oferece:

* **Autenticação (login e registro)**
* **Interface de visualização de métricas**
* **Controle de acesso para usuários comuns e administradores**

O **backend** é construído com **Node.js + Express**, enquanto o **frontend** utiliza **React** para uma experiência de usuário moderna e interativa.

---

## 🚀 Funcionalidades Principais

### 🔐 Autenticação de Usuários

* **Login:** Usuários podem fazer login com credenciais existentes.
* **Registro:** Novos usuários podem se cadastrar como **user** (usuário comum) ou **admin** (administrador).
* **RBAC (Role Based Access Control):** Diferenciação de acesso conforme o papel do usuário.

### 📊 Dashboard de Métricas

* **Visualização de Dados:** Tabela com impressões, cliques, conversões, CTR etc.
* **Filtros:** Filtrar métricas por data.
* **Ordenação:** Ordenar a tabela por qualquer coluna.
* **Paginação:** Navegar entre grandes volumes de dados.
* **Estatísticas Agregadas:** Cards com totais e médias (ex: CTR médio).
* **Dados Sensíveis:** A coluna `cost_micros` só aparece para administradores.

### 🛠️ Tecnologias Modernas

* **Backend:** Node.js + Express
* **Frontend:** React
* **Estilização:** Tailwind CSS
* **Ícones:** Lucide React

---

## 🛠️ Tecnologias Utilizadas

### Backend

* **Node.js** – Ambiente de execução
* **Express.js** – Framework web
* **CORS** – Middleware para requisições cross-origin
* **CSV-Parser** – Leitura de arquivos CSV
* **FS** – Módulo nativo para manipulação de arquivos

### Frontend

* **React** – Biblioteca de UI
* **Vite** – Build rápido e otimizado
* **Tailwind CSS** – Estilização responsiva
* **Lucide React** – Ícones modernos

### Gerenciamento de Pacotes

* **npm** – Dependências do projeto

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos

* **Node.js** (v14+) → [nodejs.org](https://nodejs.org)
* **npm** (vem junto com Node.js)
* **Git** → [git-scm.com](https://git-scm.com)

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/desafio_monks.git
   ```
2. Acesse a pasta do projeto:

   ```bash
   cd desafio_monks
   ```

---

### 🔹 Rodando o Backend

```bash
cd backend
npm install
npm start
```

O backend estará em **[http://localhost:5000](http://localhost:5000)**

---

### 🔹 Rodando o Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará em **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 Credenciais de Teste

### Administrador

* **Usuário:** [admin@monks.com](mailto:admin@monks.com)
* **Senha:** admin123

### Usuário Comum

* **Usuário:** [user2](user2)
* **Senha:** 908ijofff

---

## 📁 Estrutura do Projeto

```
Desafio_Monks/
│
├── backend/             # Servidor Node.js + Express
│   ├── metrics.csv      # Métricas de exemplo
│   ├── users.csv        # Usuários registrados
│   ├── server.js        # Ponto de entrada da API
│   └── package.json
│
├── frontend/            # Aplicação React
│   ├── public/          # Arquivos estáticos
│   ├── src/             # Código-fonte React
│   │   ├── components/  # Componentes (NavBar, MetricsTable, StatsCard)
│   │   ├── pages/       # Páginas (LoginPage, DashboardPage)
│   │   └── App.jsx      # Componente raiz
│   └── package.json
│
└── README.md            # Documentação
```

---

## 📋 Como Contribuir

1. Faça um **Fork** do projeto
2. Crie uma **Branch** (`git checkout -b feature/minha-feature`)
3. Faça suas alterações e **Commit** (`git commit -m 'Adiciona minha feature'`)
4. Faça **Push** (`git push origin feature/minha-feature`)
5. Abra um **Pull Request** 🚀

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE).

---

## 🙋‍♂️ Autor

Feito por **Davi Rodrigues**

👉 [LinkedIn](https://www.linkedin.com/in/davi-rodrigues-petronilho-aa4b9319a/)
