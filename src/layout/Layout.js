import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
//internal import
import Navbar from '@layout/navbar/Navbar';
import Footer from '@layout/footer/Footer';
import FooterTop from '@layout/footer/FooterTop';
import MobileFooter from '@layout/footer/MobileFooter';
import FeatureCard from '@component/feature-card/FeatureCard';
import NavBarTop from './navbar/NavBarTop';

const Layout = ({ title, description,dataPath, children, companyName, locationName, companyLogo,
  locationAddress1,locationAddress2,locationCity,locationStateOrProvince,locationCountry,locationPostalCode,
  locationEmail,locationTel,
  RefreshProductList, FilterProduct }) => {

  // var companyName = null;
  // var locationName = null;
  
  // useEffect(async () => {
  //   if(sessionStorage.getItem('companyName'))
  //   {
          
  //     companyName = sessionStorage.getItem('companyName'); 
      
  //   }
  //   if(sessionStorage.getItem('locationName'))
  //   {
  //     locationName = sessionStorage.getItem('locationName'); 
  //   }
  // }, [])
  
  
  return (
    <>
      <ToastContainer />
      <div className="font-sans">
        <Head>
          <title>
            {`CoinPOS | ${title}`}
            {/* {title

              ? `${companyName === null ? "CoinPOS" : companyName} | ${title}`
              : `${companyName === null ? "CoinPOS" : companyName} - React Grocery & Organic Food Store e-commerce Template`} */}
          </title>
          {description && <meta name="description" content={description} />}
          <link ref="icon" href="/favicon.ico"/>
        </Head>
        {/* <NavBarTop /> */}
        <Navbar companyLogo={companyLogo} dataPath={dataPath} RefreshProductList={RefreshProductList} FilterProduct={FilterProduct}/>
        <div className="bg-gray-50">{children}</div>
        <MobileFooter companyLogo={companyLogo} dataPath={dataPath} RefreshProductList={RefreshProductList} FilterProduct={FilterProduct}/>
        <div className="w-full">
          {/* <FooterTop /> */}
          {/* <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            <FeatureCard />
          </div> */}
          {/* <hr className="hr-line"></hr> */}
          <div className="border-t border-gray-100 w-full">
            <Footer companyName={companyName} dataPath={dataPath} companyLogo={companyLogo} locationName={locationName}
            locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
            locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
            locationEmail={locationEmail} locationTel={locationTel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
