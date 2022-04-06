import React from 'react';
import Label from '@component/form/Label';
import {Form} from 'react-bootstrap';

const ShippingFormSelect = ({
  register,
  defaultValue,
  name,
  label,
  type,
  placeholder,
  Icon,
  dataList,
  selectedId,
  handleItemChange
}) => {

  var shippingList = [];
  var shippingId = 0;
  shippingId = selectedId;
  shippingList = dataList;
  var shippingOptionIndent = [];
  var shippingIndent = [];

  if(selectedId === 0)
  {
    //alert("Select == 0")
    shippingOptionIndent.push(<option selected>Select Shipping</option>)
  }
  else
  {
    shippingOptionIndent.push(<option>Select Shipping</option>)
  }
  for(var i=0;i<dataList.length;i++)
  {
    if(shippingList[i].Id === shippingId)
    {
      //alert("Select = " + countryId + " LocalName" + countryList[i].countryLocalName)
      shippingOptionIndent.push(<option selected value={shippingList[i].providerId + ":" + shippingList[i].serviceCharge}>{shippingList[i].serviceName + ":" + shippingList[i].serviceChargeDisplay}</option>)
    }
    else
    {
        shippingOptionIndent.push(<option value={shippingList[i].providerId + ":" + shippingList[i].serviceCharge}>{shippingList[i].serviceName + ":" + shippingList[i].serviceChargeDisplay}</option>)
    }
    
  }
  
  //var json = countryOptionIndent.toString();//JSON.stringify(countryOptionIndent);
  
  //alert("Selected = " + json);

  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{' '}
            </span>
          </div>
        )}
        <Form.Select {...register(`${name}`, {
            required: `${label} is required!`,
          })}
          name={name}
          className={
            Icon
              ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
              : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
          }
          onChange={handleItemChange}
          >
            {shippingOptionIndent}
            {/* {
                selectedId === 0
                ?
                    <option selected>Select Country</option>
                :
                    <option>Select Country</option>
            }
            {dataList !== null
            ?
                            
            dataList.map((item) => 
                item.countryId === selectedId
                ?
                    <option selected value={item.countryId}>{item.countryLocalName}</option>
                :
                    <option value={item.countryId}>{item.countryLocalName}</option>
                )
            :
                <option >Not Found</option>
            }  */}                  
        {/* <option >Open this select menu</option>
        <option value="1">One</option>
        <option selected value="2">Two</option>
        <option value="3">Three</option> */}
        </Form.Select>
        
      </div>
    </>
  );
};

export default ShippingFormSelect;
