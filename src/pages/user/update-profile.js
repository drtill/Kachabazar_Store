import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
  IoSaveOutline,
  IoCheckboxOutline,
  IoCloseCircleOutline,
  IoCreateOutline

} from 'react-icons/io5';
//internal import
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import Dashboard from '@pages/user/dashboard';
import InputArea from '@component/form/InputArea';
import EditableCustomerInput from '@component/form/EditableCustomerInput';
import CountryFormSelect from '@component/form/CountryFormSelect';
import ProvinceFormSelect from '@component/form/ProvinceFormSelect';
import CityFormSelect from '@component/form/CityFormSelect';
import DistrictFormSelect from '@component/form/DistrictFormSelect';
import ProductServices from '@services/ProductServices';

// import UserServices from '@services/UserServices';
import { UserContext } from '@context/UserContext';
import Uploader from '@component/image-uploader/Uploader';
import { notifySuccess, notifyError } from '@utils/toast';
import { set } from 'firebase/database';

import Loading from '@component/preloader/Loading';

const UpdateProfile = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    state: { userInfo },
  } = useContext(UserContext);

  const { dispatch } = useContext(UserContext);

  const router = useRouter();
  const { query } = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  
  //var provinceTextData = '';
  //var cityTextData = '';
  //var districtTextData = '';

  var customerAddressIdData = 0
  
  var isInputAddressData = true;

  const [customerId, setCustomerId] = useState(0);
  const [companyId,setCompanyId] = useState(0);
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [catalogName, setCatalogName] = useState('');
  const [dataPath, setDataPath] = useState('');

  
  const [IsApproveCustomerInfo, setApproveCustomerInfo] = useState(false);
  const [IsEditCustomerInfo, setEditCustomerInfo] = useState(false);
  const [IsDisableCustomerInfo, setDisableCustomerInfo] = useState(true);
  const [customerAddressId, setCustomerAddressId] = useState(customerAddressIdData);
  
  
  const [changePostalcode, setChangePostalCode] = useState(false);
  
  const [firstName,setCustomerFirstName] = useState('');
  const [lastName,setCustomerLastName] = useState('');
  const [email,setCustomerEmail] = useState('');
  const [phoneNumber,setCustomerPhoneNumber] = useState('');
  const [address1,setCustomerAddress] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [countrys,setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [countryId, setCountryId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [provinceId,setProvinceId] = useState(0);
  const [districtId,setDistrictId] = useState(0);
  const [postalcode, setPostalCode] = useState('');

  const [districtText, setDistrictText] = useState('');
  const [cityText, setCityText] = useState('');
  const [provinceText, setProvinceText] = useState('');

  const [defaultFirstName,setDefaultCustomerFirstName] = useState('');
  const [defaultLastName,setDefaultCustomerLastName] = useState('');
  const [defaultEmail,setDefaultCustomerEmail] = useState('');
  const [defaultPhoneNumber,setDefaultCustomerPhoneNumber] = useState('');
  const [defaultAddress1,setDefaultCustomerAddress] = useState('');

  const [defaultProvinces, setDefaultProvinces] = useState([]);
  const [defaultCountrys,setDefaultCountry] = useState([]);
  const [defaultCities, setDefaultCities] = useState([]);
  const [defaultDistricts, setDefaultDistricts] = useState([]);
  
  const [defaultCountryId, setDefaultCountryId] = useState(0);
  const [defaultCityId, setDefaultCityId] = useState(0);
  const [defaultProvinceId,setDefaultProvinceId] = useState(0);
  const [defaultDistrictId,setDefaultDistrictId] = useState(0);
  const [defaultPostalcode, setDefaultPostalCode] = useState('');

  const [defaultDistrictText, setDefaultDistrictText] = useState('');
  const [defaultCityText, setDefaultCityText] = useState('');
  const [defaultProvinceText, setDefaultProvinceText] = useState('');

  
  
  const [isInputAddress, setIsInputAddress] = useState(isInputAddressData);
  const [defaultIsInputAddress, setDefaultIsInputAddress] = useState(isInputAddressData);

  const [customerInfoLoading, setCustomerInfoLoading] = useState(false);

  



  useEffect(() => 
  {
    initiateCompanyData();
    initiateCustomerInfoData();
    //alert('countryIdData = ' + countryIdData);
    
  },[]);
  

  const initiateCompanyData = () => 
  {
    var lineCompanyId = 0;
    var companyLogoData = '';
    var companyNameData = '';
    var catalogNameData = '';
    var dataPathData = '';
    if(sessionStorage.getItem('companyId'))
    {
      lineCompanyId = sessionStorage.getItem('companyId');
      alert('lineCompanyId = ' + lineCompanyId);
      setCompanyId(lineCompanyId);
    }

    if(sessionStorage.getItem('companyLogo'))
    {
      companyLogoData = sessionStorage.getItem('companyLogo'); 
      setCompanyLogo(companyLogoData);
      
    }
    if(sessionStorage.getItem('companyName'))
    {
      companyNameData = sessionStorage.getItem('companyName'); 
      //alert(companyName)
      setCompanyName(companyNameData);
      
    }
    if(sessionStorage.getItem('dataPath'))
    {
      dataPathData = sessionStorage.getItem('dataPath'); 
      setDataPath(dataPathData);
            
    }
    if(sessionStorage.getItem('catalogName'))
    {
      catalogNameData = sessionStorage.getItem('catalogName');
      setCatalogName(catalogNameData);
      alert('catalogName =' + catalogName);
            
    }
    //alert('lineCompanyId = ' + lineCompanyId);
    if(Number(lineCompanyId) === 0 || lineCompanyId === null || lineCompanyId === undefined)
    {

      router.push('/404');

    }
    
    
  }
  const initiateCustomerInfoData = () => 
  {
    initiateCustomerDetail();
    initiateCustomerAddress();
  }

  const initiateCustomerDetail = () =>
  {
    if (Cookies.get('userInfo')) {
      //alert("Get UserInfo");
      const user = JSON.parse(Cookies.get('userInfo'));
      if(user !== null && user !== undefined )
      {
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('address', user.address);
        setValue('phone', user.phone);
        setImageUrl(user.image);
      }
      
    }

    if(sessionStorage.getItem('customerId'))
    {
      var customerIdData = sessionStorage.getItem('customerId'); 
      setCustomerId(customerIdData);
            
    }

    if(sessionStorage.getItem('customerFirstName'))
    {
      
      var customerFirstName = sessionStorage.getItem('customerFirstName'); 
      setCustomerFirstName(customerFirstName);
      setDefaultCustomerFirstName(customerFirstName)
      //alert(customerFirstName);  
    }
    if(sessionStorage.getItem('customerLastName'))
    {
      var customerLastName = sessionStorage.getItem('customerLastName'); 
      setCustomerLastName(customerLastName);
      setDefaultCustomerLastName(customerLastName);
    }
    if(sessionStorage.getItem('customerEmail'))
    {
      var customerEmail = sessionStorage.getItem('customerEmail'); 
      setCustomerEmail(customerEmail);
      setDefaultCustomerEmail(customerEmail);
    }
    if(sessionStorage.getItem('customerPhoneNumber'))
    {
      var customerPhoneNumber = sessionStorage.getItem('customerPhoneNumber');
      setCustomerPhoneNumber(customerPhoneNumber);
      setDefaultCustomerPhoneNumber(customerPhoneNumber);
    }
  }

  const initiateCustomerAddress = () =>
  {

    if(sessionStorage.getItem('customerAddressId'))
    {
      
      customerAddressIdData = Number(sessionStorage.getItem('customerAddressId')); 
      //alert("customerAddressIdData = " + customerAddressIdData)
      setCustomerAddressId(customerAddressIdData);
      if(customerAddressId !== undefined && customerAddressId !== null && customerAddressId !== 0)
      {
        setDisableCustomerInfo(true);
      }
      else
      {
        setCustomerAddressId(false);
      }
    }
    
    if(sessionStorage.getItem('countryId'))
    {      
      var countryIdData = Number(sessionStorage.getItem('countryId')); 
      setCountryId(countryIdData);
      setDefaultCountryId(countryIdData);   
    }

    if(sessionStorage.getItem('countrysJSON'))
    {
      var countrysJson = sessionStorage.getItem('countrysJSON'); 
      //alert(countrysJson);
      var countryList = JSON.parse(countrysJson);
      if(countryList === null)
      {
        setCountry([])
        setDefaultCountry([]);
      }
      else
      {
        setCountry(countryList);
        setDefaultCountry(countryList);
      }
      
    }
    if(sessionStorage.getItem('provinces'))
    {
      var provincesJson = sessionStorage.getItem('provinces'); 
      var provincesList = JSON.parse(provincesJson);
      //alert('provincesList = ' + provincesList)
      if(provincesList === null)
      {
        setProvinces([]);
        setDefaultProvinces([]);
      }
      else
      {
        setProvinces(provincesList);
        setDefaultProvinces(provincesList);
      }
    }

    
    if(sessionStorage.getItem('cities'))
    {
      //alert('cities');
      var citiesJson = sessionStorage.getItem('cities'); 
      //alert('citiesJson = ' + citiesJson);
      var citiesList = JSON.parse(citiesJson);
      if(citiesList === null)
      {
        setCities([]);
        setDefaultCities([]);
      }
      else
      {
        setCities(citiesList);
        setDefaultCities(citiesList);
      }
    }
    if(sessionStorage.getItem('districts'))
    {
      var districtsJson = sessionStorage.getItem('districts'); 
      var districtsList = JSON.parse(districtsJson);
      if(districtsList === null)
      {
        setDistricts([]);
        setDefaultDistricts([]);
      }
      else
      {
        setDistricts(districtsList);
        setDefaultDistricts(districtsList);
      }
    }
    
    if(sessionStorage.getItem('address1'))
    {
      var customerAddress1 = sessionStorage.getItem('address1'); 
      //alert("Address1 = " + customerAddress1);
      setCustomerAddress(customerAddress1);
      setDefaultCustomerAddress(customerAddress1);
    }

    if(sessionStorage.getItem('provinceId'))
    {
      var provinceIdData = Number(sessionStorage.getItem('provinceId')); 
      setProvinceId(provinceIdData);
      setDefaultProvinceId(provinceIdData);
    }
    if(sessionStorage.getItem('cityId'))
    {
      var cityIdData = Number(sessionStorage.getItem('cityId')); 
      setCityId(cityIdData);
      setDefaultCityId(cityIdData);
    }
    if(sessionStorage.getItem('districtId'))
    {
      var districtIdData = Number(sessionStorage.getItem('districtId')); 
      setDistrictId(districtIdData);
      setDefaultDistrictId(districtIdData);
    }
    if(sessionStorage.getItem('postalcode'))
    {
      var postalCodeData = sessionStorage.getItem('postalcode'); 
      setPostalCode(postalCodeData);
      setDefaultPostalCode(postalCodeData);
    }

    if(Number(countryId) !== 10 && Number(countryId) !== 0)//thai
    {
      
      isInputAddressData = true;
      setIsInputAddress(isInputAddressData);
      setDefaultIsInputAddress(isInputAddressData);
      if(sessionStorage.getItem('city'))
      {
        var cityTextData = sessionStorage.getItem('city'); 
        setCityText(cityTextData);
        setDefaultCityText(cityTextData);
        
          
      }
      if(sessionStorage.getItem('district'))
      {
        var districtTextData = sessionStorage.getItem('district'); 
        setDistrictText(districtTextData);
        setDefaultDistrictText(districtTextData);
      }
      if(sessionStorage.getItem('province'))
      {
        var provinceTextData = sessionStorage.getItem('province'); 
        setProvinceText(provinceTextData);
        setDefaultProvinceText(provinceTextData);
      }
      
      //alert('not thai')
    }
    else
    {
      //alert('thai')
      isInputAddressData = false;
      setIsInputAddress(isInputAddressData);
      setDefaultIsInputAddress(isInputAddressData);
    }
  }

  const handleEmailChange = (event) => {  
    setCustomerEmail(event.target.value)
  }
  const handleContactChange = (event) => {  
    setCustomerPhoneNumber(event.target.value)
  }
  const handleFirstNameChange = (event) => {  
    setCustomerFirstName(event.target.value)
  }
  const handleLastNameChange = (event) => {  
    setCustomerLastName(event.target.value)
  }

  const handleDistrictTextChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setDistrictText(event.target.value)
  }
  const handleCityTextChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setCityText(event.target.value)
  }
  const handleProvinceTextChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setProvinceText(event.target.value)
  }

  const EditCustomerInfo = () =>
{
  
  setEditCustomerInfo(true);
  setDisableCustomerInfo(false);
  setApproveCustomerInfo(false);

  alert('defaultFirstName = ' + defaultFirstName + ' firstName = ' + firstName);
  setCustomerFirstName(defaultFirstName);
}
  const handleCountryChange = async(event) => {
    console.log(event.target.value);
    var countryId = parseInt(event.target.value)
    setCountryId(countryId);
    //var provincesDataJson = await ProductServices.fetchGetStateProvince();
    //alert(provincesDataJson)

    //var provincesData = JSON.parse(provincesDataJson)
    //alert('provincesData = ' + provincesData)
    //alert('provincesData Response = ' + provincesData.provinceResponses);
    //setProvinces(JSON.parse(provincesData.provinceResponse))
    

    
    setProvinceId(1);
    setCityId(0);
    setDistrictId(0);

    //setProvinces(provincesData.provinceResponses)
    setCities([]);
    setDistricts([]);
    
    if(countryId === 10)//thai
    {
      setIsInputAddress(false);
    }
    else
    {
      setIsInputAddress(true);
    }
    setPostalCode('');
    
    
}
const handleProvinceChange = async(event) => {
    console.log(event.target.value);
    var stateId = parseInt(event.target.value)
    var citysData = await ProductServices.fetchGetCity({stateId});
    setProvinceId(stateId);
    setCities(citysData);
    setDistricts([]);
    setPostalCode('');
    
}
const handleCityChange = async(event) => {
    console.log(event.target.value);
    var cityId = parseInt(event.target.value)        
    var districtsData = await ProductServices.fetchGetDistrict({cityId});
    setCityId(cityId);
    setDistricts(districtsData);
    setPostalCode('');
    
    
}
const handleDistrictChange = async(event) => {
    console.log(event.target.value);
    var districtId = parseInt(event.target.value)     
    setDistrictId(districtId);   
    PopulatePostalCode(districtId)
    
}

