import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
  LineIcon
} from 'react-share';

//internal import
import { UserContext } from '@context/UserContext';

const Footer = ({companyLogo,dataPath, companyName, locationName, locationAddress1,locationAddress2,locationCity,locationStateOrProvince,locationCountry,locationPostalCode,
  locationEmail,locationTel,
  }) => {
  const {
    state: { userInfo },
  } = useContext(UserContext);


  var companyFacebook = '';
  var companyLine = '';
  if(sessionStorage.getItem('companyFacebook'))
  {
        
    companyFacebook = sessionStorage.getItem('companyFacebook');
    
    //alert(companyFacebook)
  }
  if(sessionStorage.getItem('companyLine'))
  {
        
    companyLine = sessionStorage.getItem('companyLine'); 
  }

  return (
    <div className="pb-16 lg:pb-0 xl:pb-0 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-16 justify-between">
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              Company
            </h3>
            <ul className="text-sm flex flex-col space-y-3">
              <li className="flex items-baseline">
                <Link href="/">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Offers
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href="/contact-us">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Contact us
                  </a>
                </Link>
              </li>
              {/* <li className="flex items-baseline">
                <Link href="#">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Careers
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href="#">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Latest news
                  </a>
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              My Account
            </h3>
            <ul className="text-sm lg:text-15px flex flex-col space-y-3">
              <li className="flex items-baseline">
                {/* <Link href={`${userInfo?.email ? '/user/dashboard' : '#'}`}> */}
                <Link href='/user/dashboard'>
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link 
                href='/user/my-orders'
                // href={`${userInfo?.email ? '/user/my-orders' : '#'}`}
                >
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    My Orders
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link 
                href={`${userInfo?.email ? '/user/dashboard' : '#'}`}
                >
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Recent Orders
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link
                  /* href={`${userInfo?.email ? '/user/update-profile' : '#'}`} */
                  href='/user/update-profile'
                >
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Updated Profile
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            {/* <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              Top Category
            </h3>
            <ul className="text-sm lg:text-15px flex flex-col space-y-3">
              <li className="flex items-baseline">
                <Link href="/search?Category=fish--meat">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Fish & Meat
                  </a>
                </Link>
              </li>

              <li className="flex items-baseline">
                <Link href="/search?Category=drinks">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Soft Drinks
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href="search?Category=baby-care">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Baby Care
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href="search?Category=beauty--health">
                  <a className="text-gray-600 inline-block w-full hover:text-cyan-500">
                    Beauty & Health
                  </a>
                </Link>
              </li>
            </ul> */}
          </div>
          
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            {
              (companyLogo === undefined || companyLogo === null || companyLogo.length === 0)
              ?
              <>
              </>
              :
               <Link href={"/" + dataPath}>
                <a className="mr-3 lg:mr-12 xl:mr-12" rel="noreferrer">
                  <Image
                    width={70}
                    height={70}
                    src={companyLogo === undefined ? 'https://coinpos-uat.azurewebsites.net/img/logo2.png' : companyLogo}
                    alt="logo"
                  />
                </a>
              </Link>
              
            }
            
            <p className="leading-7 font-sans text-sm text-gray-600 mt-3">
              <span>
                {companyName}
              </span>
              <br/>
              <span>
                Location: {locationName}
              </span>
              <br/>
              <span>
                {locationAddress1} {locationAddress2} 
                <br /> 
                {locationCity} {locationStateOrProvince}
                {locationCountry} {locationPostalCode}
              </span>
              <br />
              <span>Tel: {locationTel}</span>
              <br />
              <span>Email: {locationEmail}</span>
            </p>
          </div>
        </div>

        <hr className="hr-line"></hr>

        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 bg-gray-50 shadow-sm border border-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-8 items-center justify-between">
            <div className="col-span-1">
              {
                (companyFacebook !== undefined && companyFacebook !== '') || (companyLine !== undefined && companyLine !== '')
                ?
                <>
                <span className="text-base leading-7 font-medium block mb-2 pb-0.5">
                  Follow Us
                </span>
                <ul className="text-sm flex">
                  { 
                    (companyFacebook !== undefined && companyFacebook !== '')
                    ?
                    <li className="flex items-center mr-3 transition ease-in-out duration-500">
                      <Link href={companyFacebook}>
                        <a
                          aria-label="Social Link"
                          rel="noreferrer"
                          target="_blank"
                          className="block text-center mx-auto text-gray-500 hover:text-white"
                        >
                          <FacebookIcon size={34} round />
                        </a>
                      </Link>
                    </li>
                    :
                    <></>
                  
                    
                  
                  }
                  {
                    (companyLine !== undefined && companyLine !== '')?
                    <li className="flex items-center mr-3 transition ease-in-out duration-500">
                      <Link href={companyLine}>
                        <a
                          aria-label="Social Link"
                          rel="noreferrer"
                          target="_blank"
                          className="block text-center mx-auto text-gray-500 hover:text-white"
                        >
                          <LineIcon size={34} round />
                        </a>
                      </Link>
                    </li>
                    :
                    <></>
                  }
                  
                </ul>
                </>
                :
                <></>
              }
              
            </div>
            <div className="col-span-1 text-center hidden lg:block md:block">
              <p className="text-base leading-7 font-medium block">
                Call Us Today!
              </p>
              <h5 className="text-2xl font-bold text-cyan-500 leading-7">{locationTel}</h5>
            </div>
            <div className="col-span-1 hidden lg:block md:block">
              {/* <ul className="lg:text-right">
                <li className="px-1 mb-2 md:mb-0 transition hover:opacity-80 inline-flex">
                  <Image
                    width={274}
                    height={85}
                    className="w-full"
                    src="/payment-method/payment-logo.png"
                    alt="payment method"
                  />
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center py-4">
        <p className="text-sm text-gray-500 leading-6">
          Copyright {new Date().getFullYear()} @{' '}
          {/* <Link href="https://themeforest.net/user/htmllover">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500"
            >
              HtmlLover
            </a>
          </Link>
          , All rights reserved. */}
          Prolifit Software & Technology Co., Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
