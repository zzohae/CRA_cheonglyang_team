// react
import React from 'react'
// modules
import { Link, useParams } from 'react-router-dom';
// data
import allcategory from '../../db/allData.json';
// Components
import MainTitle from '../../ui/MainTitle';
// Contents
import C1notice from './C1notice';
import C2online from './C2online';
import C3offline from './C3offline';
import C4cardnews from './C4cardnews';
// style
import './news.scss'

export default function News() {
  const { en } = useParams();

  const submenu = allcategory.navdata.promotionmenu.find(
    (menu) => menu.linkto === "news/notice"
  ).submenu;

  const selectedMenu = submenu.find((item) => item.linkto === en);

  const getComponent = (en) => {
    switch (en) {
      case 'notice':
        return <C1notice />;
      case 'online_event':
        return <C2online />;
      case 'offline_event':
        return <C3offline />;
      case 'cardnews':
        return <C4cardnews />;
      default:

        return <C1notice />;
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="container mycontainer">
        <div className="mybanner d-none d-md-block">
          <img
            src="/asset/img/banner/sub_banner_02.jpg"
            alt="배너 이미지"
          />
        </div>

        <ul className="d-flex justify-content-start mytab">
          {submenu.map((v, i) => (
            <li
              className={`d-flex justify-content-center align-items-center ${
                en === `${v.linkto}` ? "active" : ""
              }`}
              key={i}
            >
              <Link to={`/news/${v.linkto}`}>{v.title}</Link>
            </li>
          ))}
        </ul>
        <div className="mb150">
          {selectedMenu && (
            <MainTitle textColor="#214aee">{selectedMenu.title}</MainTitle>
          )}
          {getComponent(en)}
        </div>
      </div>
    </div>
  );
}