import React from 'react';

const ShippingTracking = ({ data }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-100 text-serif text-sm">
      {data?.dataTrackings?.map((item, i) => (
        <tr key={i}>
          
          <td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
            {item.StatusDate}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item.StatusDescription}{' '}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
            {item.Location}{' '}
          </td>

          
        </tr>
      ))}
    </tbody>
  );
};

export default ShippingTracking;
