import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import "./ListSpecialty.scss";
import { withRouter } from "react-router";

class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataListSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataListSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailListSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  }

  returnToHome = () => {
     if (this.props.history) {
       this.props.history.push(`/home`);
     }
  }

  render() {
    let { dataListSpecialty } = this.state;
    return (
      <>
        <div className="list-specialty-container">
          <div className="list-specialty-header">
            <div className="arrow-icon">
              <button className="arrow-left">
                <i className="fa fa-arrow-left" aria-hidden="true"
                onClick={() => this.returnToHome()}
                ></i>
              </button>
              <h2 className="title-arrow">
                <FormattedMessage id="homeheader.speciality"/>
              </h2>
            </div>
          </div>
          <div className="section-body">
            <div className="title-text">
              <span>
              <FormattedMessage id="homepage.speciality-popular" />
              </span>
            </div>
              {dataListSpecialty &&
                dataListSpecialty.length > 0 &&
                dataListSpecialty.map((item, index) => {
                  return (
                    <div
                      className="specialty-container"
                      key={index}
                      onClick={() => this.handleViewDetailListSpecialty(item)}
                    >
                      <div className="specialty-box">
                        <div className="specialty-image">
                          <img src={item.image} alt="specialty" />
                        </div>

                        <div className="specialty-name">
                          <span>{item.name}</span>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSpecialty));
