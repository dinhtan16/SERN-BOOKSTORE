import React, { memo, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUserOrder } from '../store/slices/orderSlice'
import {Input, Table} from 'antd'
import '../styles/followOrder.scss'
const YourOrder = () => {
  const dispatch = useDispatch()
  const orderInfo  = useSelector(state => state.order?.userOrders)
  let totalEstimate =  orderInfo?.map(item => item.totalPrice).reduce((total,item) => {return total + item},0) 
  useEffect(() => {
      const fetchOrder = async () => {
         try{
            await dispatch(getUserOrder())
         }catch(err){
          console.log(err)
         }
      }
      fetchOrder()
  },[])
  const columns = [
    {
      title: 'ID Order',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => <a style={{fontWeight:'bold'}}>{text}$</a>,

    },
    {
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Delivery Address',
      dataIndex: 'userIdData',
      key: 'userIdData',
      render: (text) => <a>{text.address}</a>,

    },
    {
      title: 'Buy at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <a>{text.split('T')[0]+ '-' +  text.split('T')[1].split('.')[0]}</a>,

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render:(text) => <a style={{border:'2px solid #c4ff8a',padding:'5px',fontSize:'12px',fontWeight:'bold',color:'#3d6317'}}>Accepted</a>
    },
  ];
  return (
    <div className='order-follow'>
    {
      <>
        <section className='cost-estimate'>
          <div className='cost-estimate-item'>
            <p>Total Estimate</p>
            <p>{+totalEstimate?.toFixed(2) || 0}$</p>
          </div>
          <div className='cost-estimate-item'>
            <p>Orders</p>
            <p>{orderInfo?.length}</p>
          </div>
          <div className='cost-estimate-item'>
            <p>Delivery</p>
            <span>{orderInfo?.length} COD</span> -  0 <span>Banking</span>
          </div>
        </section>
      {orderInfo?.length > 0 ?  <section className='my-order'>
        <p>Your Order</p>
        <div className='order-table'>
          <div className='order-search'>
            <Input />
          </div>
          <div className='table'>
          <Table dataSource={orderInfo} columns={columns} pagination={false}/>
          </div>
        </div>
        </section> : <div style={{marginTop:20,fontWeight:'bold'}}>
          You have no order.
        </div>}
      </>
      }
    </div>
    
  )
}

export default memo(YourOrder)