// react
import React from 'react'
// Contents
import Topad from '../../layout/Topad'
import C1visual from './C1visual'
import C2mdpick from './C2mdpick'
import C3best from './C3best'
import C4barban from './C4barban'
import C5livecom from './C5livecom'
import C6review from './C6review'
// style
import './mainpage.scss'

export default function Mainpage({ incartNum, setIncartNum }) {
  return (
    <div>
      <C1visual></C1visual>
      <Topad className='d-sm-none'></Topad>
      <div className='d-flex flex-column align-items-center overflow-hidden mainPageLayout'>
        <C2mdpick></C2mdpick>
        <C3best incartNum={incartNum} setIncartNum={setIncartNum}></C3best>
        <C4barban></C4barban>
        <C5livecom incartNum={incartNum} setIncartNum={setIncartNum}></C5livecom>
        <C6review incartNum={incartNum} setIncartNum={setIncartNum}></C6review>
      </div>
    </div>
  )
}
