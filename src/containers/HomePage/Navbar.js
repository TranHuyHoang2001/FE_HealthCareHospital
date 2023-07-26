import React from 'react';
import './Navbar.scss';
import Facebook from "../../assets/facebook-square.svg"
import Youtube from "../../assets/youtube-square.svg" // You can create a separate CSS file for styling if needed

const Navbar = ({ isVisible }, ref) => {
  return (
    <nav ref={ref} className={`trinhdon ${isVisible ? 'open' : ''}`}>
      <ul className="trinhdon-nhom trinhdon-chinh">
        <li className="an-ud"><a href="/">Trang chủ</a></li>
        <li className="an-ud"><a href="/list-handbook">Cẩm nang</a></li>
        <li className="an-ud"><a href="/list-doctor">Bác sĩ</a></li>
        <li className="an-ud"><a href="/list-specialty">Chuyên khoa</a></li>
        <li className="an-ud"><a href="/list-clinic">Phòng khám</a></li>
        <li className="an-ud"><a href="/">Liên hệ hợp tác</a></li>
        <li className="an-ud"><a href="/">Sức khỏe doanh nghiệp</a></li>
        <li className="an-ud"><a href="/">Gói chuyển đổi số doanh nghiệp</a></li>
        <li className="an-ud"><a href="/">Tuyển dụng</a></li>
        <li className="an-ud"><h4>Về Health Care Hospital</h4></li>
        <li className="an-ud"><a href="/">Dành cho bệnh nhân</a></li>
        <li className="an-ud"><a href="/">Dành cho bác sĩ</a></li>
        <li className="an-ud"><a href="/">Vai trò của HealthCareHospital</a></li>
        <li className="an-ud"><a href="/">Liên hệ</a></li>
        <li className="an-ud"><a href="/">Câu hỏi thường gặp</a></li>
        <li className="an-ud"><a href="/">Điều khoản sử dụng</a></li>
        <li className="an-ud"><a href="/">Quy trình hỗ trợ giải quyết khiếu nại</a></li>
        <li className="an-ud"><a href="/">Quy chế hoạt động</a></li>
        <li className="an-ud"><a href="/login">Đăng nhập</a></li>
      </ul>
      <div className="trinhdon-mxh an-ud">
        <a href="https://www.facebook.com/HealthCareHospitalNamDinh"  target="_blank" rel="noopener noreferrer">
          <img className="nut-mxh" width="32" height="32" src={Facebook} alt="Facebook" />
        </a>
        <a href="/"  target="_blank" rel="noopener noreferrer">
          <img className="nut-mxh" width="32" height="32" src={Youtube} alt="Youtube" />
        </a>
      </div>
    </nav>
  );
};

export default React.forwardRef(Navbar);
