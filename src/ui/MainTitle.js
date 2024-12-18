// react
import React from 'react'

export default function MainTitle({ textColor, children, nomargin }) {
  return (
    <div className={`d-flex flex-column ${nomargin ? '' : 'mb-20 mb-lg-30 mb-lg-50'}`}>
      <i className="bi bi-circle-fill" style={{ color: textColor, fontSize: '0.75rem'}}></i>
      <h2 className='maintitle fs-h1'>
        {children}</h2>
    </div>
  )
}
