import { MdOutlineStar } from "react-icons/md";
import { Link } from 'react-router-dom';
import './main.css';
import CommentStar from './CommentStar';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';


const MovieDetail = ({ match }) => {

    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [opening, setOpening] = useState('');
    const [poster, setPoster] = useState('');
    const [starAvg, setStarAvg] = useState('');

    const [data, setData] = useState([]);
    const [nickName, setNickName] = useState('');
    const { movieIdx } = match.params;
    const [rating, setRating] = useState(3);

    // console.log(">>>>>>>>>>>>>>");
    // console.log(movieIdx);

    const handlerChangeNickName = e => setNickName(e.target.value);
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/moviedetail/${movieIdx}`)
            .then(response => {
                console.log(response.data.movieInfo.poster);
                setTitle(response.data.movieInfo.title);
                setOpening(response.data.movieInfo.opening);
                setStory(response.data.movieInfo.story);
                setStarAvg(response.data.movieInfo.starAvg);
                setPoster(response.data.movieInfo.poster);
                setData(response.data.selectCommentsList);
            })
            .catch(error => console.log(error));
    }, []);


    const [contents, setContents] = useState('');
    const [star, setStar] = useState('');

    const handlerChangeContents = e => setContents(e.target.value);
    const handlerChangeStar = e => setStar(e.target.value);

    const handlerSubmit = e => {
        e.preventDefault();

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/movie/comments/write/${movieIdx}`, { "writer":nickName, contents, star: parseInt(rating) })
            .then(response => {
                console.log(response);
                    alert('코맨트가 정상적으로 등록되었습니다')
                 
            })
            .catch(error => {
                console.log(error);
                alert(`오류가 발생했습니다 (${error.message})`);
            });
    };

    // console.log(">>>>>>>>>>>>>>>");
    // console.log({ movieIdx });

    return (
        <>
            {/* Movedetail */}
            <div className="movedetail">
                <div className="container">
                    <div className="movie-name">
                        <h3>{title}</h3>
                     
                        <span>리뷰 수 : </span>
                        <strong>{data.length}</strong>
                    </div>


                    <div className="movie-info cf">

                        {/* 영화 포스터 부분 (todo) */}
                        <div className="movie-left">
                        <img style={{width:"280px",height:"400px"}} src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/img/`+poster}/>
                        </div>

                        <div className="movie-right">
                            <span>개봉 {opening}  </span>
                            <strong style={{color:"black"}}>관람객 평점</strong>
                            <span><MdOutlineStar style={{ color: "pink" }} />{starAvg}</span>
                            <p>
                                {story}
                            </p>
                        </div>
                    </div>
                    <div className="detail-button">
                        <Link to="/ticketing" className="reservation-btn btn">예매</Link>
                        <Link to="/reviewlist" className="review-btn btn">리뷰</Link>
                    </div>
                </div>
            </div>
            {/* One line comment */}
            <div className="one-line-comment">
                <div className="container">
                    <div className="a">
                    <h3>관람 한줄평</h3>
                    </div>
                    <div className="review-write cf">
                        <h3>평점, 관람평 작성</h3>

                        {/* 별점 */}
                        <CommentStar setRating={setRating} rating={rating} />

                        <form onSubmit={handlerSubmit}>
                        <input className="txt-nickName" type="text" title="닉네임 작성" placeholder="닉네임을 입력해주세요" value={nickName} onChange={handlerChangeNickName} />
                            <textarea className="txt-comment" placeholder="평점 및 영화 관람평을 작성해주세요. 주제와 무관한 리뷰 또는 스포일러는 표시제한 또는 삭제될 수 있습니다.                            작성하신 평점 및 관람평은 롯데시네마 App, 홈페이지, SNS 등에 인용될 수 있습니다." title="관람평 작성"
                                value={contents} onChange={handlerChangeContents}></textarea>
                            <button type="submit" className="btn-submit">관람평 작성</button>
                        </form>
                    </div>
                    <div className="one-line-list">
                        <ul className="line-list">
                            {/* 코맨트 리스트 데이터 출력 */}
                            {
                                data.map((n) => (
                                    <li key={n.commentsIdx}>
                                        <div className="top_info">
                                            <span className="whatname">작성자 {n.writer}</span>
                                        </div>
                                        {/* <div className="commentsStar">
                                            {n.star}점
                                        </div> */}
                                        <div className="commentsStar">
                                            {[...Array(parseInt(n.star))].map((e, i) => (
                                                <span key={i}><FaStar color="#ffc107"/></span>
                                            ))}
                                        </div>
                                        <div className="review_info">{n.contents}</div>

                                    </li>

                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetail;