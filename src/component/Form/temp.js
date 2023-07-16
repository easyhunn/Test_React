import React, { Component } from "react";
import { emitter } from "../../utils/emitter";
import { connect } from "react-redux";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import FormSelect from "../Input/FormSelectComponent";
import { Formik } from "formik";
import { string, object } from "yup";

class FormikForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        domain: "",
        clientId: "",
        origin: "",
        port: "",
        isRadioType: "",
      },
      listDataClient: [
        {
          value: "",
          label: "id"
        }
      ],
      filterModel: {},
    };

    this.listenEmitter();
  }
  componentDidMount() {
    // this.getListChildrenClient();
  }
  listenEmitter = () => {
    emitter.on("CLEAR_DATA_MODAL", () => {
      this.setState({
        data: {
          domain: "",
          clientId: "",
          origin: "",
          port: "",
          isRadioType: "https",
        },
      });
    });
    emitter.on("DATA_MODAL", (data) => {
      this.setState({
        data: {
          id: data.id,
          domain: data.domain,
          clientId: data.clientId,
          origin: data.origin,
          port: data.port,
          isRadioType: data.isRadioType,
        },
      });
    });
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  toggle = () => {
    this.props.toggleFromParent();
  };
  onSubmit(data) {
    debugger
    alert(data);
    // this.props.save(data);
  }
  getListChildrenClient = async () => {

  };

  render() {
    const action = this.props.action;

    let schema = object({
      clientId: string().trim().required("Please select client"),
      domain: string()
        .matches(
          /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/,
          "Enter correct url!"
        )
        .required("Please enter domain")
    });

    return (
      <>
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              debugger
              this.onSubmit(values);
            }}
            enableReinitialize={true}
            initialValues={this.state.data}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
            }) => {
              return (
                <Form
                  onSubmit={handleSubmit}
                  onKeyPress={(ev) => {
                    ev.stopPropagation();
                  }}
                  className="form-validated"
                >
                  <ModalHeader
                    toggle={() => {
                      this.toggle();
                    }}
                  >
                    {this.props.titleModal}
                  </ModalHeader>
                  <ModalBody>
                    <div className="row">
                      <div className="mb-1 col-md-6">
                        <label className="form-label">
                          Client <span className="text-danger">*</span>
                        </label>

                        <FormSelect
                          className="custom-select"
                          options={this.state.listDataClient}
                          onChange={(obj) =>
                            setFieldValue("clientId", obj.value)
                          }
                          value={values.clientId}
                          defaultValue={values.clientId}
                        />
                        {errors.clientId && (
                          <div className="invalid-feedback">
                            {errors.clientId}
                          </div>
                        )}
                      </div>

                      <div className="mb-1 col-md-6">
                        <label className="form-label">
                          Domain <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Domain"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="domain"
                          value={values.domain || ""}
                          className="form-control"
                          readOnly={action === "Edit" ? true : false}
                        />
                        {errors.domain && touched.domain && (
                          <div className="invalid-feedback">
                            {errors.domain}
                          </div>
                        )}
                      </div>
                    </div>
                    
                  </ModalBody>
                  <ModalFooter>
                    <Button className="btn-xs" type="submit" color="primary">
                      <i className="fas fa-save"></i> Save
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);
