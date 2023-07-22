import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailHandbook.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import {
  getAllDetailHandbookById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
import Comment from "../SocialPlugin/Comment";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailHandbook: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let urlId = this.props.match.params.id;

      let res = await getAllDetailHandbookById({
        id: urlId, //id truyen di (data.id)
      });

      if (res && res.errCode === 0) {
        this.setState({
          dataDetailHandbook: res.data,
          //res.data (tra ve thuoc tinh data cua object res handbookService (getDetailHandbookById))
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }


  render() {
    let { dataDetailHandbook } = this.state;
    let { language } = this.props;
    let currentURL = process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://tranhuyhoang-chatbot.onrender.com"
        : window.location.href;

    return (
      <>
        <div className="detail-handbook-container">
          <HomeHeader />
          <div className="detail-handbook-body">
            <div className="description-handbook">
              {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) && (
                <>
                  <div className="NameHandbook">{dataDetailHandbook.name}</div>
                  <hr />
                  <div className="AuthorHandBook">{dataDetailHandbook.author}</div>
                  <hr />
                  <div>
                    <img src={dataDetailHandbook.image} alt="" />
                  </div>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailHandbook.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
                <div className="like-share-plugin">
                  <LikeAndShare dataHref={currentURL} />
                </div>
                <div className="comment-handbook">
                  <Comment dataHref={currentURL} width={"100%"} />
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
