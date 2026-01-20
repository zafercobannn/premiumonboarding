import { useEffect, useState } from 'react'

function Confetti() {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        const colors = ['#22c55e', '#0C2C55', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4']
        const newParticles = []

        for (let i = 0; i < 100; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 6 + Math.random() * 8,
                rotation: Math.random() * 360
            })
        }

        setParticles(newParticles)

        // Cleanup after animation
        const timer = setTimeout(() => {
            setParticles([])
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    if (particles.length === 0) return null

    return (
        <div className="confetti-container">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="confetti-particle"
                    style={{
                        left: `${particle.x}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                        backgroundColor: particle.color,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        transform: `rotate(${particle.rotation}deg)`
                    }}
                />
            ))}
        </div>
    )
}

export default Confetti
