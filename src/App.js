
import './App.css';
import { Route } from 'react-router-dom';
import Navigation from './platform/Navigation';
import Footer from './platform/Footer';
import Mainpage from './mainpage/Mainpage';
import Login from './login/Login';
import MovieDetail from './moviedetail/MovieDetail';
import Signup from './register/SignUp'

import TicketingCheckList from './ticketing/TicketingCheckList';
import Admin from './example/Admin'
import ReviewDetail from './review/ReviewDetail';
import ReviewParts1 from './review/ReviewParts1';
import { useState,useEffect } from 'react';
import Ticketing from './ticketing/Ticketing';
import ReviewWrite from './review/ReviewWrite';
import Notice from './Notice/Notice';
import NoticeDetail from './Notice/NoticeDetail';
import ReviewRetouch from './review/ReviewRetouch'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Navigation isLogin={isLogin} setIsLogin={setIsLogin} />
      {/* 메인페이지 */}
      <Route path="/" component={Mainpage} exact={true} />
      {/* 로그인 */}
      <Route path="/login" component={(props) => <Login {...props} setIsLogin={setIsLogin} />} exact={true} />
      {/* 회원가입 */}
      <Route path="/register" component={Signup} exact={true} />
      {/* 영화 상세 */}
      <Route path="/moviedetail/:movieIdx" component={MovieDetail} exact={true} />

      {/* 리뷰 디테일 */}
      <Route path='/reviewdetail/:reviewIdx' component={ReviewDetail} exact={true} />
      {/* 리뷰 리스트 */}
      {/* <Route path='/reviewlist' component={ReviewList} exact={true}/> */}
      <Route path='/reviewlist' component={ReviewParts1} exact={true} />
      {/* 리뷰쓰기 */}
      <Route path='/reviewwrite' component={ReviewWrite} exact={true}/>
      {/* 리뷰 수정 */}
      <Route path='/reviewretouch/:reviewIdx' component={ReviewRetouch} exact={true}/>
      {/* 티켓팅 */}
      <Route path="/ticketing" component={Ticketing} exact={true}/>
       {/* 티켓팅 체크 리스트 */}
       <Route path='/ticketingchecklist' component={TicketingCheckList} exact={true} />
       {/* 공지사항 */}
       <Route path='/annoucemount' component={Notice} exact={true} />
       <Route path='/annoucemount/:announcementIdx' component={NoticeDetail} exact={true}/>
      {/* 예시 */}
      {/* <Rating/>  */}
      <Route path='/admin' component={Admin} exact={true}/>
      <Footer />


    </>
  );
}

export default App;
