import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import InputPayment from '@component/form/InputPayment';
import BankTransferPayment from '@component/form/BankTransferPayment';
import ProductServices from '@services/ProductServices';
import QRPaymentPayment from '@component/form/QRPaymentPayment';
import {
    IoReturnUpBackOutline,
    IoArrowForward,
    IoBagHandle,
    IoWalletSharp,
  } from 'react-icons/io5';
  import { ImCreditCard } from 'react-icons/im';
  import Loading from '@component/preloader/Loading';

const PaymentMethod = ({salesOrderId, lineLiffId, lineLiffUserId, lineCompanyId}) => {


    const [qrShow, setQRShow] = useState(false);
  const [bankShow, setBankShow] = useState(false);
  const [qrUrl, setQRUrl] = useState('');
  const [qrLoading, setQRLoading] = useState(false);
  var bankTransferList = [];

  useEffect(() => 
  {
    if(sessionStorage.getItem('bankNameAndAccounts'))
    {
      var bankTransferJson = sessionStorage.getItem('bankNameAndAccounts'); 
      bankTransferList = JSON.parse(bankTransferJson);
      //alert(JSON.stringify(bankTransferList))
    }

  });
  

  const [bankTransfers, setBankTransfers] = useState(bankTransferList);
  const handleBankTransferClick = async() =>
    {
    setBankShow(true);
    setQRShow(false);
    }
    const handleQRPaymentClick = async() =>
{
  setQRLoading(true);
  var orderId = salesOrderId;
  var liffId = lineLiffId;
  var lineUserId = lineLiffUserId;
  var companyId = lineCompanyId;
  //alert("QR Click");
  
  
  var qrData = await ProductServices.getQRPayment(
    {
      orderId,
      liffId,
      lineUserId,
      companyId
    });
    //alert("Get " + JSON.stringify(qrData));
  //var qrPaymentData = JSON.parse(qrData);
  //alert("QRData = " + qrData.qrPaymentUrl);
  setQRUrl(qrData.qrPaymentUrl);
  setBankShow(false);  
  setQRShow(true);
  //setBankShow(false);  
  //setQRShow(true);
  setQRLoading(false);
}

  return (
    <div id="downloadApp" className="bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
          <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
            {/* <Image
              src="/app-download-img-left.png"
              alt="app download"
              width={500}
              height={394}
              className="block w-auto"
            /> */}
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
              รูปแบบการชำระเงิน
            </h3>
            <p className="text-base opacity-90 leading-7 mb-3">
              Please select your paymeny meyhod.
            </p>
                    {
                      qrLoading === true 
                      ?
                        <Loading loading={qrLoading} />
                      :
                      <>
                        {bankShow && (
                          <div className="mb-3">
                            <BankTransferPayment 
                              
                              name="BankTransfer"
                              value="Card"
                              dataList={bankTransfers}
                              orderId={salesOrderId}
                              liffId={lineLiffId}
                              lineUserId={lineLiffUserId}
                              companyId={lineCompanyId}
                              Icon={ImCreditCard}/>
                            {/* <p className="text-red-400 text-sm mt-1">{error}</p> */}
                          </div>
                        )}
                        {qrShow && (
                          <div className="mb-3">
                            
                            <QRPaymentPayment 
                            
                              name="QR Payment"
                              value="Card"
                              qrUrl={qrUrl}
                              Icon={ImCreditCard}/>
                            {/* <p className="text-red-400 text-sm mt-1">{error}</p> */}
                          </div>
                        )}
                      </>
                    }
                    
            <div className="mt-8">
            <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={handleBankTransferClick}
                          
                          name="Bank Transfer"
                          value="Bank"
                          Icon={IoWalletSharp}
                        />
                        {/* <Error errorName={errors.paymentMethod} /> */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={handleQRPaymentClick}
                          
                          name="QR Payment"
                          value="Card"
                          Icon={ImCreditCard}
                        />
                        {/* <Error errorName={errors.paymentMethod} /> */}
                      </div>
                    </div>
            </div>
          </div>
          <div className="md:hidden lg:block">
            <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
              {/* <Image
                src="/app-download-img.png"
                width={500}
                height={394}
                alt="app download"
                className="block w-auto"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
