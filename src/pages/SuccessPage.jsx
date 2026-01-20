
import Confetti from '../components/Confetti'
import { CheckCircleIcon } from '../components/Icons'

function SuccessPage({ cartServices, total, onNavigate, activeService, remainingDays }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR').format(Math.round(price))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    return (
        <div className="success-page fade-in">
            <Confetti />

            <main className="container">
                <div className="success-icon">
                    <CheckCircleIcon />
                </div>

                <h1 className="success-title">Ödeme Başarılı!</h1>
                <p className="success-message">
                    Premium Onboarding hizmetiniz için ödemeniz başarıyla alındı.
                    Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>

                {activeService && (
                    <div className="service-status-banner">
                        <div className="service-status active">
                            <h4 className="service-status-title">Hizmet aktif</h4>
                            <p className="service-status-info">
                                Bitiş: {formatDate(activeService.endDate)} • {remainingDays} gün kaldı
                            </p>
                        </div>
                    </div>
                )}

                <div className="success-summary">
                    <h3 className="success-summary-title">Satın Aldığınız Hizmetler</h3>

                    {cartServices.map((service) => {
                        const IconComponent = service.IconComponent
                        return (
                            <div key={service.id} className="success-item">
                                <span className="success-item-icon"><IconComponent /></span>
                                {service.name}
                            </div>
                        )
                    })}

                    <div className="success-total">
                        <span>Ödenen Tutar</span>
                        <span className="success-total-amount">{formatPrice(total)} TL</span>
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => onNavigate('welcome')}
                >
                    Ana Sayfaya Dön
                </button>
            </main>
        </div>
    )
}

export default SuccessPage
