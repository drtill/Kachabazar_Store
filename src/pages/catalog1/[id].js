import { useContext,useEffect, useState } from 'react';
import { useCart} from 'react-use-cart';
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

import Loading from '@component/preloader/Loading';
//const liffId = process.env.NEXT_PUBLIC_LIFF_ID
const isLiffLogin = true;//process.env.NEXT_PUBLIC_ISLOGIN

const Catalog = ({params,title,description,countPage,currentPage,
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
      state: { userInfo },
    } = useContext(UserContext);

    const [companyId, setCompanyId] = useState(catalogCompanyId);
    const [locationId, setLocationId] = useState(catalogLocationId);
    const [orderId, setOrderId] = useState(0);

    const [loading, setLoading] = useState(true);

    //this.setState({liffId:liffData});
    const [productList, setProductList] = useState([]);
    const [lineProfileImage, setProfileImage] = useState('');
    const [lineUserId, setLineUserId] = useState('');
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


    const { setItems,clearCartMetadata,emptyCart, addItem, items } = useCart();
    
    useEffect(async () => {

      
      //alert("companyName = " + companyNameData)
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
      sessionStorage.setItem('categories', JSON.stringify(categories));
      sessionStorage.setItem('currencySign', currencySign);
      
      sessionStorage.setItem('customerFirstName', customerFirstName);
      sessionStorage.setItem('customerLastName', customerLastName);
      sessionStorage.setItem('customerEmail', customerEmail);
      sessionStorage.setItem('customerPhoneNumber', customerPhoneNumber);

      sessionStorage.setItem('address1', address1);
      sessionStorage.setItem('countryId', countryId);
      sessionStorage.setItem('provinceId', provinceId);
      sessionStorage.setItem('cityId', cityId);
      sessionStorage.setItem('districtId', districtId);
      sessionStorage.setItem('postalcode', postalcode);

      //alert(JSON.stringify(countrys))
      sessionStorage.setItem('countrys', JSON.stringify(countrys));
      sessionStorage.setItem('provinces', JSON.stringify(provinces));
      sessionStorage.setItem('cities', JSON.stringify(cities));
      sessionStorage.setItem('districts', JSON.stringify(districts));

      var userInf =  Cookies.get('userInfo');
      alert("Cookies = " + userInf);

      //alert("localStorage");
      var userLocal = localStorage.getItem('userInfo');
      alert("UserLocal = " + userLocal);




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
        
        
          pagingManager();
          setProductList(products);

          setLoading(false);
      }
      catch (err) 
      {
        alert(err.message);
      }
      

      
    }, [])


    const ApplyPromotionCode = async(promotionCode) =>
    {
      //alert("Apply Promotion = " + promotionCode);
      //return;
      var orderId = catalogOrderId;
      var companyId = catalogCompanyId;
      var locationId = catalogLocationId;
      var qrPromotion = promotionCode;
      var pictureUrl = '';

      //alert("Apply Promotion2 = " + promotionCode + " " + lineUserId);
      const promotion = await ProductServices.applyPromotionCode({
        companyId,
        locationId,
        orderId,
        qrPromotion,
        lineUserId,
        linePOSId,
        liffId,
        pictureUrl
      });
      alert(JSON.stringify(promotion));

    }
    const SearchProduct = async (searchText) => 
    {
      alert("Searching = " + searchText);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',0,9,1,30,searchText)
    }
    const FilterCategory = async (categoty) => 
    {
      alert("categoty = " + categoty);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',0,9,1,30,'',categoty)
    }
    const FilterProduct = async (product) => 
    {
      alert("product = " + product);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',0,9,1,30,'','',product)
    }
    const RefreshProductList = async (liffId, lineUserId, linePOSId, groupId, orderId,companyId,locationId,catalogName,companyName, locationName, promotionId,customerTypeId,page,itemPerPage,query,category,product) =>
    {
      setLoading(true);
      
      query = query === undefined ? 'null' : query;
      category = category === undefined ? 'null' : category;
      product = product === undefined ? 'null' : product;
      alert("query = " + query);
      const products = await ProductServices.getCoinPOSProductService({
        liffId,
        lineUserId,
        linePOSId,
        groupId,
        orderId,
        companyId,locationId,
        companyName,
        locationName,
        catalogName,
        promotionId,customerTypeId,page,itemPerPage,query:query,category,product
      });

      alert(JSON.stringify(products));
      currentPage = products.currentPage;
      var productVariants = [];//products.productVariantPresenters;
      if(products.productVariantPresenters !== null)
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
      <Layout title={title} description={description} companyName={companyName} locationName={locationName} companyLogo={companyLogo} 
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel}
      RefreshProductList={SearchProduct} FilterProduct={FilterProduct} >
        <div className="min-h-screen">
          <StickyCart />
          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
              <div className="flex w-full">
                {/* <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                  <MainCarousel />
                </div> */}
                <div className="w-full lg:flex">
                  <OfferCard promotions={promotions} companyId={catalogCompanyId} ApplyPromotionCode={ApplyPromotionCode}/>
                </div>
              </div>
              {/* <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                <Banner />
              </div> */}
            </div>
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
                    Choose your necessary products from this feature categories.
                  </p>
                </div>
              </div>
              <FeatureCategory categories={categories} FilterCategory={FilterCategory} FilterProduct={FilterProduct}/>
            </div>
          </div>

          {/* popular products */}
          <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  All Products for Your Shopping
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
    

    var catalogName = dataParam;
    var companyName = '';
    var locationName = '';
    const promotionId = 0;

    const customerTypeId = 9;
    var page = 1;
    var itemPerPage = 30;
    const query = null;
    const category = null;
    const product = null;   

    const title = "all-in-one, heavy-duty & modern ecommerce platform";
    const description = "CoinPOS Ecommerce Platform - All-in-one, heavy-duty, cost-effective and modern ecommerce platform for business of all sizes.";

    var liffId = "";
    var lineUserId = "";
    var linePOSId = "";
    var groupId = "";
    var orderId = 0;
    var companyId = 0;
    var locationId = 0;


    

  const products = await ProductServices.getCoinPOSProductService({
    liffId,
    lineUserId,
    linePOSId,
    groupId,
    orderId,
    companyId,locationId,
    companyName,
    locationName,
    catalogName,
    promotionId,customerTypeId,page,itemPerPage,query,category,product
  });

  var productVariants = [];//products.productVariantPresenters;
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
  }
  

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
        title:title,
        description:description,
        countPage:countPage,
        currentPage:currentPage,
        products: productVariants,
        salesOrder:orderData,
        orderDetails:orderDetailDatas,
        shippingServices:shippingServices,
        bankNameAndAccounts:bankNameAndAccounts,
        currencySign:currencySign,
        companyName:companyName,
        companyLogo:companyLogo,
        companyFacebook:companyFacebook,
        companyLine:companyLine,
        catalogCompanyId:catalogCompanyId,
        catalogName:catalogName,
        locationId:catalogLocationId,

        locationName:locationName,
        categories:productCategories,
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