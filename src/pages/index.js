import useSessionstorage from '@rooks/use-sessionstorage';
import { useEffect, useState } from 'react';
import { useCart} from 'react-use-cart';
import getConfig from 'next/config'
import { useRouter } from 'next/router'
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

const Home = ({ products,salesOrder, orderDetails, popularProducts, discountProducts, itemDatas}) => {

  const router = useRouter();
  

  const [value, set] = useSessionstorage('products', products);

  const { setItems,clearCartMetadata,emptyCart, addItem } = useCart();

  const [productList, setProductInfo] = useState(products);

  useEffect(() => {
    router.push('/404');
    // const productDs = [
    //   {
    //     id: "ckb64v21u000001ksgw2s42ku",
    //     name: "Fresh Foam 1080v9",
    //     title:"Fresh Foam 1080v9",
    //     brand: "New Balance",
    //     color: "Neon Emerald with Dark Neptune",
    //     size: "US 10",
    //     width: "B - Standard",
    //     sku: "W1080LN9",
    //     price: 15000,
    //     image:"http://coinpos-uat.azurewebsites.net/Images//Stock//a245f601-0c12-405b-a5a2-7cd6ffaa3a83.jpg"
    //   },
    //   {
    //     id: "cjld2cjxh0000qzrmn831i7rn",
    //     name: "Mud Foam 1080v9",
    //     title:"Mud Foam 1080v9",
    //     brand: "New Balance",
    //     color: "Neon Emerald with Dark Neptune",
    //     size: "US 9",
    //     width: "B - Standard",
    //     sku: "W1080LN9",
    //     price: 15000,
    //     image:"http://coinpos-uat.azurewebsites.net/Images//Stock//a245f601-0c12-405b-a5a2-7cd6ffaa3a83.jpg"
    //   },
    // ];
    
    // setItems(productDs);
  }, []);
  //emptyCart();
  //clearCartMetadata();
  //console.log(itemDatas)
  //setItems(itemDatas);
  //itemDatas.map((item) => (
  //  addItem(item);
  //));

  
  
  return (
    <>
      <Layout>
        <div className="min-h-screen">
          <StickyCart />
          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
              {/* <div className="flex w-full">
                <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                  <MainCarousel />
                </div>
                <div className="w-full hidden lg:flex">
                  <OfferCard />
                </div>
              </div> */}
              <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                <Banner />
              </div>
            </div>
          </div>

          {/* feature category's */}
          {/* <div className="bg-gray-100 lg:py-16 py-10">
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
              <FeatureCategory />
            </div>
          </div> */}

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
                  {productList?.slice(0, 18).map((product) => (
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
                  {/* {discountProducts?.slice(0, 18).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ params }) => {

  
  
    /* const products = await ProductServices.getCoinPOSProductService({
      liffId,
      lineUserId,
      linePOSId,
      groupId,
      orderId,
      companyId,locationId,
      companyName,
      locationName,
      promotionId,customerTypeId,page,itemPerPage,query,category
    });

    var productVariants = [];
    for(var i = 0;i < products.productVariantPresenters.length; i++)
    {
      var productItem = {};
      productItem['_id'] = products.productVariantPresenters[i].ProductVariantId;
      productItem['title'] = products.productVariantPresenters[i].Name;
      productItem['quantity'] = products.productVariantPresenters[i].StockLevelDisplay;
      productItem['image'] = products.productVariantPresenters[i].ImageUrl;
      productItem['unit'] = products.productVariantPresenters[i].UPC;
      productItem['slug'] = products.productVariantPresenters[i].UPC;
      productItem['originalPrice'] = products.productVariantPresenters[i].PriceDisplay;
      productItem['price'] = products.productVariantPresenters[i].PriceDisplay;
      productItem['type'] = '';
      productItem['sku'] = products.productVariantPresenters[i].SKU;
      productItem['discount'] = 0;
      productItem['description'] = products.productVariantPresenters[i].Description;
      productItem['currencySign'] = products.currencySign;
  
  
      productVariants.push(productItem);
    }
    var orderData = {};
    orderData['_id'] = products.orderId;
    orderData['orderNumber'] = products.orderNumber;
    orderData['orderDetailCount'] = products.orderDetailCount;
    orderData['orderTotal'] = products.orderTotal;
    orderData['paymentStatusId'] = products.paymentStatusId;
    orderData['paymentStatus'] = products.paymentStatus;
    orderData['orderStatusId'] = products.orderStatusId;
    orderData['orderStatus'] = products.orderStatus;
    orderData['currencySign'] = products.currencySign;
  
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
    
  
    var itemDatas = [];
    var itemData = {};
    itemData['id'] = '1';
    itemData['price'] = 200;
    itemData['quantity'] = 3;
    itemData['itemTotal'] = 650;
  
    itemDatas.push(itemData)
  
    var itemData2 = {};
    itemData2['id'] = '2';
    itemData2['price'] = 100;
    itemData2['quantity'] = 2;
    itemData2['itemTotal'] = 750;
  
    itemDatas.push(itemData2)

  const popularProducts = productVariants.filter((p) => p.discount === 0);
  const discountProducts = productVariants.filter((p) => p.discount >= 5); */

  return {
    props: {
      //products: productVariants,
      //salesOrder:orderData,
      //orderDetails:orderDetailDatas,
      //popularProducts: popularProducts.slice(0, 50),
      //discountProducts: discountProducts,
      //itemDatas:itemDatas
    },
    revalidate: 60,
  };
};


function getQueryRoute()
{
  const router = useRouter()
  return "";
}
// export const getServerSideProps = async () => {
//   const products = await ProductServices.getShowingProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// };

export default Home;
