import './ticketing_1.css';

// 예매 확인 페이지
function TicketingCheck() {
 



    return (
        <>
            <div className='ticketingCheckBox'>
                <div className='ticketingCheck'>
                    <h2>예매 확인</h2>
                    <div className='form-section'>
                        <form>
                            <div className='ticketingName'>
                                <h3>이름</h3>
                                <input type="text" className="name" placeholder="이름을 입력하세요."></input>
                            </div>
                            <div className='ticketingPhoneNumber'>
                                <h3>휴대번호</h3>
                                <input type="text" className="phoneNumber" placeholder='전화번호를 입력하세요.'></input>
                            </div>
                            <button className="ticketingcheck-btn">확인</button>
                            
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
export default TicketingCheck;