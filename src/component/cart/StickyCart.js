import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import { useCart } from 'react-use-cart';

//internal import
import { SidebarContext } from '@context/SidebarContext';

const StickyCart = ({currencySign, discountDetails}) => {
  const { totalItems, cartTotal, items } = useCart();
  const { toggleCartDrawer } = useContext(SidebarContext);

  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() =>
  {
    if(sessionStorage.getItem('discountDetails'))
    {
      var discountDetailsJson = sessionStorage.getItem('discountDetails'); 
      
      var disDetails = JSON.parse(discountDetailsJson);
      if(disDetails !== null)
      {
        var totalDiscountVal = disDetails.reduce((discountTotal, item) => (discountTotal += item.discount),0);
        setTotalDiscount(totalDiscountVal);
      }
      else
    {
      setTotalDiscount(0);
      
    }
    }
    else
    {
      setTotalDiscount(0);
      
    }

  })
  

  //alert("Discount Total = " + discountTotal);
  


  return (
    <button aria-label="Cart" onClick={toggleCartDrawer} className="absolute">
      <div className="right-0 w-35 float-right fixed top-2/4 bottom-2/4 align-middle shadow-lg cursor-pointer z-30 hidden lg:block xl:block">
        <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-tl-lg p-2 text-gray-700">
          <span className="text-2xl mb-1 text-cyan-600">
            <IoBagHandleOutline />
          </span>
          <span className="px-2 text-sm font-serif font-medium">
            {totalItems} Items
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-cyan-700 p-2 text-white text-base font-serif font-medium rounded-bl-lg mx-auto">
          {currencySign}{cartTotal === null ? 0.00 : (cartTotal - totalDiscount).toFixed(2)}
          
        </div>
      </div>
    </button>
  );
};

export default dynamic(() => Promise.resolve(StickyCart), { ssr: false });
