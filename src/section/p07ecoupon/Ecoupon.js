// react
import React, { useState } from "react";
// modules
import { Container, Row, Col } from "react-bootstrap";
// data
import couponData from "../../db/couponData.json";
// Components
import CouponCard from "../../component/CouponCard";
// Contents
import RandomCoupon from "./C01randomcoupon";
// style
import './ecoupon.scss';

export default function Ecoupon() {

  const couponDataList = couponData.navdata.promotionmenu.find(
    (menu) => menu.linkto === "/ecoupon"
  )?.submenu || [];

  // 랜덤 쿠폰 데이터 (고정)
  const randomCouponData = {
    mtitle: "랜덤 쿠폰",
    title: "랜덤 쿠폰",
    description: "다양한 쿠폰을 랜덤으로 받아보세요!",
    imgSrc: [
      { src: "/asset/img/coupon/randomcoupon_01.jpg", alt: "100P" },
      { src: "/asset/img/coupon/randomcoupon_02.jpg", alt: "300P" },
      { src: "/asset/img/coupon/randomcoupon_03.jpg", alt: "온누리상품권 3,000원권" },
      { src: "/asset/img/coupon/randomcoupon_04.jpg", alt: "스타벅스 아메리카노 교환권" },
    ],
    probabilityData: [
      { percentage: 50, text: "50% : 100P" },
      { percentage: 30, text: "30% : 300P" },
      { percentage: 15, text: "15% : 온누리상품권 3000원" },
      { percentage: 5, text: "05% : 스타벅스 아메리카노 교환권" },
    ],
    buttonText: "랜덤 쿠폰받기↓",
  };

  // 랜덤으로 쿠폰을 선택하는 함수
  const getRandomCoupon = () => {
    const probabilities = randomCouponData.probabilityData;
    const randomNumber = Math.random() * 100;

    if (randomNumber < probabilities[0].percentage) {
      return randomCouponData.imgSrc[0];
    } else if (randomNumber < probabilities[0].percentage + probabilities[1].percentage) {
      return randomCouponData.imgSrc[1];
    } else if (randomNumber < probabilities[0].percentage + probabilities[1].percentage + probabilities[2].percentage) {
      return randomCouponData.imgSrc[2];
    } else {
      return randomCouponData.imgSrc[3];
    }
  };

  // 랜덤 쿠폰 선택
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleRandomCoupon = () => {
    const coupon = getRandomCoupon();
    setSelectedCoupon(coupon);
  };

  return (
    <Container style={{ paddingBottom: "50px" }}>
      <Row>
        {/* 일반 쿠폰 리스트 */}
        {couponDataList.map((coupon, index) => (
          <Col key={index} xs={12} md={12} lg={12}>
            <CouponCard {...coupon} colSize="col-4" />
          </Col>
        ))}

        {/* 랜덤 쿠폰 섹션 */}
        <Col xs={12} md={12} lg={12}>
          <RandomCoupon
            {...randomCouponData}
            selectedCoupon={selectedCoupon}
            onButtonClick={handleRandomCoupon}
          />
        </Col>
      </Row>
    </Container>
  )
}
