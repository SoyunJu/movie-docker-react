import axios from "axios";
import { useEffect, useState } from "react";
import style from './ReviewDetail.module.css';
import jwtDecode from 'jwt-decode';
function ReviewRetouch({match, history}) {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [writer, setWriter] = useState('');
    const [reviewDate, setReviewDate] = useState('');
    const [count, setCount] = useState('');
    const [movieTitle, setMovieTitle] = useState('');

    const { reviewIdx } = match.params;


    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/movie/review/detail/${reviewIdx}`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                setTitle(response.data.selectReviewList.title);
                setContents(response.data.selectReviewList.contents);
                setWriter(response.data.selectReviewList.writer);
                setReviewDate(response.data.selectReviewList.reviewDate);
                setCount(response.data.selectReviewList.count);
                setMovieTitle(response.data.movieTitle.title);
                console.log(response.data.userDto.userId)
                console.log(response.data.selectReviewList.writerId);
                console.log( response.data.userDto.userId != "test" );
                console.log(response.data.userDto.userId !=  response.data.selectReviewList.writerId)
               
                if(response.data.userDto.userId !=  response.data.selectReviewList.writerId && response.data.userDto.userId != "test"){
                  alert('잘못된 접근 입니다.');
                  history.push('/reviewlist')
                  return;
                }
                // const token = sessionStorage.getItem('token')
                // const decode = jwtDecode(token);
              
                // if (decode.sub != response.data.movieTitle.writerId || decode.sub != "test") {
                //   alert('잘못된 접근 입니다.');
                //   history.push('/')
                // }
            })
            .catch(error => console.log(error));
    }, []);

  
    const handlerClickUpdate = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/movie/review/update/${reviewIdx}`,  // 요청 URL
                    { "title": title, "contents": contents },
                    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })           // 요청 본문을 통해서 서버로 전달할 값
            .then(response => {                                         // 200번대 응답코드가 반환되는 경우
                console.log(response);
                alert("정상처리 되었습니다.")
                history.push('/reviewlist')
            })
            .catch(error => {                                           // 200번대를 제외한 응답코드가 반환되는 경우
                console.log(error);
                alert(`수정에 실패했습니다. (${error.message})`);
                return;
            });
    };
    const handlerChange= (e)=>{
        setTitle(e.target.value)
    }
    const handlercontents= (e)=>{
        setContents(e.target.value)
    }
    return (
        <>
            <div className={style.container}>
                {/* <h2>리뷰 상세</h2> */}

                    <table className={style.reviewDetail}>
                        <colgroup>
                            <col width="15%" />
                            <col width="" />
                            <col width="15%" />
                            <col width="" />
                            <col width="15%" />
                            <col width="" />
                        </colgroup>
                        <tbody>
                            <tr >
                                <th colSpan="6">제목</th>
                            </tr>
                            <tr>
                                <td colSpan="6">
                                <input type="text" value={title} onChange={handlerChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="6">관람한 영화</th>                   
                            </tr> 
                            <tr>
                                <td colSpan="6">
                                    {movieTitle}
                                </td>
                            </tr>
                            <tr>
                                <th className={style.borderRight} >조회수</th>
                                <td>{count}</td>
                                <th className={style.borderRight} >작성일</th>
                                <td>{reviewDate}</td>
                                <th className={style.borderRight} >작성자</th>
                                <td>{writer}</td>
                            </tr>

                            <tr>
                                <td className={style.contentText} colSpan="6">
                                   <textarea style={{width:"1000px",height:"500px"}} onChange={handlercontents} value={contents}></textarea> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <div className={style.btnBox}>
                    <input type="button" id="edit" className={style.btn} value="확인" onClick={handlerClickUpdate} />
                </div>


            </div>
        </>
    )
}

export default ReviewRetouch;