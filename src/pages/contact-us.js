import React,{useState, useEffect} from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import {
  // FiUser,
  FiGift,
  FiAlertCircle,
  FiHelpCircle,
  FiTruck,
  FiPhoneCall,
  FiCreditCard,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';

//internal import
import Layout from '@layout/Layout';
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import { contactData } from '@utils/data';
import { notifySuccess } from '@utils/toast';
import InputArea from '@component/form/InputArea';
import PageHeader from '@component/header/PageHeader';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = () => {
    notifySuccess(
      'your message sent successfully. We will contact you shortly.'
    );
  };

  var companyLogoData = '';
  var companyNameData = '';
  var locationNameData = '';
  var locationAddress1Data = '';
  var locationAddress2Data = '';
  var locationCityData = '';
  var locationStateOrProvinceData = '';
  var locationCountryData = '';
  var locationPostalCodeData = '';
  var locationEmailData = '';
  var locationTelData = '';

  const [companyId, setCompanyId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [linePOSId, setLinePOSId] = useState('');
  const [lineUserId, setLineUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [liffId, setLiffId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  useEffect(() => 
  {
    if(sessionStorage.getItem('companyLogo'))
    {
      companyLogoData = sessionStorage.getItem('companyLogo'); 
      //alert(companyLogo)
    }
    if(sessionStorage.getItem('companyName'))
    {
      
      companyNameData = sessionStorage.getItem('companyName'); 
      //alert(companyName);
    }
    if(sessionStorage.getItem('locationName'))
    {
      locationNameData = sessionStorage.getItem('locationName'); 
      
    }
    if(sessionStorage.getItem('locationAddress1'))
    {
      locationAddress1Data = sessionStorage.getItem('locationAddress1'); 
      
    }
    if(sessionStorage.getItem('locationAddress2'))
    {
      locationAddress2Data = sessionStorage.getItem('locationAddress2'); 
      
    }
    if(sessionStorage.getItem('locationCity'))
    {
      locationCityData = sessionStorage.getItem('locationCity'); 
      
    }
    if(sessionStorage.getItem('locationStateOrProvince'))
    {
      locationStateOrProvinceData = sessionStorage.getItem('locationStateOrProvince'); 
      
    }
    if(sessionStorage.getItem('locationCountry'))
    {
      locationCountryData = sessionStorage.getItem('locationCountry'); 
      
    }
    if(sessionStorage.getItem('locationPostalCode'))
    {
      locationPostalCodeData = sessionStorage.getItem('locationPostalCode'); 
      
    }
    if(sessionStorage.getItem('locationEmail'))
    {
      locationEmailData = sessionStorage.getItem('locationEmail'); 
      
    }
    if(sessionStorage.getItem('locationTel'))
    {
      locationTelData = sessionStorage.getItem('locationTel'); 
      
    }
        if(sessionStorage.getItem('liffId'))
        {
          
          liffId = sessionStorage.getItem('liffId'); 
          //alert("Liff id = " + liffId)
        }
        if(sessionStorage.getItem('linePOSId'))
        {
          linePOSId = sessionStorage.getItem('linePOSId'); 
          //alert("LinePOS id = " + linePOSId)
        }
        if(sessionStorage.getItem('lineUserId'))
        {
          lineUserId = sessionStorage.getItem('lineUserId'); 
          
        }
        if(sessionStorage.getItem('companyId'))
        {
          companyId = sessionStorage.getItem('companyId'); 
          
        }
        if(sessionStorage.getItem('locationId'))
        {
          locationId = sessionStorage.getItem('locationId'); 
          
        }
        if(sessionStorage.getItem('groupId'))
        {
          groupId = sessionStorage.getItem('groupId'); 
          
        }

  });
  

  const [companyLogo,setCompanyLogo] = useState(companyLogoData);
  const [companyName,setCompanyName] = useState(companyNameData);
  const [locationName,setLocationName] = useState(locationNameData);
  const [locationEmail,setLocationEmail] = useState(locationEmailData);
  const [locationTel,setLocationTel] = useState(locationTelData);
  const [locationAddress1,setLocationAddress1] = useState(locationAddress1Data);
  const [locationAddress2,setLocationAddress2] = useState(locationAddress2Data);
  const [locationCity,setLocationCity] = useState(locationCityData);
  const [locationStateOrProvince,setLocationStateOrProvince] = useState(locationStateOrProvinceData);
  const [locationCountry,setLocationCountry] = useState(locationCountryData);
  const [locationPostalCode,setLocationPostalCode] = useState(locationPostalCodeData);


  useEffect(() => 
  {


  });

      const locationContactData = [
        {
          id: 1,
          title: 'Email Us',
          info: 'Interactively grow empowered for process-centric total linkage.',
          icon: FiMail,
          contact: locationEmail,
          className: 'bg-emerald-100',
        },
        {
          id: 2,
          title: 'Call Us',
          info: 'Distinctively disseminate focused solutions clicks-and-mortar ministate.',
          icon: FiPhoneCall,
          contact: locationTel,
          className: 'bg-yellow-100',
        },
        {
          id: 3,
          title: 'Location',
          info: locationAddress1 + " " + locationAddress2 + " " + locationCity + " " + " " + locationStateOrProvince + " " + locationCountry + " " + locationPostalCode,
          icon: FiMapPin,
          contact: '',
          className: 'bg-indigo-100',
        },
      ];

    

  return (
    <Layout title="Contact Us" description="This is contact us page"
    companyName={companyName} locationName={locationName} companyLogo={companyLogoData}  
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel}>
      <PageHeader title="Contact Us" />

      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          {/* contact promo */}
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8 font-serif">
            {locationContactData.map((data) => (
              <div key={data.id} className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <data.icon />
                </span>
                <h5 className="text-xl mb-2 font-bold">{data.title}</h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  <a
                    href={`mailto:${data.contact}`}
                    className="text-emerald-500"
                  >
                    {data.contact}
                  </a>{' '}
                  {data.info}
                </p>
              </div>
            ))}
          </div>

          {/* contact form */}
          {/* <div className="px-0 pt-24 mx-auto items-center flex flex-col md:flex-row w-full justify-between">
            <div className="hidden md:w-full lg:w-5/12 lg:flex flex-col h-full">
              <Image
                width={874}
                height={874}
                src="/contact-us.png"
                alt="logo"
                className="block w-auto"
              />
            </div>
            <div className="px-0 pb-2 lg:w-5/12 flex flex-col md:flex-row">
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full mx-auto flex flex-col justify-center"
              >
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-serif mb-3">
                    For any suppoort just send your query
                  </h3>
                  <p className="text-base opacity-90 leading-7">
                    Collaboratively promote client-focused convergence vis-a-vis
                    customer directed alignments via plagiarize strategic users
                    and standardized infrastructures.
                  </p>
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                    <div className="w-full md:w-1/2 ">
                      <InputArea
                        register={register}
                        label="Your Name"
                        name="name"
                        type="text"
                        placeholder="Inter Your Name"
                      />
                      <Error errorName={errors.name} />
                    </div>
                    <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
                      <InputArea
                        register={register}
                        label="Your Email"
                        name="email"
                        type="email"
                        placeholder="Inter Your Email"
                      />
                      <Error errorName={errors.email} />
                    </div>
                  </div>
                  <div className="relative">
                    <InputArea
                      register={register}
                      label="Subject"
                      name="subject"
                      type="text"
                      placeholder="Inter Your Subject"
                    />
                    <Error errorName={errors.subject} />
                  </div>
                  <div className="relative mb-4">
                    <Label label="Message" />
                    <textarea
                      {...register('message', {
                        required: `Message is required!`,
                      })}
                      name="message"
                      className="px-4 py-3 flex items-center w-full rounded appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow-none focus:outline-none focus:border-gray-500 placeholder-body"
                      autoComplete="off"
                      spellCheck="false"
                      rows="4"
                      placeholder="Write your message here"
                    ></textarea>
                    <Error errorName={errors.message} />
                  </div>
                  <div className="relative">
                    <button
                      data-variant="flat"
                      className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
