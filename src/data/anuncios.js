// Dados de anúncios para demonstração
export const anuncios = [
  // Inmuebles
  {
    id: 1,
    title: 'Apartamento 2 dormitorios - Pocitos',
    price: 'UYU 45.000',
    location: 'Pocitos, Montevideo',
    category: 'Inmuebles',
    description: 'Hermoso apartamento de 2 dormitorios en el corazón de Pocitos. Totalmente amueblado, con vista al mar, balcón, cocina equipada y baño completo. Ideal para parejas o profesionales. Muy luminoso y en excelente estado.',
    image: '/api/placeholder/400/300',
    featured: true,
    views: 1250,
    favorites: 89,
    phone: '+598 99 123 456',
    email: 'contacto@inmobiliaria.uy',
    seller: 'Inmobiliaria Premium',
    timeAgo: null
  },
  {
    id: 2,
    title: 'Casa 3 dormitorios - Punta del Este',
    price: 'UYU 120.000',
    location: 'Punta del Este, Maldonado',
    category: 'Inmuebles',
    description: 'Espectacular casa de 3 dormitorios a 2 cuadras de la playa. Jardín amplio, parrillero, garage para 2 autos. Perfecta para vacaciones familiares. Disponible todo el año.',
    image: '/api/placeholder/400/300',
    featured: true,
    views: 567,
    favorites: 78,
    phone: '+598 99 234 567',
    email: 'ventas@puntadeleste.uy',
    seller: 'Propiedades del Este',
    timeAgo: null
  },
  {
    id: 3,
    title: 'Oficina comercial - Centro',
    price: 'UYU 25.000',
    location: 'Centro, Montevideo',
    category: 'Inmuebles',
    description: 'Oficina de 50m² en edificio corporativo. Ideal para consultorio médico, estudio jurídico o oficina administrativa. Excelente ubicación con fácil acceso al transporte público.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 234,
    favorites: 12,
    phone: '+598 99 345 678',
    email: 'oficinas@centro.uy',
    seller: 'Comercial Center',
    timeAgo: '3 horas'
  },

  // Vehículos
  {
    id: 4,
    title: 'Toyota Corolla 2020 - Excelente estado',
    price: 'UYU 850.000',
    location: 'Carrasco, Montevideo',
    category: 'Vehículos',
    description: 'Toyota Corolla 2020, automático, 45.000 km. Único dueño, service al día, aire acondicionado, dirección asistida. Papeles al día, listo para transferir.',
    image: '/api/placeholder/400/300',
    featured: true,
    views: 890,
    favorites: 156,
    phone: '+598 99 456 789',
    email: 'autos@carrasco.uy',
    seller: 'AutoCenter',
    timeAgo: null
  },
  {
    id: 5,
    title: 'Volkswagen Gol 2018',
    price: 'UYU 520.000',
    location: 'Maldonado, Maldonado',
    category: 'Vehículos',
    description: 'VW Gol 2018, 5 puertas, nafta, 78.000 km. Muy cuidado, ideal primer auto. Excelente estado general, motor impecable.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 445,
    favorites: 67,
    phone: '+598 99 567 890',
    email: 'ventas@maldonado.uy',
    seller: 'Autos del Este',
    timeAgo: '1 día'
  },
  {
    id: 6,
    title: 'Honda Civic 2019 - Turbo',
    price: 'UYU 1.200.000',
    location: 'Cordón, Montevideo',
    category: 'Vehículos',
    description: 'Honda Civic Turbo 2019, manual, 32.000 km. Full equipo, cuero, techo solar, cámara de retroceso. Impecable estado.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 678,
    favorites: 89,
    phone: '+598 99 678 901',
    email: 'honda@cordon.uy',
    seller: 'Premium Motors',
    timeAgo: '5 horas'
  },

  // Electrónicos
  {
    id: 7,
    title: 'iPhone 14 Pro Max 256GB',
    price: 'UYU 65.000',
    location: 'Ciudad Vieja, Montevideo',
    category: 'Electrónicos',
    description: 'iPhone 14 Pro Max 256GB, color morado, como nuevo. Incluye caja original, cargador y protector de pantalla. Batería al 98%.',
    image: '/api/placeholder/400/300',
    featured: true,
    views: 2340,
    favorites: 234,
    phone: '+598 99 789 012',
    email: 'tech@ciudadvieja.uy',
    seller: 'TechStore UY',
    timeAgo: null
  },
  {
    id: 8,
    title: 'Notebook Lenovo ThinkPad',
    price: 'UYU 35.000',
    location: 'Cordón, Montevideo',
    category: 'Electrónicos',
    description: 'Lenovo ThinkPad E14, Intel i5, 8GB RAM, 256GB SSD. Ideal para trabajo y estudio. Excelente estado, poco uso.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 567,
    favorites: 45,
    phone: '+598 99 890 123',
    email: 'notebooks@cordon.uy',
    seller: 'Informática Pro',
    timeAgo: '2 horas'
  },
  {
    id: 9,
    title: 'Samsung Galaxy S23 Ultra',
    price: 'UYU 58.000',
    location: 'Punta Carretas, Montevideo',
    category: 'Electrónicos',
    description: 'Samsung Galaxy S23 Ultra 512GB, negro. Incluye S Pen, cargador inalámbrico y funda. Estado impecable.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 890,
    favorites: 123,
    phone: '+598 99 901 234',
    email: 'samsung@puntacarretas.uy',
    seller: 'Mobile Center',
    timeAgo: '6 horas'
  },

  // Hogar y Jardín
  {
    id: 10,
    title: 'Sofá 3 cuerpos - Como nuevo',
    price: 'UYU 12.000',
    location: 'Tres Cruces, Montevideo',
    category: 'Hogar y Jardín',
    description: 'Sofá de 3 cuerpos en excelente estado, color gris, muy cómodo. Ideal para living. Se retira por el lugar.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 234,
    favorites: 23,
    phone: '+598 99 012 345',
    email: 'muebles@trescruces.uy',
    seller: 'Muebles del Hogar',
    timeAgo: '6 horas'
  },
  {
    id: 11,
    title: 'Juego de comedor 6 sillas',
    price: 'UYU 18.000',
    location: 'Malvín, Montevideo',
    category: 'Hogar y Jardín',
    description: 'Mesa de comedor de madera maciza con 6 sillas tapizadas. Excelente calidad, muy poco uso. Ideal para familias.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 345,
    favorites: 34,
    phone: '+598 99 123 456',
    email: 'comedor@malvin.uy',
    seller: 'Mueblería Familiar',
    timeAgo: '1 día'
  },

  // Trabajo
  {
    id: 12,
    title: 'Clases de inglés particulares',
    price: 'UYU 800/hora',
    location: 'Punta Carretas, Montevideo',
    category: 'Trabajo',
    description: 'Profesora nativa ofrece clases de inglés particulares. Todos los niveles, preparación para exámenes internacionales. Modalidad presencial u online.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 456,
    favorites: 67,
    phone: '+598 99 234 567',
    email: 'english@puntacarretas.uy',
    seller: 'English Teacher',
    timeAgo: '8 horas'
  },
  {
    id: 13,
    title: 'Desarrollador Web Freelance',
    price: 'UYU 2.500/hora',
    location: 'Pocitos, Montevideo',
    category: 'Trabajo',
    description: 'Desarrollador web con 5 años de experiencia. Especializado en React, Node.js y bases de datos. Disponible para proyectos freelance.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 789,
    favorites: 89,
    phone: '+598 99 345 678',
    email: 'dev@pocitos.uy',
    seller: 'WebDev Pro',
    timeAgo: '12 horas'
  },

  // Moda
  {
    id: 14,
    title: 'Vestido de fiesta - Talle M',
    price: 'UYU 3.500',
    location: 'Centro, Montevideo',
    category: 'Moda',
    description: 'Hermoso vestido de fiesta, talle M, color azul marino. Usado una sola vez, excelente estado. Ideal para eventos especiales.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 123,
    favorites: 15,
    phone: '+598 99 456 789',
    email: 'moda@centro.uy',
    seller: 'Fashion Store',
    timeAgo: '4 horas'
  },
  {
    id: 15,
    title: 'Zapatillas Nike Air Max',
    price: 'UYU 4.200',
    location: 'Carrasco, Montevideo',
    category: 'Moda',
    description: 'Nike Air Max talle 42, color negro con detalles blancos. Muy poco uso, excelente estado. Originales con caja.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 567,
    favorites: 78,
    phone: '+598 99 567 890',
    email: 'sneakers@carrasco.uy',
    seller: 'Sneaker World',
    timeAgo: '1 día'
  },

  // Deportes
  {
    id: 16,
    title: 'Bicicleta de montaña Trek',
    price: 'UYU 18.000',
    location: 'Malvín, Montevideo',
    category: 'Deportes',
    description: 'Bicicleta Trek de montaña, rodado 26, 21 velocidades. Excelente estado, ideal para aventuras y ejercicio.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 345,
    favorites: 45,
    phone: '+598 99 678 901',
    email: 'bikes@malvin.uy',
    seller: 'Bike Center',
    timeAgo: '4 horas'
  },
  {
    id: 17,
    title: 'Set completo de golf',
    price: 'UYU 25.000',
    location: 'Punta del Este, Maldonado',
    category: 'Deportes',
    description: 'Set completo de palos de golf marca Callaway. Incluye bolsa, 14 palos y accesorios. Excelente para principiantes.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 234,
    favorites: 23,
    phone: '+598 99 789 012',
    email: 'golf@puntadeleste.uy',
    seller: 'Golf Pro Shop',
    timeAgo: '2 días'
  },

  // Servicios
  {
    id: 18,
    title: 'Plomero 24 horas',
    price: 'UYU 1.200/hora',
    location: 'Montevideo',
    category: 'Servicios',
    description: 'Servicio de plomería las 24 horas. Reparaciones, instalaciones, destapaciones. Presupuesto sin cargo. Garantía en todos los trabajos.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 678,
    favorites: 89,
    phone: '+598 99 890 123',
    email: 'plomero@montevideo.uy',
    seller: 'Plomería Express',
    timeAgo: '30 minutos'
  },
  {
    id: 19,
    title: 'Limpieza de hogar',
    price: 'UYU 800/hora',
    location: 'Pocitos, Montevideo',
    category: 'Servicios',
    description: 'Servicio de limpieza profesional para hogares. Personal capacitado, productos incluidos. Disponibilidad inmediata.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 456,
    favorites: 56,
    phone: '+598 99 901 234',
    email: 'limpieza@pocitos.uy',
    seller: 'Clean Home',
    timeAgo: '2 horas'
  },
  {
    id: 20,
    title: 'Clases de guitarra',
    price: 'UYU 600/hora',
    location: 'Cordón, Montevideo',
    category: 'Servicios',
    description: 'Profesor de guitarra con 10 años de experiencia. Clases para todos los niveles y edades. Modalidad presencial u online.',
    image: '/api/placeholder/400/300',
    featured: false,
    views: 345,
    favorites: 45,
    phone: '+598 99 012 345',
    email: 'guitarra@cordon.uy',
    seller: 'Music Teacher',
    timeAgo: '1 día'
  }
]

