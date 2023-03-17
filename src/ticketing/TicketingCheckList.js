import './ticketing_2.css';
import { useEffect,useState } from 'react';
import axios from 'axios';

function TicketingCheckList({history}) {

    const [data,setData] = useState([]);
    const [reservationIdx,setReservationIdx] = useState('');
    const [movieDto, setMovieDto] = useState({});
    const [reservationDto, setReservationDto] = useState({});
    const [seat,setSeat] = useState([]);
    useEffect(() => {
      if (!sessionStorage.getItem('token')) {
      alert("로그인 후 이용해 주세요")
      history.push("/login");
      return;
    }
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/checkreservationlist/`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => console.log(error));
     
    }, []);

    const selectReservationIdx= (e) =>{
        e.preventDefault();
        setReservationIdx(e.target.value);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/checkreservation/${e.target.value}`,    
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response =>{
            setMovieDto(response.data.movieDto);
            setReservationDto(response.data.reservationDto);
            setSeat(response.data.seat);
            console.log(seat);
        })
        .catch(error=> console.log(error))
    }
    const abcd =()=>{
        history.push('/')
    }
    return (
        <>
            <div className="confirmation" style={{height:"1000px"}}>
            <div className='box1'>
            <select onChange={selectReservationIdx} style={{ outlineStyle: "none" , margin:"0 auto",marginTop:"50px",display:"block"}} >
                    <option value="" disabled selected>날짜 선택</option>
                    {
                        data.map(n => (
                            <option value={n.reservationIdx} >{n.reservationDate}</option>
                        ))
                    }
                </select>
                </div>
                {
                    reservationIdx != '' &&  
                    <div className="box1 ">
                    <div className='box1-1'>
                        <h2>예매내역 확인</h2>
                        <div className="box2 cf">
                        <img style={{width:"334px",height:"334px"}} src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/img/`+movieDto.poster}/>
                            <ul>
                                <li>예매 영화:  {movieDto.title}</li>
                                <br />
                                <li>관람 일시: {reservationDto.reservationDate}</li>
                                <br />
                                <li>좌석: 
                                 {seat.map((n)=>
                                    (
                                <span> {n.reservedSeat} </span>)                   
                                )}
                                </li>
                                <br />
                                <hr style={{width:500}}/>
                                <br />
                                <li>이름: {reservationDto.reservationName}</li>
                                <br />
                                <li>휴대번호: {reservationDto.reservationNumber}</li>
                            </ul>
                        </div>
                        <button onClick={abcd} className="confirmation-btn">확인</button>
                    </div>
                </div>

                }
              
            </div>

        </>
    );
}
export default TicketingCheckList;