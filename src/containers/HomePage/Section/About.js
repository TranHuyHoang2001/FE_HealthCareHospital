import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import skds from "../../../assets/About-TruyenThong/suckhoedoisong.png";
import cnntbyt from "../../../assets/About-TruyenThong/cuc-cong-nghe-thong-tin-bo-y-te-2.png";
import vtcnews from "../../../assets/About-TruyenThong/vtcnews.png";
import vnexpress from "../../../assets/About-TruyenThong/vnexpress.png";
import ictnews from "../../../assets/About-TruyenThong/ictnews.png";
import vtvgo from "../../../assets/About-TruyenThong/vtvgo.png";
import vinmec from "../../../assets/About-TruyenThong/Vinmec-Logo-PNG.png";
import infoNet from "../../../assets/About-TruyenThong/infonet.png";
import Banner from "../../../assets/About-TruyenThong/layoutBanner.png";


class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền Thông Health Hospital</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="400"
              height="264"
              src="https://www.youtube.com/embed/Tfk-DutFsjk"
              title="TĂNG CƯỜNG BẢO VỆ CHO NHÓM NGƯỜI NGUY CƠ CAO TRONG ĐẠI DỊCH COVID-19| Kênh thông tin Bộ Y tế"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-center">
            <a href="https://moh.gov.vn/" target="_blank">
              <i
                className="truyenthong-banner"
                style={{ backgroundImage: "url(" + Banner + ")" }}
              ></i>
            </a>
          </div>
          <div className="content-right">
            <ul>
              <li>
                <a
                  href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.html"
                  target="_blank"
                >
                  <i
                    className="truyenthong-bt truyenthong-suckhoedoisong"
                    style={{ backgroundImage: "url(" + skds + ")" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://ehealth.gov.vn/?action=News&newsId=46094"
                  target="_blank"
                >
                  <i
                    className="truyenthong-bt truyenthong-cnntbyt"
                    style={{ backgroundImage: "url(" + cnntbyt + ")" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html"
                  target="_blank"
                >
                  <i
                    className="truyenthong-bt truyenthong-vtcnews"
                    style={{ backgroundImage: "url(" + vtcnews + ")" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
                  target="_blank"
                >
                  <i
                    className="truyenthong-bt truyenthong-suckhoedoisong"
                    style={{ backgroundImage: "url(" + vnexpress + ")" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://ictnews.vietnamnet.vn/tang-goi-kham-suc-khoe-tag14028260117689347303.html"
                  target="_blank"
                >
                  <i
                    className="truyenthong-bt truyenthong-ictnews"
                    style={{ backgroundImage: "url(" + ictnews + ")" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://vtvgo.vn/kho-video/se-xay-dung-he-thong-kham-chua-benh-truc-tuyen-799026.html"
                  target="_blank"
                >
                  <i
                    className="truyenthong-bt truyenthong-vtvgo"
                    style={{ backgroundImage: "url(" + vtvgo + ")" }}
                  ></i>
                </a>
              </li>
              <li>
                <a href="https://vinmecdr.com/" target="_blank">
                  <i
                    className="truyenthong-bt truyenthong-vinmec"
                    style={{ backgroundImage: "url(" + vinmec + ")" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://infonet.vietnamnet.vn/khoe-dep/suc-khoe"
                  target="_blank"
                >
                  <i
                    className="truyenthong-bt truyenthong-infonet"
                    style={{ backgroundImage: "url(" + infoNet + ")" }}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
