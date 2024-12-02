// react
import React from 'react'

export default function Title({ children, h2size }) {
  return (
    <div className='d-flex'>
          <i className="bi bi-circle-fill" style={{ color: '#214AEE', fontSize: '0.75rem'}}></i>
          <h2 style={{ fontSize: h2size, fontWeight: 'bold', margin: '15px 0 0' }}>
            {children}
            <i className="bi bi-chevron-right" style={{ color: '#214AEE', marginLeft: '8px', fontSize: '2rem' }}></i>
          </h2>
    </div>
  )
}