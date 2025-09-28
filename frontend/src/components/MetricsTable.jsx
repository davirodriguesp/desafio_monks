import { useState, useEffect } from "react";
import { Filter, TrendingUp, Users, Calendar, ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";

// Componente funcional StatsCard: exibe um cartão com uma estatística.
// Recebe `title` (título da estatística), `value` (valor da estatística) e `icon` (ícone a ser exibido).
function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"> {/* Estilos do cartão */}
      <div className="flex items-center justify-between"> {/* Layout flexível para título/valor e ícone */}
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p> {/* Título da estatística */}
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p> {/* Valor da estatística */}
         
        </div>
        <div className="p-3 bg-blue-50 rounded-lg"> {/* Container para o ícone */}
          <Icon className="w-6 h-6 text-blue-600" /> {/* Renderiza o ícone passado como prop */}
        </div>
      </div>
    </div>
  );
}

// Componente principal MetricsTable: exibe uma tabela de métricas com filtros, ordenação e paginação.
// Recebe `role` (papel do usuário) para controlar a visibilidade de certas colunas (ex: `cost_micros`).
export default function MetricsTable({ role }) {
  // Estados locais para gerenciar os dados, carregamento, erros, filtros, paginação e estatísticas.
  const [data, setData] = useState([]); // Armazena os dados das métricas
  const [loading, setLoading] = useState(true); // Indica se os dados estão sendo carregados
  const [error, setError] = useState(""); // Armazena mensagens de erro
  const [filters, setFilters] = useState({ // Armazena os filtros aplicados (data e ordenação)
    date: "",
    order_by: ""
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total_records: 0,
    total_pages: 0
  });
  const [statistics, setStatistics] = useState({
    total_impressions: 0,
    total_clicks: 0,
    total_conversions: 0,
    avg_ctr: 0
  });

  // Função `fetchMetrics`: responsável por buscar os dados das métricas da API.
  // Recebe `page` como argumento para buscar uma página específica.
  const fetchMetrics = async (page = 1) => {
    setLoading(true); // Ativa o estado de carregamento
    setError(""); // Limpa erros anteriores
    
    try {
      // Constrói os parâmetros da URL para a requisição, incluindo role, paginação e filtros.
      const params = new URLSearchParams({
        role,
        page: page.toString(),
        per_page: pagination.per_page.toString()
      });

      if (filters.date) params.append("date", filters.date); // Adiciona filtro de data se existir
      if (filters.order_by) params.append("order_by", filters.order_by); // Adiciona filtro de ordenação se existir

      // Faz a requisição GET para a API de métricas.
      const response = await fetch(`http://localhost:5000/api/metrics?${params}`);
      
      // Verifica se a resposta da API foi bem-sucedida.
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json(); // Converte a resposta para JSON
      
      // Atualiza os estados com os dados recebidos da API.
      setData(result.data || []);
      setPagination(result.pagination || {});
      setStatistics(result.statistics || {});
      
    } catch (err) {
      console.error("Erro ao buscar métricas:", err); 
      setError(err.message); 
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Hook `useEffect`: executa `fetchMetrics` uma vez ao montar o componente e sempre que `role` mudar.
  useEffect(() => {
    fetchMetrics(1); // Busca a primeira página de métricas
  }, [role]); // Dependência: `role`

  // Hook `useEffect`: debounce para aplicar filtros.
  // A requisição `fetchMetrics` só é feita 500ms após a última alteração nos filtros.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (filters.date !== "" || filters.order_by !== "") {
        fetchMetrics(1); // Busca a primeira página com os novos filtros
      }
    }, 500);

    return () => clearTimeout(timeoutId); // Limpa o timeout se os filtros mudarem novamente antes de 500ms
  }, [filters.date, filters.order_by]); // Dependências: `filters.date` e `filters.order_by`

  // Função `handleFilterChange`: atualiza o estado dos filtros.
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value })); // Atualiza um filtro específico mantendo os outros
  };

  // Função `handlePageChange`: muda a página atual e busca as métricas para a nova página.
  const handlePageChange = (newPage) => {
    fetchMetrics(newPage);
  };

  // Função `formatCurrency`: formata um valor numérico como moeda BRL.
  const formatCurrency = (value) => {
    const numValue = parseFloat(value) || 0;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(numValue / 1000000); // Divide por 1 milhão para converter de micro-centavos para reais
  };

  // Função `formatNumber`: formata um valor numérico como número inteiro com separador de milhares.
  const formatNumber = (value) => {
    const numValue = parseInt(value) || 0;
    return new Intl.NumberFormat("pt-BR").format(numValue);
  };

  // Exibe um spinner de carregamento se os dados ainda não foram carregados.
  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  // Exibe uma mensagem de erro se a busca de dados falhar.
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-700">Erro ao carregar dados: {error}</p>
        <button 
          onClick={() => fetchMetrics(pagination.current_page)} // Botão para tentar novamente
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // Renderização principal do componente MetricsTable.
  return (
    <div className="space-y-6"> {/* Container com espaçamento vertical */}
      {/* Seção de cartões de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Layout responsivo em grid */}
        <StatsCard
          title="Total de Impressões"
          value={formatNumber(statistics.total_impressions)}
          icon={TrendingUp}
        />
        <StatsCard
          title="Total de Cliques"
          value={formatNumber(statistics.total_clicks)}
          icon={Users}
        />
        <StatsCard
          title="Conversões"
          value={formatNumber(statistics.total_conversions)}
          icon={BarChart3}
        />
        <StatsCard
          title="CTR Médio"
          value={`${statistics.avg_ctr}%`}
          icon={TrendingUp}
        />
      </div>

      {/* Seção de filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-end"> {/* Layout flexível para os filtros */}
          <div className="flex gap-4">
            {/* Filtro por Data */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> {/* Ícone de calendário */}
              <input
                type="date"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)} // Atualiza o filtro de data
              />
            </div>
            
            {/* Filtro de Ordenação */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> {/* Ícone de filtro */}
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                value={filters.order_by}
                onChange={(e) => handleFilterChange("order_by", e.target.value)} // Atualiza o filtro de ordenação
              >
                <option value="">Ordenar por</option>
                {/* Mapeia as chaves da primeira linha de dados para criar opções de ordenação */}
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")} {/* Formata o nome da coluna */}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay de carregamento (exibido quando `loading` é true) */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Carregando...</span>
          </div>
        </div>
      )}

      {/* Tabela de Métricas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto"> {/* Permite rolagem horizontal em telas pequenas */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Cabeçalho da tabela: mapeia as chaves da primeira linha de dados */}
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key.replace("_", " ")} {/* Formata o nome da coluna para exibição */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Corpo da tabela: mapeia cada linha de dados */}
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150"> {/* Linha da tabela */}
                  {/* Mapeia cada célula da linha */}
                  {Object.entries(row).map(([key, value], cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm"> {/* Célula da tabela */}
                      {/* Formatação condicional do conteúdo da célula com base na chave (coluna) */}
                      {key === "cost_micros" ? (
                        <span className="font-medium text-gray-900">
                          {formatCurrency(value)} {/* Formata como moeda */}
                        </span>
                      ) : key.includes("impressions") || key.includes("clicks") || key.includes("conversions") ? (
                        <span className="font-medium text-gray-900">
                          {formatNumber(value)} {/* Formata como número */}
                        </span>
                      ) : key.includes("ctr") || key.includes("rate") ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {parseFloat(value).toFixed(2)}% {/* Formata como porcentagem */}
                        </span>
                      ) : key === "date" ? (
                        <span className="text-gray-500">
                          {new Date(value).toLocaleDateString("pt-BR")} {/* Formata como data */}
                        </span>
                      ) : (
                        <span className="text-gray-900">{value}</span> // Exibe o valor original
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Seção de Paginação (exibida apenas se houver mais de uma página) */}
        {pagination.total_pages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between"> {/* Estilos da paginação */}
            {/* Paginação para telas pequenas */}
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)} // Volta para a página anterior
                disabled={!pagination.has_prev} // Desabilita se não houver página anterior
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)} // Avança para a próxima página
                disabled={!pagination.has_next} // Desabilita se não houver próxima página
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>
            
            {/* Paginação para telas maiores */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando{" "}
                  <span className="font-medium">
                    {((pagination.current_page - 1) * pagination.per_page) + 1} {/* Cálculo do primeiro item exibido */}
                  </span>
                  {" "}até{" "}
                  <span className="font-medium">
                    {Math.min(pagination.current_page * pagination.per_page, pagination.total_records)} {/* Cálculo do último item exibido */}
                  </span>
                  {" "}de{" "}
                  <span className="font-medium">{pagination.total_records}</span> {/* Total de registros */}
                  {" "}resultados
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={!pagination.has_prev}
                  className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> {/* Ícone de seta para a esquerda */}
                </button>
                
                <span className="text-sm text-gray-700">
                  Página {pagination.current_page} de {pagination.total_pages} {/* Informação da página atual e total */}
                </span>
                
                <button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={!pagination.has_next}
                  className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" /> {/* Ícone de seta para a direita */}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}