import { useEffect } from 'react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      
      <div className="relative bg-white rounded-2xl p-6 lg:p-8 mx-4 w-full max-w-md shadow-2xl text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl font-bold transition-colors"
        >
          ×
        </button>
        
        
        <div className="mb-4">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D4208C] to-[#E51726] bg-clip-text text-transparent mb-4">
            Thank You
          </h2>
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
            To complete registration, please check your e-mail
          </p>
        </div>
      </div>
    </div>
  )
}
