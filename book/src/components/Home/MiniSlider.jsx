import React, { useState } from 'react'
import SwiperComponent from '../SwiperComponent';
import { getAllBooks } from '../../services/books';
const MiniSlider = ({page}) => {
  const [nextReadData, setNextReadData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true)
    const fetch = async () => {
      const res = await getAllBooks({ page: page });
      setNextReadData(res?.data?.bookData.rows);
     setIsLoading(false)

    };
    fetch();
  }, []);
  return (
    <div>
        <SwiperComponent data={nextReadData} isLoading={isLoading}/>
    </div>
  )
}

export default MiniSlider