// Función para obtener anúncios por categoría
export const getAnunciosByCategory = (categoryId) => {
  const categoryMap = {
    'inmuebles': 'Inmuebles',
    'vehiculos': 'Vehículos', 
    'electronicos': 'Electrónicos',
    'hogar': 'Hogar y Jardín',
    'trabajo': 'Trabajo',
    'moda': 'Moda',
    'deportes': 'Deportes',
    'servicios': 'Servicios'
  }
  
  const categoryName = categoryMap[categoryId]
  return anuncios.filter(anuncio => anuncio.category === categoryName)
}

// Función para buscar anúncios
export const searchAnuncios = (searchTerm, category = '', location = '') => {
  return anuncios.filter(anuncio => {
    const matchesSearch = !searchTerm || 
      anuncio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anuncio.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !category || anuncio.category === category
    
    const matchesLocation = !location || 
      anuncio.location.toLowerCase().includes(location.toLowerCase())
    
    return matchesSearch && matchesCategory && matchesLocation
  })
}

// Função para obter anúncios destacados
export const getFeaturedAnuncios = () => {
  return anuncios.filter(anuncio => anuncio.featured)
}

// Função para obter anúncios recentes
export const getRecentAnuncios = () => {
  return anuncios.filter(anuncio => anuncio.timeAgo).slice(0, 8)
}

// Função para obter anúncio por ID
export const getAnuncioById = (id) => {
  return anuncios.find(anuncio => anuncio.id === parseInt(id))
}

