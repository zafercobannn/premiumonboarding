import { useState } from 'react'

import { ArrowLeftIcon } from '../components/Icons'

function PaymentPage({
    cartServices,
    subtotal,
    discount,
    kdv,
    total,
    appliedCoupon,
    onApplyCoupon,
    onRemoveCoupon,
    onNavigate,
    onCompleteOrder
}) {
    const [couponCode, setCouponCode] = useState('')
    const [couponError, setCouponError] = useState('')
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    })
    const [formErrors, setFormErrors] = useState({})

    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR').format(Math.round(price))
    }

    const handleCouponApply = () => {
        setCouponError('')
        if (!couponCode.trim()) {
            setCouponError('Lütfen bir kupon kodu girin')
            return
        }
        const success = onApplyCoupon(couponCode)
        if (!success) {
            setCouponError('Geçersiz kupon kodu')
        } else {
            setCouponCode('')
        }
    }

    // Kart numarası formatlama (1234 5678 9012 3456)
    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 16)
        const groups = digits.match(/.{1,4}/g)
        return groups ? groups.join(' ') : ''
    }

    // Son kullanma tarihi formatlama (12/22)
    const formatExpiry = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 4)
        if (digits.length >= 2) {
            return digits.slice(0, 2) + '/' + digits.slice(2)
        }
        return digits
    }

    // Sadece harf ve boşluk (isim için)
    const formatName = (value) => {
        return value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '').toUpperCase()
    }

    // Sadece rakam (CVV için)
    const formatCVV = (value) => {
        return value.replace(/\D/g, '').slice(0, 4)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        let formattedValue = value

        switch (name) {
            case 'cardNumber':
                formattedValue = formatCardNumber(value)
                break
            case 'cardName':
                formattedValue = formatName(value)
                break
            case 'expiry':
                formattedValue = formatExpiry(value)
                break
            case 'cvv':
                formattedValue = formatCVV(value)
                break
            default:
                break
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }))

        // Hata temizle
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const errors = {}

        // Kart numarası kontrolü (16 rakam)
        const cardDigits = formData.cardNumber.replace(/\s/g, '')
        if (cardDigits.length !== 16) {
            errors.cardNumber = 'Geçerli bir kart numarası girin'
        }

        // İsim kontrolü
        if (formData.cardName.trim().length < 3) {
            errors.cardName = 'Geçerli bir isim girin'
        }

        // Son kullanma tarihi kontrolü
        const expiryDigits = formData.expiry.replace('/', '')
        if (expiryDigits.length !== 4) {
            errors.expiry = 'AA/YY formatında girin'
        } else {
            const month = parseInt(expiryDigits.slice(0, 2))
            if (month < 1 || month > 12) {
                errors.expiry = 'Geçerli bir ay girin (01-12)'
            }
        }

        // CVV kontrolü
        if (formData.cvv.length < 3) {
            errors.cvv = 'Geçerli bir CVV girin'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            onCompleteOrder()
        }
    }

    const isFormValid =
        formData.cardNumber.replace(/\s/g, '').length === 16 &&
        formData.cardName.trim().length >= 3 &&
        formData.expiry.length === 5 &&
        formData.cvv.length >= 3

    return (
        <div className="payment-page fade-in">

            <main className="container">
                <button className="back-button" onClick={() => onNavigate('modules')}>
                    <ArrowLeftIcon />
                    Modül Seçimine Dön
                </button>

                <div className="page-header">
                    <h1 className="page-title">Ödeme</h1>
                    <p className="page-subtitle">Sipariş bilgilerinizi kontrol edin ve ödemenizi tamamlayın</p>
                </div>

                <div className="payment-layout">
                    <div className="payment-form">
                        {/* Kupon Kodu */}
                        <div className="form-section">
                            <h3 className="form-section-title">Kupon Kodu</h3>

                            {appliedCoupon ? (
                                <div className="coupon-applied">
                                    <div className="coupon-applied-info">
                                        <span>✓</span>
                                        <span className="coupon-applied-code">{appliedCoupon.code}</span>
                                        <span className="text-sm">({appliedCoupon.description})</span>
                                    </div>
                                    <button className="coupon-remove" onClick={onRemoveCoupon}>
                                        Kaldır
                                    </button>
                                </div>
                            ) : (
                                <div className="coupon-section">
                                    <div className="coupon-input-group">
                                        <input
                                            type="text"
                                            placeholder="Kupon kodunuzu girin"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        />
                                        <button className="btn btn-outline" onClick={handleCouponApply}>
                                            Uygula
                                        </button>
                                    </div>
                                    {couponError && <p className="coupon-error">{couponError}</p>}
                                </div>
                            )}
                        </div>

                        {/* Kart Bilgileri */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h3 className="form-section-title">Kart Bilgileri</h3>

                                <div className="form-group">
                                    <label htmlFor="cardNumber">Kart Numarası</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        maxLength="19"
                                        inputMode="numeric"
                                        className={formErrors.cardNumber ? 'input-error' : ''}
                                    />
                                    {formErrors.cardNumber && <p className="field-error">{formErrors.cardNumber}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cardName">Kart Üzerindeki İsim</label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        name="cardName"
                                        placeholder="AD SOYAD"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        className={formErrors.cardName ? 'input-error' : ''}
                                    />
                                    {formErrors.cardName && <p className="field-error">{formErrors.cardName}</p>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="expiry">Son Kullanma Tarihi</label>
                                        <input
                                            type="text"
                                            id="expiry"
                                            name="expiry"
                                            placeholder="AA/YY"
                                            value={formData.expiry}
                                            onChange={handleInputChange}
                                            maxLength="5"
                                            inputMode="numeric"
                                            className={formErrors.expiry ? 'input-error' : ''}
                                        />
                                        {formErrors.expiry && <p className="field-error">{formErrors.expiry}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            maxLength="4"
                                            inputMode="numeric"
                                            className={formErrors.cvv ? 'input-error' : ''}
                                        />
                                        {formErrors.cvv && <p className="field-error">{formErrors.cvv}</p>}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-block"
                            >
                                Ödemeyi Tamamla
                            </button>
                        </form>
                    </div>

                    {/* Sipariş Özeti */}
                    <aside className="order-summary">
                        <h2 className="order-summary-title">Sipariş Özeti</h2>

                        <div className="order-items">
                            {cartServices.map((service) => {
                                const IconComponent = service.IconComponent
                                return (
                                    <div key={service.id} className="order-item">
                                        <span className="order-item-name">
                                            <span className="order-item-icon"><IconComponent /></span>
                                            {service.name}
                                        </span>
                                        <span className="order-item-price">{formatPrice(service.price)} TL</span>
                                    </div>
                                )
                            })}
                        </div>

                        <hr className="order-divider" />

                        <div className="order-row">
                            <span>Ara Toplam</span>
                            <span>{formatPrice(subtotal)} TL</span>
                        </div>

                        {discount > 0 && (
                            <div className="order-row discount">
                                <span>İndirim ({appliedCoupon?.description})</span>
                                <span>-{formatPrice(discount)} TL</span>
                            </div>
                        )}

                        <div className="order-row">
                            <span>KDV (%20)</span>
                            <span>{formatPrice(kdv)} TL</span>
                        </div>

                        <div className="order-row total">
                            <span>Toplam</span>
                            <span className="order-row-amount">{formatPrice(total)} TL</span>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    )
}

export default PaymentPage
