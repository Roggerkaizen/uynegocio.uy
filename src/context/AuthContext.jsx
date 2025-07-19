import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simular carregamento inicial
  useEffect(() => {
    const savedUser = localStorage.getItem('uynegocios_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('uynegocios_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular usuário logado
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        phone: '+598 99 123 456',
        avatar: null,
        plan: 'gratuito',
        favorites: [],
        myAds: [],
        createdAt: new Date().toISOString()
      }
      
      setUser(userData)
      localStorage.setItem('uynegocios_user', JSON.stringify(userData))
      
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: 'Error al iniciar sesión' }
    }
  }

  const register = async (userData) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        avatar: null,
        plan: 'gratuito',
        favorites: [],
        myAds: [],
        createdAt: new Date().toISOString()
      }
      
      setUser(newUser)
      localStorage.setItem('uynegocios_user', JSON.stringify(newUser))
      
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: 'Error al crear cuenta' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('uynegocios_user')
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('uynegocios_user', JSON.stringify(updatedUser))
  }

  const addToFavorites = (anuncioId) => {
    if (!user) return
    
    const favorites = user.favorites || []
    if (!favorites.includes(anuncioId)) {
      const updatedFavorites = [...favorites, anuncioId]
      updateUser({ favorites: updatedFavorites })
    }
  }

  const removeFromFavorites = (anuncioId) => {
    if (!user) return
    
    const favorites = user.favorites || []
    const updatedFavorites = favorites.filter(id => id !== anuncioId)
    updateUser({ favorites: updatedFavorites })
  }

  const isFavorite = (anuncioId) => {
    if (!user) return false
    return (user.favorites || []).includes(anuncioId)
  }

  const upgradePlan = (planName) => {
    updateUser({ plan: planName.toLowerCase() })
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    upgradePlan,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

