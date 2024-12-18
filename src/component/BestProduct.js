// react
import React, { useEffect } from 'react'
// modules
import { Link } from "react-router-dom";
// UIs
import { InCartBtn, TagStyle, Starwrap, Btn } from "./commonUI";
// svg
import { ReactComponent as CartIcon } from "../asset/svg/common/cart.svg";


export default function BestProduct({ rowclass, prdId, img, prodName, store, originprice, saleprice, incartNum, setIncartNum, rating, promobadge = [], mB = "100px",
}) {
  const formatNum = (num) => {
    return num.toLocaleString();
  };

  originprice = parseInt(originprice);
  saleprice =
    saleprice !== null && !isNaN(parseInt(saleprice))
      ? parseInt(saleprice)
      : parseInt(originprice);
  const discount = parseInt(((originprice - saleprice) / originprice) * 100);

  return (
    <div className={`bestproduct ${rowclass} position-relative`}
    style={{ marginBottom: mB }}>
      <Link to={`/products/detail/${prdId}`}>
        <div className="position-absolute d-flex mt-2">
          {promobadge && promobadge.includes("new") && (
            <TagStyle type="new">NEW</TagStyle>
          )}
          {promobadge && promobadge.includes("hot") && (
            <TagStyle type="hot">HOT</TagStyle>
          )}
          {promobadge && promobadge.includes("best") && (
            <TagStyle type="best">BEST</TagStyle>
          )}
        </div>
        <img className="prodimg" src={img} alt={prodName} />
      </Link>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-end h-100">
        <dl className="prodInfo d-flex flex-column align-items-start justify-content-center justify-content-md-between pb-1">
          <dt className="productName">{prodName}</dt>
          <dd className="seller">{store}</dd>
          <dd className="price mt-md-auto">
            {discount > 0 && (
              <>
                <strong className="dcPercent">{discount}%</strong>
                <span className="origin">{formatNum(originprice)}원</span>
              </>
            )}
            <em className="saleprice d-inline d-lg-block d-xl-inline">
              {formatNum(saleprice)}
              <span>원</span>
            </em>
          </dd>
          <p>000개 구매중</p>
          <div className="mt-1 order-4 d-flex gap-2 align-items-center">
            <Starwrap rating={rating}></Starwrap>
            <p className="ratingNum">({rating.toFixed(1)})</p>
          </div>
        </dl>
        <div className="order-5 d-flex mobilecart">
        <InCartBtn
            page="mainbest"
            svgcolor="var(--bg-gray-1, #D2D2D2)"
            onClick={() => {
              setIncartNum((prev) => {
                const updatedCart = [...prev];
            
                const existingItemIndex = updatedCart.findIndex(
                  (item) => item.prdId === prdId
                );
            
                if (existingItemIndex !== -1) {
                  updatedCart[existingItemIndex].quantity += 1;
                } else {
                  updatedCart.push({ prdId, quantity: 1 });
            
                  const popupElement = document.createElement('div');
                  popupElement.innerText = '상품이 장바구니에 담겼습니다!';
                  popupElement.className = 'popup';
                  document.body.appendChild(popupElement);
            
                  setTimeout(() => {
                    popupElement.remove();
                  }, 3000);
                }
                return updatedCart;
              });
            }}
            >
            <CartIcon></CartIcon>
          </InCartBtn>
          <Btn version="v1" page="mainbest" className='d-md-none'>
            바로 구매
          </Btn>
        </div>
      </div>
    </div>
  )
}
