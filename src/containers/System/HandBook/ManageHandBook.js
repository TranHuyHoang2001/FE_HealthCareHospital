import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageHandBook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { createNewHandbook } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      author: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
    this.fileInputRef = React.createRef();
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({ ...stateCopy });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file); // đọc file thành base64
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveHandBook = async () => {
    let res = await createNewHandbook(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new handbook success!");
      this.setState({
        name: "",
        imageBase64: "",
        author: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
      this.fileInputRef.current.value = ""; // reset file input value
    } else {
      toast.error("Somethings wrong.Please try again!");
      console.log("check res", res);
    }
  };

  render() {
    return (
      <div className="manage-handbook-container">
        <div className="ms-title">
          <FormattedMessage id="admin.manage-handbook.title" />
        </div>

        <div className="add-new-handbook row">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="admin.manage-handbook.handbook-name" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="admin.manage-handbook.handbook-image" />
            </label>
            <input
              type="file"
              className="form-control-file"
              onChange={(event) => this.handleOnChangeImage(event)}
              ref={this.fileInputRef} // create a reference to the file input element
            />
          </div>

          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="admin.manage-handbook.handbook-author" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.author}
              onChange={(event) => this.handleOnChangeInput(event, "author")}
            />
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-handbook"
              onClick={() => this.handleSaveHandBook()}
            >
              <FormattedMessage id="admin.manage-handbook.handbook-save" />
            </button>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
