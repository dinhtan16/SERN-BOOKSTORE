
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from 'antd';
import {  useSelector } from 'react-redux'
import { memo } from "react";
// import { useEffect } from "react";

const PaginationComponent = () => {
  const [searchParams] = useSearchParams()
  const page =+searchParams.get('page')
  const totalBookLimit = useSelector(state => state.books.allBookLimit?.bookData?.count)
  const totalAllBook= useSelector(state => state.books.allBook?.bookData?.count)

  let dataRender
  if(!searchParams.get('category') && !searchParams.get('priceCode')){
    dataRender = totalAllBook
  }else{
    dataRender = totalBookLimit
  }
  
  const navigate = useNavigate();
  // const dispatch = useDispatch();  
  
 
  
    let paramUrl = searchParams.entries()
    // console.log(key,value)
   
    const appendParams = (paramUrl,number) => {
      let params = []
      searchParams.append('page',number)

      for(let entry of paramUrl){
        params.push(entry)
      }
      // console.log(params)
      let a = {}
      params?.map(i => (a = {...a , [i[0]]:i[1]}))
      // console.log(a)
      return a
    }

    const handleChange = (e) => {
      // appendParams(paramUrl,e)
      // dispatch(getAllBooksData({page:e}))
      navigate({
        pathname: "/api/books/",
        search: `?${createSearchParams(
          appendParams(paramUrl,e)
        )}`
      });
    }
    // const page = +localStorage.getItem('page')
  
    
   
    return  (
    <div className='pagination-flex'>
    <Pagination
    responsive={true}
      showSizeChanger={false}
      defaultCurrent={1}
      current={+page ||  1}
    // pageSizeOptions={[10,20,30,50]}
      total={dataRender}
      onChange={handleChange}
      className='ant-pagination-item-active'
    />
    {/* <br /> */}
    {/* <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      disabled
    /> */}
  </div>)
}
export default memo(PaginationComponent);
// import React from 'react'
// import { useSelector } from 'react-redux'
// import PageNumber from './PageNumber/PageNumber'
// import '../styles/pagination.scss'
// const Pagination = ({number,itemPerPage}) => {
//   const totalBook = useSelector(state => state.books.allBookData.bookData?.count)
//     const handlePageNumber = () => {
//         let max = Math.floor(totalBook/itemPerPage)
//         let arrNumb = []
        
//         for(let i = 0 ; i< max ; i++) {
//             arrNumb.push(i)
//         }
//         return arrNumb
//     }
//   return (
//     <div className='pagination-flex'>
//     {
//         handlePageNumber().length > 0 && handlePageNumber().map(item => {
//             return <PageNumber key={item} number={item}/>
//         })
//     }
//     </div>
//   )
// }

// export default Pagination