import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "reactstrap";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props; //redux userReducer login success -> userService handleLogin nodejs
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeDatePicker = (date) => {
    //thay doi date se lay lai gia tri benh nhan
    // setState function is function async
    // sau khi gan gia tri dung callback de lay gia tri
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      patientId: item.patientId,
      doctorId: item.doctorId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataFromRemedyModal) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataFromRemedyModal.email,
      imgBase64: dataFromRemedyModal.imgBase64,
      patientId: dataModal.patientId,
      doctorId: dataModal.doctorId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send remedy success");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send remedy fail");
      console.log('error send remedy: ', res);
    }
  };

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">
              <FormattedMessage id="menu.doctor.manage-patient" />
            </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label htmlFor="">Chon ngay kham</label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    padding: 30,
                  }}
                >
                  <h4>Danh sach benh nhan kham benh cho xac nhan</h4>
                  <Table>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Thoi gian</th>
                        <th>Ho va Ten</th>
                        <th>Dia chi</th>
                        <th>So dien thoai</th>
                        <th>Gioi tinh</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPatient && dataPatient.length > 0 ? (
                        dataPatient.map((item, index) => {
                          let time =
                            language === LANGUAGES.VI
                              ? item.timeTypeDataPatient.valueVi
                              : item.timeTypeDataPatient.valueEn;
                          let gender =
                            language === LANGUAGES.VI
                              ? item.patientData.genderData.valueVi
                              : item.patientData.genderData.valueEn;

                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{time}</td>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.patientData.address}</td>
                              <td>{item.patientData.phoneNumber}</td>
                              <td>{gender}</td>
                              <td>
                                <button
                                  className="mp-btn-confirm"
                                  onClick={() => this.handleBtnConfirm(item)}
                                >
                                  xac nhan
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="no-data">
                          <td colSpan="7" className="text-center noData">
                            <span>No data</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
    // state.user: userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
