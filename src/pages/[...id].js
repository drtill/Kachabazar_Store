import useSessionstorage from '@rooks/use-sessionstorage';

//internal import
import Layout from '@layout/Layout';
import Banner from '@component/banner/Banner';
import CardTwo from '@component/cta-card/CardTwo';
import OfferCard from '@component/offer/OfferCard';
import StickyCart from '@component/cart/StickyCart';
import ProductServices from '@services/ProductServices';
import ProductCard from '@component/product/ProductCard';
import MainCarousel from '@component/carousel/MainCarousel';
import FeatureCategory from '@component/category/FeatureCategory';

const Detail = ({params,dataPath,title,description, liffEndpoint,liffData,linePOSIdData,
  groupIdData, liffOrderId, liffCompanyId,liffLocationId,countPage,currentPage,
  products,salesOrder, orderDetails,categories,shippingServices,bankNameAndAccounts,
  currencySign, companyName, locationName,companyLogo,
  customerFirstName,customerLastName,customerEmail, customerPhoneNumber,
  address1,countryId,provinceId,cityId,districtId,postalcode,
  countrys,provinces,cities,districts,
  promotions,
  locationAddress1,locationAddress2,locationCity,locationStateOrProvince,locationCountry,locationPostalCode,
  locationEmail,locationTel,
  companyFacebook,companyLine
  }) => {
  const [value, set] = useSessionstorage('products', products);

  const router = useRouter();

    const [liffId, setLiffId] = useState(liffData);
    const [linePOSId, setLinePOSId] = useState(linePOSIdData);
    const [groupId, setGroupId] = useState(groupIdData);
    const [companyId, setCompanyId] = useState(liffCompanyId);
    const [locationId, setLocationId] = useState(liffLocationId);
    const [orderId, setOrderId] = useState(liffOrderId);

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
    const [lineUsername, setLineUsername] = useState('');
    const [pagingIndent, setPaging] = useState([]);
    const [companyNameData, setCompanyName] = useState(companyName);

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
    const [promotionCode,setPromotionCode] = useState('');

    const { setItems,clearCartMetadata,emptyCart, addItem, items } = useCart();

  return (
    <>
      <Layout>
        <div className="min-h-screen">
          <StickyCart />
          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
              <div className="flex w-full">
                <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                  <MainCarousel />
                </div>
                <div className="w-full hidden lg:flex">
                  <OfferCard />
                </div>
              </div>
              <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                <Banner />
              </div>
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
                  {params}
                  <p className="text-base font-sans text-gray-600 leading-6">
                    Choose your necessary products from this feature categories.
                  </p>
                </div>
              </div>
              <FeatureCategory />
            </div>
          </div>

          {/* popular products */}
          <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  Popular Products for Daily Shopping
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  See all our popular products in this week. You can choose your
                  daily needs products from this list and get some special offer
                  with free shipping.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {popularProducts?.slice(0, 18).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* promotional banner card */}
          <div className="block mx-auto max-w-screen-2xl">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
              <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border rounded-lg">
                <CardTwo />
              </div>
            </div>
          </div>

          {/* discounted products */}
          <div
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({req, res,params }) => {
  //var coinPOSLiffData = params.id;
  //alert("Param = " + params.id);
  var dataParam = params.id;
  var coinPOSLiffData = req.url.replace('/','');

  var liffCompanyId = 0;
  var liffLocationId = 0;
  var liffProcess = "";
  var liffCompanyName = "";

  var liffData = '';
  var linePOSId = '';
  var lineUserId = '';
  var groupId = '';
  var liffOrderId = null;

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

  
  if(coinPOSLiffData.length > 0)
{
  const parms = coinPOSLiffData.split('?');

  

  if(parms.length > 1)
  {
    const liffQuery = parms[0];
    const liffOrderQuery = parms[1];
    var liffVar = liffQuery.split("=");
    if(liffVar[0] === 'liffId')
    {
      liffData = liffVar[1];
      
    }

    var vars = liffOrderQuery.split("&");
    for (var i=0;i<vars.length;i++)
    {
      var pair = vars[i].split("=");
      if(pair[0] === 'liffId')
      {
        liffData = pair[1];
        
      }
      if(pair[0] === 'linePOSId')
      {
        linePOSId = pair[1];
      }
      if(pair[0] === 'groupId')
      {
        groupId = pair[1];
      }
      if(pair[0] === 'orderId')
      {
        liffOrderId = Number(pair[1]);
      }
      if(pair[0] === 'companyId')
      {
          liffCompanyId = Number(pair[1]);
      }
      if(pair[0] === 'companyName')
      {
          liffCompanyName = pair[1];
      }
      if(pair[0] === 'locationId')
      {
          liffLocationId = Number(pair[1]);
      }
      if(pair[0] === 'process')
      {
          liffProcess = pair[1];
      }

      if(pair[0] === 'liff.state')
      {
        var param = pair[1];
        param = param.replaceAll("%3D","=");
        param = param.replaceAll("%26","&");
        param = param.replaceAll("%3F","?");
        param = param.replace("?","");
        var m_params = param.split("&");
        for (var j=0;j<m_params.length;j++)
        {
          var paramValue = m_params[j].split("=");
          if(paramValue[0] === 'linePOSId')
          {
            linePOSId = paramValue[1];
          }
          if(paramValue[0] === 'groupId')
          {
            groupId = paramValue[1];
          }
          if(paramValue[0] === 'orderId')
          {
            liffOrderId = Number(paramValue[1]);
          }
          if(paramValue[0] === 'companyId')
          {
            liffCompanyId = Number(paramValue[1]);
          }
          if(paramValue[0] === 'locationId')
          {
            liffLocationId = Number(paramValue[1]);
          }
          if(paramValue[0] === 'process')
          {
            liffProcess = paramValue[1];
          }
        }

      }
    }
  }

}

var liffId = liffData;
var orderId = liffOrderId;
var companyId = liffCompanyId;
var locationId = liffLocationId;

var dataPath = 'liffId=' + liffId + '?linePOSId=' + linePOSId + '&groupId=' + groupId + '&orderId=' + liffOrderId + '&companyId=' + liffCompanyId + '&locationId=' + liffLocationId;

var liffEndpoint = await  UserServices.getLiffURLTemplate();

var catalogName = '';
var companyCode = '';

const products = await ProductServices.getDefaultDataCompany({
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
/*const products = await ProductServices.getCoinPOSProductService({
  liffId,
  lineUserId,
  linePOSId,
  groupId,
  orderId,
  companyId,locationId,
  companyName,
  locationName,
  catalogName:'',
  promotionId,customerTypeId,page,itemPerPage,query,category,product
});*/

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
    productItem['type'] = '';
    productItem['sku'] = products.productVariantPresenters[i].SKU;
    productItem['discount'] = 0;
    productItem['description'] = products.productVariantPresenters[i].Description;
    productItem['currencySign'] = products.currencySign;
    


    productVariants.push(productItem);
  }
}*/


/*if(products.productCategoryPresenters !== null)
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


companyName = products.companyName;
locationName = products.locationName;


  return {
    props: { 
      params: dataParam,
      dataPath:dataPath,
      title:title,
      description:description,
      liffEndpoint:liffEndpoint,
      liffData:liffData,
      linePOSIdData:linePOSId,
      groupIdData:groupId,
      liffOrderId:liffOrderId,
      liffCompanyId:liffCompanyId,
      liffLocationId:liffLocationId,
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

// export const getServerSideProps = async () => {
//   const products = await ProductServices.getShowingProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// };

export default Detail;
