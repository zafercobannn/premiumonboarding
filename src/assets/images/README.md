# Images Klasörü

Bu klasöre logo ve diğer görselleri ekleyebilirsiniz.

## Logo Ekleme

1. Logo dosyanızı bu klasöre ekleyin (örn: `logo.png`, `logo.svg`)
2. `src/components/Header.jsx` dosyasında import edin:

```jsx
import logo from '../assets/images/logo.png'
// veya
import logo from '../assets/images/logo.svg'
```

3. Logo'yu kullanın:

```jsx
<img src={logo} alt="Logo" className="logo-image" />
```

## Önerilen Boyutlar

- **Logo**: max 200px genişlik, 40px yükseklik
- **Format**: SVG (tercih) veya PNG (şeffaf arka plan)
