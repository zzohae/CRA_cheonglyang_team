// react
import React, { useState, useEffect } from 'react'
// data
import allData from '../../db/allData.json'
import { supabase } from '../../api/dbConnect'
// Components
import MainTitle from '../../ui/MainTitle'
import Product from '../../component/Product'

export default function C5livecom({ incartNum, setIncartNum }) {
  const [liveProducts, setLiveProducts] = useState([]);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('productData')
          .select('*')
          .eq('onLive', true);

        if (error) {
          throw error;
        }

        const productsWithDiscount = data.map((product) => {
          const saleprice = product.saleprice !== null ? product.saleprice : product.originprice;
          const discount = ((product.originprice - saleprice) / product.originprice) * 100;

          return {
            ...product,
            saleprice,
            discount,
          };
        });

        const sortedProducts = productsWithDiscount.sort((a, b) => b.discount - a.discount);

        setLiveProducts(sortedProducts.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchLiveProducts();
  }, []);

  return (
    <div className='container d-flex flex-column align-items-start justify-content-center livecomCont'>
      <MainTitle textColor='#214aee'>{allData.mainPagetitle[2].title}</MainTitle>
      <div className='row livecomCont justify-content-between'>
        <div className='row col-lg-6 col-xl-7 order-1 order-lg-0 prodwrap p-0 mx-0'>
          {liveProducts.map((v, index) => (
            <Product
              key={index}
              rowclass='col-6'
              prdId={v.id}
              promobadge={v.promobadge}
              img={`/asset/img/product/${v.img}.jpg`}
              prodName={v.prodName}
              store={v.store}
              originprice={v.originprice}
              saleprice={v.saleprice}
              mB='0px'
              incartNum={incartNum}
              setIncartNum={setIncartNum}
            />
          ))}
        </div>
        <div className='col-lg-6 col-xl-5 order-0 order-lg-1'>
          <div className='liveimg'></div>
        </div>
      </div>
    </div>
  )
}
