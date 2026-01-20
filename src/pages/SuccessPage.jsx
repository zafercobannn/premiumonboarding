import Header from '../components/Header'
import { CheckCircleIcon } from '../components/Icons'

function SuccessPage({ cartServices, total, onNavigate }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR').format(Math.round(price))
    }

    return (
        <div className="success-page fade-in">
            <Header />
            <main className="container">
                <div className="success-icon">
                    <CheckCircleIcon />
                </div>

                <h1 className="success-title">Ödeme Başarılı!</h1>
                <p className="success-message">
                    Premium Onboarding hizmetiniz için ödemeniz başarıyla alındı.
                    Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>

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
