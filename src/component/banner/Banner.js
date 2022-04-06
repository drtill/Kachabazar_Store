import Link from 'next/link';
import React from 'react';

const Banner = ({promotionName,
  discountPercentage,
  promotionIsAllProduct,
  minimumAmount,currencySign,productType}) => {
  return (
    <>
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
        <div className="inline-flex">
          <h1 className="font-serif text-xl">
                <span className="text-emerald-600 font-bold">
                  ส่วนลดประจำ Catalog
                </span>{' '}
                
            </h1>
        </div>
        <div className="flex gap-4">
          {/* <h6 className="pl-1 font-serif text-base text-gray-700 leading-6 font-semibold">
            {promotionName} {' '}
          </h6> */}
          <h6 className="pl-1 text-base font-medium text-gray-600 leading-6">
            <span className="text-lg md:text-xl lg:text-xl text-gray-700  font-bold">
            {promotionName} {' '}
            </span>{' '}
            
          </h6>
          {' '}
          <h6 className="pl-1 text-base font-medium text-gray-600 leading-6">
            ส่วนลด{' '}
            <span className="text-lg md:text-xl lg:text-xl text-red-500 font-bold">
              {discountPercentage}%
            </span>{' '}
            Off
          </h6>
                  
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
      *ราคาสินค้าที่แสดงทั้งหมด ถูกปรับราคาตามส่วนลดแล้ว
      </div>
      
      
    </div>
      
    </>
  );
};

export default Banner;
