import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Heart,
  MapPin,
  Calendar,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const MeusAnuncios = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [anuncios, setAnuncios] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Carregar anúncios do localStorage
    const savedAnuncios = localStorage.getItem(`anuncios_${user?.email}`)
    if (savedAnuncios) {
      setAnuncios(JSON.parse(savedAnuncios))
    }
  }, [isAuthenticated, user, navigate])

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      const updatedAnuncios = anuncios.filter(anuncio => anuncio.id !== id)
      setAnuncios(updatedAnuncios)
      localStorage.setItem(`anuncios_${user?.email}`, JSON.stringify(updatedAnuncios))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo': return 'bg-green-100 text-green-800'
      case 'pausado': return 'bg-yellow-100 text-yellow-800'
      case 'vencido': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'activo': return 'Activo'
      case 'pausado': return 'Pausado'
      case 'vencido': return 'Vencido'
      default: return 'Borrador'
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mis anuncios</h1>
              <p className="text-gray-600 mt-2">Gestiona tus publicaciones</p>
            </div>
            <Button 
              onClick={() => navigate('/publicar')}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo anuncio</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total anuncios</p>
                  <p className="text-2xl font-bold text-gray-900">{anuncios.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Activos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {anuncios.filter(a => a.status === 'activo').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Visualizaciones</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {anuncios.reduce((total, a) => total + (a.views || 0), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favoritos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {anuncios.reduce((total, a) => total + (a.favorites || 0), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de anúncios */}
        {anuncios.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tienes anuncios aún
              </h3>
              <p className="text-gray-600 mb-6">
                Comienza publicando tu primer anuncio para llegar a miles de compradores
              </p>
              <Button onClick={() => navigate('/publicar')}>
                <Plus className="w-4 h-4 mr-2" />
                Crear primer anuncio
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {anuncios.map((anuncio, index) => (
              <motion.div
                key={anuncio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4 flex-1">
                        {/* Imagen */}
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                          {anuncio.images && anuncio.images.length > 0 ? (
                            <img 
                              src={anuncio.images[0]} 
                              alt={anuncio.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          )}
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {anuncio.title}
                            </h3>
                            <Badge className={getStatusColor(anuncio.status)}>
                              {getStatusText(anuncio.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              UYU {parseInt(anuncio.price || 0).toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {anuncio.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(anuncio.createdAt || Date.now()).toLocaleDateString()}
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm line-clamp-2">
                            {anuncio.description}
                          </p>

                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {anuncio.views || 0} visualizaciones
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {anuncio.favorites || 0} favoritos
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(anuncio.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MeusAnuncios

