import './ticketing_3.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TbSquare1 } from 'react-icons/tb';
import { TbSquare2 } from 'react-icons/tb';
import { TbSquare3 } from 'react-icons/tb';
import { TbSquare4 } from 'react-icons/tb';
import { TbSquare5 } from 'react-icons/tb';
import Seating2 from './Seating2';

import './seating2.css';
// 예매 페이지
function Ticketing({history}) {
    //canreservationdate => 선택된 좌석
    //현재 날짜와 비교해서예전거는 출력 안되게는 나중에
    const [data, setData] = useState([]);
    const [date, setDate] = useState([]);
    const [reservedSeat, setReservedSeat] = useState([]);
    const [movieIdx, setMovieIdx] = useState('');
    const [selectDate, setSelectDate] = useState('');
    const [selectSeat, setSelectSeat] = useState([]);
    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
      alert("로그인 후 이용해 주세요")
      history.push("/login");
      return;
    }
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/movie`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => console.log(error));
            // if(sessionStorage.getitem('token') == null){
            //     history.push('/loign');
            // }
    }, []);
    const handlerMovie = (e) => {
        e.preventDefault();
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/reservationdate/${e.target.value}`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response.data)
                setDate(response.data);
                setMovieIdx(e.target.value);
                setSelectDate('');
            })
            .catch(error => console.log(error));
    };
    const handlerDate = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/reservedseat/${e.target.value}`, 
         { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                setReservedSeat(response.data);
                setSelectDate(e.target.value);
                console.log(response.data);
                // setcolor();
           
            })
            .catch(error => console.log(error));

    };

    // const [style, setStyle] = useState({
    //     A1: { fontSize: "60px" },
    //     A2: { fontSize: "60px" },
    //     A3: { fontSize: "60px" },
    //     A4: { fontSize: "60px" },
    //     A5: { fontSize: "60px" },
    //     B1: { fontSize: "60px" },
    //     B2: { fontSize: "60px" },
    //     B3: { fontSize: "60px" },
    //     B4: { fontSize: "60px" },
    //     B5: { fontSize: "60px" }
    // });

    return (
        <>
            <div className="ticketing">
                <h2>빠른예매</h2>
                <div className="ticketingBox" >
                    <div style={{ float: "left", height: '500px', width: '40%', borderRight: '1px solid lightgray', overflow: 'auto' }}>
                        <div className="ticketmovie">영화</div>
                        {
                            data.map((n) => (
                                <button   onClick={handlerMovie} value={n.movieIdx} className="output">{n.title}</button>
                            ))
                        }
                    </div>
                    <div style={{ float: "left", height: '500px', width: '59.9%' }}>
                        <div className="ticketmovie">날짜 및 시간</div>
                        {
                            date.map((n) => (
                                <button onClick={handlerDate} value={n.canReservationDate} className="output">{n.canReservationDate}</button>
                            ))
                        }
                    </div>
                </div>
                               
            {
                selectDate != '' && movieIdx != '' &&<Seating2 history={history}
                 setSelectSeat={setSelectSeat} movieIdx={movieIdx} selectDate={selectDate} reservedSeat={reservedSeat} selectSeat={selectSeat}
                 />
             
            }
            
            </div>
         
          
        </>
    );
}
export default Ticketing;