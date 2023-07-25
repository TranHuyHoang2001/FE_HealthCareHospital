import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";


class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    // fire redux event: actions
  };

  returnToHome = () => {
     if (this.props.history) {
       this.props.history.push(`/home`);
     }
  }
  GotoListClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/list-clinic`);
    }
  }
  GotoListDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/list-doctor`);
    }
  }
  GotoListSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/list-specialty`);
    }
  }
  GotoListHandbook = () => {
    if (this.props.history) {
      this.props.history.push(`/list-handbook`);
    }
  }
  render() {
    let language = this.props.language; // get language from redux (mapStateToProps)
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content"
                onClick={() => this.GotoListSpecialty()}
              >
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.search-doctor" />
                </div>
              </div>
              <div className="child-content"
                onClick={() => this.GotoListClinic()}  
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content"
                onClick={() => this.GotoListDoctor()} 
              >
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  {" "}
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content"
                onClick={() => this.GotoListHandbook()}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.handbook" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.examination general" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>{" "}
                <span>
                  <FormattedMessage id="homeheader.support" />
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.medical platform" />
              </div>
              {/* Comprehensive health care */}
              <div className="title2">
                <FormattedMessage id="banner.Comprehensive health care" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                {/* <input type="text" placeholder="Tìm chuyên khoa khám bệnh" /> */}
                <FormattedMessage id="banner.search" defaultMessage="Tìm kiếm">
                  {(placeholder) => <input placeholder={placeholder} />}
                </FormattedMessage>
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Specialized examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Remote examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-medkit"></i>
                  </div>
                  <div className="text-child">
                    {" "}
                    <FormattedMessage id="banner.General examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa fa-flask" aria-hidden="true"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Medical test" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa fa-heartbeat" aria-hidden="true"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Mental health" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa fa-stethoscope" aria-hidden="true"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.Dental examination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
    // giá trị ngôn ngữ lưu trong redux
    // trong component muốn sử dụng biến trong redux thì phải sử dụng hàm mapStateToProps
    // (state) là của redux
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
