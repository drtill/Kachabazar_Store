import React from 'react';
import Image from 'next/image';

const QRPaymentPayment = (
    { 
        register, 
        Icon, 
        name, 
        value,
        qrUrl,
    }) => {
  
        
  
  
        return (
          <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
            
            <div className='row'>
              <p className="text-base opacity-90 leading-7 mb-3">
              กรุณาแสกน QR เพื่อชำระเงิน
              </p>
            </div>
            <div className='row'>
              <Image
                  src={qrUrl}
                  width={160}
                  height={160}
                  
                  className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                  />
                                      
            </div>
            <div className='row' style={{display:"contents",marginRight:"20px"}}>

            
              
            </div>
          </div>
    /* <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
      <label className="cursor-pointer label">
        <div className="item-center">
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
          <div className="lg:text-center text-center">
            
            
            <h2 className="text-lg font-serif font-semibold mt-4 lg:mt-0 md:mt-0">
              <Image
                  src={qrUrl}
                  width={160}
                  height={160}
                  
                  className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                  />
            </h2>
            
            <p className="text-sm text-gray-500">
                กรุณาแสกน QR เพื่อชำระเงิน
                
            </p>
          </div>
        </div>
          {<div className='row'>
            <p className="text-base opacity-90 leading-7 mb-3">
              ระบุวันและเวลา เพื่อแจ้งการโอนชำระเงินของคุณ
            </p>
          </div>
          <div className='row'>
            <div className="flex items-center">
                  <Image
                  src={qrUrl}
                  width={160}
                  height={160}
                  
                  className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                  />
            </div>
          </div>}
            
            
        </div>
      </label>
    </div> */
  );
};

export default QRPaymentPayment;
