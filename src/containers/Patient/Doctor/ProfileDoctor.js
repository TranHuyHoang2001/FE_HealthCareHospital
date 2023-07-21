import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment/moment";
import { Link } from "react-router-dom";


class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      //   this.getInforDoctor(this.props.doctorId);
      let data = await this.getInforDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderTimeBooking = (dataTimeModal) => {
    let { language } = this.props;
    // neu truyen dataTimeModal va khong rong
    if (dataTimeModal && !_.isEmpty(dataTimeModal)) {
      let time =
        language === LANGUAGES.VI
          ? dataTimeModal.timeTypeData.valueVi
          : dataTimeModal.timeTypeData.valueEn;
      let dateVi = moment
        .unix(+dataTimeModal.date / 1000)
        .format("dddd - DD/MM/YYYY");
      let dateEn = moment
        .unix(+dataTimeModal.date / 1000)
        .locale("en")
        .format("ddd - MM/DD/YYYY");
      let date =
        language === LANGUAGES.VI
          ? this.capitalizeFirstLetter(dateVi)
          : this.capitalizeFirstLetter(dateEn);
      return (
        <>
          <div>
            {time} <br /> {date}
          </div>
          <div>
            <FormattedMessage id={"patient.booking-modal.priceBooking"} />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;

    let {
      language,
      isShowDescriptionDoctor,
      dataTimeModal,
      isShowLinkDetail,
      isShowPriceAddressNameClinic,
      doctorId
    } = this.props;

    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTimeModal)}</>
              )}

              {isShowLinkDetail === true && (
                <span className="view-detail-doctor">
                  <Link to={`/detail-doctor/${doctorId}`}>
                    <FormattedMessage id="patient.detail-schedule.more-infor" />
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="price_name_address_clinic">
          {isShowPriceAddressNameClinic === true && (
            <div className="price-address-name-clinic">
              {" "}
              <div className="price">
                <FormattedMessage id="patient.booking-modal.price" />
                {dataProfile &&
                  dataProfile.Doctor_Infor &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      className="currency"
                      value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                    />
                  )}
                {dataProfile &&
                  dataProfile.Doctor_Infor &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      className="currency"
                      value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  )}
              </div>
              <div className="address-clinic">
                <FormattedMessage id="patient.booking-modal.addressClinic" />
                {dataProfile &&
                  dataProfile.Doctor_Infor &&
                  dataProfile.Doctor_Infor.addressClinic && (
                    <span>{dataProfile.Doctor_Infor.addressClinic}</span>
                  )}
              </div>
              <div className="name-clinic">
                <FormattedMessage id="patient.booking-modal.nameClinic" />
                {dataProfile &&
                  dataProfile.Doctor_Infor &&
                  dataProfile.Doctor_Infor.nameClinic && (
                    <span>{dataProfile.Doctor_Infor.nameClinic}</span>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
