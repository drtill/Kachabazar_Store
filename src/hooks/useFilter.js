import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const useFilter = (data) => {
  
  const [allOrderCount, setAllOrderCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [processingOrderCount, setProcessingOrderCount] = useState(0);
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(0);

  /*const [pending, setPending] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [delivered, setDelivered] = useState([]);*/
  const [sortedField, setSortedField] = useState('');
  const router = useRouter();

  const productData = useMemo(() => {
    let services = data;//data.orders;
    //filter user order
    if (router.pathname === '/user/dashboard') {
      //alert(JSON.stringify(services));
      /*if(services !== undefined)
      {
        const orderPending = services.filter(
          (statusP) => statusP.orderStatus === 'Draft'
        );
        setPending(orderPending);
  
        const orderProcessing = services.filter(
          (statusO) => statusO.orderStatus === 'Active'
        );
        setProcessing(orderProcessing);
  
        const orderDelivered = services.filter(
          (statusD) => (statusD.orderStatus === 'Finalized' || statusD.orderStatus === 'Fulfilled')
        );
        setDelivered(orderDelivered);
      }*/
      setAllOrderCount(data.allOrderCount);
      setPendingOrderCount(data.pendingOrderCount);
      setProcessingOrderCount(data.processingOrderCount);
      setDeliveredOrderCount(data.completeOrderCount);
      
    }

    //service sorting with low and high price
    /*if (sortedField === 'Low') {
      services = services.sort((a, b) => a.price < b.price && -1);
    }
    if (sortedField === 'High') {
      services = services.sort((a, b) => a.price > b.price && -1);
    }*/

    return services;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedField, data]);

  return {
    allOrderCount,
    productData,
    pendingOrderCount,
    processingOrderCount,
    deliveredOrderCount,
    setSortedField,
  };
};

export default useFilter;
