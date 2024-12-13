// react
import React, { useState, useEffect } from 'react';
// modules
import { Routes, Route } from "react-router-dom";
// Components-common
import ScrolltoTop from './layout/ScrolltoTop';
import Header from './layout/Header';
import Footer from './layout/Footer';
// Components-unique
import Mainpage from './section/p01main/Mainpage';
import Allproducts from './section/p02product/Allproducts';
import News from './section/p04news/News';
import Ecoupon from './section/p07ecoupon/Ecoupon'
import Marketinfo from './section/p05market/Marketinfo'
import Login from './section/p08login/Login';
import Signup from './section/p08login/Signup';
// 404
import Notfound from './section/Notfound';

export default function Cheonglyang() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [incartNum, setIncartNum] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', updateScroll);

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <div className={`wrap ${scrollPosition < 200 ? "" : "scrolled"}`}>
      <ScrolltoTop></ScrolltoTop>
      <Header keyword={keyword} setKeyword={setKeyword} incartNum={incartNum}></Header>
      <Routes>
        <Route path='/' element={<Mainpage incartNum={incartNum} setIncartNum={setIncartNum}></Mainpage>}></Route>
        <Route path="/products/:cn?" element={<Allproducts cn='' incartNum={incartNum} setIncartNum={setIncartNum}></Allproducts>} />
        <Route path="/search" element={<Allproducts keyword={keyword} setKeyword={setKeyword} incartNum={incartNum} setIncartNum={setIncartNum}></Allproducts>} />
        <Route path="/news/:en" element={<News en=''></News>} />
        <Route path="/ecoupon" element={<Ecoupon></Ecoupon>} />
        <Route path="/aboutus/:en" element={<Marketinfo></Marketinfo>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Login>} />
        <Route path="/signup" element={<Signup></Signup>} />

        <Route path='*' element={<Notfound></Notfound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}