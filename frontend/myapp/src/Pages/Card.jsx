
import React from 'react'
import { BsCodeSlash } from 'react-icons/bs'
import { FaMobileAlt, FaShoppingCart, FaUserFriends } from 'react-icons/fa'

const features = [
  { icon: <FaShoppingCart />, text: 'Made for Small Shops' },
  { icon: <FaMobileAlt />, text: 'Mobile Friendly' },
  { icon: <BsCodeSlash />, text: 'No Tech Skills Needed' },
  { icon: <FaUserFriends />, text: 'Built for Your Customers' }
]

function Card() {
  return (
    <>
      <section>
        <div className="flex flex-col justify-center items-center text-blue-900 p-9 bg-[#fdf1e2] text-center mb-12">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-[Playfair_Display] font-bold tracking-wide"
            data-aos="fade-up"
          >
            WHY CHOOSE US ?
          </h1>

          <div className="text-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
            {features.map((ftr, idx) => (
              <div
                key={idx}
                className={`bg-white shadow-lg rounded-2xl flex items-center gap-3 text-black m-3 p-4 justify-center
                ${idx === 3 ? 'md:col-start-2' : ''}`}
              >
                <span className="text-2xl text-blue-800">{ftr.icon}</span>
                <span className="text-lg font-medium">{ftr.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Card
