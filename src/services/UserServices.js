import requests from './httpServices';

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
