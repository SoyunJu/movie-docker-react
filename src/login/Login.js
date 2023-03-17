import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import style from "./Login.module.css" ;

const Login = ({history, setIsLogin}) => {
    const [userId,setId] = useState('');
    const [userPassword,setPassword]=useState('');

    const handlerOnClick = e =>{
        e.preventDefault();
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`,{userId,userPassword})
            .then(respone => {
                if(respone.data){
                    alert('정상적으로 로그인되었습니다')
                    sessionStorage.setItem("token",respone.data);
                    setIsLogin(true);
                    console.log("로그인 세팅완료");
                    history.goBack();
                }else{
                    alert('id, pw가 일치하지 않습니다')
                    sessionStorage.clear();
                }
            })    
            .catch(error=>{
                alert('id, pw가 일치하지 않습니다')
                console.log(error)
                sessionStorage.clear();
            })
    };

    return (
        <div className={style.login}>
            <h2>로그인</h2>
            <div className={style.formSection}>
                <form>
                    <div className={style.loginInputId}>
                        <h3>아이디&#40;ID&#41;</h3>
                        <input type="text" className={style.userId} placeholder="아이디를 입력하세요" value={userId} onChange={(e)=>setId(e.target.value)}/>
                    </div>
                    <div className={style.loginInputPw}>
                        <h3>비밀번호</h3>
                        <input type="password" className={style.userPassword} placeholder="비밀번호를 입력하세요" value={userPassword} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <Link to="/register"className={style.signUp}>회원가입</Link>
                    <button className={style.loginBtn} onClick={handlerOnClick}>확인</button>
                </form>
            </div>
        </div>
    );
};

export default Login;