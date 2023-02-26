import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SwiperComponent from '../SwiperComponent';
import {getAllBooksDefault} from '../../store/slices/bookSlice'
import { getAllBooks } from '../../services/books';
const MiniSlider = ({page}) => {
  const [nextReadData, setNextReadData] = useState([]);
  React.useEffect(() => {
    const fetch = async () => {
      const res = await getAllBooks({ page: page });
      setNextReadData(res?.data?.bookData.rows);
    };
    fetch();
  }, []);
  return (
    <div>
        <SwiperComponent data={nextReadData}/>
    </div>
  )
}

export default MiniSlider