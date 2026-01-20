import { useState } from 'react'
import './App.css'
import WelcomePage from './pages/WelcomePage'
import ModulesPage from './pages/ModulesPage'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import ProgressBar from './components/ProgressBar'
import { GraduationIcon, LinkIcon, PaletteIcon, PackageIcon } from './components/Icons'

// Hizmet modülleri tanımları - minimal ikonlarla
export const SERVICES = [
  {
    id: 'panel-egitim',
    name: 'Birebir Panel Eğitim',
    price: 3000,
    description: 'Uzman eğitmenle birebir panel kullanım eğitimi. ikas panelini A\'dan Z\'ye öğrenin.',
    IconComponent: GraduationIcon,
    features: ['45 dakikalık canlı eğitim']
  },
  {
    id: 'google-meta',
    name: 'Google ve Meta Bağlantıları',
    price: 3000,
    description: 'Google Analytics, Google Ads ve Meta Pixel entegrasyonlarının kurulumu.',
    IconComponent: LinkIcon,
    features: ['Meta Pixel kurulumu', '30 dakikalık bir toplantı sırasında mevcut Google ve Meta hesaplarının gerekli bağlantıları yapılır.']
  },
  {
    id: 'tema-tasarim',
    name: 'ikas Hazır Tema Tasarımı',
    price: 10000,
    description: 'ikas\'ın birbirinden farklı hazır teması ile mağazanızı öne çıkarın.',
    IconComponent: PaletteIcon,
    features: ['SEO optimizasyonu']
  },
  {
    id: 'urun-musteri-301',
    name: 'Ürün, Müşteri ve 301',
    price: 9000,
    description: 'Mevcut verilerinizin aktarımı ve 301 yönlendirmelerinin kurulumu.',
    IconComponent: PackageIcon,
    features: ['Ürün aktarımı', 'Müşteri aktarımı', '301 yönlendirmeleri']
  }
]

// KDV oranı
export const KDV_RATE = 0.20

// Hizmet süresi (gün)
export const SERVICE_DURATION_DAYS = 65

// Örnek kupon kodları
export const COUPON_CODES = {
  'IKAS10': { discount: 0.10, description: '%10 indirim' },
  'IKAS20': { discount: 0.20, description: '%20 indirim' },
  'PREMIUM50': { discount: 0.50, description: '%50 indirim' }
}

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [cart, setCart] = useState([])
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  // Aktif hizmet durumu - satın alma sonrası set edilir
  const [activeService, setActiveService] = useState(null)

  // Sepete ekleme/çıkarma
  const toggleService = (serviceId) => {
    setCart(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId)
      }
      return [...prev, serviceId]
    })
  }

  // Sepetteki toplam (KDV hariç)
  const getSubtotal = () => {
    return cart.reduce((total, id) => {
      const service = SERVICES.find(s => s.id === id)
      return total + (service?.price || 0)
    }, 0)
  }

  // İndirim tutarı
  const getDiscount = () => {
    if (!appliedCoupon) return 0
    return getSubtotal() * appliedCoupon.discount
  }

  // KDV tutarı
  const getKDV = () => {
    return (getSubtotal() - getDiscount()) * KDV_RATE
  }

  // Genel toplam
  const getTotal = () => {
    return getSubtotal() - getDiscount() + getKDV()
  }

  // Kupon uygulama
  const applyCoupon = (code) => {
    const coupon = COUPON_CODES[code.toUpperCase()]
    if (coupon) {
      setAppliedCoupon({ code: code.toUpperCase(), ...coupon })
      return true
    }
    return false
  }

  // Kupon kaldırma
  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  // Sayfa değiştirme
  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // Sipariş tamamlama - hizmet aktifleştir
  const completeOrder = () => {
    const purchaseDate = new Date()
    const endDate = new Date(purchaseDate)
    endDate.setDate(endDate.getDate() + SERVICE_DURATION_DAYS)

    setActiveService({
      purchaseDate: purchaseDate.toISOString(),
      endDate: endDate.toISOString(),
      services: getCartServices(),
      total: getTotal()
    })

    navigateTo('success')
  }

  // Kalan gün hesaplama
  const getRemainingDays = () => {
    if (!activeService) return 0
    const now = new Date()
    const end = new Date(activeService.endDate)
    const diffTime = end - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  // Sepetteki hizmetleri getir
  const getCartServices = () => {
    return cart.map(id => SERVICES.find(s => s.id === id)).filter(Boolean)
  }

  // Welcome sayfasında progress bar gösterme
  const showProgressBar = currentPage !== 'welcome'

  return (
    <div className="app">
      {showProgressBar && <ProgressBar currentPage={currentPage} />}

      {currentPage === 'welcome' && (
        <WelcomePage
          onNavigate={navigateTo}
          activeService={activeService}
          remainingDays={getRemainingDays()}
        />
      )}

      {currentPage === 'modules' && (
        <ModulesPage
          services={SERVICES}
          cart={cart}
          onToggleService={toggleService}
          onNavigate={navigateTo}
          subtotal={getSubtotal()}
        />
      )}

      {currentPage === 'payment' && (
        <PaymentPage
          cartServices={getCartServices()}
          subtotal={getSubtotal()}
          discount={getDiscount()}
          kdv={getKDV()}
          total={getTotal()}
          appliedCoupon={appliedCoupon}
          onApplyCoupon={applyCoupon}
          onRemoveCoupon={removeCoupon}
          onNavigate={navigateTo}
          onCompleteOrder={completeOrder}
        />
      )}

      {currentPage === 'success' && (
        <SuccessPage
          cartServices={getCartServices()}
          total={getTotal()}
          onNavigate={navigateTo}
          activeService={activeService}
          remainingDays={getRemainingDays()}
        />
      )}
    </div>
  )
}

export default App
