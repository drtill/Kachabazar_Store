import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { IoBagCheckOutline, IoClose, IoBagHandle } from 'react-icons/io5';

//internal import
import CartItem from '@component/cart/CartItem';
import LoginModal from '@component/modal/LoginModal';
import { UserContext } from '@context/UserContext';
import { SidebarContext } from '@context/SidebarContext';

const Cart = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { isEmpty, items, cartTotal } = useCart();
  const { toggleCartDrawer, closeCartDrawer } = useContext(SidebarContext);

  //const [totalDiscount, setTotalDiscount] = useState(0);
  
  var totalDiscountData = 0;
  var disDetailsData = [];

  const [discountDetails, setDiscountDetail] = useState(disDetailsData);
  const [totalDiscount, setTotalDiscount] = useState(totalDiscountData);
  useEffect(() =>
  {
    if(sessionStorage.getItem('discountDetails'))
    {
      var discountDetailsJson = sessionStorage.getItem('discountDetails'); 
      
      //alert(discountDetailsJson);
      var disDetails = JSON.parse(discountDetailsJson);
      if(disDetails !== null)
      {
        var totalDiscountVal = disDetails.reduce((discountTotal, item) => (discountTotal += item.discount),0);
        setTotalDiscount(totalDiscountVal);
        setDiscountDetail(disDetails);
      }
      else
      {
        setTotalDiscount(0);
        setDiscountDetail([]);
      }
    }
    else
    {
      setTotalDiscount(0);
      setDiscountDetail([]);
    }

    
  })

  var currencySign = '';
    if(sessionStorage.getItem('currencySign'))
    {
      currencySign = sessionStorage.getItem('currencySign'); 
      //alert('liffId = ' + sessionStorage.getItem('liffId'))
    }


  const {
    state: { userInfo },
  } = useContext(UserContext);

  const handleOpenLogin = () => {
    //if (router.push('/?redirect=/checkout')) 
    {
      toggleCartDrawer();
      setModalOpen(!modalOpen);
    }
  };

  const UpdateTotal = (id,qty,discountRate) =>
  {
    //alert("UpdateTotal");
    var totalDiscountValue = 0;
    for(var i=0;i<items.length;i++)
    {
      var item = items[i];
      if(item.id === id)
      {
        totalDiscountValue += (qty * item.price) * discountRate; 

      }
      else
      {
        for(var j=0;j<discountDetails.length;j++)
        {
          var discountItem = discountDetails[j];
          if(discountItem.id === item.id)
          {
            totalDiscountValue += (item.quantity * item.price * discountItem.discountRate);
          } 
        }
        
      }
    }
    //alert(totalDiscountValue);
    setTotalDiscount(totalDiscountValue);
  }
  const checkoutClass = (
    <button
      onClick={closeCartDrawer}
      className="w-full py-3 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 flex items-center justify-between bg-heading text-sm sm:text-base text-white focus:outline-none transition duration-300"
    >
      <span className="align-middle font-medium font-serif">
        ดำเนินการชำระเงิน
      </span>
      <span className="rounded-lg font-bold font-serif py-2 px-3 bg-white text-cyan-600">
        {currencySign}{cartTotal === null ? 0.00 : (cartTotal-totalDiscount).toFixed(2)}
      </span>
    </button>
  );


  
  return (
    <>
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded cursor-pointer">
        <div className="w-full flex justify-between items-center relative px-5 py-4 border-b bg-indigo-50 border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex items-center">
            <span className="text-xl mr-2 mb-1">
              <IoBagCheckOutline />
            </span>
            Shopping Cart
          </h2>
          <button
            onClick={closeCartDrawer}
            className="inline-flex text-base items-center justify-center text-gray-500 p-2 focus:outline-none transition-opacity hover:text-red-400"
          >
            <IoClose />
            <span className="font-sens text-sm text-gray-500 hover:text-red-400 ml-1">
              Close
            </span>
          </button>
        </div>
        <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          {isEmpty && (
            <div className="flex flex-col h-full justify-center">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-cyan-100">
                  <span className="text-cyan-600 text-4xl block">
                    <IoBagHandle />
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-gray-700 text-lg pt-5">
                  Your cart is empty
                </h3>
                <p className="px-12 text-center text-sm text-gray-500 pt-2">
                  No items added in your cart. Please add product to your cart
                  list.
                </p>
              </div>
            </div>
          )}

          {items.map((item, i) => (
            <CartItem key={i + 1} item={item} discountDetails={discountDetails} UpdateTotal={UpdateTotal}/>
          ))}
        </div>
        <div className="mx-5 my-3">
          
          {items.length <= 0 ? (
            checkoutClass
          ) : (
            <span>

              {!userInfo ? (

                <div onClick={handleOpenLogin}>{checkoutClass}</div>
              ) : (

                <Link href="/checkout" onClick={() => handleCheckout}>
                  <a>{checkoutClass}</a>
                  
                </Link>
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
