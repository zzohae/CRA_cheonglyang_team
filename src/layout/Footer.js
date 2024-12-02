// react
import React from 'react'
// modules
import { Link } from 'react-router-dom'
// data
import ftData from '../db/allData.json'
// UIs
import { Btn } from '../component/commonUI';
// svg
import { ReactComponent as Logo } from '../asset/svg/common/logo_wide.svg';
import { ReactComponent as Linksvg } from '../asset/svg/common/link.svg';
import { ReactComponent as Figma } from '../asset/svg/common/figma.svg';
import { ReactComponent as Git } from '../asset/svg/common/git.svg';
import { ReactComponent as Insta } from '../asset/svg/common/instagram.svg';

export default function Ft() {
  return (
    <footer className='d-flex align-items-center justify-content-center'>
      <div className="container px-2 px-md-0">
      <div className='fttop container  d-flex justify-content-between align-items-start row gx-0 mb-3'>
            <h1 className='order-1 order-lg-0 col-6 col-md-4 col-lg-2 mb-4'><a href="/"><Logo width='150' height='53.708' className='logo-white'></Logo></a></h1>
            <div className='col-auto mb-4'>
                <h3 className='fs-h3' >회사 정보</h3>
                <dl>
                  {ftData.companyInfo.map((v, i) => (
                    <div className="ftinfo" key={i}>
                      <dt className="ftinfo-bold fs-h6">{v.label}</dt>
                      <dd>{v.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className='col-6 col-md-4 col-lg-2 mb-4'>
                <h3 className='fs-h3'>고객센터</h3>
                <h4 className="fs-h4">02-962-7100</h4>
                <dl>
                  {ftData.agent.map((v, i) => (
                    <div className="ftinfo" key={i}>
                      <dt className="ftinfo-bold fs-h6">{v.label}</dt>
                      <dd>{v.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className='col-6 col-md-4 col-lg-2 mb-4'>
                <h3 className='fs-h3'>고객 지원</h3> 
                  <ul>
                    {ftData.support.map((v, i) => (
                      <li key={i} className='fs-h5'>
                      <Link to={v.linkto} className='cslink'>{v.label} <Linksvg /></Link>
                      </li>
                    ))}
                </ul>
            </div>

            
            <div className='col-6 col-sm-auto mb-4'>
              <div className='d-flex gap-3 mb-3'>
                <a className='linkIcon' href="https://www.figma.com/design/hODaA3aqcUvTjZta1lzVWf/%5BKDT%5D-%ED%94%8C%EB%9E%AB%ED%8F%BC%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=0-1&m=dev" target='_blank' rel='noreferrer'><Figma /></a>
                <a className='linkIcon' href="https://github.com/zzohae/CRA_cheonglyang_team.git" target='_blank' rel='noreferrer'><Git /></a>
                <a className='linkIcon' href="##"><Insta /></a>
              </div>

              <Btn version='v3' className='sitemap'>사이트맵</Btn>
            </div>

        </div>

        <div className='fttop container  d-flex justify-content-between align-items-end'>
              <p className="copyright opacity-50">© 2024 그린컴퓨터아트학원 신도림 KDT 3기 team 청량마켓. ALL RIGHTS RESERVED.</p>
              <Btn version='v3' className='sitemap d-none d-lg-flex'>상품 문의하기</Btn>
        </div>

      </div>

    </footer>
  )
}
