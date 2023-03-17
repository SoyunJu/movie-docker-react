import "./main.css"
import "./reset.css"

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="left-footer">
                    <ul>
                        <li><a href="#">개인정보처리방침</a></li>
                        <li><a href="#">이메일무단수집거부</a></li>
                        <li><a href="#">채용안내</a></li>
                    </ul>
                    <p>서울 종로구 인사동길 12 대일빌딩 7층, 15층</p>
                    <strong>Tel.02.723.0008 사업자등록번호:220-86-58115</strong>
                </div>
                <div className="right-footer">
                    <div>&copy; Copyright <strong><span>HiBox</span></strong>. AllRights Reserved</div>
                </div>
            </div>
        </footer>
    )
} export default Footer;