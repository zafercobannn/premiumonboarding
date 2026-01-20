const STEPS = [
    { id: 'welcome', label: 'Başlangıç', number: 1 },
    { id: 'modules', label: 'Modül Seçimi', number: 2 },
    { id: 'payment', label: 'Ödeme', number: 3 },
    { id: 'success', label: 'Tamamlandı', number: 4 }
]

function ProgressBar({ currentPage }) {
    const currentIndex = STEPS.findIndex(step => step.id === currentPage)

    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                {STEPS.map((step, index) => {
                    const isCompleted = index < currentIndex
                    const isActive = index === currentIndex

                    return (
                        <div key={step.id} className="progress-step">
                            <div className={`progress-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                                {isCompleted ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <span>{step.number}</span>
                                )}
                            </div>
                            <span className={`progress-label ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                                {step.label}
                            </span>
                            {index < STEPS.length - 1 && (
                                <div className={`progress-line ${isCompleted ? 'completed' : ''}`} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProgressBar
