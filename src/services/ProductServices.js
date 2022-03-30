import requests from './httpServices';
import constants from '@utils/constant';

const coinposServiceUrl = 'https://coinpos-uat.azurewebsites.net/LineLiff/';

const ProductServices = {
  getShowingProducts() {
    return requests.get('/products/show');
  },
  applyPromotionCode(body) {
    return requests.post('/products/ApplyPromotionCode',body);
  },

  getDiscountedProducts() {
    return requests.get('/products/discount');
  },

  getProductBySlug(slug) {
    return requests.get(`/products/${slug}`);
  },
  getCoinPOSProduct(){
    return requests.get('/products/coinpos');
  },
  getCoinPOSProductService(body){
    return requests.post('/products/show1',body);
  },
  async fetchGetCoinPOSProductService(body){
    var productList = '';
    await fetch(coinposServiceUrl + 'GetLiffProductList',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
        "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
        
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        alert("GetData = " + data);
        console.log("GetData = " + data)
        var obj = JSON.parse(data);
        var pvJson = obj.ProductVariantListJson
        productList = JSON.parse(pvJson)
        
        //closeNav(null);
      });

      return productList;


  },
  getDefaultDataCompany(body){
    return requests.post('/products/GetDefaultDataCompany',body);
  },
  addToCoinPOSCart(body){
    return requests.post('/products/AddToCoinPOSCart',body);
  },
  closeCoinPOSCart(body){
    return requests.post('/products/CloseBill',body);
  },
  getAllCoinPOSCoupons(body) {
    return requests.post('/products/GetCoinPOSCoupon', body);
  },
  getCoinPOSOrder(body){
    return requests.post('/products/GetCoinPOSCart',body);
  },
  updateCoinPOSCartDetail(body)
  {
    return requests.post('/products/UpdateCoinPOSCartDetail',body);
  },
  removeCoinPOSCartDetail(body)
  {
    return requests.post('/products/RemoveCoinPOSCartDetail',body);
  },
  sendBankTransferPayment(body)
  {
    return requests.post('/products/SendBankTransferPayment',body);
  },
  getCountry(body)
  {
    return requests.post('/products/GetCountry',body);
  },
  async fetchGetCountry(body)
  {
    try
    {
      var countryData = ''
      //alert("Url = " + coinposServiceUrl + 'GetCountry')
      await fetch(coinposServiceUrl + 'GetCountry',
      { 
        method:'POST',
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:``  
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        countryData = (data);
      });
      //alert("coinpos = " + countryData);
      return countryData;
        //alert("coinpos = " + countryData);
    }
    catch (err) 
    {
      //alert("Error " + err.message);
      return "Error " + err.message;
    }
  },
  getStateProvince(body)
  {
    return requests.post('/products/GetStateProvince',body);
  },
  async fetchGetStateProvince(body)
  {
    try
    {
      var provinceData = ''
      await fetch(serviceUrl + '/products/GetStateProvince',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:body  
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("get country " + data);
        provinceData = (data);
      });
      
        return provinceData;
    }
    catch (err) 
    {
      //alert("Error " + err.message);

      return "Error " + err.message;
      //res.status(200).send({
      //  message: err.message,
      //});
    }
    //return requests.post('/products/GetCountry',body);
  },
  getDistrict(body)
  {
    return requests.post('/products/GetDistrict',body);
  },
  getCity(body)
  {
    return requests.post('/products/GetCity',body);
  },
  getQRPayment(body)
  {
    return requests.post('/products/GetQRPayment',body);
  },
  getOrderByUserId(body)
  {
    return requests.post('/products/GetOrderByUserId',body);
  },
  getDashboardOrderByUserId(body)
  {
    return requests.post('/products/GetDashboardOrderByUserId',body);
  },
  getOrderById(body) {
    return requests.post('/products/GetOrderById', body);
    var postData = requests.post('/products/GetOrderById', body);

    //var postData = JSON.parse(postJson)

    var cart = [];
    
    //console.log(postData)
    //alert(postData);
    /*for(var i = 0;i<postData.ProductVariantListJson.orderDetails.length;i++)
    {
      var detail = postData.orderDetails[i];
      var orderDetail = {};
      orderDetail['title'] = detail.productVariantName;
      orderDetail['quantity'] = detail.quantity;
      orderDetail['price'] = detail.productVariantPrice;
      orderDetail['itemTotal'] = (parseFloat(detail.productVariantPrice) * parseInt(detail.quantity));
      cart.push(orderDetail);

    }*/

    var orderData = {}
    orderData['name'] = postData.customerName;
    //orderData['createdAt'] = postData.ProductVariantListJson.orderDate;
    //orderData['invoice'] = postData.ProductVariantListJson.invoiceNumber;
    //orderData['shippingLabel'] = postData.ProductVariantListJson.shipToAddressLabel;
    //orderData['paymentMethod'] = postData.ProductVariantListJson.paymentMethod;
    //orderData['shippingCost'] = postData.ProductVariantListJson.shippingFee;
    //orderData['discount'] = postData.ProductVariantListJson.discount;
    //orderData['total'] = postData.ProductVariantListJson.orderTotal;
    //orderData['cart'] = cart;


    return orderData
  },
  getPayOrderById(body) {
    return requests.post('/products/GetPayOrderById', body);
    
  },
  saveCustomerInfo(body) {
    
    return requests.post('/products/SaveCustomerInfo', body);
    
  },

};

export default ProductServices;
