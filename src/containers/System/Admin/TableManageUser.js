import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import "./TableManageUser.scss";

// vì file ModalUser được import trong file này (TableManageUser) nên ta có thể viết css cho file ModalUser trong file TableManageUser.scss

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
  constructor(props) {
    // component được render sẽ check contructor
    // khởi tạo state biến mà muốn dùng vs class này
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
    // truyền dữ liệu từ con sang cha
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>
                {" "}
                <FormattedMessage id="manage-user.email" />
              </th>
              <th>
                {" "}
                <FormattedMessage id="manage-user.firstName" />
              </th>
              <th>
                {" "}
                <FormattedMessage id="manage-user.lastName" />
              </th>
              <th>
                {" "}
                <FormattedMessage id="manage-user.address" />
              </th>
              <th>
                {" "}
                <FormattedMessage id="manage-user.actions" />
              </th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditUser(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pen-square"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteUser(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    // fire action xoá người dùng
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
