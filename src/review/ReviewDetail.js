import axios from "axios";
import { useEffect, useState } from "react";
import style from './ReviewDetail.module.css';
import { Link } from "react-router-dom";
function ReviewDetail({match, history}) {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [writer, setWriter] = useState('');
    const [reviewDate, setReviewDate] = useState('');
    const [count, setCount] = useState('');
    const [movieTitle, setMovieTitle] = useState('');

    const { reviewIdx } = match.params;


    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            alert("로그인 후 이용해 주세요")
            history.push("/login");
            return;
          }
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/movie/review/detail/${reviewIdx}`,  { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                setTitle(response.data.selectReviewList.title);
                setContents(response.data.selectReviewList.contents);
                setWriter(response.data.selectReviewList.writer);
                setReviewDate(response.data.selectReviewList.reviewDate);
                setCount(response.data.selectReviewList.count);
                setMovieTitle(response.data.movieTitle.title);
            })
            .catch(error => console.log(error));
    }, []);


    const handlerClickList = () => history.push('/reviewlist');
    const handlerClickDelete = () => {
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/movie/review/delete/${reviewIdx}`  ,{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {                                         
                console.log(response);
              
                    alert('정상적으로 삭제되었습니다.');
                    history.push('/reviewlist');				// 정상적으로 삭제되면 목록으로 이동
            
            })
            .catch(error => {                                           
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    };



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
                                    {title}
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
                                    {contents}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <div className={style.btnBox}>
                  <Link to={`/reviewretouch/${reviewIdx}`} id="edit" className={style.btnLink} >수정</Link>
                    <input type="button" id="delete" className={style.btn} value="삭제" onClick={handlerClickDelete} />
                    <input type="button" id="list" className={style.btn} value="목록" onClick={handlerClickList} />
                </div>


            </div>
        </>
    )
}

export default ReviewDetail;