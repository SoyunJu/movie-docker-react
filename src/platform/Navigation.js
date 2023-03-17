import "./main.css"
import "./reset.css"
import logo from "./logo.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

function Navigation({isLogin,setIsLogin}) {
    const [user, setUser] = useState({});
    const [state, setState] = useState("logout");
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response.data);
                setUser(response.data);
                         
            })
            .catch(error => console.log(error));
        
    },[isLogin]);

    useEffect(()=>{
       if(sessionStorage.getItem('token') != null){
        setState('login')
        }else if(sessionStorage.getItem('token') == null){
        setState('logout')
      }
    },[isLogin])

    const logout = () => {
        sessionStorage.removeItem("token")
        setState("logout")
        setIsLogin("false")
    }

    return (
        <>
            <nav className="main-nav" id="mainNav">
                <div className="container">
                    <Link to="/"><div className="navbar-brand"><img src={logo} alt="..." /></div></Link>
                    {/* <a  href="/mainpage"></a> */}
                    <div className="navbar" id="navbar">
                        <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/ticketing">예매</Link></li>
                            <li className="nav-item"><Link to="/ticketingchecklist">예매 확인</Link></li>
                            <li className="nav-item"><Link to="/annoucemount">공지사항</Link></li>
                            <li className="nav-item"><Link to="/reviewlist">리뷰</Link></li>
                        </ul>
                        <ul className="navbar-login">
                            {
                                state === "logout" && 
                                <>
                                    <li><Link to="/login">로그인</Link></li>
                                    <li><Link to="/register">회원가입</Link></li>
                                </>
                            }
                            {   
                                state === "login" &&
                                <>
                                    <li><button onClick={logout}>logout</button></li>
                                    <li>{user.userName}님 환영합니다.</li>
                                </>
                            }
                        </ul>
                    </div>
                </div>

            </nav>

        </>
    )
} export default Navigation;
