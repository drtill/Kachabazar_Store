import React from 'react';
import Label from '@component/form/Label';
import {Form} from 'react-bootstrap';

const ProvinceFormSelect = ({
  register,
  defaultValue,
  name,
  label,
  type,
  placeholder,
  Icon,
  isDisable,
  dataList,
  selectedId,
  handleItemChange
}) => {

  var provinceList = [];
  var provinceId = 0;
  provinceId = selectedId;
  provinceList = dataList;
  var provinceOptionIndent = [];
  var provinceIndent = [];

  if(selectedId === 0)
  {
    //alert("Select == 0")
    provinceOptionIndent.push(<option selected>Select Province</option>)
  }
  else
  {
    provinceOptionIndent.push(<option>Select Province</option>)
  }
  for(var i=0;i<dataList.length;i++)
  {
    if(provinceList[i].Id === provinceId)
    {
      //alert("Select = " + countryId + " LocalName" + countryList[i].countryLocalName)
      provinceOptionIndent.push(<option selected value={provinceList[i].Id}>{provinceList[i].Name_th}</option>)
    }
    else
    {
        provinceOptionIndent.push(<option value={provinceList[i].Id}>{provinceList[i].Name_th}</option>)
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
          disabled={isDisable}
          className={
            isDisable 
              ?
                Icon
                ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-50 border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
                : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-50 border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
              :
                Icon
                ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
                : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
            
          }
          onChange={handleItemChange}
          >
            {provinceOptionIndent}
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

export default ProvinceFormSelect;
