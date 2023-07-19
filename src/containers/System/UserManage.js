import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

// vì file ModalUser được import trong file này (UserManage) nên ta có thể viết css cho file ModalUser trong file UserManage.scss
class UserManage extends Component {
  constructor(props) {
    // component được render sẽ check contructor
    // khởi tạo state biến mà muốn dùng vs class này
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUsers: response.users,
        }
        // setState là 1 hàm bất đồng bộ
        // , ()=> {
        // 1 callback function khi hàm phía trên chạy xong thì mới chạy
        //     console.log("check state user 2", this.state.arrUsers);
        // }
      );
    }
  };

  // khi dùng event như click... thì dùng arrow function
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    // data component cha nhận từ component con
    try {
      let response = await createNewUserService(data); // component cha post data lên api qua hàm file userService.js
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          // setState sẽ render lại component cha và isOpenModalUser sẽ cập nhật là false
          isOpenModalUser: false, // sau khi tạo xong thì đóng modal
        });
        // fire event để xóa data trong modal
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  /** Life cycle của react
   * Run component
   * 1. Run constructor -> init state
   * 2. DidMount (set state)-> gọi api , gán giá trị cho 1 biến state
   * 3. Render -> render ra giao diện
   * */

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  handleEditUser = (user) => {
    console.log("check edit user", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user, // gán luôn giá trị của user click vào cho biến userEdit
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalEditUser: false,
        });
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log("error edit user", error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser} //props của component con là state của component cha
          toggleFromParent={this.toggleUserModal} // props là 1 function
          createNewUser={this.createNewUser}
        />
        {
          // nếu isOpenModalEditUser là true thì render ra ModalEditUser
          this.state.isOpenModalEditUser && (
            <ModalEditUser
              isOpen={this.state.isOpenModalEditUser} //props của component con là state của component cha
              toggleFromParent={this.toggleUserEditModal} // props là 1 function
              currentUser={this.state.userEdit} // truyền userEdit vào component con
              editUser={this.doEditUser}
              // props editUser bên component con được gán các giá trị từ this.state (trạng thái của modal edit)
              // gán hàm doEditUser bên component cha vào props editUser bên component con để thực hiện việc edit user
            />
          )
        }
        <div className="title text-center">
          <FormattedMessage id="admin.CRUD-User-Redux.manage-user" />
        </div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>
            <FormattedMessage id="admin.CRUD-User.Add-new-user" />
          </button>
        </div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>
                  <FormattedMessage id="manage-user.email" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.firstName" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.lastName" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.address" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.actions" />
                </th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pen-square"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
