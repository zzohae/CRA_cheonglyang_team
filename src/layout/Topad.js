// react
import React from 'react'

export default function Topad({ className = '' }) {
  return (
    <div className={`top-ad ${className}`}>
      <p className="text-center">지금 청량마켓몰 가입하고, <span>온누리상품권</span>으로 바로 <span>10,000원 할인</span> 받아보세요!</p>
    </div>
  )
}
