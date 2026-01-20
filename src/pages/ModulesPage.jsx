import Header from '../components/Header'
import { ArrowLeftIcon, ShoppingCartIcon } from '../components/Icons'

function ModulesPage({ services, cart, onToggleService, onNavigate, subtotal }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR').format(price)
    }

    const cartServices = cart.map(id => services.find(s => s.id === id)).filter(Boolean)

    return (
        <div className="modules-page fade-in">
            <Header />
            <main className="container">
                <button className="back-button" onClick={() => onNavigate('welcome')}>
                    <ArrowLeftIcon />
                    Geri Dön
                </button>

                <div className="page-header">
                    <h1 className="page-title">Hizmet Modüllerini Seçin</h1>
                    <p className="page-subtitle">İhtiyacınıza göre modülleri seçin ve sepetinize ekleyin</p>
                </div>

                <div className="modules-layout">
                    <div className="modules-grid">
                        {services.map((service) => {
                            const IconComponent = service.IconComponent
                            return (
                                <div
                                    key={service.id}
                                    className={`service-card ${cart.includes(service.id) ? 'selected' : ''}`}
                                    onClick={() => onToggleService(service.id)}
                                >
                                    <div className="service-icon">
                                        <IconComponent />
                                    </div>
                                    <h3 className="service-name">{service.name}</h3>
                                    <p className="service-description">{service.description}</p>

                                    <ul className="service-features">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>

                                    <div className="service-price">
                                        <span className="service-price-amount">{formatPrice(service.price)} TL</span>
                                        <span className="service-price-suffix">+ KDV</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <aside className="cart-sidebar">
                        <h2 className="cart-title">
                            Sepetiniz
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </h2>

                        {cart.length === 0 ? (
                            <div className="cart-empty">
                                <div className="cart-empty-icon">
                                    <ShoppingCartIcon />
                                </div>
                                <p>Sepetiniz boş</p>
                                <p className="text-sm text-muted mt-sm">Modül seçmek için kartlara tıklayın</p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cartServices.map((service) => (
                                        <div key={service.id} className="cart-item">
                                            <span className="cart-item-name">{service.name}</span>
                                            <span className="cart-item-price">{formatPrice(service.price)} TL</span>
                                        </div>
                                    ))}
                                </div>

                                <hr className="cart-divider" />

                                <div className="cart-total">
                                    <span className="cart-total-label">Ara Toplam</span>
                                    <span className="cart-total-amount">{formatPrice(subtotal)} TL</span>
                                </div>

                                <p className="text-sm text-muted mb-lg">KDV ödeme sayfasında hesaplanacaktır</p>

                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={() => onNavigate('payment')}
                                >
                                    Ödemeye Geç
                                </button>
                            </>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    )
}

export default ModulesPage
