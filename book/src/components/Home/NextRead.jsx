import React from "react";
import { useState } from "react";
import { getAllBooks } from "../../services/books";
import "../../styles/home/nextRead.scss";
import  BookItem from '../BookItem/BookItem'
import big2 from '../../assets/imgs/hero/big2.jpg'
const NextRead = () => {
  const [nextReadData, setNextReadData] = useState([]);
  React.useEffect(() => {
    const fetch = async () => {
      const res = await getAllBooks({ page: 9 });
      setNextReadData(res?.data?.bookData.rows);
    };
    fetch();
  }, []);
  return (
<>  
      <div style={{maxWidth:'1400px',display:'flex',margin:'auto',fontSize:'1.4em',marginBottom:20,fontWeight:'bold'}}>Your Next Read Is Here</div>
        <section className="next-read">
          <div className="next-read-books">
            <div className="next-read-books-left">
                {nextReadData.slice(0,1).map(item => <BookItem data={item}/>)}
            </div>
            <div className="next-read-books-right">
            <div className="next-read-books-right-lists">{nextReadData.slice(1,9).map(item => <BookItem data={item} right/>)}</div>
            </div>
          </div>
        </section>
        <section className="big-2">
            <img src={big2} alt="big-banner-2" />
        </section>
</>
  );
};

export default NextRead;
