
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./NoticeDetail.module.css";

function NoticeDetail({ match}) {
    const { announcementIdx } = match.params;
    const [notice, setNotice] = useState({});
    const history = useHistory();

    const handlerHistory = () => {
        history.goBack();
    }


    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/Announcement/${announcementIdx}`)
            .then(response => {
                console.log(response);
                setNotice(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [announcementIdx])

  

    return (
        <>
            <div className={style.contentContainer}>
                <h2>{notice.title}</h2>
                <em>Date : {notice.announcementDate}</em>
                <p>{notice.contents}</p>
            </div>
            <Link className={style.btn} to={`/annoucemount`}>목록</Link>
        </>
    );
}

export default NoticeDetail;