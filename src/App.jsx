import { useState } from 'react'
import Landing from './components/Landing'
import Acknowledgement from './components/Acknowledgement'
import ExamSupport from './components/ExamSupport'
import MemoryTimeline from './components/MemoryTimeline'
import ApologyLetter from './components/ApologyLetter'
import ErrorLog from './components/ErrorLog'
import Footer from './components/Footer'

const pages = [
  { component: Landing, id: 'landing' },
  { component: Acknowledgement, id: 'acknowledgement' },
  { component: ExamSupport, id: 'exam-support' },
  { component: MemoryTimeline, id: 'memory-timeline' },
  { component: ApologyLetter, id: 'apology-letter' },
  { component: ErrorLog, id: 'error-log' },
  { component: Footer, id: 'footer' },
]

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState('next') // 'next' or 'prev'

  const goToPage = (targetPage, dir) => {
    if (isTransitioning || targetPage < 0 || targetPage >= pages.length) return
    setDirection(dir)
    setIsTransitioning(true)

    // Short delay for exit animation
    setTimeout(() => {
      setCurrentPage(targetPage)
      // Allow enter animation
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 400)
  }

  const goNext = () => goToPage(currentPage + 1, 'next')
  const goPrev = () => goToPage(currentPage - 1, 'prev')

  const CurrentComponent = pages[currentPage].component
  const isFirst = currentPage === 0
  const isLast = currentPage === pages.length - 1

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Page content */}
      <div
        className="min-h-screen transition-all duration-500 ease-out"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning
            ? direction === 'next'
              ? 'translateY(40px)'
              : 'translateY(-40px)'
            : 'translateY(0)',
        }}
      >
        <CurrentComponent onNext={goNext} />
      </div>

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        {pages.map((page, index) => (
          <button
            key={page.id}
            onClick={() => goToPage(index, index > currentPage ? 'next' : 'prev')}
            className="group relative w-3 h-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-150"
            style={{
              background: index === currentPage
                ? 'linear-gradient(135deg, #c084fc, #f0abfc)'
                : 'rgba(180, 160, 200, 0.3)',
              boxShadow: index === currentPage
                ? '0 0 12px rgba(192, 132, 252, 0.5)'
                : 'none',
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      {!isFirst && (
        <button
          onClick={goPrev}
          className="fixed left-6 bottom-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(192, 132, 252, 0.3)',
          }}
          aria-label="Previous section"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c084fc' }}>
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      {!isLast && currentPage > 0 && (
        <button
          onClick={goNext}
          className="fixed right-20 bottom-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(192, 132, 252, 0.3)',
          }}
          aria-label="Next section"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c084fc' }}>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}

      {/* Page indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <span
          className="font-body text-xs tracking-wider px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(192, 132, 252, 0.2)',
            color: 'rgba(192, 132, 252, 0.8)',
          }}
        >
          {currentPage + 1} / {pages.length}
        </span>
      </div>
    </div>
  )
}

export default App
