import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import './CommentStar.css';

const CommentStar = ({rating,setRating}) => {
  const [position, setPosition] = useState(3);


  const handlerClick = i => {
    if (i == rating) { 
      i = 0;
    }
    setRating(i);
    setPosition(i);
  }

  return (
    <>
    
      <div>
        {
          [...Array(5)].map((star, i) => {
            return <FaStar
                className="star"
                size={50}
                color={i < position ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={e => setPosition(i+1)}
                onMouseLeave={e => setPosition(rating)}
                onClick={e => handlerClick(i+1)}
                />
          })
        }
      </div>

      {/* <div>rating: {rating}</div>
      <div>position: {position}</div> */}

    </>
  );
};

export default CommentStar;