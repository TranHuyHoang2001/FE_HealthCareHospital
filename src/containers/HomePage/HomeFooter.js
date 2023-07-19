import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import bct from "../../assets/bo-cong-thuong.svg";
class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="footer-container">
          <div className="footer-info">
            <a href="https://github.com/TranHuyHoang2001" target="_blank">
              <i className="footerLogo"></i>
            </a>
            <div className="tieuDe">
              Bệnh viện Y học Công nghệ Health Hospital
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <div>22 Nguyễn Tri Phương, TP Nam Định, Nam Định</div>
            </div>
            <div className="DKKD">
              <i className="fas fa-check"></i>
              <div>
                ĐKKD số: 0106790230. Sở KHĐT Nam Định cấp ngày 16/03/2023
              </div>
            </div>
            <div className="boCongThuong">
              <img
                src={bct}
                alt="Đăng ký Bộ Công Thương"
                width={"78"}
                height={"30"}
              />
            </div>
          </div>
          <div className="footer-other">
            <div className="footer-center">
              <ul>
                <li>
                  <a href="#">Liên hệ hợp tác</a>
                </li>
                <li>
                  <a href="#">Gói chuyển đổi số doanh nghiệp</a>
                </li>
                <li>
                  <a href="#">Tuyển dụng</a>
                </li>
                <li>
                  <a href="#">Câu hỏi thường gặp</a>
                </li>
                <li>
                  <a href="#">Điều khoản sử dụng</a>
                </li>
                <li>
                  <a href="#">Chính sách Bảo mật</a>
                </li>
                <li>
                  <a href="#">Quy trình hỗ trợ giải quyết khiếu nại</a>
                </li>
                <li>
                  <a href="#">Quy chế hoạt động</a>
                </li>
              </ul>
            </div>
            <div className="footer-right">
              <div className="TruSo">
                <div className="fw-bold fs-5">Trụ sở tại Nam Định</div>
                <div className="fw-light fs-6">
                  22 Nguyễn Tri Phương, TP Nam Định, Tỉnh Nam Định
                </div>
              </div>
              <div className="VanPhong">
                <div className="fw-bold fs-5">Văn phòng tại Hà Nội</div>
                <div className="fw-light fs-6">
                  28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                </div>
              </div>
              <div className="HoTro">
                <div className="fw-bold fs-5">Hỗ trợ khách hàng</div>
                <div className="fw-light fs-6">
                  support@HealthHospital.vn (7h - 18h)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bonus" style={{ margin: "20px 90px" }}>
          <hr />
          <div className="bonusText">
            <div className="text">
              <i className="fas fa-clipboard-check"></i>
              <div className="check">Chuẩn Xác</div>
            </div>
            <div className="text">
              <i className="fas fa-thumbs-up"></i>
              <div className="check">Hiệu Quả</div>
            </div>
            <div className="text">
              <i className="fas fa-clock"></i>
              <div className="check">Tiện Lợi</div>
            </div>
            <div className="text">
              <i className="fas fa-coins"></i>
              <div className="check">Tiết kiệm</div>
            </div>
            <div className="text">
              <i className="fas fa-chart-line"></i>
              <div className="check">Ưu đãi</div>
            </div>
            <div className="text">
              <i className="fas fa-bolt"></i>
              <div className="check">Nhanh chóng</div>
            </div>
            <div className="text">
              <i className="fas fa-user"></i>
              <div className="check">Kiểm tra định kỳ</div>
            </div>
          </div>
        </div>
        <div className="License">
          <p>
            &copy; 2023 HealthHospital.com{" "}
            <a target="_blank" href="https://moh.gov.vn/" rel="noreferrer">
              More information
            </a>{" "}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    // giá trị ngôn ngữ lưu trong redux
    // trong component muốn sử dụng biến trong redux thì phải sử dụng hàm mapStateToProps
    // (state) là của redux
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
