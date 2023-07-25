import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions/index";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import "./ListDoctor.scss";

class ListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  returnToHome = () => {
     if (this.props.history) {
       this.props.history.push(`/home`);
     }
  }

  render() {
    let {arrDoctors} = this.state;
    let { language } = this.props;
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    return (
      <>
        <div className="list-doctor-container">
          <div className="list-doctor-header">
            <div className="arrow-icon">
              <button className="arrow-left">
                <i className="fa fa-arrow-left" aria-hidden="true"
                onClick={() => this.returnToHome()}
                ></i>
              </button>
              <h2 className="title-arrow">
                <FormattedMessage id="homeheader.doctor"/>
              </h2>
            </div>
            <div className="title-search">
              <div className="search-list">
                  <FormattedMessage id="patient.list-doctor.search-doctor" defaultMessage="Tìm kiếm bác sĩ">
                    {(placeholder) => <input placeholder={placeholder} />}
                  </FormattedMessage>
                  <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
          <div className="section-body">
            <div className="title-text">
              <span>
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
            </div>
            <div className="search-doctor-results"></div>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  console.log('check name specialty ' + item.Doctor_Infor.Specialty.name);

                  return (
                    <div
                      className="doctor-container"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="outstanding-doctor">
                        <div className="doctor-image">
                          <img src={imageBase64} alt="doctor" />
                        </div>

                        <div className="doctor-name-specialty">
                          <div className="doctor-name">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div className="doctor-specialty">{item.Doctor_Infor.Specialty.name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>{" "}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDoctor)
);
