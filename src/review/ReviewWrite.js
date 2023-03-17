import React, { useEffect, useState } from 'react';
import './ReviewWrite.css';
import axios from 'axios';

function ReviewWrite({history,match}) {
  const [name, setName] = useState('');
  const [contents, setContents] = useState('');
  const [movieIdx, setMovieIdx] = useState([]);
  const[data,setData] = useState([]);




  useEffect(() => {
  if (!sessionStorage.getItem('token')) {
      alert("로그인 후 이용해 주세요")
      history.push("/login");
      return;
    }
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/movie`,)
        .then(response => {
            setData(response.data);
        })
        .catch(error => console.log(error));
     
}, []);

  const handlerMovie = (e) => {
    setMovieIdx(e.target.value)
  }
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeComment = (e) => {
    setContents(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/movie/review/write/`,    
       {"title":name,"contents":contents,"movieIdx":movieIdx}, 
       { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
    )
      .then(response =>{
        console.log(response)
          alert("정상처리 되었습니다");
          history.push('/reviewlist')
      })
      .catch(error=> {console.log(error) ;
          alert(error.message);})

  };

  return (
    <div className="container">
    <div style={{marginTop:'100px', marginBottom:'100px'}}>
        <div className='inputName 'style={{margin:'1.5% auto'}} >
          <input
            placeholder='제목'
            type="text"
            id="name"
            name="name"
            value={name}
            style={{outlineStyle:"none"}}
            onChange={handleChangeName}
          />
        </div>
        <div className='movieSelect'style={{margin:'1.5% auto'}}>
        <select onChange={handlerMovie}   style={{outlineStyle:"none"}} >
          <option value="" disabled selected>영화 선택</option>
          {
            data.map(a => (
              <option value={a.movieIdx} >{a.title}</option>
            ))
          }
        </select>
        </div>
        <div className='inputComment'style={{margin:'1.5% auto'}}>
          {/* <label htmlFor="comment"></label> */}
          <textarea
            placeholder="스포일러 혹은 부적절한 리뷰 작성시 동의없이&#13;&#10; 삭제 될 수 있습니다."
            id="comment"
            name="comment"
            // rows="8" cols="65"
            value={contents}
            onChange={handleChangeComment}
          />
        </div>
        <div style={{margin:'1.5% 775px'}} className='submitBtn' >
          <button   onClick={handleSubmit} className="button" type="submit">확인</button>
        </div>
        </div>
    </div>
  );
}

export default ReviewWrite;