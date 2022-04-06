import React from 'react';

const OrderTable = ({ data, currencySign}) => {
  return (
    <tbody className="bg-white divide-y divide-gray-100 text-serif text-sm">
      {data?.orderDetails?.map((item, i) => (
        <tr key={i}>
          <th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
            {i + 1}{' '}
          </th>
          <td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
            {item.productVariantName}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item.quantity}{' '}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
            {currencySign}{item.productVariantPrice}.00{' '}
          </td>

          <td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">
            {/* ${item.itemTotal}.00 */}
            {currencySign}{parseInt(item.quantity) * parseFloat(item.productVariantPrice)}.00
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderTable;
