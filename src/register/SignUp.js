import { useState } from "react";
import style from "./SignUp.module.css";
import axios from "axios";

const SignUp = ({history}) => {

    

    const handlerOnClick = e =>{
        if(confrimMessage == null && Pmessage == null && Emassage == null && userId != null){
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/regist`,{userId,userPassword,phoneNumber,userEmail,userName})
            .then(respone => {
                console.log(respone)
            if(respone.data){
                alert('정상적으로 등록 되었습니다.')
                history.push('/login')
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
        }else{
            alert('형식이 일치하지 않습니다')
        }
    };


      //이름
      const [userName, setName] = useState();
      //아이디
      const [userId, setUserId] = useState();
      //비밀번호
      const [userPassword, setPassword] = useState();
      const [confirmPassword, setConfirmPassword] = useState();
      //연락처
      const [phoneNumber, setPhone] = useState();
      //이메일
      const [userEmail, setEmail] = useState();
    const[confrimMessage,setConfrimMessage]= useState();
    const[Pmessage,setPmassage]= useState();
    const[Emassage,setEmassage]=useState();
      //핸들러 모음
    const handlerChangeName = e => {
        setName(e.target.value);
    };
    const handlerChangeUserId = e => {
        setUserId(e.target.value);
    };
    const handlerChangePassword = e => {
        setPassword(e.target.value);
    };
    const handlerChangeConfrimPassword = e => {
        if(e.target.value === userPassword){
        setConfirmPassword(e.target.value)
        setConfrimMessage(null);
    }else{
    setConfirmPassword(e.target.value);
    setConfrimMessage('비밀번호가 일치하지 않습니다.')
    }
    };
    const changePhone = e => {
        if(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(e.target.value)){
            setPhone(e.target.value);
            setPmassage(null);
        }else{
        setPhone(e.target.value);
        setPmassage('형식이 올바르지 않습니다.');
    }
    };

    const handlerChangeEmail = e => {
        if(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(e.target.value)){
            setEmail(e.target.value);
            setEmassage(null);
        }else{
            setEmail(e.target.value);
            setEmassage('형식이 올바르지 않습니다.');
        }
       
    };

    return (
        <>
            <div className={style.signup}>
                <h2>회원가입</h2>
                <h4>회원 정보를 입력해 주세요</h4>
                <div className={`${style.formSection} ${style.cf}`}>
                    <form>
                        <div className={`${style.loginInputName} ${style.floatLeft} ${style.input}`}>
                            <h3>이름</h3>
                            <input type="text" value={userName} onChange={handlerChangeName} className={style.userName} placeholder="이름을 입력하세요" />
                        </div>
                        <div className={`${style.loginInputId} ${style.floatRight} ${style.input}`}>
                            <h3>아이디</h3>
                            <input type="text" value={userId} onChange={handlerChangeUserId} className={style.userId} placeholder="아이디를 입력하세요" />
                        </div>
                        <div className={`${style.loginInputPw} ${style.floatLeft} ${style.input}`}>
                            <h3>비밀번호</h3>
                            <input type="password" value={userPassword} onChange={handlerChangePassword} className={style.userPassword} placeholder="비밀번호를 입력하세요" />
                        </div>
                        <div className={`${style.loginInputPwc} ${style.floatRight} ${style.input}`}>
                            <h3>비밀번호 확인</h3>
                            <input type="password" value={confirmPassword} onChange={handlerChangeConfrimPassword} className={style.userPasswordCheck} placeholder="비밀번호 확인을 입력하세요" />
                            <div >{confrimMessage}</div>
                        </div>
                        <div className={`${style.loginInputPh} ${style.floatLeft} ${style.input}`}>
                            <h3>전화번호</h3>
                            <input type="text" value={phoneNumber} onChange={changePhone} className={style.userPhoneNumber} placeholder="ex)010-0000-0000" />
                            <div>{Pmessage}</div>
                        </div>
                        <div className={`${style.loginInputEmail} ${style.floatRight} ${style.input}`}>
                            <h3>이메일</h3>
                            <input type="email" value={userEmail} onChange={handlerChangeEmail} className={style.userEmail} placeholder="ex)exapmle@example.com" />
                            <div>{Emassage}</div>
                        </div>                       
                    </form>
                    <button className={style.signBtn} onClick={handlerOnClick}>확인</button>
                </div>
            </div>
        </>
    );
};

export default SignUp;