import { useContext,useEffect, useState } from 'react';
import { useCart} from 'react-use-cart';
import { useRouter } from 'next/router'

import { UserContext } from '@context/UserContext';

import Cookies from 'js-cookie';

import UserServices from '@services/UserServices';
import OrderServices from '@services/OrderServices';

import Link from 'next/link';
import Image from 'next/image';

import Layout from '@layout/Layout';
import Banner from '@component/banner/Banner';
import CardTwo from '@component/cta-card/CardTwo';
import OfferCard from '@component/offer/OfferCard';
import StickyCart from '@component/cart/StickyCart';
import ProductServices from '@services/ProductServices';

import ProductCard from '@component/product/ProductCard';
import MainCarousel from '@component/carousel/MainCarousel';
import FeatureCategory from '@component/category/FeatureCategory';

import useCheckoutSubmit from '@hooks/useCheckoutSubmit';

import Loading from '@component/preloader/Loading';

import LoginModal from '@component/modal/LoginModal';
//const liffId = process.env.NEXT_PUBLIC_LIFF_ID
const isLiffLogin = true;//process.env.NEXT_PUBLIC_ISLOGIN
var itemPerPage = 30;
const Catalog = ({params,targetPage,companyCode,dataPath,title,description,countPage,currentPage,
  products,salesOrder, orderDetails,categories,shippingServices,bankNameAndAccounts,
  currencySign, companyName, locationName,companyLogo,
  catalogCompanyId,catalogName,catalogLocationId,catalogOrderId,
  customerFirstName,customerLastName,customerEmail, customerPhoneNumber,
  address1,countryId,provinceId,cityId,districtId,postalcode,
  countrys,provinces,cities,districts,
  promotions,
  locationAddress1,locationAddress2,locationCity,locationStateOrProvince,locationCountry,locationPostalCode,
  locationEmail,locationTel,
  companyFacebook,companyLine
  }) => {
   
    const {
      couponInfo,
      couponRef,
      setCouponData,
      clearCouponData,
      discountAmount,
      
    } = useCheckoutSubmit();
    
    const { dispatch } = useContext(UserContext);

    const [modalOpen, setModalOpen] = useState(false);
    
    const router = useRouter();
    
    const [companyId, setCompanyId] = useState(catalogCompanyId);
    const [locationId, setLocationId] = useState(catalogLocationId);
    const [orderId, setOrderId] = useState(0);

    const [loading, setLoading] = useState(true);

    const [categoryLoading, setCategoryLoading] = useState(true);
    const [newProductLoading, setNewProductLoading] = useState(true);

    const [promotionLoading, setPromotionLoading] = useState(false);

    //this.setState({liffId:liffData});
    const [productList, setProductList] = useState([]);
    const [newProductList, setNewProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [lineProfileImage, setProfileImage] = useState('');
    const [lineUserId, setLineUserId] = useState('');
    const [linePOSId, setLinePOSId] = useState('');
    const [lineUsername, setLineUsername] = useState('');
    const [pagingIndent, setPaging] = useState([]);
    const [companyNameData, setCompanyName] = useState(companyName);
    const [catalogNameData, setCatalogName] = useState(catalogName);

    const [companyFacebookData, setCompanyFacebook] = useState(companyFacebook);
    const [companyLineData, setCompanyLine] = useState(companyLine);

    const [locationNameData, setLocationName] = useState(locationName);
    const [locationAddress1Data, setLocationAddress1] = useState(locationAddress1);
    const [locationAddress2Data, setLocationAddress2] = useState(locationAddress2);
    const [locationCityData, setLocationCity] = useState(locationCity);
    const [locationStateOrProvinceData, setLocationStateOrProvince] = useState(locationStateOrProvince);
    const [locationCountryData, setLocationCountry] = useState(locationCountry);
    const [locationPostalCodeData, setLocationPostalCode] = useState(locationPostalCode);
    const [locationEmailData, setLocationEmail] = useState(locationEmail);
    const [locationTelData, setLocationTel] = useState(locationTel);
    const [discountDataDetails,setDiscountDetail] = useState('');

    const [catalogPromotionId,setCatalogPromotionId] = useState(0);
    const [promotionCode,setPromotionCode] = useState('');
    const [catalogPromotionName,setCatalogPromotionName] = useState('');
    const [catalogDiscountPercentage,setCatalogDiscountPercentage] = useState(0);
    const [catalogPromotionIsAllProduct,setCatalogPromotionIsAllProduct] = useState(false);
    const [catalogMinimumAmount,setCatalogMinimumAmount] = useState(0);
    const [catalogProductType,setCatalogProductType] = useState('');

    const [isCatalogPromotion,setIsCatalogPromotion] = useState(false);
    
    


    const { setItems,clearCartMetadata,emptyCart, addItem, items } = useCart();
    
    
    useEffect(async () => {

      setPromotionLoading(true);
      
      //alert(JSON.stringify(promotions))
      if(Cookies.get('userInfo'))
      {
        Cookies.remove('userInfo');
      } 
      var userLocalJson = localStorage.getItem('userInfo');
      //alert("userLocalJson = " + userLocalJson);
      if(userLocalJson === null)
      {
        //alert('Logout');
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('couponInfo');
      }
      else
      {
        Cookies.set('userInfo', userLocalJson);
        var userLocal = JSON.parse(userLocalJson)
        try
        {
          const expiredDate = await UserServices.coinposCheckExpired(
            {
              email:userLocal.email,
              companyId:catalogCompanyId
            });
            
          sessionStorage.setItem('expiredDate',expiredDate);
          if(expiredDate === false)
          {
            //alert('Login');
            dispatch({ type: 'USER_LOGIN', payload: userLocal });


            //alert('userLocal.customerId = ' + userLocal.customerId)
            sessionStorage.setItem('customerId', userLocal.customerId); 
            sessionStorage.setItem('customerFirstName', userLocal.firstName);
            sessionStorage.setItem('customerLastName', userLocal.lastName);
            sessionStorage.setItem('customerEmail', userLocal.email);
            sessionStorage.setItem('customerPhoneNumber', userLocal.phone);

            //alert('address1 = '+ userLocal.address1)
            //alert('countryId = '+ userLocal.countryId)
            //alert('countryId = '+ JSON.stringify(userLocal.provinces))

            sessionStorage.setItem('address1', userLocal.address1);
            sessionStorage.setItem('countryId', userLocal.countryId);
            sessionStorage.setItem('provinceId', userLocal.provinceId);
            sessionStorage.setItem('cityId', userLocal.cityId);
            sessionStorage.setItem('districtId', userLocal.districtId);
            sessionStorage.setItem('postalcode', userLocal.postalcode);

            sessionStorage.setItem('countrys', JSON.stringify(userLocal.countrys));
            sessionStorage.setItem('provinces', JSON.stringify(userLocal.provinces));
            
            sessionStorage.setItem('cities', JSON.stringify(userLocal.cities));
            sessionStorage.setItem('districts', JSON.stringify(userLocal.districts));
          }
          else
          {
            //alert('Logout');
            
            dispatch({ type: 'USER_LOGOUT' });
            Cookies.remove('userInfo');
            Cookies.remove('couponInfo');
          }

    
          
        }
        catch(e)
        {
          //alert("error = " + e.message);
        }
      }
      
      var getPromotionCode = localStorage.getItem('promotionCode')

      if(localStorage.getItem('promotionCode'))
      {
        var discountDetailsJson = sessionStorage.getItem('discountDetails');

        var discountRate = sessionStorage.getItem('discountRate');
        var promotionCode = sessionStorage.getItem('promotionCode');
        var promotionMinimumAmount = sessionStorage.getItem('promotionMinimumAmount');
        var promotionProductIdListJson = sessionStorage.getItem('promotionProductIdList');
        var isForAllProduct = sessionStorage.getItem('isForAllProduct');

        sessionStorage.setItem('discountDetails', discountDetailsJson);
        sessionStorage.setItem('discountRate', discountRate);
        sessionStorage.setItem('promotionCode', promotionCode);
        sessionStorage.setItem('promotionMinimumAmount', promotionMinimumAmount);
        sessionStorage.setItem('promotionProductIdList', promotionProductIdListJson);
        sessionStorage.setItem('isForAllProduct', isForAllProduct);
        setPromotionCode(promotionCode);
      }

      //alert(JSON.stringify(countrys))
      //alert('Storage = ' + sessionStorage.getItem('countrys'))
      sessionStorage.setItem('countrys', 'JSON.stringify(countrys)');
      sessionStorage.setItem('countrysJSON', JSON.stringify(countrys));
      sessionStorage.setItem('dataPath',dataPath);
      sessionStorage.setItem('catalogName',catalogName);
      sessionStorage.setItem('companyLogo',companyLogo);
      sessionStorage.setItem('companyName',companyNameData);
      sessionStorage.setItem('companyId',catalogCompanyId);

      sessionStorage.setItem('companyFacebook',companyFacebookData);
      sessionStorage.setItem('companyLine',companyLineData);


      sessionStorage.setItem('locationName',locationNameData);
      sessionStorage.setItem('locationAddress1',locationAddress1Data);
      sessionStorage.setItem('locationAddress2',locationAddress2Data);
      sessionStorage.setItem('locationCity',locationCityData);
      sessionStorage.setItem('locationStateOrProvince',locationStateOrProvinceData);
      sessionStorage.setItem('locationCountry',locationCountryData);
      sessionStorage.setItem('locationPostalCode',locationPostalCodeData);
      sessionStorage.setItem('locationEmail',locationEmailData);
      sessionStorage.setItem('locationTel',locationTelData);




      sessionStorage.setItem('title', title);
      sessionStorage.setItem('description', description);


      sessionStorage.setItem('shippings', JSON.stringify(shippingServices));
      sessionStorage.setItem('bankNameAndAccounts', JSON.stringify(bankNameAndAccounts));
      
      sessionStorage.setItem('currencySign', currencySign);
      
      //alert("customerFirstName = " + customerFirstName)
      

      //var userInf =  Cookies.get('userInfo');
      //alert("Cookies = " + userInf);

      //alert("localStorage");
      //var userLocalJson = localStorage.getItem('userInfo');
      //alert("UserLocal = " + userLocal);

      //var userLocal = JSON.parse(userLocalJson);
      //Cookies.set('userInfo', userLocalJson);
      //dispatch({ type: 'USER_LOGIN', payload: userLocal });
      



      //alert("Cookie UserInfo")
      try
      {
        //Cookies.remove('userInfo');
        if(items !== null)
        {
            //alert("Not NULL");
            if(items.length > 0)
            {
                //alert("More 0");
                var orderDetail = items[0];
                //alert(JSON.stringify(orderDetail))
                if(orderDetail !== null)
                {
                    //alert(orderDetail.id)
                    var orderType = orderDetail.type;
                    if(orderType === 'W')
                    {
                        //alert("Catalog");
                    }
                    else
                    {
                        //alert("Liff");
                        emptyCart();
                        sessionStorage.removeItem('discountDetails');
                        sessionStorage.removeItem('discountRate');
                        sessionStorage.removeItem('promotionCode');
                    }
                    //alert(orderDetailId.length)
                    /* var typeOrder = orderDetail.id.slice((orderDetail.id.length - 2), (orderDetail.id.length - 1))
                    //alert(typeOrder)
                    if(orderType = 'W')
                    {
                        //alert("Catalog");
                    }
                    else
                    {
                        //alert("Liff");
                        emptyCart();
                    } */
                }
            }

        }
        
        //alert('catalogLocationId = ' + catalogLocationId)
        //alert('targetPage = ' + targetPage)
        if(targetPage.length > 0)
        {
          //alert('Go');
          if(targetPage === 'update-profile')
          {
            var userLocal = JSON.parse(userLocalJson)
            alert('catalogName = ' + catalogName);
            if (userLocal?.email) 
            {
              sessionStorage.setItem('catalogName',catalogName);
              router.push('/user/' + targetPage);
            } else {
              sessionStorage.setItem('targetPage','/user/' + targetPage);
              sessionStorage.setItem('catalogName',catalogName);
              setModalOpen(!modalOpen);
              //router.push('/user/' + targetPage);
            }
            
          }
          
        }
        else
        {
          await GetProductData('','','','',0,catalogCompanyId,catalogLocationId,companyName,locationName,companyCode,catalogName,0,9,1,itemPerPage,'','','');
        }
        
        
          
        setPromotionLoading(false);
        setCategoryLoading(false);
        setNewProductLoading(false);
        setLoading(false);
      }
      catch (err) 
      {
        //alert(err.message);
      }
      

      
    }, [])

    const GetProductData = async(liffId,
      lineUserId,
      linePOSId,
      groupId,
      orderId,
      companyId,
      locationId,
      companyName,
      locationName,
      companyCode,
      catalogName,
      promotionId,customerTypeId,page,itemPerPage,query,category,product) =>
    {
      alert('locationId = ' + locationId);
      const products = await ProductServices.fetchGetCoinPOSProductService({
        liffId,
        lineUserId,
        linePOSId,
        groupId,
        orderId,
        companyId,
        locationId,
        companyName,
        locationName,
        companyCode,
        catalogName,
        promotionId,customerTypeId,page,itemPerPage,query,category,product
      });

      //alert(JSON.stringify(products));
      //alert(JSON.stringify(products.catalogCouponCode));
      if(products.catalogCouponCode !== undefined)
      {
        //alert("Have Promotion")
        setCatalogPromotionId(Number(products.catalogPromotionId));
        setPromotionCode(products.catalogCouponCode);
        setCatalogPromotionName(products.catalogPromotionName);
        setCatalogDiscountPercentage(products.catalogDiscountPercentage)
        setCatalogPromotionIsAllProduct(products.catalogIsAllProduct);
        setCatalogMinimumAmount(products.catalogMinimumAmount);
        setCatalogProductType(products.catalogProductType)

        SetPromotionData(products.catalogCouponCode,products.catalogEndTime,products.catalogMinimumAmount,products.catalogDiscountPercentage,true);
      }
      
      sessionStorage.setItem('customerTypeId',products.customerTypeId);
      sessionStorage.setItem('promotionId',products.promotionId);
      
      

      currentPage = products.currentPage;
      countPage = products.countPage;

      var productVariants = [];//products.productVariantPresenters;
      var productCategories = [];

      var newProductVariants = [];

      if(products.productVariantPresenters !== null)
      {
        for(var i = 0;i < products.productVariantPresenters.length; i++)
        {
          var productItem = {};
          productItem['_id'] = Number(products.productVariantPresenters[i].ProductVariantId);
          productItem['title'] = products.productVariantPresenters[i].Name;
          productItem['quantity'] = products.productVariantPresenters[i].StockLevel;
          productItem['image'] = products.productVariantPresenters[i].ImageUrl;
          productItem['unit'] = products.productVariantPresenters[i].UPC;
          productItem['slug'] = products.productVariantPresenters[i].UPC;
          productItem['tag'] = products.productVariantPresenters[i].ProductId;
          productItem['originalPrice'] = products.productVariantPresenters[i].Price;
          productItem['price'] = products.productVariantPresenters[i].Price;
          productItem['type'] = 'W';
          productItem['sku'] = products.productVariantPresenters[i].SKU;
          productItem['discount'] = 0;
          productItem['description'] = products.productVariantPresenters[i].Description;
          productItem['currencySign'] = products.currencySign;
        


          productVariants.push(productItem);
        }
      }
  
      if(products.newProductVariantPresenters !== null)
      {
        for(var i = 0;i < products.newProductVariantPresenters.length; i++)
        {
          var productItem = {};
          productItem['_id'] = Number(products.newProductVariantPresenters[i].ProductVariantId);
          productItem['title'] = products.newProductVariantPresenters[i].Name;
          productItem['quantity'] = products.newProductVariantPresenters[i].StockLevel;
          productItem['image'] = products.newProductVariantPresenters[i].ImageUrl;
          productItem['unit'] = products.newProductVariantPresenters[i].UPC;
          productItem['slug'] = products.newProductVariantPresenters[i].UPC;
          productItem['tag'] = products.newProductVariantPresenters[i].ProductId;
          productItem['originalPrice'] = products.newProductVariantPresenters[i].Price;
          productItem['price'] = products.newProductVariantPresenters[i].Price;
          productItem['type'] = 'W';
          productItem['sku'] = products.newProductVariantPresenters[i].SKU;
          productItem['discount'] = 0;
          productItem['description'] = products.newProductVariantPresenters[i].Description;
          productItem['currencySign'] = products.currencySign;
        


          newProductVariants.push(productItem);
        }
      }

      if(products.productCategoryPresenters !== null)
      {
        for(var j = 0;j < products.productCategoryPresenters.length; j++)
        {

        
          var nests = [];
          for(var k = 0;k < products.productCategoryPresenters[j].Products.length; k++)
          {
            var children = {};
            children['_id'] = Number(products.productCategoryPresenters[j].Products[k].ProductId);
            children['title'] = products.productCategoryPresenters[j].Products[k].Name;
            nests.push(children);
          }
          

          
          var productCategory = {};
          productCategory['_id'] = Number(products.productCategoryPresenters[j].CategoryId);
          productCategory['parent'] = products.productCategoryPresenters[j].Name;
          productCategory['icon'] = products.productCategoryPresenters[j].ImageUrl;
          productCategory['children'] = nests;

          productCategories.push(productCategory);


        }
      }
      var orderData = {};
      var orderDetailDatas = [];
      if(products.orderDetails !== null)
      {
        for(var i = 0;i < products.orderDetails.length; i++)
        {
          var orderDetailItem = {};
          orderDetailItem['_id'] = products.orderDetails[i].orderDetailId;
          orderDetailItem['upc'] = products.orderDetails[i].upc;
          orderDetailItem['orderId'] = products.orderDetails[i].orderId;
          orderDetailItem['productVariantId'] = products.orderDetails[i].productVariantId;
          orderDetailItem['productVariantName'] = products.orderDetails[i].productVariantName;
          orderDetailItem['sku'] = products.orderDetails[i].sku;
          orderDetailItem['productVariantPrice'] = products.orderDetails[i].productVariantPrice;
          orderDetailItem['locationId'] = products.orderDetails[i].locationId;
          orderDetailItem['discount'] = products.orderDetails[i].discount;
          orderDetailItem['quantity'] = products.orderDetails[i].quantity;
          orderDetailItem['imageUrl'] = products.orderDetails[i].imageUrl;
          orderDetailItem['lineOrder'] = products.orderDetails[i].lineOrder;

          orderDetailDatas.push(orderDetailItem);

        }
      }

      //alert(JSON.stringify("category Data = " + productCategories))
      sessionStorage.setItem('categories', JSON.stringify(productCategories));

      pagingManager();
      setCategoryList(productCategories);
      setProductList(productVariants);

      setNewProductList(newProductVariants);

    

}

const CancelPromotionCode = async(promotionCode) =>
{
  var orderId = catalogOrderId;
      
      var companyId = catalogCompanyId;
      var locationId = catalogLocationId;
      var qrPromotion = promotionCode;
      var pictureUrl = '';
      var orderDetails = []


      
      
      //setItems(productDs);
          sessionStorage.removeItem('discountDetails')
          sessionStorage.removeItem('discountRate');
          sessionStorage.removeItem('promotionCode');
          sessionStorage.removeItem('promotionMinimumAmount');
          sessionStorage.removeItem('promotionProductIdList');
          sessionStorage.removeItem('isForAllProduct');

          setPromotionCode(undefined);

          localStorage.removeItem('discountDetails');
          localStorage.removeItem('discountRate');
          localStorage.removeItem('promotionCode');
          localStorage.removeItem('promotionMinimumAmount');
          localStorage.removeItem('promotionProductIdList');
          localStorage.removeItem('isForAllProduct');

          setDiscountDetail(undefined)

          clearCouponData();
}

const SetPromotionData = (promotionCode,promotionEndTime,promotionMinimumAmount,promotionDiscountRate, isAuto) =>
{
  var couponData = [];
  
  var couponDetail = {
    couponCode:promotionCode,
    endTime:promotionEndTime,
    minimumAmount:promotionMinimumAmount,
    discountPercentage:promotionDiscountRate,

  };
  couponData.push(couponDetail);
          
  sessionStorage.setItem('couponInfo', JSON.stringify(couponData));
  setCouponData(promotionCode, couponData, isAuto);
}

    const ApplyPromotionCode = async(promotionCode,discountPercentage, isForAllProduct, minimumAmount, productIdList) =>
    {
      setPromotionLoading(true);
      //alert(sessionStorage.getItem('discountDetails'));
      //if(getPromotionCode !== null)
      //{
      //   localStorage.getItem('promotionCode')
      //}

      var orderDetails = []

      for(var i = 0; i<items.length;i++)
      {
        var itemData = items[i];
        var orderDetail = {
          VariantId:itemData.id,
          Quantity:itemData.quantity,
          ProductVariantLabel:itemData.title,
          UnitPrice:itemData.price,
          ProductId:itemData.slug
        };
         
        orderDetails.push(orderDetail);
      }

      var orderId = catalogOrderId;
      var companyId = catalogCompanyId;
      var locationId = catalogLocationId;
      var qrPromotion = promotionCode;
      var pictureUrl = '';

      
      const promotion = await ProductServices.applyPromotionCode({
        companyId,
        locationId,
        orderId:0,
        qrPromotion,
        lineUserId:'',
        linePOSId:'',
        liffId:'',
        pictureUrl:'',
        catalogName:catalogName,
        orderDetails:JSON.stringify(orderDetails)
      });
      var salesOrderDetails = promotion.orderDetails;

          const productDs = [];
          const discountDetails = [];
          
          for(var i = 0;i<salesOrderDetails.length;i++)
          {
            var detail = {
              id: Number(salesOrderDetails[i].productVariantId),
              slug:salesOrderDetails[i].productId,
              name: salesOrderDetails[i].upc,
              title:salesOrderDetails[i].productVariantName,
              sku: salesOrderDetails[i].sku,
              quantity:salesOrderDetails[i].quantity,
              price: salesOrderDetails[i].productVariantPrice,
              image:salesOrderDetails[i].imageUrl,
            }
            var discountDetail = {
              id: Number(salesOrderDetails[i].productVariantId),
              discount:Number(salesOrderDetails[i].discount),
              discountRate:Number(salesOrderDetails[i].discountRate)
            }
            productDs.push(detail);
            discountDetails.push(discountDetail);
          }

          //alert(JSON.stringify(productDs))
          //alert(JSON.stringify(discountDetails))
          //alert(JSON.stringify(productIdList))
          setItems(productDs);
          sessionStorage.setItem('discountDetails', JSON.stringify(discountDetails));
          sessionStorage.setItem('discountRate', (discountPercentage/100));
          sessionStorage.setItem('promotionCode', promotionCode);
          sessionStorage.setItem('promotionMinimumAmount', minimumAmount);
          sessionStorage.setItem('promotionProductIdList', JSON.stringify(productIdList));
          sessionStorage.setItem('isForAllProduct', isForAllProduct);

          setPromotionCode(promotionCode);

          localStorage.setItem('discountDetails',JSON.stringify(discountDetails));
          localStorage.setItem('discountRate', (discountPercentage/100));
          localStorage.setItem('promotionCode', promotionCode);
          localStorage.setItem('promotionMinimumAmount', minimumAmount);
          localStorage.setItem('promotionProductIdList', JSON.stringify(productIdList));
          localStorage.setItem('isForAllProduct', isForAllProduct);

          setDiscountDetail(JSON.stringify(discountDetails))

          setPromotionLoading(false);

          SetPromotionData(promotionCode,promotion.endTime,promotion.minimumAmount,promotion.discountRate, false);
          
          

    }
    const SearchProduct = async (searchText) => 
    {
      //alert("Searching = " + searchText);
      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,companyCode,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,searchText)
    }
    const FilterCategory = async (categoty) => 
    {
      
      //alert("categoty = " + categoty);

      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,companyCode,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,'',categoty)
    }
    const FilterProduct = async (category,product) => 
    {
      
      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,companyCode,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,'',category,product)
    }
    const RefreshProductList = async (liffId, lineUserId, linePOSId, groupId, orderId,companyId,companyCode,locationId,catalogName,companyName, locationName, promotionId,customerTypeId,page,itemPerPage,query,category,product) =>
    {
      setLoading(true);
      
      query = query === undefined ? 'null' : query;
      category = category === undefined ? 'null' : category;
      product = product === undefined ? 'null' : product;
      //alert("customerTypeId = " + customerTypeId);
      const products = await ProductServices.fetchRefreshCoinPOSProductService({
        liffId,
        lineUserId,
        linePOSId,
        groupId,
        orderId,
        companyId,
        companyCode,
        locationId,
        companyName,
        
        locationName,
        catalogName:"",
        promotionId,customerTypeId,page,itemPerPage,query:query,category,product
      });

      
      currentPage = products.currentPage;
      countPage = products.countPage;
      var productVariants = [];//products.productVariantPresenters;
      if(products !== undefined)
      {
        if(products.productVariantPresenters !== undefined)
        {
          for(var i = 0;i < products.productVariantPresenters.length; i++)
          {
            var productItem = {};
            productItem['_id'] = Number(products.productVariantPresenters[i].ProductVariantId);
            productItem['title'] = products.productVariantPresenters[i].Name;
            productItem['quantity'] = products.productVariantPresenters[i].StockLevelDisplay;
            productItem['image'] = products.productVariantPresenters[i].ImageUrl;
            productItem['unit'] = products.productVariantPresenters[i].UPC;
            productItem['slug'] = products.productVariantPresenters[i].UPC;
            productItem['tag'] = products.productVariantPresenters[i].ProductId;
            productItem['originalPrice'] = products.productVariantPresenters[i].PriceDisplay;
            productItem['price'] = products.productVariantPresenters[i].PriceDisplay;
            productItem['type'] = 'W';
            productItem['sku'] = products.productVariantPresenters[i].SKU;
            productItem['discount'] = 0;
            productItem['description'] = products.productVariantPresenters[i].Description;
            productItem['currencySign'] = products.currencySign;


            productVariants.push(productItem);
          }
        }
      }
      
      

      pagingManager();
      setProductList(productVariants);


      setLoading(false);
    }

    const pagingManager = () =>
    {
      var allPage = countPage;
      var startPage = 1;
      var endPage = allPage;
      if(currentPage < 3)
      {
        startPage = 1;
      }
      else
      {
        startPage = currentPage - 2;
      }
      if(currentPage + 2 > allPage)
      {
        endPage = allPage;
      }
      else
      {
        if(currentPage < 3)
        {
          endPage = 5;
        }
        else
        {
          endPage = currentPage + 2;
        }
            
      }

      var indents = [];
    
        if(startPage > 1)
        {
          indents.push(<button onClick={()=>RefreshProductList("","","","",catalogOrderId,catalogCompanyId,catalogLocationId,'','',0,9,startPage-1,30)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
              Previous
            </button>);
        }
        else
        {
          indents.push(
            <button className="text-gray-400 text-lg px-2" disabled>Previous</button>
          );
        }

        var iPage = 0;
        for (let i = startPage; i <= endPage; i++) {
          if(i === currentPage)
          {
            indents.push(<button className="text-gray-400 text-lg px-2" disabled>{i}</button>);
          }
          else
          {
            iPage = i;
            indents.push(<button onClick={()=>RefreshProductList("","","","",catalogOrderId,catalogCompanyId,catalogLocationId,'','',0,9,i,30)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            {i}
          </button>);
          }
          
        }

        if(endPage > allPage)
        {
          indents.push(<button className="text-gray-400 text-lg px-2" disabled>Next</button>);
          
        }
        else
        {
          if(endPage === allPage)
          {
            indents.push(<button className="text-gray-400 text-lg px-2" disabled>Next</button>);
          }
          else
          {
            indents.push(<button onClick={()=>RefreshProductList("","","","",catalogOrderId,catalogCompanyId,catalogLocationId,'','',0,9,endPage+1,30)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            Next
          </button>)
          }
          
        }

        setPaging(indents);
    }
    




    return (
        <>
        {modalOpen && (
          <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} targetPage={targetPage} />
        )}
      <Layout title={title} description={description} dataPath={dataPath} companyName={companyName} locationName={locationName} companyLogo={companyLogo} 
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel}
      RefreshProductList={SearchProduct} FilterProduct={FilterProduct} >
        <div className="min-h-screen">
          <StickyCart discountDetails={discountDataDetails} currencySign={currencySign}/>
          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
              {catalogPromotionId === 0 
              ?
                promotionLoading ?
                  <div className="bg-gray-100 lg:py-16 py-10">
                    <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                    
                      <div className="mb-10 flex justify-center">
                        <div className="text-center w-full lg:w-2/5">
                          <Loading loading={promotionLoading} />
                          <p className="text-base font-sans text-gray-600 leading-6">
                          กำลังปรับปรุงส่วนลด กรุณารอสักครู่
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                
                :
                  <OfferCard promotions={promotions} selectedPromotion={promotionCode} companyId={catalogCompanyId} catalogName={catalogName} ApplyPromotionCode={ApplyPromotionCode} CancelPromotionCode={CancelPromotionCode}/>
                
                
                 
                
              :
                <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 lg:block">
                  <Banner promotionName={catalogPromotionName} discountPercentage={catalogDiscountPercentage} promotionIsAllProduct={catalogPromotionIsAllProduct} 
                      minimumAmount={catalogMinimumAmount} currencySign={currencySign} productType={catalogProductType}/>
                </div>
                  /* <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                      <Banner promotionName={catalogPromotionName} discountPercentage={catalogDiscountPercentage} promotionIsAllProduct={catalogPromotionIsAllProduct} 
                      minimumAmount={catalogMinimumAmount} currencySign={currencySign} productType={catalogProductType}/>
                    </div> */}
              {/* <div className="flex w-full"> */}
                {/* {dataPath} */}
                
                
                {/* <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-2">
                  
                  <OfferCard promotions={promotions} companyId={catalogCompanyId} ApplyPromotionCode={ApplyPromotionCode}/>
                </div> */}
                {/* <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                  <MainCarousel />
                </div> */}
                {/* <div className="w-full lg:flex">
                  <OfferCard promotions={promotions} companyId={catalogCompanyId} ApplyPromotionCode={ApplyPromotionCode}/>
                </div> */}
              {/* </div> */}
              {/* <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                <Banner />
              </div> */}
            </div>
          </div>

          <div id="newProduct"
            className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  Latest New Products
                </h2>
                
              </div>
            </div>
            {
                newProductLoading ? (
                  <Loading loading={newProductLoading} />
                )
                :
                (
                  <div className="flex">
                    <div className="w-full">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {newProductList.map((product) => (
                          <ProductCard key={product._id} product={product} liffId={""} lineUserId={""} 
                          linePOSId={""} groupId={""} orderId={catalogOrderId} companyId={catalogCompanyId} locationId={catalogLocationId} pictureUrl={lineProfileImage} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            
          </div>
          {/* feature category's */}
          <div className="bg-gray-100 lg:py-16 py-10">
            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    Featured Categories
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    เลือกหมวดหมู่สินค้า เพื่อค้นหาสินค้าที่ตรงใจคุณอย่างรวดเร็ว
                  </p>
                </div>
              </div>
              {
                categoryLoading ? (
                  <Loading loading={categoryLoading} />
                )
                :
                (
                  <FeatureCategory categories={categoryList} FilterCategory={FilterCategory} FilterProduct={FilterProduct}/>
                )
              }
              
            </div>
          </div>

          {/* popular products */}
          <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  สินค้าทั้งหมด สำหรับการช็อปปิ้งของคุณ
                </h2>
                
              </div>
            </div>
            {
              loading ? (
                <Loading loading={loading} />
              )
              :
              (
                <>
                  <div className="flex">
                    <div className="w-full">
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {productList?.map((product) => (
                          <ProductCard key={product._id} product={product} liffId={""} lineUserId={""} 
                          linePOSId={""} groupId={""} orderId={catalogOrderId} companyId={catalogCompanyId} locationId={catalogLocationId} pictureUrl={lineProfileImage}  />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full">
                    <div id="pagingProduct" className=" lg:py-16 bg-repeat bg-center overflow-hidden">
                      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                        <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-3 items-center">
                          
                          <div className="text-center">
                            
                            <div className="mt-2">
                              {pagingIndent}
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                      
                    </div>
                  </div>
                </>
                
              )    
            }
            
          </div>

          {/* promotional banner card */}
          {/* <div className="block mx-auto max-w-screen-2xl">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
              <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border rounded-lg">
                <CardTwo />
              </div>
            </div>
          </div> */}

          {/* discounted products */}
          {/* <div
            id="discount"
            className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  Latest Discounted Products
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  See Our latest discounted products below. Choose your daily
                  needs from here and get a special discount with free shipping.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {discountProducts?.slice(0, 18).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Layout>
    </>
    );
}

export const getServerSideProps = async ({req, res,params }) => {
    //var coinPOSLiffData = params.id;
    var dataParam = params.id;
    var companyCode = params.name;
    var dataPath = companyCode + "/" + dataParam;
    var coinPOSData = req.url;
    var targetPage = '';
    if(coinPOSData.length > 0)
    {
      var parmsData = coinPOSData.split('?');
      if(parmsData.length > 1)
      {
        //const liffQuery = parmsData[1];
        var pageQuery = parmsData[1];
        var pageQueryData = pageQuery.split("=");
        if(pageQueryData[0] === 'page')
        {
          targetPage = pageQueryData[1];
        
        }
      }
    }

    var catalogName = dataParam;
    var companyName = '';
    var locationName = '';
    const promotionId = 0;

    const customerTypeId = 9;
    var page = 1;
    var itemPerPage = 30;
    const query = '';
    const category = '';
    const product = '';   

    const title = "all-in-one, heavy-duty & modern ecommerce platform";
    const description = "CoinPOS Ecommerce Platform - All-in-one, heavy-duty, cost-effective and modern ecommerce platform for business of all sizes.";

    var liffId = "";
    var lineUserId = "";
    var linePOSId = "";
    var groupId = "";
    var orderId = 0;
    var companyId = 0;
    var locationId = 0;


    
  const products = await ProductServices.fetchGetDefaultDataCompany({
  //const products = await ProductServices.getCoinPOSProductService({
    liffId,
    lineUserId,
    linePOSId,
    groupId,
    orderId,
    companyId,locationId,
    companyName,
    locationName,
    catalogName,
    companyCode,
    promotionId,customerTypeId,page,itemPerPage,query,category,product
  });

  /*var productVariants = [];//products.productVariantPresenters;
  var productCategories = [];

  if(products.productVariantPresenters !== null)
  {
    for(var i = 0;i < products.productVariantPresenters.length; i++)
    {
      var productItem = {};
      productItem['_id'] = Number(products.productVariantPresenters[i].ProductVariantId);
      productItem['title'] = products.productVariantPresenters[i].Name;
      productItem['quantity'] = products.productVariantPresenters[i].StockLevel;
      productItem['image'] = products.productVariantPresenters[i].ImageUrl;
      productItem['unit'] = products.productVariantPresenters[i].UPC;
      productItem['slug'] = products.productVariantPresenters[i].UPC;
      productItem['originalPrice'] = products.productVariantPresenters[i].Price;
      productItem['price'] = products.productVariantPresenters[i].Price;
      productItem['type'] = 'W';
      productItem['sku'] = products.productVariantPresenters[i].SKU;
      productItem['discount'] = 0;
      productItem['description'] = products.productVariantPresenters[i].Description;
      productItem['currencySign'] = products.currencySign;
      


      productVariants.push(productItem);
    }
  }
  

  if(products.productCategoryPresenters !== null)
  {
    for(var j = 0;j < products.productCategoryPresenters.length; j++)
    {

      
      var nests = [];
      for(var k = 0;k < products.productCategoryPresenters[j].Products.length; k++)
      {
        var children = {};
        children['_id'] = Number(products.productCategoryPresenters[j].Products[k].ProductId);
        children['title'] = products.productCategoryPresenters[j].Products[k].Name;
        nests.push(children);
      }
      

      
      var productCategory = {};
      productCategory['_id'] = Number(products.productCategoryPresenters[j].CategoryId);
      productCategory['parent'] = products.productCategoryPresenters[j].Name;
      productCategory['icon'] = products.productCategoryPresenters[j].ImageUrl;
      productCategory['children'] = nests;

      productCategories.push(productCategory);


    }
  }*/
  

  /* for(var i = 0;i < products.productCategoryPresenters.length; i++)
  {
    var productItem = {};
    productItem['_id'] = Number(products.productVariantPresenters[i].ProductVariantId);
    productItem['title'] = products.productVariantPresenters[i].Name;
    productItem['quantity'] = products.productVariantPresenters[i].StockLevel;
    productItem['image'] = products.productVariantPresenters[i].ImageUrl;
    productItem['unit'] = products.productVariantPresenters[i].UPC;
    productItem['slug'] = products.productVariantPresenters[i].UPC;
    productItem['originalPrice'] = products.productVariantPresenters[i].Price;
    productItem['price'] = products.productVariantPresenters[i].Price;
    productItem['type'] = '';
    productItem['sku'] = products.productVariantPresenters[i].SKU;
    productItem['discount'] = 0;
    productItem['description'] = products.productVariantPresenters[i].Description;
    productItem['currencySign'] = products.currencySign;
    


    productVariants.push(productItem);
  } */
  
  /*var orderData = {};
  var orderDetailDatas = [];
   if(products.orderDetails !== null)
  {
    for(var i = 0;i < products.orderDetails.length; i++)
    {
      var orderDetailItem = {};
      orderDetailItem['_id'] = products.orderDetails[i].orderDetailId;
      orderDetailItem['upc'] = products.orderDetails[i].upc;
      orderDetailItem['orderId'] = products.orderDetails[i].orderId;
      orderDetailItem['productVariantId'] = products.orderDetails[i].productVariantId;
      orderDetailItem['productVariantName'] = products.orderDetails[i].productVariantName;
      orderDetailItem['sku'] = products.orderDetails[i].sku;
      orderDetailItem['productVariantPrice'] = products.orderDetails[i].productVariantPrice;
      orderDetailItem['locationId'] = products.orderDetails[i].locationId;
      orderDetailItem['discount'] = products.orderDetails[i].discount;
      orderDetailItem['quantity'] = products.orderDetails[i].quantity;
      orderDetailItem['imageUrl'] = products.orderDetails[i].imageUrl;
      orderDetailItem['lineOrder'] = products.orderDetails[i].lineOrder;

      orderDetailDatas.push(orderDetailItem);

    }
  }*/

  var promotions = [];
  promotions = products.promotions;
  var shippingServices = products.shippingServices;
  var bankNameAndAccounts = products.bankNameAndAccounts;
  var countPage = products.countPage;
  var currentPage = products.currentPage;
  var currencySign = products.currencySign;
  var customerFirstName = products.firstName;
  var customerLastName = products.lastName;
  var customerEmail = products.email;
  var customerPhoneNumber = products.mobile;

  var address1 = products.address1;
  var countryId = products.countryId;
  var provinceId = products.provinceId;
  var cityId = products.cityId;
  var districtId = products.districtId;
  var postalcode = products.postalcode;
  var countrys = products.countrys;
  var provinces = products.provinces;
  var cities = products.cities;
  var districts = products.districts;

  var companyLogo = products.companyLogoUrl;

  var locationAddress1 = products.locationAddress1;
  var locationAddress2 = products.locationAddress2;
  var locationCity = products.locationCity;
  var locationStateOrProvince = products.locationStateOrProvince;
  var locationCountry = products.locationCountry;
  var locationPostalCode = products.locationPostalCode;
  var locationEmail = products.locationEmail;
  var locationTel = products.locationTel;

  var companyFacebook = products.companyFacebook;
  var companyLine = products.companyLine;

  var catalogCompanyId = products.companyId;
  var catalogLocationId = products.locationId;

  
  companyName = products.companyName;
  locationName = products.locationName;


    return {
      props: { 
        params: dataParam,
        targetPage:targetPage,
        companyCode:companyCode,
        dataPath:dataPath,
        title:title,
        description:description,
        countPage:countPage,
        currentPage:currentPage,
        //products: productVariants,
        //salesOrder:orderData,
        //orderDetails:orderDetailDatas,
        shippingServices:shippingServices,
        bankNameAndAccounts:bankNameAndAccounts,
        currencySign:currencySign,
        companyName:companyName,
        companyLogo:companyLogo,
        companyFacebook:companyFacebook,
        companyLine:companyLine,
        catalogCompanyId:catalogCompanyId,
        catalogName:catalogName,
        catalogLocationId:catalogLocationId,

        locationName:locationName,
        //categories:productCategories,
        customerFirstName:customerFirstName,
        customerLastName:customerLastName,
        customerEmail:customerEmail,
        customerPhoneNumber:customerPhoneNumber,

        address1:address1,
        countryId:countryId,
        provinceId:provinceId,
        cityId:cityId,
        districtId:districtId,
        postalcode:postalcode,
        countrys:countrys,
        provinces:provinces,
        cities:cities,
        districts:districts,

        promotions:promotions,

        locationAddress1:locationAddress1,
        locationAddress2:locationAddress2,
        locationCity:locationCity,
        locationStateOrProvince:locationStateOrProvince,
        locationCountry:locationCountry,
        locationPostalCode:locationPostalCode,
        locationEmail:locationEmail,
        locationTel:locationTel

      },
    };
  };


export default Catalog;