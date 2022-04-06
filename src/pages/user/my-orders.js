import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoBagHandle } from 'react-icons/io5';

//internal import
import useAsync from '@hooks/useAsync';
import Dashboard from '@pages/user/dashboard';
import OrderServices from '@services/OrderServices';
import ProductServices from '@services/ProductServices';
import Loading from '@component/preloader/Loading';
import { UserContext } from '@context/UserContext';
import OrderHistory from '@component/order/OrderHistory';

const MyOrders = () => {
  const router = useRouter();
  const {
    state: { userInfo },
  } = useContext(UserContext);
  

  var companyLogo = '';
  var companyName = '';
  var locationName = '';
  var locationAddress1 = '';
  var locationAddress2 = '';
  var locationCity = '';
  var locationStateOrProvince = '';
  var locationCountry = '';
  var locationPostalCode = '';
  var locationEmail = '';
  var locationTel = '';

  const [companyId, setCompanyId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [linePOSId, setLinePOSId] = useState('');
  const [lineUserId, setLineUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [liffId, setLiffId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  var rowPerPage = 10;

  var orders = [];
  var myData = {};
  myData["orders"] = orders;

  const [data, setData] = useState(myData);

  const [pagingIndent, setPaging] = useState([]);


  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var catalogName = '';
  var customerEmail = '';

  useEffect(() => 
  {
    if(sessionStorage.getItem('customerEmail'))
    {
      customerEmail = sessionStorage.getItem('customerEmail'); 
        
    }

    if(sessionStorage.getItem('catalogName'))
    {
      catalogName = sessionStorage.getItem('catalogName'); 
      
            
    }
    if(sessionStorage.getItem('companyLogo'))
    {
      companyLogo = sessionStorage.getItem('companyLogo'); 
      
    }
    if(sessionStorage.getItem('companyName'))
    {
      
      companyName = sessionStorage.getItem('companyName'); 
      //alert(companyName);
    }
    if(sessionStorage.getItem('locationName'))
    {
      locationName = sessionStorage.getItem('locationName'); 
      
    }
    if(sessionStorage.getItem('locationAddress1'))
    {
      locationAddress1 = sessionStorage.getItem('locationAddress1'); 
      
    }
    if(sessionStorage.getItem('locationAddress2'))
    {
      locationAddress2 = sessionStorage.getItem('locationAddress2'); 
      
    }
    if(sessionStorage.getItem('locationCity'))
    {
      locationCity = sessionStorage.getItem('locationCity'); 
      
    }
    if(sessionStorage.getItem('locationStateOrProvince'))
    {
      locationStateOrProvince = sessionStorage.getItem('locationStateOrProvince'); 
      
    }
    if(sessionStorage.getItem('locationCountry'))
    {
      locationCountry = sessionStorage.getItem('locationCountry'); 
      
    }
    if(sessionStorage.getItem('locationPostalCode'))
    {
      locationPostalCode = sessionStorage.getItem('locationPostalCode'); 
      
    }
    if(sessionStorage.getItem('locationEmail'))
    {
      locationEmail = sessionStorage.getItem('locationEmail'); 
      
    }
    if(sessionStorage.getItem('locationTel'))
    {
      locationTel = sessionStorage.getItem('locationTel'); 
      
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
  

      const pagingManager = (countPage,currentPage) =>
    {
      //alert("pagingManager");
      var allPage = countPage;
      var startPage = 1;
      var endPage = allPage;
      if(currentPage < 3)
      {
        startPage = 1;
      }
      else
      {
        startPage = currentPage - 2;
      }
      if(currentPage + 2 > allPage)
      {
        endPage = allPage;
      }
      else
      {
        if(currentPage < 3)
        {
          endPage = 5;
        }
        else
        {
          endPage = currentPage + 2;
        }
            
      }

      var indents = [];
    
        if(startPage > 1)
        {
          indents.push(<button onClick={()=>getOrderByUserIdByPaging(startPage-1,rowPerPage)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
              Previous
            </button>);
        }
        else
        {
          indents.push(
            <button className="text-gray-400 text-lg px-2" disabled>Previous</button>
          );
        }

        var iPage = 0;
        for (let i = startPage; i <= endPage; i++) {
          if(i === currentPage)
          {
            indents.push(<button className="text-gray-400 text-lg px-2" disabled>{i}</button>);
          }
          else
          {
            iPage = i;
            indents.push(<button onClick={()=>getOrderByUserIdByPaging(i,rowPerPage)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            {i}
          </button>);
          }
          
        }

        if(endPage > allPage)
        {
          indents.push(<button className="text-gray-400 text-lg px-2" disabled>Next</button>);
          
        }
        else
        {
          if(endPage === allPage)
          {
            indents.push(<button className="text-gray-400 text-lg px-2" disabled>Next</button>);
          }
          else
          {
            indents.push(<button onClick={()=>getOrderByUserIdByPaging(endPage+1,rowPerPage)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            Next
          </button>)
          }
          
        }

        setPaging(indents);
    }


      useEffect(async () => {

        setLoading(true);
        try
        {
          const data = await ProductServices.getOrderByUserId(
            {
              companyId,
              liffId,
              lineUserId,
              linePOSId,
              page:1,
              rowPerPage:rowPerPage,
              catalogName:catalogName,
              email:customerEmail
            })
            pagingManager(data.allCount, data.currentPage)
            setData(data);
            setLoading(false);
  
    
          
        }
        catch(e)
        {
          setError(e.Message)
          //alert("error = " + e.message);
        }
      
    }, []);

    const getOrderByUserIdByPaging = async(page,rowPerPage) =>
  {
    setLoading(true);
      try
      {
        const data = await ProductServices.getOrderByUserId(
          {
            companyId,
            liffId,
            lineUserId,
            linePOSId,
            page:page,
            rowPerPage:rowPerPage,
            catalogName:catalogName,
            email:customerEmail
          })
          pagingManager(data.allCount, data.currentPage)
          setData(data);
          setLoading(false);

  
        
      }
      catch(e)
      {
        setError(e.Message)
        //alert("error = " + e.message);
      }
  }
      /*const { data, error, loading } = useAsync(() => ProductServices.getOrderByUserId(
        {
          companyId,
            liffId,
            lineUserId,
            linePOSId,
            page:1,
            rowPerPage:rowPerPage,
            catalogName:catalogName,
            email:customerEmail
        }));*/
  return (
    <Dashboard title="My Orders" description="This is user order history page" 
    companyName={companyName} locationName={locationName} companyLogo={companyLogo}
    locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel}>
      <div className="overflow-hidden rounded-md font-serif">
        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <h2 className="text-2xl text-center my-10 mx-auto w-11/12">
            {error}
          </h2>
        ) : data.length === 0 ? (
          <div className="text-center">
            <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
              <IoBagHandle />
            </span>
            <h2 className="font-medium text-md my-4 text-gray-600">
              You Have no order Yet!
            </h2>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-xl font-serif font-semibold mb-5">My Orders</h2>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                  <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100">
                        <th
                          scope="col"
                          className="text-left text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          OrderTime
                        </th>

                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Method
                        </th>
                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.orders?.map((order) => (
                        <tr key={order.orderId}>
                          <OrderHistory order={order} />
                          <td className="px-5 py-3 whitespace-nowrap text-right text-sm">
                            <Link href={`/order/${order.orderId}`}>
                              <a className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full">
                                Details
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  
                </div>

                <div className="flex">
                    <div className="w-full">
                    <div id="pagingProduct" className=" lg:py-16 bg-repeat bg-center overflow-hidden">
                      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                        <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-3 items-center">
                          
                          <div className="text-center">
                            
                            <div className="mt-2">
                              {pagingIndent}
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                      
                    </div>
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default MyOrders;
