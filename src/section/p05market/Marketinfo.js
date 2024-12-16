// react
import React from 'react';
// modules
import { Link, useParams } from 'react-router-dom';
// data
import allcategory from '../../db/allData.json';
// Contents
import AboutInfo from './C1aboutinfo';
import StoreInfo from './C3storeinfo';
// style
import './marketinfo.scss';

export default function Marketinfo() {
  const { en } = useParams();

  const submenu = allcategory.navdata.promotionmenu.find(
    (menu) => menu.linkto === 'aboutus/aboutinfo'
  )?.submenu;

  const getComponent = (en) => {
    switch (en) {
      case 'aboutinfo':
        return <AboutInfo />;
      case 'store_info':
        return <StoreInfo />;
      default:
        return <AboutInfo />;
    }
  };

  return (     
    <div className="d-flex flex-column align-items-center">
      <div className="container mycontainer">
        <ul className="d-flex justify-content-start mytab">
          {submenu &&
            submenu.map((item, index) => (
              <li key={index}
                className={`d-flex justify-content-center align-items-center ${
                  en === item.linkto ? 'active' : ''}`}>
                <Link to={`/aboutus/${item.linkto}`}>{item.title}</Link>
              </li>
            ))}
        </ul>

        <div className="content">{getComponent(en)}</div>
      </div>
    </div>
  );
}
