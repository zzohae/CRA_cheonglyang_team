// react
import React, { useEffect } from 'react'
// modules
import { Link } from 'react-router-dom'
// data
import allData from '../db/allData.json'
// UIs
import Util from '../component/Util';
import { Btn } from '../component/commonUI';
// svg
import { ReactComponent as Logo } from '../asset/svg/common/BI_desktop_Default.svg';
import { ReactComponent as Delivericon } from '../asset/svg/truck.svg'
import { ReactComponent as Menuline } from '../asset/svg/common/menu_line.svg'
// Components
import Searchbox from '../component/Searchbox';

export default function Header({ keyword, setKeyword, incartNum }) {
  return (
    <header className='d-flex align-items-center'>
      <div className="hdtop container d-flex justify-content-between align-items-center">
        <h1 className='order-1 order-lg-0'><a href="/" className='d-flex justify-content-center align-items-center'><Logo width='150' height='53.708'></Logo></a></h1>
        <Searchbox className='order-0 order-lg-1' keyword={keyword} setKeyword={setKeyword}></Searchbox>
        <Util className='order-2 util d-none d-lg-flex align-items-center justify-content-end' incartNum={incartNum}></Util>
        <Menuline width='28' height='28' className='mobileallmenu d-block d-lg-none order-3'></Menuline>
      </div>
      <div className="hdbtm container">
        <nav className="gnb d-none d-lg-flex justify-content-between align-items-center">
            <div className='mainmenu position-relative'>
              <Link to={allData.navdata.category.linkto} className='category d-flex justify-content-start align-items-center'><Menuline width='20' height='14' className='me-2'></Menuline>{allData.navdata.category.title}</Link>
              <ul className='hovermenu'>
                  {
                    allData.navdata.category.submenu.map((v, i) => {
                      return(
                        <li className='menu d-flex' key={i}>
                            <Link to={`/products/${v.linkto}`} className='d-block'>{v.title}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
            </div>
            <ul className=' allmenu'>
            {
              allData.navdata.promotionmenu.map((v, i)=>{
                  return(
                    <li className='menu d-flex' key={i}>
                        <Link  to={v.linkto}>{v.title}</Link>
                    </li>
                  )
              })
            }
          </ul>
          <div className='delivwrap'>
          <Btn version='v2' className='delivery'>
            <Delivericon width='24' height='24'></Delivericon>
            {allData.delivery.title}
          </Btn>
          </div>
        </nav> 
      </div>
    </header>
  )
}
