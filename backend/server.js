import express from "express"; 
import cors from "cors"; 
import fs from "fs"; 
import csvParser from "csv-parser"; 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

let users = [];    
let metrics = [];  
let isLoading = true; // Flag booleana para indicar se os dados ainda estão sendo carregados

// Função auxiliar `loadCSV`: lê um arquivo CSV e retorna uma Promise com os dados parseados.
function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = []; // Array para armazenar as linhas do CSV
    fs.createReadStream(filePath) // Cria um stream de leitura do arquivo
      .pipe(csvParser()) // Passa o stream para o csv-parser para converter cada linha em um objeto JS
      .on("data", (data) => results.push(data)) // Para cada linha (dado), adiciona ao array results
      .on("end", () => resolve(results)) // Quando o arquivo termina de ser lido, resolve a Promise com os resultados
      .on("error", (err) => reject(err)); // Em caso de erro, rejeita a Promise
  });
}

// Função de inicialização assíncrona: carrega os dados dos usuários e métricas ao iniciar o servidor.
(async () => {
  console.log(" Carregando dados...");
  try {
    users = await loadCSV("./users.csv");   
    console.log(" Usuarios carregados:", users.length);
    
    metrics = await loadCSV("./metrics.csv"); 
    console.log(" Métricas carregadas:", metrics.length);
    
    isLoading = false; // Define isLoading como false, indicando que os dados foram carregados
    console.log(" Dados carregados com sucesso!");
  } catch (error) {
    console.error(" Erro ao carregar dados iniciais:", error);
  }
})();

//  Endpoint de cadastro de novo usuário (POST /api/register)
app.post("/api/register", (req, res) => {
  const { email, password, role } = req.body; // Extrai email, password e role do corpo da requisição

  // Validação básica: verifica se todos os campos obrigatórios foram fornecidos.
  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, senha e role são obrigatórios" });
  }

  // Verifica se já existe um usuário com o mesmo email.
  const existingUser = users.find(u => u.username === email);
  if (existingUser) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  // Cria um novo objeto de usuário e o adiciona ao array `users`.
  const newUser = { username: email, password: password, role: role };
  users.push(newUser);

  // Salva os usuários atualizados de volta no arquivo CSV para persistência.
  try {
    // Mapeia o array de usuários para uma string CSV e adiciona o cabeçalho.
    const csvContent = users.map(u => `${u.username},${u.password},${u.role}`).join("\n");
    fs.writeFileSync("./users.csv", "username,password,role\n" + csvContent); // Escreve no arquivo
    console.log(" Novo usuário salvo no CSV");
  } catch (err) {
    console.error(" Erro ao salvar usuário:", err);
  }

  res.json({ message: "Usuário cadastrado com sucesso" });
});

// Endpoint de login (POST /api/login)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body; // Extrai email e password do corpo da requisição

  // Procura um usuário que corresponda ao email e senha fornecidos.
  const user = users.find(u => u.username === email && u.password === password);

  // Se nenhum usuário for encontrado, retorna um erro de credenciais inválidas.
  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // Se o login for bem-sucedido, retorna uma mensagem e o papel do usuário.
  res.json({ message: "Login bem-sucedido", role: user.role });
});

// Endpoint de métricas (GET /api/metrics) com filtros, ordenação e paginação.
app.get("/api/metrics", (req, res) => {
  // Se os dados ainda estiverem carregando, retorna um status de serviço indisponível.
  if (isLoading) {
    return res.status(503).json({ error: "Dados ainda carregando" });
  }

  // Extrai os parâmetros da query string da requisição.
  const { role, date, order_by, search = '', page = 1, per_page = 20 } = req.query;

  let filtered = [...metrics]; // Cria uma cópia inicial das métricas para aplicar filtros e ordenação

  // Filtro por data: se uma data for fornecida, filtra as métricas por essa data.
  if (date) {
    filtered = filtered.filter((m) => m.date === date);
  }

  // Ordenação por coluna: se `order_by` for fornecido e a coluna existir na primeira métrica.
  if (order_by && filtered[0]?.[order_by]) {
    filtered.sort((a, b) => {
      const aVal = a[order_by];
      const bVal = b[order_by];
      
      // Tenta converter para número para ordenação numérica, caso contrário, ordena como string.
      if (!isNaN(aVal) && !isNaN(bVal)) {
        return parseFloat(bVal) - parseFloat(aVal); // Ordena números em ordem decrescente
      }
      return aVal.toString().localeCompare(bVal.toString()); // Ordena strings alfabeticamente
    });
  }

  // Remove a coluna `cost_micros` se o usuário não for um administrador.
  if (role !== "admin") {
    filtered = filtered.map(({ cost_micros, ...rest }) => rest); // Usa desestruturação para remover a propriedade
  }

  // Calcula estatísticas agregadas a partir dos dados filtrados.
  const totalRecords = filtered.length;
  const totalImpressions = filtered.reduce((sum, m) => sum + (parseInt(m.impressions) || 0), 0);
  const totalClicks = filtered.reduce((sum, m) => sum + (parseInt(m.clicks) || 0), 0);
  const totalConversions = filtered.reduce((sum, m) => sum + (parseInt(m.conversions) || 0), 0);

  // Lógica de Paginação.
  const pageNum = parseInt(page); // Converte o número da página para inteiro
  const pageSize = parseInt(per_page); // Converte o tamanho da página para inteiro
  const startIndex = (pageNum - 1) * pageSize; // Calcula o índice inicial para o slice
  const endIndex = startIndex + pageSize; // Calcula o índice final para o slice
  
  const paginatedData = filtered.slice(startIndex, endIndex); // Extrai os dados da página atual
  const totalPages = Math.ceil(totalRecords / pageSize); // Calcula o número total de páginas

  // Envia a resposta JSON com os dados paginados, informações de paginação e estatísticas.
  res.json({
    data: paginatedData,
    pagination: {
      current_page: pageNum,
      per_page: pageSize,
      total_records: totalRecords,
      total_pages: totalPages,
      has_next: pageNum < totalPages, // Indica se há uma próxima página
      has_prev: pageNum > 1 // Indica se há uma página anterior
    },
    statistics: {
      total_impressions: totalImpressions,
      total_clicks: totalClicks,
      total_conversions: totalConversions,
      avg_ctr: totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0 // Calcula o CTR médio
    }
  });
});

// Endpoint para obter colunas disponíveis (GET /api/columns).
// Útil para o frontend construir dinamicamente os cabeçalhos da tabela ou opções de filtro.
app.get("/api/columns", (req, res) => {
  if (isLoading) {
    return res.status(503).json({ error: "Dados ainda carregando" });
  }
  
  // Retorna as chaves do primeiro objeto de métricas como nomes de coluna.
  const columns = metrics.length > 0 ? Object.keys(metrics[0]) : [];
  res.json({ columns });
});

// Endpoint de Health Check (GET /api/health).
// Usado para monitorar a saúde do servidor e o status de carregamento dos dados.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok", 
    data_loaded: !isLoading, // Indica se os dados foram carregados
    metrics_count: metrics.length, // Número de métricas carregadas
    users_count: users.length // Número de usuários carregados
  });
});

// Inicialização do servidor: o servidor começa a escutar na porta 5000.
app.listen(5000, () => {
  console.log(" Backend rodando na porta 5000");
});