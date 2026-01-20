import Header from '../components/Header'
import { CheckIcon } from '../components/Icons'

const FEATURES = [
    'Ürün yükleme',
    'Müşteri transferi',
    'Hazır temaların kurulumu',
    '301 yönlendirmeleri',
    'Kargo/Vergi ayarları',
    'Domain bağlama',
    'Ödeme/Sanal POS entegrasyonları',
    'Bireysel eğitim',
    'Social Login kurulum'
]

function WelcomePage({ onNavigate, activeService, remainingDays }) {
    // Tarih formatlama
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    return (
        <div className="welcome-page fade-in">
            <Header />
            <main className="container">
                <div className="welcome-layout">
                    <div className="welcome-content">
                        <div className="welcome-header">
                            <div className="check-icon">
                                <CheckIcon />
                            </div>
                            <h1 className="welcome-title">Hoş geldin!</h1>
                        </div>

                        <p className="welcome-description">
                            Premium Onboarding hizmeti ile ikas mağazanızı 2 ay boyunca uzman ekiplerimizle hızla
                            satışa hazır hale getirin. Hızlı kurulum, doğru yapılandırma ve başarıya odaklı rehberlik ile
                            zaman kazanın.
                        </p>

                        <ul className="feature-list">
                            {FEATURES.map((feature, index) => (
                                <li key={index} className="feature-item">{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="summary-card">
                        <h2 className="summary-title">Premium Onboarding</h2>
                        <p className="summary-subtitle">2 ay boyunca hızlı başlangıç ve satışa hazır mağaza</p>

                        <div className="summary-price">
                            <span className="price-amount">25.000 TL</span>
                            <span className="price-suffix">+ KDV</span>
                            <span className="price-suffix">tek sefer</span>
                        </div>

                        {/* Aktif Hizmet Durumu */}
                        {activeService && remainingDays > 0 ? (
                            <>
                                <div className="service-status active">
                                    <h4 className="service-status-title">Hizmet aktif</h4>
                                    <p className="service-status-info">
                                        Bitiş: {formatDate(activeService.endDate)} • {remainingDays} gün kaldı
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="summary-note">
                                    2 ay sonunda tekrar satın alarak desteği uzatabilirsiniz.
                                </div>

                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    onClick={() => onNavigate('modules')}
                                >
                                    Hizmeti Satın Al
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default WelcomePage
