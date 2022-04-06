import React, {useState, useEffect} from 'react';
import { IoBagHandle } from 'react-icons/io5';

//internal import
import useAsync from '@hooks/useAsync';
import OrderServices from '@services/OrderServices';
import ProductServices from '@services/ProductServices';
import Loading from '@component/preloader/Loading';
import OrderHistory from '@component/order/OrderHistory';


const RecentOrder = () => {

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
  /* const { data, error, loading } = useAsync(() => {
    ProductServices.getOrderByUserId(
    {
      companyId,
      liffId,
      lineUserId,
      linePOSId,
      page:1,
      rowPerPage:5,
      catalogName:catalogName,
      email:customerEmail
    })

    
  }
    
    ) *///useAsync(OrderServices.getOrderByUser);
    
    
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
    /* const fetchManifest = async () => {
      const res = await fetch('http://localhost:4000/asset-manifest.json');
      if (!res.ok) throw new Error(res.statusText)
      return res.json();
    };

    const { data, error, loading } = useAsync({ 
      promiseFn: getSalesOrderList, 
      onResolve: () => console.log('Resolved') 
    }); */

    //const { data, error, loading } = useAsync({ promiseFn: loadUsers, userId: 1 })
    /* const { data, error, loading } = useAsync(async () => {
      //const response = await fetch(url);
      ProductServices.getOrderByUserId(
        {
          companyId,
          liffId,
          lineUserId,
          linePOSId,
          page:1,
          rowPerPage:5,
          catalogName:catalogName,
          email:customerEmail
        })
        .then((res) => {
          alert("Res = " + res);
          
        })
        .catch((err) => {
          alert("Err = " + err.messsage)
        });
      const result = await response.text();
      alert(result);
      return result
    }, []); */
    
  const getSalesOrderList = () =>
  {
      ProductServices.getOrderByUserId(
      {
        companyId,
        liffId,
        lineUserId,
        linePOSId,
        page:1,
        rowPerPage:5,
        catalogName:catalogName,
        email:customerEmail
      }).then((res) =>
      {
        alert(res)
        

      })
      .catch((err) => {
        
      });
  }
  

    

  return (

    
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="rounded-md font-serif">
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <h2 className="text-2xl text-center my-10 mx-auto w-11/12">
              {error}
            </h2>
          ) : data.orders.length === 0 ? (
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
              <h3 className="text-lg font-serif font-medium mb-5">
                Recent Order
              </h3>
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
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data?.orders?.map((order) => (
                          <tr key={order.orderId}>
                            <OrderHistory order={order} />
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
      </div>
    </>
  );
};

export default RecentOrder;
