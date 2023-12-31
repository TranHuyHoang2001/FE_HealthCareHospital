import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllDetailClinicById,
} from "../../../services/userService";
import _ from "lodash";
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
      coords: null,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let urlId = this.props.match.params.id;

      let res = await getAllDetailClinicById({
        id: urlId, //id truyen di (data.id)
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          //doctorClinic trong clinicService
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          //res.data (tra ve thuoc tinh data cua object res clinicService (getDetailClinicById))
          arrDoctorId: arrDoctorId,
        });
        // Perform geocoding after getting the clinic data
        this.performGeocoding(data.address);
      }
    }

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  async performGeocoding(address) {
    try {
      const results = await geocodeByAddress(address);
      const { lat, lng } = await getLatLng(results[0]);
      // Set the state with the obtained coordinates
      this.setState({ coords: { lat, lng } });
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
  }


  render() {
    let { arrDoctorId, dataDetailClinic, coords } = this.state;

    const Position = ({ icon }) => <div>{icon}</div>;

    return (
      <>
        <div className="detail-clinic-container">
          <HomeHeader />
          <div className="detail-clinic-body">
            <div className="description-clinic">
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <>
                  <div className="NameClinic">{dataDetailClinic.name}</div>
                  <div className="ImageClinic">
                    <img src={dataDetailClinic.image} alt="clinic" />
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHTML,
                    }}
                  ></div>
                  <div className="Map">
                    <div className="Map-Text">Bản đồ cơ sở y tế</div>
                    <div className="GG-Map" style={{ height: '300px', width: '100%' }}>
                      <div className="Address-GG-Map">
                        {dataDetailClinic.address}
                      </div>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                        defaultCenter={coords}
                        defaultZoom={11}
                        center={coords}
                      >
                          {coords && (
                            <Position
                              lat={coords?.lat}
                              lng={coords?.lng}
                              icon={<i className="fas fa-map-marker-alt" style={{ color: "red", fontSize: "24px" }} aria-hidden="true"></i>}
                            />
                          )}
                      </GoogleMapReact>
                    </div>
                  </div>
                </>
              )}
            </div>

            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPriceAddressNameClinic={false}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule
                          doctorIdFromParent={item}
                        />
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <HomeFooter />
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
