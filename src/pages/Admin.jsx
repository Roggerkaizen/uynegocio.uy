import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [anuncios, setAnuncios] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [stats, setStats] = useState({
    totalAnuncios: 0,
    totalUsuarios: 0,
    anunciosAtivos: 0,
    receitaMensal: 0
  })

  useEffect(() => {
    // Carregar dados do localStorage
    const todosAnuncios = JSON.parse(localStorage.getItem('todos_anuncios') || '[]')
    const todosUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    
    setAnuncios(todosAnuncios)
    setUsuarios(todosUsuarios)
    
    // Calcular estatísticas
    setStats({
      totalAnuncios: todosAnuncios.length,
      totalUsuarios: todosUsuarios.length,
      anunciosAtivos: todosAnuncios.filter(a => a.status === 'ativo').length,
      receitaMensal: todosAnuncios.length * 50 // Simulação
    })
  }, [])

  const handleDeleteAnuncio = (id) => {
    const novosAnuncios = anuncios.filter(a => a.id !== id)
    setAnuncios(novosAnuncios)
    localStorage.setItem('todos_anuncios', JSON.stringify(novosAnuncios))
  }

  const handleToggleStatus = (id) => {
    const novosAnuncios = anuncios.map(a => 
      a.id === id ? { ...a, status: a.status === 'ativo' ? 'inativo' : 'ativo' } : a
    )
    setAnuncios(novosAnuncios)
    localStorage.setItem('todos_anuncios', JSON.stringify(novosAnuncios))
  }

  const StatCard = ({ title, value, icon: Icon, color = "blue" }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-600`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total de Anúncios" 
          value={stats.totalAnuncios} 
          icon={FileText} 
          color="blue" 
        />
        <StatCard 
          title="Usuários Registrados" 
          value={stats.totalUsuarios} 
          icon={Users} 
          color="green" 
        />
        <StatCard 
          title="Anúncios Ativos" 
          value={stats.anunciosAtivos} 
          icon={TrendingUp} 
          color="yellow" 
        />
        <StatCard 
          title="Receita Mensal" 
          value={`$${stats.receitaMensal}`} 
          icon={DollarSign} 
          color="purple" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Anúncios Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {anuncios.slice(0, 5).map(anuncio => (
                <div key={anuncio.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">{anuncio.title}</h4>
                    <p className="text-sm text-gray-600">{anuncio.category}</p>
                  </div>
                  <Badge variant={anuncio.status === 'ativo' ? 'default' : 'secondary'}>
                    {anuncio.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Novo anúncio publicado</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm">Novo usuário registrado</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Pagamento processado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const GerenciarAnuncios = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Anúncios</h2>
        <div className="flex space-x-2">
          <Input placeholder="Buscar anúncios..." className="w-64" />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {anuncios.map(anuncio => (
                  <tr key={anuncio.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{anuncio.title}</div>
                        <div className="text-sm text-gray-500">{anuncio.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {anuncio.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      UYU {anuncio.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={anuncio.status === 'ativo' ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(anuncio.id)}
                      >
                        {anuncio.status || 'ativo'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteAnuncio(anuncio.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const GerenciarUsuarios = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Usuários</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Anúncios</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {usuario.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {anuncios.filter(a => a.userId === usuario.id).length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'anuncios', label: 'Anúncios', icon: FileText },
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-600">UYNegócios Admin</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Voltar ao Site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'anuncios' && <GerenciarAnuncios />}
            {activeTab === 'usuarios' && <GerenciarUsuarios />}
            {activeTab === 'configuracoes' && (
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações</h3>
                <p className="text-gray-600">Painel de configurações em desenvolvimento</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

