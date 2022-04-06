import requests from './httpServices';

//const serviceUrl = 'https://coinpos-uat.azurewebsites.net/lineliff/';
const serviceUrl = 'http://localhost:41781/lineliff/';
const ProductServices = {
  getShowingProducts() {
    return requests.get('/products/show');
  },
  applyPromotionCode(body) {
    return requests.post('/products/ApplyPromotionCode',body);
  },
  async fetchApplyPromotionCode(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"LocationId":${body.locationId},
        "OrderId":${body.orderId},
        "PromotionCode":"${body.qrPromotion}",
        "UserId":1,
        "LineUserId": "${body.lineUserId}",
        "LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "CatalogName":"${body.catalogName}","OrderDetails":${body.orderDetails}}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  cancelPromotionCode(body) {
    return requests.post('/products/CancelPromotionCode',body);
  },

  async fetchCancelPromotionCode(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"LocationId":${body.locationId},
        "OrderId":${body.orderId},
        "PromotionCode":"${body.qrPromotion}",
        "UserId":1,
        "LineUserId": "${body.lineUserId}",
        "LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "CatalogName":"${body.catalogName}","OrderDetails":${body.orderDetails}}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message
      
    }
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
    try
    {
      //alert("Fetch")
      var productList = null;
      const products = await fetch(serviceUrl + 'GetLiffProductList',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"CustomerTypeId":${body.customerTypeId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          var obj = JSON.parse(data);
          var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
          
          
        });
      

        return productList;
    }
    catch(err) {
        return "Error: " + err.message
    }
  },
  async fetchRefreshCoinPOSProductService(body){
    try
    {
      //alert("Fetch")
      var productList = null;
      const products = await fetch(serviceUrl + 'RefreshLiffProductList',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"CustomerTypeId":${body.customerTypeId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          var obj = JSON.parse(data);
          var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
          
          
        });
      

        return productList;
    }
    catch(err) {
        return "Error: " + err.message
    }
  },
  getDefaultDataCompany(body){
    return requests.post('/products/GetDefaultDataCompany',body);
  },
  async fetchGetDefaultDataCompany(body){
    try
    {
      var productList = null;
      const products = await fetch(serviceUrl + 'GetDefaultDataCompany', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          try
          {
            var obj = JSON.parse(data);
            var pvJson = obj.ProductVariantListJson
            productList = JSON.parse(pvJson)
          }
          catch(ex)
          {
            return "Error: " + data;
            
          }
          
          
          //closeNav(null);
        });
      

        return productList;
    }
    catch(err) {
      return "Error: " + err.message;
      
    }
  },
  addToCoinPOSCart(body){
    return requests.post('/products/AddToCoinPOSCart',body);
  },
  closeCoinPOSCart(body){
    return requests.post('/products/CloseBill',body);
  },
  async fetchCloseCoinPOSCart(body){
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'CloseBill', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"OrderId": ${body.orderId},"ShippingId":${body.shippingId},"ShippingName":"${body.shippingName}","ShippingFee":${body.shippingFee},"CompanyId":"${body.companyId}","LineUserId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "FirstName":"${body.firstName}","LastName":"${body.lastName}","Mobile":"${body.mobile}","Email":"${body.email}",
        "Address1":"${body.address1}","District":"${body.district}","Country":"${body.country}","City":"${body.city}","StateOrProvince":"${body.stateOrProvince}","PostalCode":"${body.postalCode}",
        "OrderDetails":${body.orderDetails},"CatalogName":"${body.catalogName}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  getAllCoinPOSCoupons(body) {
    return requests.post('/products/GetCoinPOSCoupon', body);
  },
  getCoinPOSOrder(body){
    return requests.post('/products/GetCoinPOSCart',body);
  },
  async fetchGetCoinPOSOrder(body){
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'GetLiffOrder',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId}
          ,"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        var obj = JSON.parse(data);
          
        console.log("Obj = " + obj);
        console.log(data); // this will be a string
        var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
      });
      
        return productList;
    }
    catch (err) 
    {
      return err.message;
      
    }
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
  getStateProvince(body)
  {
    return requests.post('/products/GetStateProvince',body);
  },
  async fetchGetStateProvince(body)
  {
    try
    {
      var provinceData = null;
      await fetch(serviceUrl + 'GetProvince',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:``  
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        provinceData = (data);
      });
      
        return provinceData;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  getDistrict(body)
  {
    return requests.post('/products/GetDistrict',body);
  },
  async fetchGetDistrict(body)
  {
    try
  {
    var distrinctData = ''
    await fetch(serviceUrl + 'GetDistrict',
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CityId": "${body.cityId}"}` 
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      var obj = JSON.parse(data);
      distrinctData = (obj.districtResponses);
    });
    
      return distrinctData;
  }
  catch (err) 
  {
    return "Error: " + err.message;
    
  }
  },
  getCity(body)
  {
    return requests.post('/products/GetCity',body);
  },
  async fetchGetCity(body)
  {
    try
    {
      var cityData = ''
      await fetch(serviceUrl + 'GetCity',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body: `{"StateId":"${body.stateId}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        var obj = JSON.parse(data);
        cityData = (obj.cityResponses);
      });
      
        return cityData;
    }
    catch (err) 
    {
      return "Error: " + err.message;
    }
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
  async fetchGetPayOrderById(body) {
    try {
      
      alert("Get Pay Order = " + JSON.stringify(body));
      var productList
      await fetch(serviceUrl + 'GetPayCart',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"OrderId": ${body.orderId},"CompanyId":"${body.companyId}","LocationId":"${body.locationId}","UserId":"${body.lineUserId}","GroupId":"${body.groupId}","LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}","CatalogName":"${body.catalogName}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {
  
        //var obj = JSON.parse(data);
        console.log("Obj = " + data);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    } catch (err) {
      return "Error: " + err.message
    }
    
  },
  saveCustomerInfo(body) {
    
    return requests.post('/products/SaveCustomerInfo', body);
    
  },
  async fetchSaveCustomerInfo(body) {
    
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'SocialCustomerSaveService',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"FirstName": "${body.firstName}","MiddleName": "${body.middleName}", "LastName": "${body.lastName}", "Gender":${body.gender},"Phone":"${body.phone}","Mobile":"${body.mobile}","Email":"${body.email}","Address1":"${body.address1}","District":"${body.district}","City":"${body.city}","StateOrProvince":"${body.stateOrProvince}","Postalcode":"${body.postalcode}","Country":"${body.country}","CountryId":"${body.countryId}","CustomerId":"${body.customerId}","CompanyId":"${body.companyId}","CatalogName":"${body.catalogName}","PictureUrl":"${body.imageUrl}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          
          var obj = JSON.parse(data);
          //var pvJson = obj.ProductVariantListJson
          productList = obj
          
        });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message
    }
    
  },

};

export default ProductServices;
