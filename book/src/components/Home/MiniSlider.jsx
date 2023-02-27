import React, { useState } from 'react'
import SwiperComponent from '../SwiperComponent';
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