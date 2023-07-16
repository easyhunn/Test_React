import React, { Component } from "react";
import { emitter } from "../../utils/emitter";
import BTModal from "./BTModal";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isOpenModal: false,
      titleModal: "",
      isAdd: false,
    };
  }
  openModal(data) {
    if (!this.state.isAdd) {
      emitter.emit("CLEAR_DATA_MODAL");
    }
    if (!data) {
      this.setState({
        isOpenModal: true,
        titleModal: "Add new admin",
        isAdd: true,
      });
    } else {
      emitter.emit("DATA_MODAL", data);
      this.setState({
        isOpenModal: true,
        titleModal: "Edit admin",
        isAdd: false,
      });
    }
  }
  toggleUserModal = () => {
    this.setState({
        isOpenModal: !this.state.isOpenModal
    })
}
  render() {
    return (
      <div className="bt-modal">
        <BTModal
          isOpenModal={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
          titleModal={this.state.titleModal}
          save={this.save}
        />
        <button onClick={() => this.openModal({})}>open modal</button>
      </div>
    );
  }
}
