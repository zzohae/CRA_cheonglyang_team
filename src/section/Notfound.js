// react
import React from 'react'
// modules
import { Link } from 'react-router-dom'
// Components
import Title from '../component/Title'

export default function Notfound() {
  return (
    <section className='d-flex flex-column align-items-center'>
      <div className='container d-flex flex-column align-items-center'>
        <div className='text-center mb-5 notyet'>
          <h2>이 페이지는 오픈 준비 중입니다.</h2>
          <img src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/asset/img/404/notfound.png' : '/asset/img/404/notfound.png'} alt='서비스 준비 중' />
        </div>
        <div className='more-proj col-9 mb-5'>
          <Title h2size='var(--font-size-26, 1.625rem)'>청량마켓몰 더 둘러보기</Title>
          <div className='linkwrap d-flex flex-column flex-lg-row mt30'>
            <Link
            to='products'
            style={{backgroundImage: 'url(/asset/img/404/404ban1.jpg', backgroundColor: '#FBE4F2'}}
            className='col-lg-6'>
              신규상품
            </Link>
            <Link
            to=''
            style={{backgroundImage: 'url(/asset/img/404/404ban2.jpg', backgroundColor: '#C7D1FA'}}
            className='col-lg-6'>
              고객센터
            </Link>
          </div>
        </div>
        <div className='more-team col-9 mb-5'>
          <Title h2size='var(--font-size-26, 1.625rem)'>프로젝트 더 알아보기</Title>
          <div className='linkwrap d-flex flex-column flex-lg-row mt30'>
          <Link
            to=''
            style={{backgroundImage: 'url(/asset/img/404/404ban3.jpg', backgroundColor: '#FCF2BC'}}
            className='col-lg-6'>
              Github
            </Link>
            <Link
            to=''
            style={{backgroundImage: 'url(/asset/img/404/404ban4.jpg', backgroundColor: '#EEEEEE'}}
            className='col-lg-6'>
              Figma
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
