import { Alert } from 'react-bootstrap';
import requests from './httpServices';

const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');

//const serviceUrl = 'https://coinpos-uat.azurewebsites.net/lineliff/';
const serviceUrl = 'http://localhost:41781/lineliff/';
const UserServices = {
  userLogin(body) {
    return requests.post('/user/login', body);
  },
  coinposUserLogin(body) {
    return requests.post('/user/coinPOS-login', body);
  },
  async fetchCoinposUserLogin(body) {
    try {
      const userJson = await findCoinPOSCustomerAccount(body.companyId,body.registerEmail,body.password);
      
      
      if(userJson != 'null')
      {
        //alert('Fetch not null = ' + userJson);
        const user = JSON.parse(userJson);
        return ({
          //token,
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          image: user.image,
          paramPath: body.paramPath,
          customerId: user.customerId,
          customerName: user.customerName,
          customerTypeId: user.customerTypeId,
          customerType: user.customerType,
          imageUrl: user.imageUrl,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          customerAddressId: user.customerAddressId,
          countrys: user.countrys,
          provinces: user.provinces,
          cities: user.cities,
          districts: user.districts,
          address1: user.address1,
          postalcode: user.postalcode,
          districtId: user.districtId,
          cityId: user.cityId,
          provinceId: user.provinceId,
          countryId: user.countryId,
          country: user.country,
          province: user.province,
          city: user.city,
          district: user.district,
          
  
  
  
  
        });
      } else {
        return null;
        
      }
    } catch (err) {
      return err.message;
      
    }
  },
  async fetchCoinposLineLogin(body) {
    try {
      //alert("Body = " + JSON.stringify(body));
      const userJson = await findCoinPOSCustomerAccountByLineUserId(body.companyId,body.liffId,body.lineUserId, body.linePOSId);//findCoinPOSEmail(req.body.companyId,req.body.email);
  
      //alert('UserJson = ' + userJson )
      if(userJson)
      {
        const user = JSON.parse(userJson);
        //const token = signInToken(user);
        return ({
          //token,
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          image: user.image,
          paramPath: body.paramPath,
          customerId: user.customerId,
          customerName: user.customerName,
          customerTypeId: user.customerTypeId,
          customerType: user.customerType,
          imageUrl: user.imageUrl,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          customerAddressId: user.customerAddressId,
          countrys: user.countrys,
          provinces: user.provinces,
          cities: user.cities,
          districts: user.districts,
          address1: user.address1,
          postalcode: user.postalcode,
          districtId: user.districtId,
          cityId: user.cityId,
          provinceId: user.provinceId,
          countryId: user.countryId,
          country: user.country,
          province: user.province,
          city: user.city,
          district: user.district,
          
  
  
  
  
        });
      } else {
        return 'Invalid user or password!';
        
      }
    } catch (err) {
      return err.message;
      
    }
  },

  verifyEmailAddress(body) {
    return requests.post('/user/verify-email', body);
  },
  verifyCoinPOSEmailAddress(body) {
    return requests.post('/user/verify-coinpos-email', body);
  },
  /* async fetchVerifyCoinPOSEmailAddress(body) {
    const isAdded = await findCoinPOSEmail(req.body.companyId,req.body.email);
  
    if (isAdded) {
      return res.status(403).send({
        message: 'This Email already Added!',
      });
    } else {
      
      const token = tokenForVerify(req.body);
      const body = {
        from: process.env.EMAIL_USER,
        to: `${req.body.email}`,
        subject: 'Email Activation',
        subject: 'Verify Your Email',
        html: `<h2>Hello ${req.body.email}</h2>
        <p>Verify your email address to complete the signup and login into your <strong>${req.body.companyName}</strong> account.</p>

          <p>This link will expire in <strong> 15 minute</strong>.</p>

          <p style="margin-bottom:20px;">Click this link for active your account</p>

          <a href=${process.env.STORE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>

          <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at ${req.body.locationEmail}</p>

          <p style="margin-bottom:0px;">Thank you</p>
          <strong>${req.body.companyName} Team</strong>
              `,
      };

      const message = 'Please check your email to verify!';
      sendEmail(body, res, message);
    }
  }, */

  userRegister(token, body) {
    return requests.post(`/user/register/${token}`, body);
  },
  coinposUserRegister(token, body) {
    return requests.post(`/user/coinpos-register/${token}`, body);
  },
  coinposCheckExpired(body) {
    return requests.post(`/user/coinpos-check-expired`, body);
  },
  async fetchCoinposCheckExpired(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'CheckCoinposUserExpired', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"Email":"${body.email}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        console.log("expired = " + data); // this will be a string
        productList = data;
      });
      
      return productList;
      
    }
    catch (err) {
      return "Error: " + err.message;
      
    }
  },

  signUpWithProvider(body) {
    return requests.post('/user/signup', body);
  },

  forgetPassword(body) {
    return requests.put('/user/forget-password', body);
  },
  forgetCoinPOSCustomerPassword(body) {
    return requests.put('/user/coinpos-customer-forget-password', body);
  },

  /* async fetchForgetCoinPOSCustomerPassword(body) {
    const isAdded = await findCoinPOSEmail(body.companyId,body.email);
    //const isAdded = await User.findOne({ email: req.body.verifyEmail });
    if (!isAdded) {
      return res.status(404).send({
        message: 'User Not found with this email!',
      });
    } else {
      const token = tokenForVerify(body);
      const body = {
        from: process.env.EMAIL_USER,
        to: `${body.email}`,
        subject: 'Password Reset',
        html: `<h2>Hello ${body.email}</h2>
        <p>A request has been received to change the password for your <strong>${body.companyName}</strong> account </p>

          <p>This link will expire in <strong> 15 minute</strong>.</p>

          <p style="margin-bottom:20px;">Click this link for reset your password</p>

          <a href=${process.env.STORE_URL}/user/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

          <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at ${body.locationEmail}</p>

          <p style="margin-bottom:0px;">Thank you</p>
          <strong>${body.companyName} Team</strong>
              `,
      };

      const message = 'Please check your email to reset password!';
      var res;
      sendEmail(body, res, message);

      return res;
    }
  }, */

  resetPassword(body) {
    return requests.put('/user/reset-password', body);
  },
  resetCoinPOSCustomerPassword(body) {
    return requests.put('/user/coinpos-customer-reset-password', body);
  },

  changePassword(body) {
    return requests.post('/user/change-password', body);
  },

  updateUser(id, body) {
    return requests.put(`/user/${id}`, body);
  },
  getLiffURLTemplate()
  {
    return requests.get(`/user/allUser1`);
  },
  async fetchGetLiffURLTemplate()
  {
    try
    {
      //res.send("getLiff URL");
      //return;
      //var template = "";
      var url = serviceUrl + 'GetLiffURLTemplate'
      //res.send("getLiff URL = " + url);
      //return;
      var template = null;
      console.log("getLiff URL")
      await fetch(url,
        { 
          method:'GET',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log(data);
          var obj = data;
          template = obj;
        });
      
      

        return template;
    }
    catch(err) {
      return "Error: " + err.message;
      
    }
  }
};

const findCoinPOSCustomerAccount = async(companyId, email, password) => 
{
  try
  {
    var userData = null;
    await fetch(serviceUrl + 'CoinPOSCustomerAccountLogin',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}", "Password":"${password}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        userData = data;
    });
    
    return userData;
      
  }
  catch (err) {
    return "Error: " + err.message;
    
  }
};
const findCoinPOSCustomerAccountByLineUserId = async(companyId, liffId, lineUserId,linePOSId) => 
{
  try
  {
    var userData = null;
    await fetch(serviceUrl + 'CoinPOSCustomerAccountByLineUserId',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"LiffId":"${liffId}", "LineUserId":"${lineUserId}","LinePOSId":"${linePOSId}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        userData = data;
    });
    
    return userData;
      
  }
  catch (err) {
    return "Error: " + err.message;
    
  }
};

const findCoinPOSEmail = async(companyId, email) => 
{
  try
  {
    var productList = null;
    await fetch(serviceUrl + 'GetEmailInCompany',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log(data); // this will be a string
      productList = data;
    });
    
    return productList;
      //res.send(productList);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
export default UserServices;
