import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {getAllHandbook} from "../../../services/userService";
import "./ListHandBook.scss";
import { withRouter } from "react-router";
import HomeFooter from "../../HomePage/HomeFooter";
import HomeHeader from "../../HomePage/HomeHeader";
import TruncatedText from "./TruncatedText";

class ListHandBook extends Component {
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

  returnToHome = () => {
     if (this.props.history) {
       this.props.history.push(`/home`);
     }
  }

  render() {
    let { dataHandbooks } = this.state;
    return (
      <>
      <HomeHeader/>
        <div className="list-handbook-container">
          <div className="list-handbook-header">
            <div className="home-icon">
              <i className="fas fa-home"
              onClick={() => this.returnToHome()}
              ></i> / <FormattedMessage id="homeheader.handbook"/>
            </div>
            <div className="title-search">
              <span className="title-text">
                <FormattedMessage id="patient.list-handbook.new-handbook" />
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
          <div className="list-handbook-body">
              {dataHandbooks && dataHandbooks.length > 0 &&
                  dataHandbooks.map((item, index) => {
                // Extract text from descriptionHTML
                const parser = new DOMParser();
                const parsedDescription = parser.parseFromString(item.descriptionHTML, 'text/html');
                const descriptionText = parsedDescription.body.textContent || '';
                    return (
                      <div className="handbook-container"
                       key={index}
                       onClick={() => this.handleViewDetailHandbook(item)}
                       >
                          <div className="handbook-box">
                            <div className="handbook-image">
                              <img src={item.image} alt="handbook" />
                            </div>

                            <div className="handbook-name-des">
                              <div className="handbook-name">
                                  <span>{item.name}</span>
                              </div>
                              <div className="handbook-des">
                                  <TruncatedText text={descriptionText} maxLength={200} />
                              </div>
                            </div>
                          </div>                        
                      </div>
                     )
                  })
              }  
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
    language: state.app.language,
    // giá trị ngôn ngữ lưu trong redux
    // trong component muốn sử dụng biến trong redux thì phải sử dụng hàm mapStateToProps
    // (state) là của redux
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListHandBook));
