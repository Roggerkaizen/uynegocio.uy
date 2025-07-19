import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'

const StripeCheckout = ({ plan, onBack, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  const [billingData, setBillingData] = useState({
    email: '',
    phone: '',
    address: '',
    city: 'Montevideo',
    country: 'Uruguay'
  })
  const { user, upgradePlan } = useAuth()

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardChange = (field, value) => {
    let formattedValue = value
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value)
    } else if (field === 'cvc') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4)
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }))
  }

  const simulateStripePayment = async () => {
    // Simular processamento do Stripe
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simular sucesso (90% de chance)
    if (Math.random() > 0.1) {
      return { success: true, paymentId: 'pi_' + Date.now() }
    } else {
      throw new Error('Tarjeta rechazada. Intenta con otra tarjeta.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validações básicas
      if (!cardData.number || !cardData.expiry || !cardData.cvc || !cardData.name) {
        throw new Error('Por favor completa todos los datos de la tarjeta')
      }

      if (!billingData.email || !billingData.phone) {
        throw new Error('Por favor completa los datos de facturación')
      }

      // Simular pagamento
      const result = await simulateStripePayment()
      
      if (result.success) {
        // Atualizar plano do usuário
        upgradePlan(plan.name)
        
        // Chamar callback de sucesso
        onSuccess({
          plan: plan.name,
          paymentId: result.paymentId,
          amount: plan.price
        })
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const planPrices = {
    'Premium': 299,
    'Negócio': 599
  }

  const planPrice = planPrices[plan?.name] || 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a planes
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar compra</h1>
          <p className="text-gray-600 mt-2">Completa tu suscripción a UYNegócios {plan?.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de pago */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Método de pago */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Método de pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className="h-12"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Tarjeta
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'mercadopago' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('mercadopago')}
                      className="h-12"
                    >
                      Mercado Pago
                    </Button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número de tarjeta
                        </label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => handleCardChange('number', e.target.value)}
                          maxLength={19}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vencimiento
                          </label>
                          <Input
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => handleCardChange('expiry', e.target.value)}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVC
                          </label>
                          <Input
                            placeholder="123"
                            value={cardData.cvc}
                            onChange={(e) => handleCardChange('cvc', e.target.value)}
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre en la tarjeta
                        </label>
                        <Input
                          placeholder="Juan Pérez"
                          value={cardData.name}
                          onChange={(e) => handleCardChange('name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Datos de facturación */}
              <Card>
                <CardHeader>
                  <CardTitle>Datos de facturación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={billingData.email}
                        onChange={(e) => setBillingData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <Input
                        placeholder="+598 99 123 456"
                        value={billingData.phone}
                        onChange={(e) => setBillingData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <Input
                      placeholder="Av. 18 de Julio 1234"
                      value={billingData.address}
                      onChange={(e) => setBillingData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad
                      </label>
                      <select 
                        className="w-full h-10 px-3 border border-gray-300 rounded-md"
                        value={billingData.city}
                        onChange={(e) => setBillingData(prev => ({ ...prev, city: e.target.value }))}
                      >
                        <option value="Montevideo">Montevideo</option>
                        <option value="Canelones">Canelones</option>
                        <option value="Maldonado">Maldonado</option>
                        <option value="Colonia">Colonia</option>
                        <option value="Salto">Salto</option>
                        <option value="Treinta y Tres">Treinta y Tres</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        País
                      </label>
                      <Input
                        value="Uruguay"
                        disabled
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botón de pago */}
              <Button 
                type="submit" 
                className="w-full h-12 text-lg"
                disabled={loading}
              >
                {loading ? (
                  'Procesando pago...'
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Pagar UYU {planPrice.toLocaleString()}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Plan {plan?.name}</span>
                  <Badge variant="secondary">{plan?.name}</Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  {plan?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>UYU {planPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (22%)</span>
                    <span>UYU {Math.round(planPrice * 0.22).toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>UYU {Math.round(planPrice * 1.22).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Pago seguro</p>
                      <p>Tus datos están protegidos con encriptación SSL</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StripeCheckout

