import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { emitter } from "../../../../utils/emitter";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      isShowLoading: false,
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_BOOKING_DATA", () => {
      this.setState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "",
        birthday: "",
        selectedGender: "",
      });
    });
  };

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.gendersRedux),
      });
    }
    if (this.props.gendersRedux !== prevProps.gendersRedux) {
      this.setState({
        genders: this.buildDataGender(this.props.gendersRedux),
      });
    }
    if (this.props.dataTimeModal !== prevProps.dataTimeModal) {
      if (this.props.dataTimeModal && !_.isEmpty(this.props.dataTimeModal)) {
        let doctorId = this.props.dataTimeModal.doctorId;
        let timeType = this.props.dataTimeModal.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  handleInputValidation = (input, isValid) => {
    const borderColor = isValid ? "#9af19a" : "#f56666";
    input.style.border = `1px solid ${borderColor}`;
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  buildTimeBooking = (dataTimeModal) => {
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
      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataTimeModal) => {
    let { language } = this.props;
    // neu truyen dataTimeModal va khong rong
    if (dataTimeModal && !_.isEmpty(dataTimeModal)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTimeModal.doctorData.lastName} ${dataTimeModal.doctorData.firstName}`
          : `${dataTimeModal.doctorData.firstName} ${dataTimeModal.doctorData.lastName}`;

      return name;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    //validate input
    const inputs = document.querySelectorAll(".booking-input");
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const inputValue = input.value.trim();
      const label = input
        .closest(".form-group")
        .querySelector("label").textContent;
      if (!inputValue) {
        toast.error(
          <FormattedMessage id="patient.booking-modal.PleaseEnter">
            {(message) => `${message} ${label}`}
          </FormattedMessage>
        );
        this.handleInputValidation(input, false);
        return false;
      }
      if (input.type === "email" && !inputValue.endsWith("@gmail.com")) {
        toast.error(<FormattedMessage id="patient.booking-modal.ValidGmail" />);
        this.handleInputValidation(input, false);
        return false;
      }
      if (input.type === "tel" && isNaN(inputValue)) {
        toast.error(
          <FormattedMessage id="patient.booking-modal.ValidPhoneNumber" />
        );
        this.handleInputValidation(input, false);
        return false;
      }
      if (!this.state.selectedGender) {
        toast.error(
          <FormattedMessage id="patient.booking-modal.SelectGender" />
        );
        return false;
      }
      this.handleInputValidation(input, true);
    }
    this.setState({
      isShowLoading: true,
    });

    //post data
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTimeModal);
    let doctorName = this.buildDoctorName(this.props.dataTimeModal);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTimeModal.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    this.setState({
      isShowLoading: false,
    });

    if (res && res.errCode === 0) {
      toast.success(
        <FormattedMessage id="patient.booking-modal.toastSuccess" />
      );
      this.props.closeBookingModal();
    } else {
      toast.error(<FormattedMessage id="patient.booking-modal.toastFail" />);
    }
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTimeModal } = this.props;
    let doctorId = "";
    if (dataTimeModal && !_.isEmpty(dataTimeModal)) {
      doctorId = dataTimeModal.doctorId;
    }

    //c2: let doctorId = dataTimeModal && !_.isEmpty(dataTimeModal) ? dataTimeModal.doctorId : '';

    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading..."
      >
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
          zIndex={1200}
          toggle={closeBookingModal}
          backdrop={true}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescriptionDoctor={false}
                  dataTimeModal={dataTimeModal}
                  isShowLinkDetail={false}
                  isShowPriceAddressNameClinic={true}
                />
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="patient.booking-modal.fullName" />
                  </label>
                  <input
                    type="text"
                    className="form-control booking-input"
                    value={this.state.fullName}
                    onChange={(e) => this.handleOnchangeInput(e, "fullName")}
                    required
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                  </label>
                  <input
                    type="tel"
                    className="form-control booking-input"
                    value={this.state.phoneNumber}
                    onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                    required
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control booking-input"
                    value={this.state.email}
                    onChange={(e) => this.handleOnchangeInput(e, "email")}
                    required
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control booking-input"
                    value={this.state.address}
                    onChange={(e) => this.handleOnchangeInput(e, "address")}
                    required
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    type="text"
                    className="form-control booking-input"
                    value={this.state.reason}
                    onChange={(e) => this.handleOnchangeInput(e, "reason")}
                    required
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control booking-input"
                    value={this.state.birthday}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-modal.btnConfirm" />
              </button>
              <button
                className="btn-booking-cancel"
                onClick={closeBookingModal}
              >
                {/* closeBookingModal la function tu cha sang con */}
                <FormattedMessage id="patient.booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gendersRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
