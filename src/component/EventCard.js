// react
import React from 'react';

const EventCard = ({ imgSrc, title, period, isExpired }) => {
  return (
    <div className={`col-6 col-lg-4 d-flex flex-column position-relative eventCard ${isExpired ? 'event-expired' : ''}`}>
      <img src={imgSrc} alt={title} className="event-img" />
      <div className='event-row d-flex py-2'>
        <h2 className='fs-h4'>{title}</h2>
        <p className='fs-h5'>{period}</p>
      </div>
    </div>
  );
};

export default EventCard;