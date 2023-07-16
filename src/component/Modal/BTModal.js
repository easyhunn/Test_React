import React, { Component } from 'react';
import { emitter } from "../../utils/emitter";
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import * as messageService from "../../services/messageService"

class BTModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            code: '',
            name: '',
            userName: '',
            password: '',
            phoneNumber: '',
        }
        this.listenEmitter();
    }
    componentDidMount() {

    }
    listenEmitter = () => {
        emitter.on("CLEAR_DATA_MODAL", () => {
            this.setState({
                id: 0,
                code: '',
                name: '',
                userName: '',
                password: '',
                phoneNumber: '',
            });
        })
        emitter.on("DATA_MODAL", (data) => {
            this.setState({
                id: data.id,
                code: data.code,
                name: data.name,
                userName: data.userName,
                password: '',
                phoneNumber: data.phoneNumber,
            })
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    onSubmit = async () => {
        if (!this.isValidData()) return;
        this.props.save(this.state);
    }
    isValidData = () => {
        let arr = ["code", "name", "userName", "phoneNumber"]
        if (this.state.id !== undefined && !this.state.id) arr.push("password");
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                // messageService.messageNotify('', ('Please enter ' + arr[i]), 'warning');
                return false;
            }
        }
        return true;
    }
    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.isOpenModal}
                    toggle={() => { this.toggle() }}
                    className={"modal-lg"}
                >
                    <ModalHeader toggle={() => { this.toggle() }}>{this.props.titleModal}</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="mb-1 col-md-6">
                                <label className="form-label">Code</label>
                                <input type="text" className="form-control" placeholder="code"
                                    onChange={(event) => this.onChangeInput(event, "code")}
                                    value={this.state.code} />
                            </div>
                            <div className="mb-1 col-md-6">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="name"
                                    onChange={(event) => this.onChangeInput(event, "name")}
                                    value={this.state.name} />
                            </div>
                            <div className="mb-1 col-md-6">
                                <label className="form-label">User Name</label>
                                <input type="text" className="form-control" placeholder="UserName"
                                    onChange={(event) => this.onChangeInput(event, "userName")}
                                    value={this.state.userName} />
                            </div>
                            <div className="mb-1 col-md-6">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" placeholder="Password"
                                    onChange={(event) => this.onChangeInput(event, "password")}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="mb-1 col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input type="text" className="form-control" placeholder="Phone Number"
                                    onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                                    value={this.state.phoneNumber} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-xs' onClick={() => { this.onSubmit() }} color="primary" >
                            <i className="fas fa-save"></i> Save
                        </Button>{' '}
                        <Button className='btn-xs' onClick={() => { this.toggle() }} color="danger" >
                            <i className="fas fa-close"></i>  Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BTModal);
