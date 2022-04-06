import React from 'react';
import dayjs from 'dayjs';

const OrderHistory = ({ order }) => {
  return (
    <>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="uppercase text-sm font-medium">
          {order.orderNumber.substring(13, 21)}
        </span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {dayjs(order.orderDate).format('MMMM D, YYYY')}
        </span>
      </td>

      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">{order.paymentMethod}</span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
        {order.orderStatus === 'Fulfilled' && (
          <span className="text-emerald-500">{order.orderStatus}</span>
        )}
        {order.orderStatus === 'Finalized' && (
          <span className="text-emerald-500">{order.orderStatus}</span>
        )}
        {order.orderStatus === 'Draft' && (
          <span className="text-orange-500">{order.orderStatus}</span>
        )}
        {order.orderStatus === 'Canceled' && (
          <span className="text-red-500">{order.orderStatus}</span>
        )}
        {order.orderStatus === 'Active' && (
          <span className="text-indigo-500">{order.orderStatus}</span>
        )}
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          {order.currencySign}{Math.round(order?.total)}.00
        </span>
      </td>
    </>
  );
};

export default OrderHistory;
