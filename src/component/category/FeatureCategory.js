import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoChevronForwardSharp } from 'react-icons/io5';

//internal import
import useAsync from '@hooks/useAsync';
import CategoryServices from '@services/CategoryServices';

const FeatureCategory = ({categories,FilterCategory, FilterProduct}) => {
  const router = useRouter();
  const { data, error } = useAsync(() => CategoryServices.getShowingCategory());

  return (
    <>
      {error ? (
        <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
          <span> {error}</span>
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          <li className="group" key={0}>
              <div
                  
                className="flex w-full h-full border border-gray-100 shadow-sm bg-white p-4 transition duration-200 ease-linear transform group-hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div className="pl-4">
                    <h3 onClick={() =>
                  
                  FilterCategory(0)
                } className="text-sm text-gray-600 cursor-pointer font-serif font-medium leading-tight line-clamp-1 group-hover:text-cyan-500">
                      สินค้าทั้งหมด
                    </h3>
                    
                  </div>
                </div>
              </div>
            </li>
          {categories?.map((category, i) => (
            <li className="group" key={i + 1}>
              <div
                  
                className="flex w-full h-full border border-gray-100 shadow-sm bg-white p-4 transition duration-200 ease-linear transform group-hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div>
                    <Image
                      src={category.icon}
                      alt={category.parent}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="pl-4">
                    <h3 onClick={() =>
                  /* router.push(
                    `/search?Category=${category.parent
                      .toLowerCase()
                      .replace('&', '')
                      .split(' ')
                      .join('-')}`
                  ) */
                  FilterCategory(category._id)
                } className="text-sm text-gray-600 cursor-pointer font-serif font-medium leading-tight line-clamp-1 group-hover:text-cyan-500">
                      {category.parent}
                    </h3>
                    <ul className="pt-1 mt-1">
                      
                      {category.children.slice(0, 3).map((children) => (
                        <li key={children._id} className="pt-1">
                          <h3
                            /* href={`/search?category=${children.title
                              .toLowerCase()
                              .replace('&', '')
                              .split(' ')
                              .join('-')}`} */
                              
                              onClick={() => FilterProduct(category._id,children._id)}
                          >
                            <a className="flex items-center font-serif text-xs text-gray-400 hover:text-cyan-600 cursor-pointer">
                              <span className="text-xs text-gray-400 hover:text-cyan-600">
                                <IoChevronForwardSharp />
                              </span>
                              {children.title}
                            </a>
                          </h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FeatureCategory;
