import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { IoLockOpenOutline } from 'react-icons/io5';
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from 'react-icons/fi';

//internal import
import Layout from '@layout/Layout';
import useAsync from '@hooks/useAsync';
import useFilter from '@hooks/useFilter';
import { userSidebar } from '@utils/data';
import Card from '@component/order-card/Card';
import { UserContext } from '@context/UserContext';
import OrderServices from '@services/OrderServices';
import UserServices from '@services/UserServices';
import ProductServices from '@services/ProductServices';
import RecentOrder from '@pages/user/recent-order';

const Dashboard = ({ title, description, children, companyLogo }) => {
  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);

  var companyLogo = '';
  var companyName = '';
  var locationName = '';
  var locationAddress1 = '';
  var locationAddress2 = '';
  var locationCity = '';
  var locationStateOrProvince = '';
  var locationCountry = '';
  var locationPostalCode = '';
  var locationEmail = '';
  var locationTel = '';

  var customerId = 0;

  const [companyId, setCompanyId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [linePOSId, setLinePOSId] = useState('');
  const [lineUserId, setLineUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [liffId, setLiffId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  
  
  var catalogName = '';
  var customerEmail = '';
  var dataPath = '';
  if(sessionStorage.getItem('dataPath'))
  {
    dataPath = sessionStorage.getItem('dataPath'); 
      
  }

  if(sessionStorage.getItem('customerEmail'))
  {
    customerEmail = sessionStorage.getItem('customerEmail'); 
      
  }

  if(sessionStorage.getItem('catalogName'))
  {
    catalogName = sessionStorage.getItem('catalogName'); 
    
          
  }
  if(sessionStorage.getItem('companyLogo'))
  {
    companyLogo = sessionStorage.getItem('companyLogo'); 
    
  }
  if(sessionStorage.getItem('companyName'))
  {
    
    companyName = sessionStorage.getItem('companyName'); 
    //alert(companyName);
  }
  if(sessionStorage.getItem('locationName'))
  {
    locationName = sessionStorage.getItem('locationName'); 
    
  }
  if(sessionStorage.getItem('locationAddress1'))
  {
    locationAddress1 = sessionStorage.getItem('locationAddress1'); 
    
  }
  if(sessionStorage.getItem('locationAddress2'))
  {
    locationAddress2 = sessionStorage.getItem('locationAddress2'); 
    
  }
  if(sessionStorage.getItem('locationCity'))
  {
    locationCity = sessionStorage.getItem('locationCity'); 
    
  }
  if(sessionStorage.getItem('locationStateOrProvince'))
  {
    locationStateOrProvince = sessionStorage.getItem('locationStateOrProvince'); 
    
  }
  if(sessionStorage.getItem('locationCountry'))
  {
    locationCountry = sessionStorage.getItem('locationCountry'); 
    
  }
  if(sessionStorage.getItem('locationPostalCode'))
  {
    locationPostalCode = sessionStorage.getItem('locationPostalCode'); 
    
  }
  if(sessionStorage.getItem('locationEmail'))
  {
    locationEmail = sessionStorage.getItem('locationEmail'); 
    
  }
  if(sessionStorage.getItem('locationTel'))
  {
    locationTel = sessionStorage.getItem('locationTel'); 
    
  }
      if(sessionStorage.getItem('liffId'))
      {
        
        liffId = sessionStorage.getItem('liffId'); 
        //alert("Liff id = " + liffId)
      }
      if(sessionStorage.getItem('linePOSId'))
      {
        linePOSId = sessionStorage.getItem('linePOSId'); 
        //alert("LinePOS id = " + linePOSId)
      }
      if(sessionStorage.getItem('lineUserId'))
      {
        lineUserId = sessionStorage.getItem('lineUserId'); 
        
      }
      if(sessionStorage.getItem('companyId'))
      {
        companyId = sessionStorage.getItem('companyId'); 
        
      }
      if(sessionStorage.getItem('locationId'))
      {
        locationId = sessionStorage.getItem('locationId'); 
        
      }
      if(sessionStorage.getItem('groupId'))
      {
        groupId = sessionStorage.getItem('groupId'); 
        
      }

      if(sessionStorage.getItem('customerId'))
      {
        customerId = sessionStorage.getItem('customerId'); 
        //alert('customerId = ' + customerId);
              
      }

  const { data } = useAsync(() => ProductServices.getDashboardOrderByUserId(
    {
      companyId,
      liffId,
      lineUserId,
      linePOSId,
      catalogName:catalogName,
      email:customerEmail
    }));
  //useAsync(OrderServices.getOrderByUser);
  const { allOrderCount, pendingOrderCount, processingOrderCount, deliveredOrderCount } = useFilter(data);





  
  const handleLogOut = () => {
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('couponInfo');
    localStorage.removeItem('userInfo');
    router.push('/' + dataPath);
  };

  useEffect(async() => {
    //alert('Login 0');
    var companyId = 0;
    if(sessionStorage.getItem('companyId'))
    {
      companyId = Number(sessionStorage.getItem('companyId'));
      //alert(lineCompanyId); 
      //companyId = lineCompanyId;
      //handleCompanyId(lineCompanyId);
    }
    
    //alert('Login 1');
    if(Cookies.get('userInfo'))
      {
        Cookies.remove('userInfo');
      } 
      //alert('Login 2');
      var userLocalJson = localStorage.getItem('userInfo');
      Cookies.set('userInfo', userLocalJson);
      var userLocal = JSON.parse(userLocalJson)
      try
      {
        //alert('Login 3');
        const expiredDate = await UserServices.fetchCoinposCheckExpired(
          {
            email:userLocal.email,
            companyId:companyId
          });
        //alert('expiredDate = ' + expiredDate)
        if(expiredDate === 'false')
        {
          //alert('Login 4');
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

          //alert('countrys = ' + JSON.stringify(userLocal.countrys));
          sessionStorage.setItem('countrys', JSON.stringify(userLocal.countrys));
          sessionStorage.setItem('provinces', JSON.stringify(userLocal.provinces));
          sessionStorage.setItem('cities', JSON.stringify(userLocal.cities));
          sessionStorage.setItem('districts', JSON.stringify(userLocal.districts));
        }
        else
        {
          //alert('Login 5');
          alert('Logout');
          dispatch({ type: 'USER_LOGOUT' });
          Cookies.remove('userInfo');
          Cookies.remove('couponInfo');
        }

  
        
      }
      catch(e)
      {
        alert("error = " + e.message);
      }
    /*if (!userInfo) {
      router.push('/');
    }*/
  }, []);

  return (
    <Layout
      title={title ? title : 'Dashboard'}
      description={description ? description : 'This is User Dashboard' 
      }
      dataPath={dataPath}
      companyName={companyName} locationName={locationName} companyLogo={companyLogo}  
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel}
    >
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
          <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
            <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
              {userSidebar.map((item) => (
                <span
                  key={item.title}
                  className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                >
                  <item.icon
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <Link href={item.href}>
                    <a className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                      {item.title}
                    </a>
                  </Link>
                </span>
              ))}
              <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                <span className="mr-2">
                  <IoLockOpenOutline />
                </span>{' '}
                <button
                  onClick={handleLogOut}
                  className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
                >
                  Logout
                </button>
              </span>
            </div>
          </div>
          <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
            {!children && (
              <div className="overflow-hidden">
                <h2 className="text-xl font-serif font-semibold mb-5">
                  Dashboard
                </h2>
                <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  <Card
                    title="Total Order"
                    Icon={FiShoppingCart}
                    quantity={allOrderCount}//{data?.orders?.length}
                    className="text-red-600  bg-red-200"
                  />
                  <Card
                    title="Pending Order"
                    Icon={FiRefreshCw}
                    quantity={pendingOrderCount}//{pending.length}
                    className="text-orange-600 bg-orange-200"
                  />
                  <Card
                    title="Processing Order"
                    Icon={FiTruck}
                    quantity={processingOrderCount}//{processing.length}
                    className="text-indigo-600 bg-indigo-200"
                  />
                  <Card
                    title="Complete Order"
                    Icon={FiCheck}
                    quantity={deliveredOrderCount}//{delivered.length}
                    className="text-emerald-600 bg-emerald-200"
                  />
                </div>
                {/* <RecentOrder /> */}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
