// react
import React from 'react'
// data
import allData from '../../db/allData.json'
// Component
import SwiperBanner from '../../component/SwiperBanner'

export default function C1visual() {
  const pagination1 = {
    clickable: true,
    renderBullet: function(index, className) {
      return `<span class="${className}">${allData.mainRWDbanner.bannerData[index].alt}</span>`;
    },
  };
  return (
    <div className='mainvisual'>
      <SwiperBanner
        datakey={allData.mainRWDbanner}
        viewslides={1}
        pagination={pagination1}
        hasrwd={true}
        ></SwiperBanner>
    </div>
  )
}
