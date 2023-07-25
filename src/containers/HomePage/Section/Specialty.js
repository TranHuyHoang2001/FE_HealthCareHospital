import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import "./Specialty.scss";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  }

  handleViewListSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/list-specialty`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.speciality-popular" />
            </span>
            <button className="btn-section"
            onClick={() => this.handleViewListSpecialty()}  
            >
              {" "}
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image section-specialty"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      />
                      <div>
                        <span className="specialty-name">{item.name}</span>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>{" "}
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Specialty));
