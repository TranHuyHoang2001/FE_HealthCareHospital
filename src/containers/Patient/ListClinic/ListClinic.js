import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ListClinic.scss";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import HomeFooter from "../../HomePage/HomeFooter";
import HomeHeader from "../../HomePage/HomeHeader";


class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  returnToHome = () => {
     if (this.props.history) {
       this.props.history.push(`/home`);
     }
  }

  render() {
    let { dataClinics } = this.state;
    return (
      <>
      <HomeHeader/>
      <div className="list-clinic-container">
        <div className="list-clinic-header">
          <div className="home-icon">
            <i className="fas fa-home"
            onClick={() => this.returnToHome()}
            ></i> / <FormattedMessage id="patient.list-clinic.all-clinic"/>
          </div>
          <div className="title-search">
            <span className="title-text">
              <FormattedMessage id="homepage.health-facility" />
            </span>
            <div className="search-list">
                {/* <input type="text" placeholder="Tìm chuyên khoa khám bệnh" /> */}
                <FormattedMessage id="banner.search" defaultMessage="Tìm kiếm">
                  {(placeholder) => <input placeholder={placeholder} />}
                </FormattedMessage>
                <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
        <div className="list-clinic-body">
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className="clinic-container"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div className="medical-facility">
                        <img src={item.image} alt="clinic" />
                      </div>
                      <div className="clinic-name-child">
                        <span className="clinic-name-text">{item.name}</span>
                      </div>
                    </div>
                  );
                })}
        </div>{" "}
      </div>
      <HomeFooter/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListClinic));