const PopulatePostalCode = (id) =>
{
  for(var i=0;i<districts.length;i++)
  {
    var item = districts[i];
    if(item !== null)
    {
      if(item.Id === id)
      {
        
        setChangePostalCode(true);
        setPostalCode(districts[i].ZipCode);
      }
    }
  }
}

const handlePostalCodeChange = (event) => {  
  //alert("aaaa" + event.target.value);
  setPostalCode(event.target.value)
}
const handleAddress1Change = (event) => {  
  //alert("aaaa" + event.target.value);
  setCustomerAddress(event.target.value)
}
  const onSubmit = (data) => {
     

     //SaveCustomerInfo(companyId);

    
  };

  const SaveCustomerInfo = async () =>
{
  
  var catalogName = '';
  if(sessionStorage.getItem('customerId'))
  {
    customerId = sessionStorage.getItem('customerId'); 
    //alert('customerId = ' + customerId);
          
  }
  if(sessionStorage.getItem('catalogName'))
    {
      catalogName = sessionStorage.getItem('catalogName');
      alert('catalogName =' + catalogName);
            
    }
  if (!imageUrl) {
    notifyError('Image is required!');
    return;
  }
  setLoading(true);

  //SaveCustomerInfo(companyId);

  setCustomerInfoLoading(true);
  //alert(countryId);
  var countryItem = countrys.find(x => x.countryId === countryId);
  //alert('Country = ' + JSON.stringify(countryItem));
    var countryString = countryItem === null ? "" : countryItem.countryLocalName;

    var cityString = '';
    var provinceString = '';
    var districtString = '';
    if(isInputAddress === true)
    {
      cityString = cityText;
      provinceString = provinceText;
      districtString = districtText;
    }
    else
    {
      alert('cityId = ' + cityId);
      var cityItem = cities.find(x => x.Id === cityId);
      cityString = cityItem === null ? "" : cityItem.Name_th;

      alert('provinceId = ' + provinceId);
      var provinceItem = provinces.find(x => x.Id === provinceId);
      provinceString = provinceItem === null ? "" : provinceItem.Name_th;

      alert('districtId = ' + districtId);
      var districtItem = districts.find(x => x.Id === districtId);
      districtString = districtItem === null ? "" : districtItem.Name_th;
    }

    var postalCodeString = postalcode;
    //alert(companyId)
    //alert(firstName);
    //return;
    if(!checkValid(firstName,lastName,email,phoneNumber, address1, countryId, provinceString, districtString, cityString))
    {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      //return;
    }
    else
    {
      
      var customerData = await ProductServices.fetchSaveCustomerInfo(
        {
          firstName:firstName,
          middleName:'',
          lastName:lastName,
          gender:0,
          phone:phoneNumber,
          mobile:phoneNumber,
          email:email,
          address1:address1,
          district:districtString,
          city:cityString,
          stateOrProvince:provinceString,
          country:countryString,
          countryId:countryId,
          customerId:customerId,
          postalcode:postalCodeString,
          companyId:companyId,
          catalogName:catalogName,
          imageUrl:imageUrl
  
        });

        notifySuccess('Update Profile Success!');
        //alert(JSON.stringify(customerData));
      sessionStorage.setItem('customerId', customerData.customerId);
          sessionStorage.setItem('customerFirstName', customerData.firstName);
          sessionStorage.setItem('customerLastName', customerData.lastName);
          sessionStorage.setItem('customerEmail', customerData.email);
          sessionStorage.setItem('customerPhoneNumber', customerData.phone);

          sessionStorage.setItem('customerAddressId', customerData.customerAddressId);


          //alert('address1 = ' + customerData.address1);
          sessionStorage.setItem('address1', customerData.address1);
          sessionStorage.setItem('countryId', customerData.countryId);
          sessionStorage.setItem('provinceId', customerData.provinceId);
          sessionStorage.setItem('province', customerData.StateOrProvince);
          sessionStorage.setItem('cityId', customerData.cityId);
          sessionStorage.setItem('city', customerData.City);
          sessionStorage.setItem('districtId', customerData.districtId);
          sessionStorage.setItem('district', customerData.District);
          sessionStorage.setItem('postalcode', customerData.postalcode);


      dispatch({ type: 'USER_LOGIN', payload: customerData });
      Cookies.set('userInfo', JSON.stringify(customerData));

      localStorage.setItem('userInfo', JSON.stringify(customerData));

      setEditCustomerInfo(false);
      setDisableCustomerInfo(true);
      setApproveCustomerInfo(false);
    }
    setLoading(false);

      
      
}
  const CancelCustomerInfo = () =>
  {
    setCustomerFirstName(defaultFirstName);
    setCustomerLastName(defaultLastName);
    setCustomerEmail(defaultEmail);
    setCustomerPhoneNumber(defaultPhoneNumber);
    setCustomerAddress(defaultAddress1);
    setCountryId(defaultCountryId);
    setCountry(defaultCountrys);

    setProvinceId(defaultProvinceId);
    setProvinces(defaultProvinces);

    setCityId(defaultCityId);
    setCities(defaultCities);

    setDistrictId(defaultDistrictId);
    setDistricts(defaultDistricts);

    setPostalCode(defaultPostalcode);

    setProvinceText(defaultProvinceText);
    setCityText(defaultCityText);
    setDistrictText(defaultDistrictText);

    setIsInputAddress(defaultIsInputAddress);

    alert('defaultFirstName = ' + defaultFirstName + ' firstName = ' + firstName);

    setEditCustomerInfo(false);
    setDisableCustomerInfo(true);
    setApproveCustomerInfo(false);
  }
  

  const checkValid = (firstName, lastName, email, phoneNumber, address1, countryId, provinceString, districtString,cityString) =>
{
  var isComplete = true;
  if(firstName.length <= 0)
  {
    isComplete = false;
  }
  if(lastName.length <= 0)
  {
    isComplete = false;
  }
  if(email.length <= 0)
  {
    isComplete = false;
  }
  if(phoneNumber.length <= 0)
  {
    //alert("Contact Error")
    var error = {};
    error['message'] = 'เบอร์ติดต่อว่างไม่ได้';
    setContactError(error);
    isComplete = false;
  }
  if(address1.length <= 0)
  {
    isComplete = false;
  }
  if(countryId === 0)
  {
    isComplete = false;
  }
  if(provinceString.length <= 0)
  {
    isComplete = false;
  }
  if(districtString.length <= 0)
  {
    isComplete = false;
  }
  if(cityString.length <= 0)
  {
    isComplete = false;
  }

  return isComplete;
}

  return (
    <Dashboard title="Update-Profile" description="This is edit profile page">
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">
                Update Profile
              </h2>
            </div>
          </div>
        </div>
        {
          loading
          ?
            <Loading loading={loading} />
          :

          <form onSubmit={onSubmit}>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="bg-white space-y-6">
                <div>
                  <Label label="Photo" />
                  <div className="mt-1 flex items-center">
                    <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:mt-0">
                <div className="md:grid-cols-6 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 mt-4 bg-white">
                      <div className="form-group">
                        <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                          Personal Details
                        </h2>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <EditableCustomerInput register={register}
                            label="First Name" 
                            name="firstName"
                            type="text"
                            placeholder="John"
                            isDisable={IsDisableCustomerInfo}
                              dataValue={firstName}
                              canAutoChange={true}
                            handleDataChange={handleFirstNameChange}
                            />
                            <Error errorName={errors.firstName} />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <EditableCustomerInput register={register}
                            label="Last Name" 
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            isDisable={IsDisableCustomerInfo}
                              dataValue={lastName}
                              canAutoChange={true}
                            handleDataChange={handleLastNameChange}
                            />
                            <Error errorName={errors.lastName} />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            
                            <EditableCustomerInput register={register}
                            label="Email address"
                            name="email"
                            type="email"
                            placeholder="youremail@gmail.com"
                            isDisable={IsDisableCustomerInfo}
                            dataValue={email}

                            canAutoChange={true}
                            handleDataChange={handleEmailChange}
                            />
                            <Error errorName={errors.email} />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <EditableCustomerInput register={register}
                            label="Phone number"
                            name="contact"
                            type="tel"
                            placeholder="+062-6532956"
                            isDisable={IsDisableCustomerInfo}
                            dataValue={phoneNumber}
                            canAutoChange={true}
                            handleDataChange={handleContactChange}
                            />

                            <Error errorName={errors.contact} />
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-12">
                      <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                        Shipping Address
                      </h2>

                      <div className="grid grid-cols-6 gap-6 mb-8">
                        <div className="col-span-6">
                          <EditableCustomerInput register={register}
                          label="Street address"
                          name="address"
                          type="text"
                          placeholder="123 Boulevard Rd, Beverley Hills"
                          isDisable={IsDisableCustomerInfo}
                          dataValue={address1}
                          canAutoChange={true}
                          handleDataChange={handleAddress1Change}
                          />
                          <Error errorName={errors.address} />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <CountryFormSelect register={register}
                            label="Country"
                            name="province1"
                            type="text"
                            isDisable={IsDisableCustomerInfo}
                            handleItemChange={handleCountryChange}
                            dataList={countrys} selectedId={countryId}
                            />
                          
                          <Error errorName={errors.country} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                        {
                                isInputAddress === true 
                                ?
                                  
                                  <EditableCustomerInput register={register}
                                      id="province"
                                      label="จังหวัด"
                                      name="province"
                                      type="input"
                                      placeholder="Please insert state/province."
                                      isDisable={IsDisableCustomerInfo}
                                      dataValue={provinceText}
                                      changeData={changePostalcode}
                                      canAutoChange={true}
                                      handleDataChange={handleProvinceTextChange}
                                      />
                                :
                                
                                <ProvinceFormSelect register={register}
                                label="จังหวัด"
                                name="province"
                                type="text"
                                isDisable={IsDisableCustomerInfo}
                                handleItemChange={handleProvinceChange}
                                dataList={provinces} selectedId={provinceId}
                                />
                              }
                          <Error errorName={errors.province} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          {
                                isInputAddress === true 
                                ?
                                  <EditableCustomerInput register={register}
                                    id="city"
                                    label="เขต/อำเภอ"
                                    name="province2"
                                    type="input"
                                    placeholder="Please insert city."
                                    isDisable={IsDisableCustomerInfo}
                                    dataValue={cityText}
                                    changeData={changePostalcode}
                                    canAutoChange={true}
                                    handleDataChange={handleCityTextChange}
                                    />
                                :
                                <CityFormSelect register={register}
                                label="เขต/อำเภอ"
                                name="province2"
                                type="text"
                                isDisable={IsDisableCustomerInfo}
                                handleItemChange={handleCityChange}
                                dataList={cities} selectedId={cityId}
                                />
                              }
                          <Error errorName={errors.city} />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        {isInputAddress === true 
                              ?
                                
                                <EditableCustomerInput register={register}
                                id="district"
                                label="แขวง/ตำบล"
                                name="district"
                                type="input"
                                placeholder="Please insert district."
                                isDisable={IsDisableCustomerInfo}
                                dataValue={districtText}
                                changeData={changePostalcode}
                                canAutoChange={true}
                                handleDataChange={handleDistrictTextChange}
                                />
                              :
                                <DistrictFormSelect register={register}
                                  label="แขวง/ตำบล"
                                  name="district"
                                  type="text"
                                  isDisable={IsDisableCustomerInfo}
                                  handleItemChange={handleDistrictChange}
                                  dataList={districts} selectedId={districtId}
                                  />
                              }
                          <Error errorName={errors.district} />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                          <EditableCustomerInput register={register}
                          id="postalCode"
                          label="ZIP / Postal"
                          name="zipCode"
                          type="input"
                          placeholder="12345"
                          isDisable={IsDisableCustomerInfo}
                          dataValue={postalcode}
                          changeData={changePostalcode}
                          canAutoChange={true}
                          handleDataChange={handlePostalCodeChange}
                          />
                          
                          <Error errorName={errors.zipCode} />
                        </div>
                      </div>
                    </div>
                      {/* <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="Full Name"
                          />
                          <Error errorName={errors.name} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Your Address"
                            name="address"
                            type="text"
                            placeholder="Your Address"
                          />
                          <Error errorName={errors.address} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Phone/Mobile"
                            name="phone"
                            type="tel"
                            placeholder="Your Mobile Number"
                          />
                          <Error errorName={errors.phone} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                          />
                          <Error errorName={errors.email} />
                        </div>
                      </div> */}
                      {/* <div className="col-span-6 sm:col-span-3">
                                    <button
                                      type="button"
                                      
                                      onClick={() => EditCustomerInfo()}
                                      className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                                    >
                                      แก้ไขข้อมูลลูกค้า{' '}
                                      <span className="text-xl ml-2">
                                        {' '}
                                        <IoCreateOutline />
                                      </span>
                                    </button>
                                  </div>
                      <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                        <button
                          disabled={loading}
                          type="submit"
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-cyan-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          Update Profile
                        </button>
                      </div> */}
                      <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10 text-right">
                        {
                          IsEditCustomerInfo === true
                          ?
                          <>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                            </div>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                            
                              <button
                                    type="button"
                                    
                                    onClick={() => CancelCustomerInfo()}
                                    className="bg-indigo-50 border border-indigo-100 md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center rounded-md placeholder-white focus-visible:outline-none focus:outline-none  text-gray-700 hover:text-gray-800 hover:border-gray-300  px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 h-12 mt-1 mr-2 text-sm lg:text-sm w-full sm:w-auto"
                                  >
                                    ยกเลิก{' '}
                                    
                                  </button>
                              <button
                                disabled={loading}
                                type="button"
                                onClick={() => SaveCustomerInfo()}
                                className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-cyan-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                              >
                                Update Profile
                              </button>
                              
                            </div>
                            </>
                          :
                          <>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                            </div>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                              
                              <button
                                      type="button"
                                      onClick={() => EditCustomerInfo()}
                                      className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                                    >
                                      แก้ไขข้อมูลลูกค้า{' '}
                                      <span className="text-xl ml-2">
                                        {' '}
                                        <IoCreateOutline />
                                      </span>
                                    </button>
                              
                            </div>
                          </>
                        }
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        }
        
      </div>
    </Dashboard>
  );
};




export default dynamic(() => Promise.resolve(UpdateProfile), { ssr: false });
