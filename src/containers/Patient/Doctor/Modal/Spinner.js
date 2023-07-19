import React, { Component } from "react";
import { connect } from "react-redux";
import "./Spinner.scss";
import { FadeLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
  }


  async componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
        <div className="sweet-loading">
          <FadeLoader
            css={override}
            size={150}
            color={"#2d2d32"}
            loading={this.state.loading}
            speedMultiplier={1.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
