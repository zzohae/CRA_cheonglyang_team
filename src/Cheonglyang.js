// react
import React, { useState, useEffect } from 'react';
// modules
import { Routes, Route } from "react-router-dom";
// Components-common
import Header from './layout/Header';
import Footer from './layout/Footer';
// Components-unique
import Mainpage from './section/p01main/Mainpage';
// 404
import Notfound from './section/Notfound';

export default function Cheonglyang() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [incartNum, setIncartNum] = useState([]);

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
      <Header keyword={keyword} setKeyword={setKeyword} incartNum={incartNum}></Header>
      <Routes>
        <Route path='/' element={<Mainpage incartNum={incartNum} setIncartNum={setIncartNum}></Mainpage>}></Route>
        <Route path='*' element={<Notfound></Notfound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}