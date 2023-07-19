import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    // react có 1 hàm để cập nhật lại biến state
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    // react có 1 hàm để cập nhật lại biến state
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    // const { username, password } = this.state;
    // if (username === "admin" && password === "admin") {
    //   this.props.adminLoginSuccess({
    //     username: "admin",
    //     password: "admin",
    //   });
    //   this.props.navigate("/admin");
    // } else {
    //   this.props.adminLoginFail();
    // }
    this.setState({
      // mỗi lần thực hiện request thì xoá message lỗi cũ đi
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          // mỗi lần thực hiện request thì xoá message lỗi cũ đi
          errMessage: data.message,
        });
      }
      // login thành công
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log("errorHoang ", error.response);
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
      // lấy giá trị ngược lại với biến isShowPassword hiện tại
    });
  };

  handleKeyDown = (event) => {
     if(event.key === 'Enter' || event.keyCode === 13){
        this.handleLogin();
     }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                // value giá trị gán cho 1 biến react dùng {}
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            {/* dùng style inline trong react {{}} */}
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus google"></i>
              <i className="fab fa-facebook facebook"></i>
              <i className="fab fa-twitter-square twitter"></i>
            </div>
          </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
