import React, { useState } from 'react';
import StarRating from './StarRating';


function CommentsWrite({ movieIdx }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}, Comment: ${comment}`);
  };

  //별점 추가




  return (
    <form onSubmit={handleSubmit}>


      <div>
        <label htmlFor="name">이름: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeName}
          style={{ width: '100px', height: '20px', padding: '12px' }}
        />
      </div>

      <br /> 

      {/* 별점 추가 */}
      <div>
        <StarRating totalStars={5} />
      </div>

      <br />

      <div>
        <label htmlFor="comment">한줄평: </label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={handleChangeComment}
          style={{ width: '300px', height: '100px', padding: '12px' }}
        />
      </div>

      <br />
      <br />

      <button type="submit">작성 완료</button>
    </form>
  );
}

export default CommentsWrite;