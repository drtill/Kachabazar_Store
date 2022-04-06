import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

//internal import
import useAddToCart from '@hooks/useAddToCart';
import { SidebarContext } from '@context/SidebarContext';

import ProductServices from '@services/ProductServices';

const CartItem = ({ item, UpdateTotal }) => {
  const { updateItemQuantity, removeItem } = useCart();
  const { closeCartDrawer } = useContext(SidebarContext);
  const { handleIncreaseQuantity } = useAddToCart();

  
  //alert(JSON.stringify(discountDetails));
  var liffId = '';
    var linePOSId = '';
    var lineUserId = '';
    var groupId = '';
    var pictureUrl = '';
    var companyId = 0;
    var locationId = 0;
    var orderId = 0;
    var currencySign = '';
    

    var discountData = 0;
    var discountDataRate = 0;

    /*for(var i=0;i<discountDetails.length;i++)
    {
      var dDetail = discountDetails[i]
      if(dDetail.id === item.id)
      {
        //alert(dDetail.discount)
        discountData = dDetail.discount;
        discountDataRate = dDetail.discountRate;
      }

    }*/
    
    const [discountDataDetails, setDiscountDetails] = useState([]);
    const [discount,setDiscount] = useState(0);
    const [discountRate,setDiscountRate] = useState(0.0);

    

    useEffect(() =>
    {
      if(sessionStorage.getItem('discountDetails'))
      {
        var discountDetailsJson = sessionStorage.getItem('discountDetails'); 
        //var promotionmProductIdListJson = sessionStorage.getItem('promotionmProductIdList'); 
        
        var disDetails = JSON.parse(discountDetailsJson);
        //var promoProductIdList = JSON.parse(promotionmProductIdListJson);

        
        if(disDetails !== null)
        {
          
          for(var i=0;i<disDetails.length;i++)
          {
            var dDetail = disDetails[i];
            if(dDetail.id === item.id)
            {
              //alert('Discount = ' + dDetail.discount)
              discountData = dDetail.discount;
              discountDataRate = dDetail.discountRate;
            }

          }
          
          setDiscountDetails(disDetails);
          setDiscount(discountData);
          setDiscountRate(discountDataRate);  
          
        }
        else
        {
          setDiscountDetails([]);
          setDiscount(0);
          setDiscountRate(0);
        }
        //alert("Loop Set = " + JSON.stringify(disDetails))
        
      }
      else
      {
        //alert("NotFound")
        setDiscountDetails([]);
        setDiscount(0);
        setDiscountRate(0);
      }
        //alert("Loop Set = " + JSON.stringify(discountDataDetails));
      
        

      
    })
    
    //var discountVal = discountDetail === null ? 0 : discountDetail.discount;

    //const [discount, setDiscount] = useState(discountVal); 
    //alert("Discount = " + discount);
    if(sessionStorage.getItem('currencySign'))
    {
      currencySign = sessionStorage.getItem('currencySign'); 
      //alert('liffId = ' + sessionStorage.getItem('liffId'))
    }
    if(sessionStorage.getItem('liffId'))
    {
      liffId = sessionStorage.getItem('liffId'); 
      //alert('liffId = ' + sessionStorage.getItem('liffId'))
    }

    if(sessionStorage.getItem('linePOSId'))
    {
      linePOSId = sessionStorage.getItem('linePOSId');
      //alert('linePOSId = ' + sessionStorage.getItem('linePOSId'))
    }

    if(sessionStorage.getItem('groupId'))
    {
      groupId = sessionStorage.getItem('groupId');
      //alert('groupId = ' + sessionStorage.getItem('groupId'))
    }

    if(sessionStorage.getItem('companyId'))
    {
      companyId = sessionStorage.getItem('companyId');
      //alert('companyId = ' + sessionStorage.getItem('companyId'))
    }

    if(sessionStorage.getItem('locationId'))
    {
      locationId = sessionStorage.getItem('locationId');
      //alert('locationId = ' + sessionStorage.getItem('locationId'))
    }

    if(sessionStorage.getItem('orderId'))
    {
      orderId = sessionStorage.getItem('orderId');
      //alert('orderId = ' + sessionStorage.getItem('orderId'))
    }
    if(sessionStorage.getItem('lineProfileImage'))
    {
      pictureUrl = sessionStorage.getItem('lineProfileImage');
      //alert('lineProfileImage = ' + sessionStorage.getItem('lineProfileImage'))
    }



  const handleRemoveItem = async(item) => {
    removeItem(item.id)

    for(var i=0;i<discountDataDetails.length;i++)
    {
      var dDetail = discountDataDetails[i]
      if(dDetail.id === item.id)
      {
        discountDataDetails.splice(i,1);
        
      }

    }
    sessionStorage.setItem('discountDetails',JSON.stringify(discountDataDetails)); 

    if(liffId.length > 0)
    {
      removeCoinPOSCartDetail(item,liffId,linePOSId,orderId,pictureUrl);
    }
    
  };

  const handleDecrease = (_id, _qty) => {

    

    updateItemQuantity(_id, _qty)
    var discountVal = (_qty * item.price)*discountRate;
    
    for(var i=0;i<discountDataDetails.length;i++)
    {
      var dDetail = discountDataDetails[i]
      if(dDetail.id === _id)
      {
        discountDataDetails[i].discount = discountVal;
        
      }

    }
    
    sessionStorage.setItem('discountDetails',JSON.stringify(discountDataDetails)); 
    
    if(liffId.length > 0)
    {
      var _updateType = 'Dec';
      if(_qty == 0)
      {
        removeCoinPOSCartDetail(item,liffId,linePOSId,orderId,pictureUrl);
      }
      else
      {
        updateCoinPOSCartDetail(item, _qty,liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl, _updateType)
      }
    }
    
    
  };

  const handleIncrease = (_id, _qty) => {

    //alert(JSON.stringify(discountDataDetails))
    updateItemQuantity(_id, _qty)
    var discountVal = (_qty * item.price)*discountRate;

    for(var i=0;i<discountDataDetails.length;i++)
    {
      var dDetail = discountDataDetails[i]
      if(dDetail.id === _id)
      {
        discountDataDetails[i].discount = discountVal;
        
      }

    }
    
    sessionStorage.setItem('discountDetails',JSON.stringify(discountDataDetails)); 
    //alert(discountVal);
    //setDiscount(discountVal);
    if(liffId.length > 0)
    {
      var _updateType = 'Inc';
      updateCoinPOSCartDetail(item, _qty,liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl, _updateType)
    }
    
  };

  const handleUpdateCartDetail = async (item, _qty, _updateType) => {

    var liffId = '';
    var linePOSId = '';
    var lineUserId = '';
    var groupId = '';
    var pictureUrl = '';
    var companyId = 0;
    var locationId = 0;
    var orderId = 0;
    if(sessionStorage.getItem('liffId'))
    {
      liffId = sessionStorage.getItem('liffId'); 
      //alert('liffId = ' + sessionStorage.getItem('liffId'))
    }

    if(sessionStorage.getItem('linePOSId'))
    {
      linePOSId = sessionStorage.getItem('linePOSId');
      //alert('linePOSId = ' + sessionStorage.getItem('linePOSId'))
    }

    if(sessionStorage.getItem('groupId'))
    {
      groupId = sessionStorage.getItem('groupId');
      //alert('groupId = ' + sessionStorage.getItem('groupId'))
    }

    if(sessionStorage.getItem('companyId'))
    {
      companyId = sessionStorage.getItem('companyId');
      //alert('companyId = ' + sessionStorage.getItem('companyId'))
    }

    if(sessionStorage.getItem('locationId'))
    {
      locationId = sessionStorage.getItem('locationId');
      //alert('locationId = ' + sessionStorage.getItem('locationId'))
    }

    if(sessionStorage.getItem('orderId'))
    {
      orderId = sessionStorage.getItem('orderId');
      //alert('orderId = ' + sessionStorage.getItem('orderId'))
    }
    if(sessionStorage.getItem('lineProfileImage'))
    {
      pictureUrl = sessionStorage.getItem('lineProfileImage');
      //alert('lineProfileImage = ' + sessionStorage.getItem('lineProfileImage'))
    }
    
    handleIncreaseQuantity(item)

    updateCoinPOSCartDetail(item, _qty,liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl, _updateType)

  };

  const updateCoinPOSCartDetail = async(req, _qty,_liffId, _lineUserId, _linePOSId, _groupId, _orderId, _companyId, _locationId, _pictureUrl, _updateType) => 
  {
    var liffId = _liffId;
    var lineUserId = _lineUserId;
    var linePOSId = _linePOSId;
    var groupId = _groupId;
    var orderId = _orderId;
    var companyId = _companyId;
    var locationId = _locationId;
    var orderDetailId = 0;
    var quantity = _qty;
    var pvId = req.id;
    var updateType = _updateType;
    var pictureUrl = _pictureUrl;
    var userId = 1;



    const detail = await ProductServices.updateCoinPOSCartDetail({
      orderDetailId,
      userId,
      quantity,
      companyId,
      orderId,
      pvId,
      updateType,
      linePOSId,
      liffId,
      pictureUrl
    })
  }
  const removeCoinPOSCartDetail = async(req,_liffId, _linePOSId, _orderId, _pictureUrl) => 
  {
    var liffId = _liffId;
    var linePOSId = _linePOSId;
    var orderId = _orderId;
    var pvId = req.id;
    var pictureUrl = _pictureUrl;
    


    const detail = ProductServices.removeCoinPOSCartDetail({
      orderId,
      pvId,
      linePOSId,
      liffId,
      pictureUrl

    })
  }
  return (
    <div className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0">
      <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
        <Image
          key={item.id}
          src={item.image}
          width={40}
          height={40}
          alt={item.title}
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <Link href={`/product/${item.slug}`}>
          <a
            onClick={closeCartDrawer}
            className="truncate text-sm font-medium text-gray-700 text-heading line-clamp-1"
          >
            {item.title}
          </a>
        </Link>
        <span className="text-xs text-gray-400 mb-1">
          ราคาสินค้า {currencySign}{item.price}
        </span>
        <span className="text-xs text-gray-400 mb-1">
          ส่วนลด {currencySign}{discount}
        </span>
        
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm md:text-base text-heading leading-5">
            <span>{currencySign}{((item.price * item.quantity) - discount).toFixed(2)}</span>
          </div>
          <div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
            <button
              onClick={() => 
                {
                  handleDecrease(item.id, item.quantity - 1);
                  UpdateTotal(item.id, item.quantity - 1,discountRate);
                }
              }
            >
              <span className="text-dark text-base">
                <FiMinus />
              </span>
            </button>
            {/* <button
              onClick={() => handleUpdateCartDetail(item, item.quantity - 1,'Dec')}
            >
              <span className="text-dark text-base">
                <FiMinus />
              </span>
            </button> */}
            <p className="text-sm font-semibold text-dark px-1">
              {item.quantity}
            </p>
            <button onClick={() => 
            {
              handleIncrease(item.id, item.quantity + 1);
              UpdateTotal(item.id, item.quantity + 1,discountRate);
            }}>
              <span className="text-dark text-base">
                <FiPlus />
              </span>
            </button>
            {/* <button onClick={() => handleIncreaseQuantity(item)}>
              <span className="text-dark text-base">
                <FiPlus />
              </span>
            </button> */}
            {/* <button onClick={() => handleUpdateCartDetail(item, item.quantity + 1,'Inc')}>
              <span className="text-dark text-base">
                <FiPlus />
              </span>
            </button> */}
          </div>
          <button
            onClick={() => handleRemoveItem(item)}
            className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
