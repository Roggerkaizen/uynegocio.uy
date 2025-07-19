import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  CheckCircle, 
  ArrowLeft,
  Star,
  Trophy,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import StripeCheckout from '../components/StripeCheckout.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentData, setPaymentData] = useState(null)

  const planName = location.state?.plan || 'Premium'

  const plans = {
    'Premium': {
      name: 'Premium',
      price: 299,
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
      color: 'border-blue-500',
      icon: Star
    },
    'Negócio': {
      name: 'Negócio',
      price: 599,
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
      color: 'border-purple-500',
      icon: Trophy
    }
  }

  const selectedPlan = plans[planName]

  const handlePaymentSuccess = (data) => {
    setPaymentData(data)
    setPaymentSuccess(true)
  }

  const handleBackToPlans = () => {
    navigate('/planos')
  }

  const handleContinue = () => {
    navigate('/publicar')
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Pago exitoso!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Tu suscripción al plan {paymentData?.plan} ha sido activada correctamente.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">{paymentData?.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ID de pago:</span>
                    <span className="font-mono text-xs">{paymentData?.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monto:</span>
                    <span className="font-medium">UYU {paymentData?.amount}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button onClick={handleContinue} className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Comenzar a publicar
                </Button>
                <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                  Ir al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (showCheckout) {
    return (
      <StripeCheckout
        plan={selectedPlan}
        onBack={() => setShowCheckout(false)}
        onSuccess={handlePaymentSuccess}
      />
    )
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan no encontrado</h2>
          <Button onClick={handleBackToPlans}>
            Volver a planes
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent = selectedPlan.icon

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToPlans}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a planes
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Confirmar suscripción</h1>
          <p className="text-gray-600 mt-2">Revisa los detalles de tu plan antes de continuar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detalles del plan */}
          <div>
            <Card className={`${selectedPlan.color} border-2`}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">{selectedPlan.name}</CardTitle>
                <CardDescription>{selectedPlan.description}</CardDescription>
                <div className="text-3xl font-bold text-blue-600">
                  UYU {selectedPlan.price.toLocaleString()}
                  <span className="text-lg text-gray-600">{selectedPlan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información del usuario y confirmación */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la cuenta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usuario:</span>
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan actual:</span>
                    <Badge variant="secondary">{user?.plan || 'Gratuito'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de facturación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Plan {selectedPlan.name}</span>
                    <span>UYU {selectedPlan.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>IVA (22%)</span>
                    <span>UYU {Math.round(selectedPlan.price * 0.22).toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total mensual</span>
                    <span>UYU {Math.round(selectedPlan.price * 1.22).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                onClick={() => setShowCheckout(true)}
                className="w-full h-12 text-lg"
              >
                Continuar al pago
              </Button>
              <Button 
                variant="outline" 
                onClick={handleBackToPlans}
                className="w-full"
              >
                Cambiar plan
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Al continuar, aceptas nuestros términos de servicio y política de privacidad. 
              Puedes cancelar tu suscripción en cualquier momento.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

