import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";    // 추가
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "./mainpage.css"
import { Link } from "react-router-dom";

SwiperCore.use([Autoplay])    // 추가

function InfoNotice({ annoucement }) {
    return (
        <div className="info-notice">
            <h2>공지사항</h2>
            <div className="border" >
                <div className="wrap">

                    <Swiper 
                        className="banner"
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{ delay: 3000 }}
                        >

                        <div className="swiper-wrapper" >
                            {
                                annoucement && annoucement.map(a => (
                                    <SwiperSlide>
                                        <p className="tit" style={{ padding: 21 }}>지점</p>
                                        <p className="link" style={{ padding: 21 }}>
                                            <Link  to={`/annoucemount/${a.announcementIdx}`} title="공지사항 상세보기">
                                                <strong>
                                                    [종로]
                                                </strong>
                                                {a.title}</Link>
                                        </p>
                                        <div><p className="date" style={{ padding: 21, marginRight: '35px' }}>{a.announcementDate}</p></div>
                                        <div> <p className="more" style={{ padding: 21 }}>
                                            <Link to="/annoucemount" style={{ color: 'black' }} title="전체공지 더보기">더보기<i className="bi bi-chevron-right"></i></Link>
                                        </p></div>
                                    </SwiperSlide>
                                ))
                            }
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
} export default InfoNotice