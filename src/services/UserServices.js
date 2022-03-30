import requests from './httpServices';
import constants from '@utils/constant';

const coinposServiceUrl = 'https://coinpos-uat.azurewebsites.net/LineLiff/';

const UserServices = {
  userLogin(body) {
    return requests.post('/user/login', body);
  },
  coinposUserLogin(body) {
    return requests.post('/user/coinPOS-login', body);
  },

  verifyEmailAddress(body) {
    return requests.post('/user/verify-email', body);
  },
  verifyCoinPOSEmailAddress(body) {
    return requests.post('/user/verify-coinpos-email', body);
  },

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
      var expiredData = ''
      await fetch(coinposServiceUrl + 'CheckCoinposUserExpired',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"Email":"${body.email}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          expiredData = (data);
      });
      
      return expiredData;
        //alert("coinpos = " + countryData);
    }
    catch (err) 
    {
      //alert("Error " + err.message);
      return "Error " + err.message;
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
  }
};

export default UserServices;
