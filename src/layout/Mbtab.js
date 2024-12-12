// react
import React, { useEffect } from 'react';
// modules
import { Link } from 'react-router-dom';
// data
import allData from '../db/allData.json';
// UIs
import { Btn } from '../component/commonUI';
// svg
import { ReactComponent as Close } from '../asset/svg/common/close.svg';
import { ReactComponent as Logout } from '../asset/svg/common/logout.svg';
import { ReactComponent as Login } from '../asset/svg/common/login.svg';
import { ReactComponent as Mypage } from '../asset/svg/common/m_mypage.svg';
import { ReactComponent as Del } from '../asset/svg/common/m_del.svg';
import { ReactComponent as Order } from '../asset/svg/common/m_order.svg';
import { ReactComponent as Cart } from '../asset/svg/common/m_cart.svg';
import { ReactComponent as Arrow } from '../asset/svg/common/arrow.svg';
// style
import styles from './Mbtab.module.scss';


export default function Mbtab({ isOpen, toggleMenu }) {

  //기존 스크롤 비활성화
  useEffect(() => {
    const htmlElement = document.documentElement;
  
    if (isOpen) {
      htmlElement.style.overflow = 'hidden';
    } else {
      htmlElement.style.overflow = 'auto';
    }
  
    return () => {
      htmlElement.style.overflow = 'auto'; // 컴포넌트 언마운트 시 초기화
    };
  }, [isOpen]);

  return (
    <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
      <div className={`${styles.menuContent} ${isOpen ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}>

        <div className="container d-flex flex-column gap-2 gx-4">

          <div className={`${styles.close} d-flex align-items-center justify-content-between`}>
            <Btn version='v2' className='d-flex align-items-center gap-2'><Logout /><span className='fs-h5 fw-light'>로그아웃</span></Btn>
            <button className={`${styles.closeButton}`} onClick={toggleMenu}><Close /></button>
          </div>

          {/* 로그인 전 */}
          <div className={`${styles.login} d-flex justify-content-center align-items-center w-100`}>
            <div>
            <img className={`${styles.cuponImg}`} src="/asset/img/2000cupon_img.png" alt="2000원 쿠폰" />
            </div>
            <div  className='d-flex flex-column justify-content-center align-items-center'>
            <div className='fs-h5'>지금 회원가입 하시고</div>
            <div  className='fs-h5'><span className='fw-bold'>2000원</span> 쿠폰 받아가세요!</div>
            </div>

            <div className='d-flex gap-2'>
            <Btn version='v2' className='gap-2'><Login /><span className='fs-h5 fw-light'>로그인</span></Btn>
            <Btn version='v2' className='gap-2'><Login /><span className='fs-h5 fw-light'>회원가입</span></Btn>
            </div>
          </div>

  
          {/* 로그인 후 */}
          <div className={`${styles.mbnav}`}>
            <div className={`${styles.icon}`}>
              <Mypage className={`${styles.iconSvg}`} /> 
              <span>마이페이지</span>
            </div>
            <div className={`${styles.icon}`}>
              <Cart className={`${styles.iconSvg}`} /> 
              <span>장바구니</span>
            </div>
            <div className={`${styles.icon}`}>
              <Order className={`${styles.iconSvg}`} /> 
              <span>주문내역</span>
            </div>
            <div className={`${styles.icon}`}>
              <Del className={`${styles.iconSvg}`} /> 
              <span>배달서비스</span>
            </div>
          </div>
  
          <div>
            <div className="row gx-2 gy-2">
              {allData.navdata.promotionmenu.map((v, i) => (
                <div className="col-6" key={i}>
                  <Link to={v.linkto} className="text-decoration-none" onClick={toggleMenu}>
                    <div className={`${styles.icon} ${styles.text} w-100`}>
                      <span>{v.title}</span>
                      <Arrow style={{ height: '16px' }} />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
  
          <div className="category"><h3 className="fs-h3 mt-3 pb-3 border-bottom">상품 카테고리</h3></div>
  
          <div className={`${styles.scrollContainer} d-flex flex-column`}>
            <ul className={`${styles.hovermenu}`}>
              {allData.navdata.category.submenu.map((v, i) => (
                <li className={`${styles.menu}`} key={i}>
                  <Link to={`/products/${v.linkto}`} className="d-block" onClick={toggleMenu}>
                    {v.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
        </div>
      </div>
    </div>
  );  
}