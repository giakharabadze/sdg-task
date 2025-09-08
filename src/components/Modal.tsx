import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onRegistrationSuccess?: () => void

}

export default function Modal({ isOpen, onClose, onRegistrationSuccess }: ModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })
  const [isLoading, setIsLoading] = useState(false)

 
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

 
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid e-mail'
    return ''
  }

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    return ''
  }

  const validateForm = () => {
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    
    setErrors({ email: emailError, password: passwordError })
    setTouched({ email: true, password: true })
    
    return !emailError && !passwordError
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }))
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(email) }))
    } else {
      setErrors(prev => ({ ...prev, password: validatePassword(password) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      try {
        
        const authResponse = await fetch('https://api.dating.com/identity', {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${btoa(`${email}:${password}`)}`
          }
        })

        if (authResponse.ok) {
          const token = authResponse.headers.get('X-Token')
          if (token) {
            localStorage.setItem('authToken', token)
            window.location.href = `https://www.dating.com/people/#token=${token}`
          }
          onClose()
          return
        }

       
        const response = await fetch('https://api.dating.com/identity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })

        if (response.ok) {
          const token = response.headers.get('X-Token')
          if (token) {
            localStorage.setItem('authToken', token)
          }
          onClose()
          onRegistrationSuccess?.()
        } else {
          const errorData = await response.json()
          console.error('Registration failed:', errorData)
          
          if (errorData.code === 0 && errorData.src === "email" && errorData.desc === "already supplied") {
            onClose()
          } else {
            toast.error('Registration failed. Please try again.')
          }
        }
      } catch (error) {
        console.error('Network error:', error)
        toast.error('Network error. Please check your connection and try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl p-6 lg:p-8 mx-4 w-full max-w-md shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl font-bold"
        >
          ×
        </button>
        
        <div className="text-center mb-6">
          <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
            To register, enter the mail to which our news is sent and set your password
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                placeholder="Example@email.com"
                className={`w-full px-4 py-3 border-b-2 focus:outline-none text-gray-700 placeholder-gray-400 ${
                  errors.email && touched.email 
                    ? 'border-red-500' 
                    : 'border-gray-300 focus:border-[#D4208C]'
                }`}
              />
              {errors.email && touched.email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
              )}
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                placeholder="Password"
                className={`w-full px-4 py-3 border-b-2 focus:outline-none text-gray-700 placeholder-gray-400 ${
                  errors.password && touched.password 
                    ? 'border-red-500' 
                    : 'border-gray-300 focus:border-[#D4208C]'
                }`}
              />
              {errors.password && touched.password && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
              )}
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-gradient-to-r from-[#D4208C] to-[#E51726] text-white rounded-lg font-semibold text-sm lg:text-base transition-opacity ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-90'
            }`}
          >
            {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  )
}
