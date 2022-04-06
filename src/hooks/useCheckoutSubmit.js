import Cookies from 'js-cookie';
import * as dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from 'react-use-cart';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

//internal import
import useAsync from '@hooks/useAsync';
import { UserContext } from '@context/UserContext';
import OrderServices from '@services/OrderServices';
import ProductServices from '@services/ProductServices';
import CouponServices from '@services/CouponServices';
import UserServices from '@services/UserServices';
import { notifyError, notifySuccess } from '@utils/toast';

const useCheckoutSubmit = () => {
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);

  const [error, setError] = useState('');
  const [total, setTotal] = useState('');
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState('');
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  
  const [orderId, setOrderId] = useState(0);
  const [shippingId, setShippingId] = useState(0);
  const [shippingName, setShippingName] = useState('');
  const [shippingFee, setShippingFee] = useState(0);
  const [companyId, setCompanyId] = useState(0);
  const [linePOSId, setLinePOSId] = useState('');
  const [liffId, setLiffId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');








  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef('');
  const { isEmpty, emptyCart, items, cartTotal, setItems } = useCart();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //const { data } = useAsync(CouponServices.getAllCoupons);

  useEffect(() => {

    if (Cookies.get('couponInfo')) {
      const coupon = JSON.parse(Cookies.get('couponInfo'));
      //alert("Check out = " + JSON.stringify(coupon))
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
    }
    else if(sessionStorage.getItem('couponInfo'))
    {
      const coupon = JSON.parse(sessionStorage.getItem('couponInfo'));
      //alert("Session Check out = " + JSON.stringify(coupon))
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
    }
  }, []);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove('couponInfo');
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  useEffect(() => {
    const result = items?.filter((p) => p.type === discountProductType);
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );
    let totalValue = '';
    let subTotal = (cartTotal + shippingCost).toFixed(2);
    let discountAmount = discountProductTotal * (discountPercentage / 100);
    totalValue = subTotal - discountAmount;
    setDiscountAmount(discountAmount);
    setTotal(totalValue);
  }, [cartTotal, shippingCost, discountPercentage]);

  //if not login then push user to home page
  useEffect(async () => {

    var companyId = 0;
    if(sessionStorage.getItem('companyId'))
    {
      companyId = Number(sessionStorage.getItem('companyId'));
      //alert(lineCompanyId); 
      //companyId = lineCompanyId;
      //handleCompanyId(lineCompanyId);
    }
    
    if(Cookies.get('userInfo'))
      {
        alert('Remove UserInfo');
        Cookies.remove('userInfo');
      } 
      var userLocalJson = localStorage.getItem('userInfo');
      Cookies.set('userInfo', userLocalJson);
      var userLocal = JSON.parse(userLocalJson)
      try
      {
        /* const expiredDate = await UserServices.fetchCoinposCheckExpired(
          {
            email:userLocal.email,
            companyId:companyId
          }); */
          
        const expiredDate = sessionStorage.getItem('expiredDate');
        //alert('expiredDate = ' + expiredDate);
        if(expiredDate === undefined)
        {
          if(expiredDate === false)
          {
            alert('Login');
            dispatch({ type: 'USER_LOGIN', payload: userLocal });


            sessionStorage.setItem('customerFirstName', userLocal.firstName);
            sessionStorage.setItem('customerLastName', userLocal.lastName);
            sessionStorage.setItem('customerEmail', userLocal.email);
            sessionStorage.setItem('customerPhoneNumber', userLocal.phone);

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
            alert('Logout 11');
            dispatch({ type: 'USER_LOGOUT' });
            Cookies.remove('userInfo');
            Cookies.remove('couponInfo');
          }
        }
        

  
        
      }
      catch(e)
      {
        //alert("error = " + e.message);
      }
    /*if (!userInfo) {
      //alert("????")
      router.push('/');
    }*/

    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('address', shippingAddress.address);
    setValue('contact', shippingAddress.contact);
    setValue('email', shippingAddress.email);
    setValue('city', shippingAddress.city);
    setValue('country', shippingAddress.country);
    setValue('zipCode', shippingAddress.zipCode);
  }, []);

  const submitHandler = async (data) => {
    
    //alert("")
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
    
    Cookies.set('shippingAddress', JSON.stringify(data));
    //alert("submitHandler " + data.paymentMethod);
    setIsCheckoutSubmit(true);
    //alert("submitHandler2 ");
    //alert("init order info " + JSON.stringify(data));
    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      status: 'Pending',
      cart: items,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
    };
    //alert("submitHandler3 ");
    if (data.paymentMethod === 'Card') {
      if (!stripe) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error && !paymentMethod) {
        setError(error.message);
      } else {
        setError('');
        const orderData = {
          ...orderInfo,
          cardInfo: paymentMethod,
        };

        OrderServices.addOrder(orderData)
          .then((res) => {
            router.push(`/order/${res._id}`);
            notifySuccess('Your Order Confirmed!');
            Cookies.remove('couponInfo');
            emptyCart();
            sessionStorage.removeItem('products');
            setIsCheckoutSubmit(false);
          })
          .catch((err) => {
            notifyError(err.message);
            setIsCheckoutSubmit(false);
          });
      }
    }
    if (data.paymentMethod === 'COD') {
      OrderServices.addOrder(orderInfo)
        .then((res) => {
          router.push(`/order/${res._id}`);
          notifySuccess('Your Order Confirmed!');
          Cookies.remove('couponInfo');
          sessionStorage.removeItem('products');
          emptyCart();
          setIsCheckoutSubmit(false);
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
    if (data.paymentMethod === 'Bank') {
      if(sessionStorage.getItem('orderId'))
      {
        orderId = sessionStorage.getItem('orderId'); 
        
      }
      if(sessionStorage.getItem('liffId'))
      {
        liffId = sessionStorage.getItem('liffId'); 
        
      }
      if(sessionStorage.getItem('linePOSId'))
      {
        linePOSId = sessionStorage.getItem('linePOSId'); 
        
      }
      if(sessionStorage.getItem('companyId'))
      {
        companyId = sessionStorage.getItem('companyId'); 
        
      }
      
      //alert(data.firstName);

      var firstName = data.firstName;
      var lastName = data.lastName;
      var mobile = data.contact;
      var address1 = data.address;
      var country = data.province1;
      var city = data.province2;
      var stateOrProvince = data.province;
      var postalCode = data.zipCode;

      //alert("orderId = " + orderId + " shippingId = " + shippingId + " shippingName = " + shippingName + " shippingFee = " + shippingFee + " companyId = " + companyId + " linePOSId = " + linePOSId + " liffId = " + liffId+ " pictureUrl = " +pictureUrl);
      shippingFee = shippingCost;
      ProductServices.closeCoinPOSCart({
        orderId,shippingId,shippingName,shippingFee,companyId,linePOSId,liffId,pictureUrl,firstName,lastName,mobile,
        address1,country,city,stateOrProvince,postalCode
      })
        .then((res) => {
          //alert(res)
          //return
          //router.push(`/order/${res._id}`);
          router.push(`/order/${res}`);
          notifySuccess('Your Order Confirmed!');
          Cookies.remove('couponInfo');
          sessionStorage.removeItem('products');
          emptyCart();
          setIsCheckoutSubmit(false);
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
    if (data.paymentMethod === undefined) {
      //alert("submitHandler " + data.firstName);
      if(sessionStorage.getItem('orderId'))
      {
        orderId = sessionStorage.getItem('orderId'); 
        
      }
      if(sessionStorage.getItem('liffId'))
      {
        liffId = sessionStorage.getItem('liffId'); 
        
      }
      if(sessionStorage.getItem('linePOSId'))
      {
        linePOSId = sessionStorage.getItem('linePOSId'); 
        
      }
      if(sessionStorage.getItem('companyId'))
      {
        companyId = sessionStorage.getItem('companyId'); 
        
      }
      if(sessionStorage.getItem('catalogName'))
      {
        catalogName = sessionStorage.getItem('catalogName'); 
        
              
      }
      //alert(data.firstName);

      var firstName = data.firstName;
      var lastName = data.lastName;
      var mobile = data.contact;
      var address1 = data.address;
      var country = data.country;
      var city = data.city;
      var stateOrProvince = data.province;
      var district = data.district;
      var postalCode = data.postalCode;
      var orderDetails = data.orderDetails;
      var catalogName = data.catalogName;
      var email = data.email;
      //alert("contact = " + data.contact)

      //alert("orderId = " + orderId + " shippingId = " + shippingId + " shippingName = " + shippingName + " shippingFee = " + shippingFee + " companyId = " + companyId + " linePOSId = " + linePOSId + " liffId = " + liffId+ " pictureUrl = " +pictureUrl);
      shippingFee = shippingCost;
      ProductServices.fetchCloseCoinPOSCart({
        orderId,shippingId,shippingName,shippingFee,companyId,linePOSId,liffId,pictureUrl,firstName,lastName,mobile,email,
        address1,country,city,stateOrProvince,postalCode,district,
        orderDetails,catalogName
      })
        .then((res) => {
          
          //return
          //router.push(`/order/${res._id}`);
          let orderInfo = {
            orderNumber: res.orderNumber,
            customerName: res.customerName,
            orderDate: res.orderDate,
            invoiceNumber: res.invoiceNumber,
            shippingToAddress: res.shippingToAddress,
            paymentMethod: res.paymentMethod,
            shippingFee: res.shippingFee,
            totalDiscount: res.totalDiscount,
            orderTotal: res.orderTotal,
            orderDetails:res.orderDetails,
            paymentStatusId:res.paymentStatusId,
            paymentStatus:res.paymentStatus,
            orderStatusId:res.orderStatusId,
            orderStatus:res.orderStatus,
            currencySign:res.currencySign

          };


          Cookies.set('orderInfo', JSON.stringify(orderInfo));
          //Cookies.remove('couponInfo');
          //sessionStorage.removeItem('products');
          emptyCart();
          setIsCheckoutSubmit(false);

          alert(`/order/${res.orderId}`);
          router.push(`/order/${res.orderId}`);
          notifySuccess('Your Order Confirmed!');

          alert(JSON.stringify(res))
          
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
  };

  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError('Please Input a Coupon Code!');
      return;
    }
    /* const result = data.filter(
      (coupon) => coupon.couponCode === couponRef.current.value
    );

    if (result.length < 1) {
      notifyError('Please Input a Valid Coupon!');
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError('This coupon is not valid!');
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch({ type: 'SAVE_COUPON', payload: result[0] });
      Cookies.set('couponInfo', JSON.stringify(result[0]));
    } */
  };

  const setCouponData = (value, promotion, isAuto) =>
  {
    //alert("Coupon value = " + value);
    //alert("Promotion value = " + JSON.stringify(promotion));
    //alert("Coupon Ref = " + couponRef.current.value);

    if (!value) {
      if(isAuto !== true)
      {
        notifyError('Please Input a Coupon Code!');
      }
      
      return;
    }
    if (promotion.length < 1) {
      if(isAuto !== true)
      {
        notifyError('Please Input a Valid Coupon!');
      }
      
      return;
    }

    if (dayjs().isAfter(dayjs(promotion[0]?.endTime))) {
      if(isAuto !== true)
      {
        notifyError('This coupon is not valid!');
      }
      
      return;
    }
    
    if (total < promotion[0]?.minimumAmount) {
      notifyError(
        `Minimum ${promotion[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    }else {
      //alert("set");
      setMinimumAmount(promotion[0]?.minimumAmount);
      setDiscountProductType(promotion[0].productType);
      setDiscountPercentage(promotion[0].discountPercentage);
      dispatch({ type: 'SAVE_COUPON', payload: promotion[0] });
      Cookies.set('couponInfo', JSON.stringify(promotion[0]));
      const coupon = JSON.stringify(promotion[0]);
      setCouponInfo(coupon);
      //alert("Set coupon = " + coupon);
    }
  };

  const clearCouponData = () =>
  {
    setMinimumAmount(0);
    setDiscountProductType('');
    setDiscountPercentage(0);
    //dispatch({ type: 'SAVE_COUPON', payload: promotion[0] });
    Cookies.remove('couponInfo');
    setCouponInfo('');
  }

  const handleOrderId = (value) => 
  {
    setOrderId(value);
  };
  const handleShippingId = (value) => 
  {
    setShippingId(value);
  };
  const handleShippingName = (value) => 
  {
    setShippingName(value);
  };
  
  const handleCompanyId = (value) => 
  {
    setCompanyId(value);
  };
  const handleLinePOSId = (value) => 
  {
    setLinePOSId(value);
  };
  const handleLiffId = (value) => 
  {
    setLiffId(value);
  };
  const handlePictureUrl = (value) => 
  {
    setPictureUrl(value);
  };
  return {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    orderId,
    companyId,
    linePOSId,
    liffId,
    pictureUrl,
    handleShippingId,
    handleShippingName,
    setCouponData,
    clearCouponData,
    setItems
    
    
  };
};

export default useCheckoutSubmit;
