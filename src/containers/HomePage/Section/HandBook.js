import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import {getAllHandbook} from "../../../services/userService";
import "./HandBook.scss";
import { withRouter } from "react-router";


class HandBook extends Component {
   constructor(props) {
    super(props);
    this.state = {
      dataHandbooks: [],
    };
  }
  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbooks: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailHandbook = (handbook) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${handbook.id}`);
    }
  };

  handleViewListHandBook = () => {
    if (this.props.history) {
      this.props.history.push(`/list-handbook`);
    }
  };

  render() {
    let { dataHandbooks } = this.state;
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homeheader.handbook" />
            </span>
            <button className="btn-section"
              onClick={() => this.handleViewListHandBook()}
            >
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataHandbooks && dataHandbooks.length > 0 &&
                  dataHandbooks.map((item, index) => {
                    return (
                      <div className="section-customize handbook-child"
                       key={index}
                       onClick={() => this.handleViewDetailHandbook(item)}
                       >
                       <div className="bg-image section-handbook" 
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                       />

                      <div className="handbook-name-container">
                          <span className="handbook-name">{item.name}</span>
                        </div>
                      </div>
                     )
                  })
              }  
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
