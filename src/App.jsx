import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Search, 
  MapPin, 
  Heart, 
  User, 
  Menu, 
  X, 
  Home as HomeIcon, 
  Car, 
  Smartphone, 
  Sofa, 
  Briefcase, 
  Shirt, 
  Gamepad2, 
  Wrench,
  Star,
  Eye,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Shield,
  Zap,
  CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AnuncioCard from './components/AnuncioCard.jsx'
import Categorias from './pages/Categorias.jsx'
import Checkout from './pages/Checkout.jsx'
import MeusAnuncios from './pages/MeusAnuncios.jsx'
import Admin from './pages/Admin.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { 
  anuncios, 
  getFeaturedAnuncios, 
  getRecentAnuncios, 
  searchAnuncios,
  getAnunciosByCategory 
} from './data/anuncios.js'
import './App.css'

// Componente Header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UY</span>
            </div>
            <span className="text-xl font-bold text-gray-900">UYNegócios</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</Link>
            <Link to="/categorias" className="text-gray-700 hover:text-blue-600 transition-colors">Categorías</Link>
            <Link to="/publicar" className="text-gray-700 hover:text-blue-600 transition-colors">Publicar</Link>
            <Link to="/planos" className="text-gray-700 hover:text-blue-600 transition-colors">Planes</Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/meus-anuncios')}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Mis anuncios
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {user?.name || 'Mi Cuenta'}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Salir
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-white"
            >
              <div className="py-4 space-y-2">
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Inicio</Link>
                <Link to="/categorias" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Categorías</Link>
                <Link to="/publicar" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Publicar</Link>
                <Link to="/planos" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Planes</Link>
                <div className="border-t pt-2">
                  {isAuthenticated ? (
                    <>
                      <Link to="/favoritos" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Favoritos</Link>
                      <Link to="/mis-anuncios" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Mis Anuncios</Link>
                      <Link to="/perfil" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">{user?.name || 'Mi Perfil'}</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">Salir</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Iniciar Sesión</Link>
                      <Link to="/registro" className="block px-4 py-2 text-blue-600 font-medium hover:bg-gray-50">Registrarse</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// Componente Home
const Home = () => {
  // Combinar anúncios estáticos com anúncios do localStorage
  const [allAnuncios, setAllAnuncios] = useState([])

  useEffect(() => {
    // Carregar anúncios do localStorage compartilhado
    const savedAnuncios = JSON.parse(localStorage.getItem('todos_anuncios') || '[]')
    // Combinar com anúncios estáticos
    const combined = [...anuncios, ...savedAnuncios]
    setAllAnuncios(combined)
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const categories = [
    { id: 'inmuebles', name: 'Inmuebles', icon: HomeIcon, count: 1250, color: 'bg-blue-100 text-blue-600' },
    { id: 'vehiculos', name: 'Vehículos', icon: Car, count: 890, color: 'bg-green-100 text-green-600' },
    { id: 'electronicos', name: 'Electrónicos', icon: Smartphone, count: 2340, color: 'bg-purple-100 text-purple-600' },
    { id: 'hogar', name: 'Hogar y Jardín', icon: Sofa, count: 1560, color: 'bg-orange-100 text-orange-600' },
    { id: 'trabajo', name: 'Trabajo', icon: Briefcase, count: 780, color: 'bg-red-100 text-red-600' },
    { id: 'moda', name: 'Moda', icon: Shirt, count: 1890, color: 'bg-pink-100 text-pink-600' },
    { id: 'deportes', name: 'Deportes', icon: Gamepad2, count: 670, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'servicios', name: 'Servicios', icon: Wrench, count: 1120, color: 'bg-yellow-100 text-yellow-600' }
  ]

  const featuredAds = allAnuncios.filter(anuncio => anuncio.featured).slice(0, 6)
  const recentAds = allAnuncios.slice(-8) // Últimos 8 anúncios

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Encuentra todo lo que buscas
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              El marketplace líder de Uruguay con más de 8.000 anuncios
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="¿Qué estás buscando?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 text-lg text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <select 
                    className="w-full h-12 px-3 border border-gray-300 rounded-md text-gray-700"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                    <Search className="w-5 h-5 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora por categorías</h2>
            <p className="text-lg text-gray-700">Encuentra exactamente lo que necesitas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-700 font-medium">{category.count.toLocaleString()} anuncios</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Ads */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Anuncios destacados</h2>
              <p className="text-lg text-gray-600">Los mejores productos y servicios</p>
            </div>
            <Button variant="outline">Ver todos</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAds.map((ad, index) => (
              <AnuncioCard 
                key={ad.id} 
                anuncio={ad} 
                featured={true}
                compact={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Ads */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Publicaciones recientes</h2>
              <p className="text-lg text-gray-600">Lo último que se publicó</p>
            </div>
            <Button variant="outline">Ver todos</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAds.map((ad, index) => (
              <AnuncioCard 
                key={ad.id} 
                anuncio={ad} 
                compact={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">UYNegócios en números</h2>
            <p className="text-xl text-blue-100">La plataforma de clasificados más grande de Uruguay</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">8.194</div>
              <div className="text-blue-100">Anuncios activos</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">2.847</div>
              <div className="text-blue-100">Usuarios registrados</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">156</div>
              <div className="text-blue-100">Ventas diarias</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfacción</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Componente Publicar
const Publicar = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    phone: '',
    delivery: ''
  })
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const categories = [
    'Inmuebles', 'Vehículos', 'Electrónicos', 'Hogar y Jardín', 
    'Trabajo', 'Moda', 'Deportes', 'Servicios'
  ]

  const locations = [
    'Montevideo', 'Canelones', 'Maldonado', 'Colonia', 'Salto',
    'Paysandú', 'Rivera', 'Tacuarembó', 'Artigas', 'Cerro Largo',
    'Treinta y Tres'
  ]

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    
    if (files.length + images.length > 8) {
      alert('Máximo 8 imágenes permitidas')
      return
    }

    setUploading(true)
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`La imagen ${file.name} es muy grande. Máximo 5MB por imagen.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target.result,
          name: file.name
        }])
      }
      reader.readAsDataURL(file)
    })
    
    setUploading(false)
  }

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para publicar un anuncio')
      navigate('/login')
      return
    }

    // Validar campos obrigatórios
    if (!formData.title || !formData.price || !formData.category || !formData.location || !formData.phone || !formData.delivery) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    // Criar anúncio
    const newAnuncio = {
      id: Date.now(),
      ...formData,
      images: images.map(img => img.url),
      createdAt: new Date().toISOString(),
      status: 'activo',
      views: 0,
      favorites: 0,
      userEmail: user?.email,
      userName: user?.name || 'Usuário'
    }

    // Salvar no sistema compartilhado (localStorage global)
    const existingAnuncios = JSON.parse(localStorage.getItem('todos_anuncios') || '[]')
    existingAnuncios.push(newAnuncio)
    localStorage.setItem('todos_anuncios', JSON.stringify(existingAnuncios))

    // Também salvar nos anúncios do usuário
    const userAnuncios = JSON.parse(localStorage.getItem(`anuncios_${user?.email}`) || '[]')
    userAnuncios.push(newAnuncio)
    localStorage.setItem(`anuncios_${user?.email}`, JSON.stringify(userAnuncios))

    alert('¡Anuncio publicado exitosamente!')
    navigate('/meus-anuncios')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publicar anuncio</h1>
          <p className="text-lg text-gray-600">Vende tus productos de forma rápida y segura</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del anuncio *
                </label>
                <Input
                  required
                  placeholder="Ej: iPhone 14 Pro Max 256GB"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (UYU) *
                </label>
                <Input
                  required
                  type="number"
                  placeholder="Ej: 65000"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select 
                  required
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación *
                </label>
                <select 
                  required
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  <option value="">Seleccionar departamento</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <Input
                  required
                  type="tel"
                  placeholder="Ej: 099 123 456"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modalidad de entrega *
                </label>
                <select 
                  required
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.delivery}
                  onChange={(e) => setFormData({...formData, delivery: e.target.value})}
                >
                  <option value="">Seleccionar modalidad</option>
                  <option value="entrega">Solo entrega</option>
                  <option value="retirada">Solo retirada</option>
                  <option value="ambas">Entrega y retirada</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Describe tu producto o servicio en detalle..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Upload de Imagens */}
            {images.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imágenes seleccionadas
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative">
                      <img 
                        src={image.url} 
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <div className="text-gray-500 mb-4">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p>Arrastra y suelta imágenes aquí o</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploading || images.length >= 8}
              />
              <label
                htmlFor="image-upload"
                className={`inline-block px-4 py-2 border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-50 ${
                  uploading || images.length >= 8 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploading ? 'Subiendo...' : 'Seleccionar archivos'}
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Máximo 8 imágenes, 5MB cada una
              </p>
            </div>

            <div className="flex justify-center">
              <Button type="submit" size="lg" className="px-12">
                Publicar anuncio gratis
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

// Componente Planos
const Planos = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, upgradePlan } = useAuth()

  const plans = [
    {
      name: 'Gratuito',
      price: 'UYU 0',
      period: '/mes',
      description: 'Perfecto para empezar',
      features: [
        '5 anuncios activos',
        'Fotos básicas',
        'Soporte por email',
        'Duración 30 días'
      ],
      buttonText: 'Comenzar gratis',
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Premium',
      price: 'UYU 299',
      period: '/mes',
      description: 'Para vendedores activos',
      features: [
        'Anuncios ilimitados',
        'Fotos de alta calidad',
        'Anuncios destacados',
        'Estadísticas avanzadas',
        'Soporte prioritario',
        'Duración 60 días'
      ],
      buttonText: 'Elegir Premium',
      popular: true,
      color: 'border-blue-500'
    },
    {
      name: 'Negócio',
      price: 'UYU 599',
      period: '/mes',
      description: 'Para empresas',
      features: [
        'Todo de Premium',
        'Perfil de empresa',
        'API de integración',
        'Gerente de cuenta',
        'Reportes personalizados',
        'Soporte 24/7'
      ],
      buttonText: 'Elegir Negócio',
      popular: false,
      color: 'border-purple-500'
    }
  ]

  const handleSelectPlan = (planName) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (planName === 'Gratuito') {
      upgradePlan('gratuito')
      alert('¡Perfecto! Puedes comenzar a publicar gratis ahora mismo.')
      navigate('/publicar')
    } else {
      // Redirigir para pagamento
      navigate('/checkout', { state: { plan: planName } })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Elige tu plan</h1>
          <p className="text-lg text-gray-600 mb-8">
            Encuentra el plan perfecto para tus necesidades de venta
          </p>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-medium">Pagos seguros</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Zap className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-medium">Activación inmediata</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-medium">Sin permanencia</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Más popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full border-2 ${plan.color} ${plan.popular ? 'shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription className="text-lg">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6">
                    <Button 
                      className={`w-full h-12 text-lg ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                      onClick={() => handleSelectPlan(plan.name)}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Métodos de pago aceptados</h3>
          <div className="flex justify-center items-center space-x-8 flex-wrap">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <span className="text-gray-700">Tarjetas de crédito</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MP</span>
              </div>
              <span className="text-gray-700">Mercado Pago</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">₿</span>
              </div>
              <span className="text-gray-700">Bitcoin</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">AB</span>
              </div>
              <span className="text-gray-700">Abitab</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Login
const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  })
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (isLogin) {
        result = await login(formData.email, formData.password)
      } else {
        result = await register(formData)
      }

      if (result.success) {
        navigate('/')
      } else {
        alert(result.error || 'Error en la operación')
      }
    } catch (error) {
      alert('Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Accede a tu cuenta de UYNegócios' : 'Únete a la comunidad de UYNegócios'}
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <Input
                  required
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                required
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <Input
                  required
                  type="tel"
                  placeholder="099 123 456"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <Input
                required
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar sesión' : 'Crear cuenta')}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </Button>
              <Button variant="outline" className="w-full">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Componente Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UY</span>
              </div>
              <span className="text-xl font-bold">UYNegócios</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              El marketplace líder de Uruguay. Conectamos compradores y vendedores 
              de forma segura y eficiente desde 2024.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/categorias" className="text-gray-400 hover:text-white transition-colors">Categorías</Link></li>
              <li><Link to="/publicar" className="text-gray-400 hover:text-white transition-colors">Publicar</Link></li>
              <li><Link to="/planos" className="text-gray-400 hover:text-white transition-colors">Planes</Link></li>
              <li><Link to="/ayuda" className="text-gray-400 hover:text-white transition-colors">Ayuda</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                +598 2XXX XXXX
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                hola@uynegocios.uy
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                Montevideo, Uruguay
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 UYNegócios. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Componente principal App
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/:categoryId" element={<Categorias />} />
              <Route path="/publicar" element={<Publicar />} />
              <Route path="/planos" element={<Planos />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/meus-anuncios" element={<MeusAnuncios />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

