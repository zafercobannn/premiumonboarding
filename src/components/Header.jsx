import logo from '../assets/images/ikas-logo-1-jpg1699950890.69780.jpg'

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <a href="/" className="logo">
                        <img src={logo} alt="ikas Logo" className="logo-image" />
                        <span>Premium Onboarding</span>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header
