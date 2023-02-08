import axios from 'axios'
import React, {  useState } from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceFilterList } from '../services/getPriceFilter'
import BookItem from '../components/BookItem/BookItem'
import Pagination from '../components/Pagination'
import { getAllCategory } from '../services/getCategory'
import { getAllBooksDataLimit, getAllBooksDefault } from '../store/slices/bookSlice'
import '../styles/shop.scss'

const orderPrice= [
  {
    id:1,
    sort:'DESC',
    value:'Decrease'
  },
  {
    id:2,
    sort:'ASC',
    value:'Increase'
  }
]
const Shop = () => {
  const [categoryData,setCategoryData] = useState([])
  const [priceFilerData,setPriceFilerData] = useState([])

  // const [isAll,setIsAll] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = +searchParams.get('page')
  const category = searchParams.get('category')
  const priceCode = searchParams.get('priceCode')
  const order = searchParams.get('order')

    // console.log(category)
  const bookDataLimit = useSelector(state => state.books?.allBookLimit?.bookData?.rows)
  const allBook = useSelector(state => state.books?.allBook?.bookData?.rows)
  // console.log(allBookCategory)


  React.useEffect(() => {
    dispatch(getAllBooksDataLimit({page:page || 1,limit:10,category:category,priceCode:priceCode,order:order})) 
   
  }, [page,category,priceCode,order])
  React.useEffect(() => {
    dispatch(getAllBooksDefault({page:page || 1}))
   
  }, [page])
  React.useEffect(() => {
    const fetch = async () => {
      const res =  await getAllCategory()
      setCategoryData(res?.data?.categoryData)
  
    }
    fetch()
  },[])


  React.useEffect(() => {
    const fetch = async () => {
    
      const res2 =  await getPriceFilterList()
      setPriceFilerData(res2.data?.priceFilterList)
    }
  
    fetch()
  },[])
  // console.log(priceFilerData)
  let dataRender
  if(!category && !priceCode&& !order){
    dataRender = allBook
    // console.log(dataRender)
  }
  else{
    dataRender = bookDataLimit

  }

  const handleFilterCategory = (item) => {
    // console.log(typeof item) 
    navigate({
      pathname: "/api/books/",
      search: `?${createSearchParams({
        category: item
      })}`
    });
    // dispatch(getAllBooksData({category:item}))

  }
  const handleFilterPrice = (item) => {
    // console.log(typeof item) 
    navigate({
      pathname: "/api/books/",
      search: `?${createSearchParams({
        priceCode: item ,
        

      })}`
    });
    // dispatch(getAllBooksData({priceCode:item}))

  }
  let paramUrl = searchParams.entries()
    // console.log(key,value)
   
    const appendParams = (paramUrl,item) => {
      let params = []
      searchParams.append('order',item)

      for(let entry of paramUrl){
        params.push(entry)
      }
      // console.log(params)
      let a = {}
      params?.map(i => {
       return  a = {...a , [i[0]]:i[1]}
      })
      // console.log(a)
      return a
    }
  const handleFilterOrder = (item) => {
    // console.log(typeof item) 
    navigate({
      pathname: "/api/books/",
      search: `?${createSearchParams(appendParams(paramUrl,item))}`
    });
    // dispatch(getAllBooksData({priceCode:item}))

  }
  return (
  <>
    <div className='main-body'>
      <div className='filter-sidebar'>
        <h4>Filter by</h4>
        <h6>Price</h6>
        <div  className='filter-container'>
          {
            priceFilerData?.map((item) => {
              return  <div key={item.code} className='filter-item' onClick={() => handleFilterPrice(item.code)}>{item.value}</div>
            })
          }
         
          

        </div>
        <br/>
        <h6>Price</h6>
        <div  className='filter-container'>
          {
            orderPrice?.map((item) => {
              return  <div key={item.id} className='filter-item' onClick={() => handleFilterOrder(item.sort)}>{item.value}</div>
            })
          }
         
          

        </div>
        <br/>

        <h6>Categories</h6>
        <div className='filter-container'>
          <div onClick={() => navigate('/api/books/all')}  className='category-filter-item'>All</div>
         {
          categoryData?.map((item,i) => {
            return <div key={item.code} className='filter-item' onClick={() => handleFilterCategory(item.code)}>{item.value}</div>
          })
         }

        </div>
      </div>
      <div>
         <div className='container-grid'>
           {dataRender?.map((item) => {
                return <BookItem data={item} key={item.id}/>
            })
            
            
            }
         </div>
         <div className='paginate'>
            <Pagination itemPerPage={dataRender?.length}/>
         </div>
      </div>
    </div>
  </>
  )
}

export default memo(Shop)