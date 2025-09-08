import { useState } from 'react'
import img from '/image-lg.png'
import Modal from './Modal'
import SuccessModal from './SuccessModal'

const SignUp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const closeSuccessModal = () => setIsSuccessModalOpen(false)

  const handleRegistrationSuccess = () => {
    setIsSuccessModalOpen(true)
  }

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center '>
        <div className='flex flex-col lg:flex-row gap-24 lg:gap-40 items-center justify-center px-8 lg:px-16'>
          <img src={img} alt="logo" className='w-[290px] h-auto lg:w-[490px]' />
          <div className='flex flex-col gap-2'>
             <h1 className='text-[55px] lg:text-[77px] font-bold bg-gradient-to-r from-[#D4208C] to-[#E51726] bg-clip-text text-transparent'>
             How to Participate
             </h1>
            <div className='flex gap-4 items-center '>
              <h3 className="bg-gradient-to-r from-[#D4208C] to-[#E51726] bg-clip-text text-transparent font-black text-[33px] lg:text-[55px]">1.</h3>
              <p className="font-semibold text-[19px] lg:text-[33px]">Subscribe to our News</p>
            </div>
            <div className='flex gap-4 items-center'>
              <h3 className="bg-gradient-to-r from-[#D4208C] to-[#E51726] bg-clip-text text-transparent font-black text-[33px] lg:text-[55px]">3.</h3>
              <button 
                onClick={openModal}
                className='px-4 py-2 lg:px-16 lg:py-3 bg-gradient-to-r from-[#D4208C] to-[#E51726] text-white rounded-md font-semibold text-sm lg:text-base hover:opacity-90 transition-opacity'
              >
              SIGN UP
            </button>
            </div>
            <div className='flex gap-4 items-center'>
              <h3 className="bg-gradient-to-r from-[#D4208C] to-[#E51726] bg-clip-text text-transparent font-black text-[33px] lg:text-[55px]">2.</h3>
              <p className="font-semibold text-[19px] lg:text-[33px]">Check your email inbox </p>
            </div>
            
            
            <div className='flex gap-4 items-center'>
              <h3 className="bg-gradient-to-r from-[#D4208C] to-[#E51726] bg-clip-text text-transparent font-black text-[33px] lg:text-[55px]">4.</h3>
              <p className="font-semibold text-[19px] lg:text-[33px]">Wait till September 22</p>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={closeSuccessModal} 
      />
    </>
  )
}

export default SignUp
