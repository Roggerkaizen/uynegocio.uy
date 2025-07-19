import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Search, 
  Filter,
  SlidersHorizontal,
  Home as HomeIcon, 
  Car, 
  Smartphone, 
  Sofa, 
  Briefcase, 
  Shirt, 
  Gamepad2, 
  Wrench
} from 'lucide-react'
import { motion } from 'framer-motion'
import AnuncioCard from '../components/AnuncioCard.jsx'
import { getAnunciosByCategory, searchAnuncios } from '../data/anuncios.js'

const Categorias = () => {
  const { categoryId } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [priceRange, setPriceRange] = useState('')
  const [location, setLocation] = useState('')

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

  const currentCategory = categories.find(cat => cat.id === categoryId)
  const anuncios = categoryId ? getAnunciosByCategory(categoryId) : []

  // Filtrar anúncios baseado na busca
  const filteredAnuncios = searchAnuncios(searchTerm, currentCategory?.name, location)
    .filter(anuncio => {
      if (!categoryId) return true
      return anuncio.category === currentCategory?.name
    })

  // Ordenar anúncios
  const sortedAnuncios = [...filteredAnuncios].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''))
      case 'price-high':
        return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''))
      case 'views':
        return (b.views || 0) - (a.views || 0)
      case 'recent':
      default:
        return a.timeAgo ? -1 : 1
    }
  })

  if (!categoryId) {
    // Página de todas as categorias
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Todas las categorías</h1>
            <p className="text-lg text-gray-600">Explora nuestras categorías y encuentra lo que buscas</p>
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
                >
                  <Link to={`/categorias/${category.id}`}>
                    <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count.toLocaleString()} anuncios</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da categoria */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentCategory && (
                <>
                  <div className={`w-12 h-12 ${currentCategory.color} rounded-lg flex items-center justify-center`}>
                    <currentCategory.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{currentCategory.name}</h1>
                    <p className="text-gray-600">{sortedAnuncios.length} anuncios encontrados</p>
                  </div>
                </>
              )}
            </div>
            <Link to="/categorias">
              <Button variant="outline">Ver todas las categorías</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <div className="lg:w-1/4">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtros
              </h3>
              
              <div className="space-y-6">
                {/* Busca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="¿Qué buscas?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <select 
                    className="w-full h-10 px-3 border border-gray-300 rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Todas las ubicaciones</option>
                    <option value="Montevideo">Montevideo</option>
                    <option value="Canelones">Canelones</option>
                    <option value="Maldonado">Maldonado</option>
                    <option value="Colonia">Colonia</option>
                    <option value="Salto">Salto</option>
                  </select>
                </div>

                {/* Rango de precios */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rango de precio
                  </label>
                  <select 
                    className="w-full h-10 px-3 border border-gray-300 rounded-md"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="">Todos los precios</option>
                    <option value="0-5000">Hasta UYU 5.000</option>
                    <option value="5000-20000">UYU 5.000 - 20.000</option>
                    <option value="20000-50000">UYU 20.000 - 50.000</option>
                    <option value="50000+">Más de UYU 50.000</option>
                  </select>
                </div>

                {/* Ordenar por */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por
                  </label>
                  <select 
                    className="w-full h-10 px-3 border border-gray-300 rounded-md"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recent">Más recientes</option>
                    <option value="price-low">Precio: menor a mayor</option>
                    <option value="price-high">Precio: mayor a menor</option>
                    <option value="views">Más vistos</option>
                  </select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('')
                    setLocation('')
                    setPriceRange('')
                    setSortBy('recent')
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </Card>
          </div>

          {/* Lista de anúncios */}
          <div className="lg:w-3/4">
            {sortedAnuncios.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron anuncios
                </h3>
                <p className="text-gray-600">
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedAnuncios.map((anuncio) => (
                  <AnuncioCard 
                    key={anuncio.id} 
                    anuncio={anuncio}
                    featured={anuncio.featured}
                    compact={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categorias

