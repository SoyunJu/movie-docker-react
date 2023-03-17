import { useEffect, useState } from 'react';
import { TbSquare1 } from 'react-icons/tb';
import { TbSquare2 } from 'react-icons/tb';
import { TbSquare3 } from 'react-icons/tb';
import { TbSquare4 } from 'react-icons/tb';
import { TbSquare5 } from 'react-icons/tb';
import axios from "axios";
import './seating2.css';

function Seating2({reservedSeat,setSelectSeat,selectSeat,movieIdx,selectDate,history}) {

    const post=()=>{
    
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/reservation/`,
    {
        "reservationDto":  {"reservationDate":selectDate,"movieIdx":movieIdx},
            "seatDto":{"registSeat":selectSeat}
    },            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }

    )
            .then(respone => {
                alert("예매가 완료 되었습니다")
                history.push('/')
            })    
            .catch(error=>{
          
            })
    }
    const [A1, setA1] = useState({ fontSize: '60px' });
    const [A2, setA2] = useState({ fontSize: '60px' });
    const [A3, setA3] = useState({ fontSize: '60px' });
    const [A4, setA4] = useState({ fontSize: '60px' });
    const [A5, setA5] = useState({ fontSize: '60px' });
    const [B1, setB1] = useState({ fontSize: '60px' });
    const [B2, setB2] = useState({ fontSize: '60px' });
    const [B3, setB3] = useState({ fontSize: '60px' });
    const [B4, setB4] = useState({ fontSize: '60px' });
    const [B5, setB5] = useState({ fontSize: '60px' });
    
    useEffect(()=>{
        setA1({ fontSize: "60px", color: "black" });
        setA2({ fontSize: "60px", color: "black" });
        setA3({ fontSize: "60px", color: "black" });
        setA4({ fontSize: "60px", color: "black" });
        setA5({ fontSize: "60px", color: "black" });
        setB1({ fontSize: "60px", color: "black" });
        setB2({ fontSize: "60px", color: "black" });
        setB3({ fontSize: "60px", color: "black" });
        setB4({ fontSize: "60px", color: "black" });
        setB5({ fontSize: "60px", color: "black" });
        console.log(reservedSeat);
        abcd();
    },[reservedSeat])
   const abcd=()=>{
    reservedSeat.map((n)=>{
        if(n.reservedSeat == 'A1'){setA1({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'A2'){setA2({ fontSize: "60px", color: "gray",pointerEvents:'none' })}
        else if(n.reservedSeat == 'A3'){setA3({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'A4'){setA4({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'A5'){setA5({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'B1'){setB1({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'B2'){setB2({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'B3'){setB3({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'B4'){setB4({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
        else if(n.reservedSeat == 'B5'){setB5({ fontSize: "60px", color: "gray" ,pointerEvents:'none' })}
    })
   }
    const cancel = () => {
            setA1({ fontSize: "60px", color: "black" });
            setA2({ fontSize: "60px", color: "black" });
            setA3({ fontSize: "60px", color: "black" });
            setA4({ fontSize: "60px", color: "black" });
            setA5({ fontSize: "60px", color: "black" });
            setB1({ fontSize: "60px", color: "black" });
            setB2({ fontSize: "60px", color: "black" });
            setB3({ fontSize: "60px", color: "black" });
            setB4({ fontSize: "60px", color: "black" });
            setB5({ fontSize: "60px", color: "black" });
            abcd();
    };
    const changeColor =(e)=>{
        console.log(e);
        e.a({fontSize:"60px",color:"red",pointerEvents:'none'})
        
        setSelectSeat(selectSeat=>[...selectSeat,e.b]);
    }
  
     
    return (
        <>
             <div className='selectSeating'>
                    <h2>좌석 선택</h2>
                    <section>
                        <div className='screenBox'>
                            <h3>Screen</h3>
                        </div>
                        <div className='seatingIcon'>
                            <span className='aCol'>A</span>
                            <TbSquare1 value="A1" className="seat seat1" style={A1} onClick={() => changeColor({a:setA1, b :'A1'})} />
                            <TbSquare2 className="seat" value="A2" style={A2} onClick={() => changeColor({a:setA2, b :'A2'})} />
                            <TbSquare3 className="seat" value="A3" style={A3} onClick={() => changeColor({a:setA3, b :'A3'})} />
                            <TbSquare4 className="seat" value="A4" style={A4} onClick={() => changeColor({a:setA4, b :'A4'})} />
                            <TbSquare5 className="seat" value="A5" style={A5} onClick={() => changeColor({a:setA5, b :'A5'})} />
                            <br />
                            <span className='bCol'>B</span>
                            <TbSquare1 className="seat seat1" value="B1" style={B1} onClick={() => changeColor({a:setB1, b :'B1'})} />
                            <TbSquare2 className="seat" value="B2" style={B2} onClick={() => changeColor({a:setB2, b :'B2'})} />
                            <TbSquare3 className="seat" value="B3" style={B3} onClick={() => changeColor({a:setB3, b :'B3'})} />
                            <TbSquare4 className="seat" value="B4" style={B4} onClick={() => changeColor({a:setB4, b :'B4'})} />
                            <TbSquare5 className="seat" value="B5" style={B5} onClick={() => changeColor({a:setB5, b :'B5'})} />
                            <div className="button-group">
                                <button className="clear-btn" onClick={cancel}>취소</button>
                                <button onClick={post} className="selectSeating-btn">확인</button>
                            </div>
                        </div>
                    </section>
                </div>
        </>
    );
}

export default Seating2;
