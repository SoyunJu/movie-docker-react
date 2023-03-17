import { useState,useEffect } from "react";
import axios from 'axios';

function Reservation({ history }) {
    const [dates, setDates] = useState([]);
    const [movieIdx,setMovieIdx]=useState([]);
    const [seat, setSeat] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/movie`,)
            .then(response => {
                console.log(response.data)
                setMovieIdx(response.data);
            })
            .catch(error => console.log(error));
    }, []);
    const handlerMovie=(e) => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/reservationdate/${e.target.value}`,)
            .then(response => {
                console.log(response.data);
                setDates(response.data);
            })
            .catch(error => console.log(error));
    };

    const handlerdate= (e)=>{
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/reservation/${e.target.value}`)
            .then(response=>{
                console.log(e.target.value);
                console.log(response.data);
                setSeat(response.data)
            })
    }


    return (
        <>
            <select  onChange={handlerMovie} >
            <option value="" disabled selected>영화 선택</option>
                {
                movieIdx.map(a =>( 
                    <option value={a.movieIdx} >{a.title}</option>
                ))
                }
            </select>
            <select  onChange={handlerdate} >
            <option value="" disabled selected>날짜 선택</option>
                {
                dates.map(a =>( 
                    <option value={a.dateIdx} >{a.canReservationDate}</option>
                ))
                }
            </select>
            {
            seat&&seat.map(a=>(<button value={a.seat}></button>))
            }
        </>
    )


} export default Reservation;

