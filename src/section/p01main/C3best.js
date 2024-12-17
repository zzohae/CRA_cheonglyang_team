// react
import React, { useEffect, useState } from 'react'
// data
import allData from '../../db/allData.json'
import { supabase } from '../../api/dbConnect'
// Components
import MainTitle from '../../ui/MainTitle'
import BestProduct from '../../component/BestProduct'

export default function C3best({incartNum, setIncartNum}) {
  const [bestProducts, setBestProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('mealKit');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from('productData')
          .select('*');

        const { data: reviewData, error: reviewError } = await supabase
          .from('reviewData')
          .select('*');

        if (productError || reviewError) {
          console.error('Error fetching data:', productError || reviewError);
          return;
        }

        // 해당 로직은 계산의 횟수를 최소화하는 방식으로 설계되었습니다.

        // 1. 각 제품당 리뷰 개수
        const productReviewCount = reviewData.reduce((acc, review) => {
          acc[review.productID] = (acc[review.productID] || 0) + 1;
          return acc;
        }, {});

        // 2. 카테고리에 해당하는 제품만 필터링
        const filteredProducts = productData.filter(product => product.category === selectedTab);

        // 3. 상위 3개 제품 선택
        const sortedProducts = filteredProducts
          .map((product) => ({
            ...product,
            reviewCount: productReviewCount[product.id] || 0,
          }))
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 3);

        // 4. 베스트 제품에 대한 평균 평점
        const productRatings = reviewData.reduce((acc, review) => {
          acc[review.productID] = (acc[review.productID] || []).concat(review.rating);
          return acc;
        }, {});

        // 5. 평균 평점을 제품 데이터에 결합
        const productsWithRatings = sortedProducts.map((product) => {
          const productReviews = productRatings[product.id] || [];
          const avgRating = productReviews.length
            ? productReviews.reduce((sum, rating) => sum + rating, 0) / productReviews.length
            : 0;
          
          return {
            ...product,
            avgRating,
          };
        });

        setBestProducts(productsWithRatings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div className='container d-flex flex-row align-items-start justify-content-center bestCont'>
      <div className='row overflow-hidden'>
        <MainTitle textColor='#214aee'>{allData.mainPagetitle[1].title}</MainTitle>
        <div className='overflow-hidden'>
        <ul className='d-flex justify-content-start mytab border-none m-0'>
          {/* 임시 - 주문 데이터를 만들게 된다면 카테고리별 주문수가 많은 순서대로 4개 카테고리를 잘라 선정 */}
          <li
          onClick={() => handleTabClick('mealKit')}
          className={selectedTab === 'mealKit' ? 'active' : ''}># 밀키트</li>
          <li
          onClick={() => handleTabClick('side')}
          className={selectedTab === 'side' ? 'active' : ''}># 반찬·양념류</li>
          <li
          onClick={() => handleTabClick('vegetables')}
          className={selectedTab === 'vegetables' ? 'active' : ''}># 야채 · 채소</li>
          <li
          onClick={() => handleTabClick('fruits')}
          className={selectedTab === 'fruits' ? 'active' : ''}># 과일</li>
        </ul>
        </div>
        <div className='row align-items-stretch m-0 p-0'>
        {bestProducts.map((v, index) => (
          <BestProduct
            key={index}
            rowclass='col-md-4 d-flex flex-row flex-md-column align-items-center align-items-md-start'
            prdId={v.id}
            promobadge={v.promobadge}
            img={`/asset/img/product/${v.img}.jpg`}
            prodName={v.prodName}
            store={v.store}
            originprice={v.originprice}
            saleprice={v.saleprice}
            mB='10px'
            rating={parseFloat(v.avgRating.toFixed(1))}
            incartNum={incartNum}
            setIncartNum={setIncartNum}
          />
        ))}
        </div>
      </div>
    </div>
  )
}