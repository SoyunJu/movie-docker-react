import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Notice.module.css";

function Notice() {

    // const [notice, setNotice] = useState([]);
    // const [selectedNotice, setSelectedNotice] = useState(null);
    const [datas, setDatas] = useState([]);


    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/listAnnouncement`)
            .then(response => {
                console.log(response.data)
                setDatas(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className={style.contentContainer}>
                <h2>notice list</h2>
                <table className={style.announcementList}>
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="3">일치하는 데이터가 없습니다.</td>
                                </tr>
                            )
                        }
                        {
                            datas && datas.sort((a, b) => (b.announcementIdx - a.announcementIdx)).map(n => (
                                <tr key={n.id}>
                                    <td className={style.idx}>{n.announcementIdx}</td>


                                    <td className={style.title} >
                                        <Link to={`/annoucemount/${n.announcementIdx}`} style={{ color: "black" }}>{n.title}</Link></td>
                                    <td className={style.date} style={{ color: "black" }}>{n.announcementDate}</td>

                                </tr>

                            ))
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default Notice;