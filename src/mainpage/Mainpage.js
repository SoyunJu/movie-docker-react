import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InfoNotice from "./InfoNotice";
import "./mainpage.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";	// 추가
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Autoplay, Navigation, Pagination])	// 추가
function Mainpage() {
    const [annoucement, setAnnoucement] = useState([]);
    const [movie, setMovie] = useState([]);



    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mainpage`,)
            .then(response => {
                setAnnoucement(response.data.announcementList);
                setMovie(response.data.listMovie)
            })
            .catch(error => console.log(error));
        // 여기 안에는 별점순으로 디폴트 값을 잡고 하는걸로
    }, []);

    const [sortType, setSortType] = useState('star');

    const handlerStar = () => {
        setSortType('star');
    }

    const handlerDate = () => {
        setSortType('opening');
   
    }
    
    const orderedDate = movie.sort((a, b) =>{;return(new Date(a.opening) - new Date(b.opening))})
    return (
        <>
            <div className="main-banner">
                <div className="container">
                    <ul className="list4">
                        <li><button onClick={handlerDate}>개봉</button></li>
                        <li><button onClick={handlerStar}>별점</button></li>
                    </ul>
                    <ul className="movie-list cf">
                        <Swiper
                            className="banner"
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation={
                           {color:'black'}
                            }
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 10000 }}	
                        >
                            {
                                sortType === 'star' &&
                                movie.sort((a, b) => (b.starAvg - a.starAvg)).map((n, index) => (
                                    index < 5 &&
                                    <SwiperSlide>
                                    <li className="listli" key={index}>
                                        <Link to={`/moviedetail/${n.movieIdx}`}><img className="img1" src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/img/`+n.poster}/>
                                            <strong style={{ color: "snow" }}>{n.title}</strong><span style={{ color: "snow" }} >별점: {n.starAvg} / 개봉일: {n.opening}</span>
                                        </Link></li>
                                    </SwiperSlide>
                                ))
                            }
                            {
                                sortType === 'opening' &&
                                // movie.sort((a, b) => (b.opening - a.opening))
                                orderedDate.map((n, index) => (
                                    index < 5 &&
                                    <SwiperSlide>
                                    <li className="listli" key={index}>
                                        <Link to={`/moviedetail/${n.movieIdx}`}><img className="img1" src={`${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}`+n.poster} />
                                            <strong style={{ color: "snow" }}>{n.title}</strong><span style={{ color: "snow" }} >별점: {n.starAvg} / 개봉일: {n.opening}</span>
                                        </Link></li>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>

                    </ul>
                </div>
                {/* <div className="arrow">
                    <button><i style={{ color: "black" }} className="bi bi-chevron-right">&gt;</i></button>
                    <button><i style={{ color: "black" }} className="bi bi-chevron-left">&lt;</i></button>
                </div> */}
            </div>
            {/* <!-- NowPlaying --> */}
            <div className="now-playing">
                <div className="container">
                    <h2>현재 상영작</h2>
                    <ul className="now-list cf"> {
                        movie.map((a, index) => (
                            <li key={index}><Link to={`/moviedetail/${a.movieIdx}`}>
                                <img className="img2"src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/img/`+a.poster} /><strong style={{ color: "black" }}>{a.title}</strong></Link></li>
                        ))
                    }

                    </ul>
                </div>
            </div>
            {/* <!-- Notice --> */}
            <InfoNotice annoucement={annoucement} />

        </>
    );

} export default Mainpage;