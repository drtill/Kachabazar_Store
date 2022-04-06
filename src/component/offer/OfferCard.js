import React from 'react';

import Coupon from '@component/coupon/Coupon';

const OfferCard = ({promotions,companyId,catalogName, selectedPromotion, ApplyPromotionCode, CancelPromotionCode}) => {
  return (
    <div className="w-full group">
      <div className="bg-gray-50 h-full border-2 border-orange-500 transition duration-150 ease-linear transform group-hover:border-cyan-500 rounded shadow">
        <div className="bg-orange-100 text-gray-900 px-6 py-2 rounded-t border-b flex items-center justify-center">
          <h3 className="text-base font-serif font-medium ">
            รหัสคูปองส่วนลด ล่าสุด{/* Latest Super Discount Active Coupon Code */}
          </h3>
        </div>
        <div className="overflow-hidden">
          <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-2">
                  
            <Coupon couponInHome companyId={companyId} selectedPromotion={selectedPromotion} promotions={ promotions} catalogName={catalogName} ApplyPromotionCode={ApplyPromotionCode} CancelPromotionCode={CancelPromotionCode}/>
            
          
          </div>
          {/* <Coupon couponInHome companyId={companyId}  promotions={ promotions} ApplyPromotionCode={ApplyPromotionCode}/>
          <Coupon couponInHome companyId={companyId}  promotions={ promotions} ApplyPromotionCode={ApplyPromotionCode}/> */}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
