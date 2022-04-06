import { useState } from 'react';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import getConfig from 'next/config'
import { IoBagAddSharp, IoAdd, IoRemove } from 'react-icons/io5';

import ProductServices from '@services/ProductServices';
import Price from '@component/common/Price';
import Discount from '@component/common/Discount';
import ProductModal from '@component/modal/ProductModal';
//import { order } from 'tailwindcss/defaulttheme';

const ProductCard = ({ product, liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { items, addItem, updateItemQuantity, inCart } = useCart();

  const { serverRuntimeConfig} = getConfig()

  const handleUpdateItem = async(item,_qty, _updateType) =>{
    updateItemQuantity(item.id,_qty);

    //alert("items count = " + items.length);
    if(_qty === 0)
    {
      if(liffId.length > 0)
      {
        removeCoinPOSCartDetail(item,liffId,linePOSId,orderId,pictureUrl);
      }
      
    }
    else
    {
      if(liffId.length > 0)
      {
        updateCoinPOSCartDetail(item, _qty,liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl, _updateType)
      }
      
    }
    
  }
  const handleAddItem = async (p) => {

    //alert("Add Item")
    
    if(liffId.length > 0) //liff
    {
      //alert("Liff");
      const newItem = {
        ...p,
        id: p._id,
      };
      //alert(p._id)
      addItem(newItem);
      if(liffId.length > 0)
      {
        AddProductToCart(p,liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl);
      }
      
    }
    else//WebCatalog
    {
      //alert("Catalog");
      const newItem = {
        ...p,
        id: p._id,
      };
      //alert(p._id)
      addItem(newItem);
    }

    //alert("AddItem")
    if(sessionStorage.getItem('discountRate'))
      {
        
        var discountDetails = [];
        
        if(sessionStorage.getItem('discountDetails'))
        {
          var discountDetailsJson = sessionStorage.getItem('discountDetails'); 
          
          //alert("discountDetailsJson = " + discountDetailsJson);
          discountDetails = JSON.parse(discountDetailsJson) === null ? [] : JSON.parse(discountDetailsJson);
          
        }
        
        var isForAllProduct = true;
        if(sessionStorage.getItem('isForAllProduct'))
        {
          isForAllProduct = sessionStorage.getItem('isForAllProduct'); 
        }

        
        if(isForAllProduct === true)
        {
          //alert("Is For All = " + isForAllProduct);
          var discountRate = sessionStorage.getItem('discountRate'); 
            var discountDetail = {
              id: Number(p._id),
              discount:Number(p.price * discountRate),
              discountRate:Number(discountRate)
            }
            discountDetails.push(discountDetail);
        }
        else
        {
          //alert("Is For All = " + isForAllProduct);

          var isDiscount = false;
          //alert("Check Session");
          if(sessionStorage.getItem('promotionProductIdList'))
          {
            //alert("Found");
            var promotionmProductIdListJson = sessionStorage.getItem('promotionProductIdList');
            //alert("promotionmProductIdList = " + promotionmProductIdListJson);
            var promotionmProductIdList = JSON.parse(promotionmProductIdListJson);
            //alert("Parsed = " + promotionmProductIdList);
            if(promotionmProductIdList !== null)
            {
              for(var i = 0;i<promotionmProductIdList.length;i++)
              {
                //alert("Get Product Id at index = " + i);
                var promotionProductId = promotionmProductIdList[i];
                //alert("p.tag = " + JSON.stringify(p) + " promotionProductId = " + promotionProductId);

                if(Number(promotionProductId) === Number(p.tag))
                {
                  //alert("Discount")
                  isDiscount = true;
                }

              }
            }
            else
            {
              isDiscount = true;
            }
            
          }

          if(isDiscount === true)
          {
            
            var discountRate = sessionStorage.getItem('discountRate'); 
            var discountDetail = {
              id: Number(p._id),
              discount:Number(p.price * discountRate),
              discountRate:Number(discountRate)
            }
            //alert('discountDetails = ' + JSON.stringify(discountDetails))
            discountDetails.push(discountDetail);
          }
          else
          {
            
            var discountRate = sessionStorage.getItem('discountRate'); 
            var discountDetail = {
              id: Number(p._id),
              discount:Number(0),
              discountRate:Number(0)
            }
            discountDetails.push(discountDetail);
          }
        }

        
        
        
        sessionStorage.setItem('discountDetails', JSON.stringify(discountDetails));

      }
    
    
  };

  const checkItemInCart = (_id) => {
    var isInCart = false;
    for(var i = 0;i<items.length;i++)
    {
      var item = items[i];
      
      
      if(item !== null)
      {
        
        if(item.id === _id)
        {
          //alert("match");
          isInCart = true;
        }
        
      }
    }
    
    return isInCart;

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
  const AddProductToCart = async(req,_liffId, _lineUserId, _linePOSId, _groupId, _orderId, _companyId, _locationId, _pictureUrl) => 
  {
    var liffId = _liffId;
    var lineUserId = _lineUserId;
    var linePOSId = _linePOSId;
    var groupId = _groupId;
    var orderId = _orderId;
    var companyId = _companyId;
    var locationId = _locationId;
    var pictureUrl = _pictureUrl;

    var pvId = req._id;

    var promotionCode = ''
    if(sessionStorage.getItem('promotionCode'))
    {
      promotionCode = sessionStorage.getItem('promotionCode');
    }
    //alert(promotionCode);
    //alert("liffId = " + liffId + " lineUserId = " + lineUserId + " OrderId = " + orderId)
    const products = await ProductServices.addToCoinPOSCart({
      orderId,
      pvId,
      companyId,locationId,
      lineUserId,
      linePOSId,
      groupId,
      liffId,
      pictureUrl,
      promotionCode
    });
    //alert(products);
};


  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
      />

      <div className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative">
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className="relative flex justify-center w-full cursor-pointer"
        >
          {product.quantity <= 0 && (
            <span className="absolute inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-600 border-0 rounded-full text-xs font-semibold font-serif z-10 left-4 top-4">
              Stock Out
            </span>
          )}
          <Discount product={product} />

          <Image
            src={product.image}
            width={160}
            height={160}
            alt={product.title}
            className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
          />
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.unit}
            </span>
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">{product.title}</span>
            </h2>
          </div>

          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            <Price product={product} card={true} />
            {checkItemInCart(product._id) ? (
              <div>
                {items.map(
                  (item) =>
                    item.id === product._id 
                    ? 
                    (
                      <div
                        key={item.id}
                        className="h-9 w-auto flex flex-wrap items-center justify-evenly py-1 px-2 bg-cyan-500 text-white rounded"
                      >
                        <button
                          onClick={() =>
                            handleUpdateItem(item, item.quantity - 1,'Dec')
                          }
                        >
                          <span className="text-dark text-base">
                            <IoRemove />
                          </span>
                        </button>
                        <p className="text-sm text-dark px-1 font-serif font-semibold">
                          {item.quantity}
                        </p>
                        <button
                          onClick={() =>
                            handleUpdateItem(item, item.quantity + 1, 'Inc')
                          }
                          disabled={product.quantity === item.quantity}
                        >
                          <span className="text-dark text-base">
                            <IoAdd />
                          </span>
                        </button>
                      </div>
                    )
                    :
                    <></>
                    
                )}{' '}
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                disabled={product.quantity < 1}
                aria-label="cart"
                className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-cyan-500 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white transition-all"
              >
                {' '}
                <span className="text-xl">
                  <IoBagAddSharp />
                </span>{' '}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
