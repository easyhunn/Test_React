import React, { Component } from "react";
import { emitter } from "../../utils/emitter";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import FormSelect from "../Input/FormSelectComponent";
import { Formik } from "formik";
import { string, object } from "yup";
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class FormikForm2 extends Component {
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
  onChangeRadioType = (e) => {
    this.setState(
      (prevState) => ({
        data: {
          ...prevState.data,
          isRadioType: e.target.value,
        },
      }),
      () => console.log(this.state.data.isRadioType)
    );
  };
  onSubmit(data) {
    alert(data);
    // this.props.save(data);
  }
  getListChildrenClient = async () => {
    // let res = await userService.getListChildrenClient(this.state.filterModel);
    // if (res == 0) {
    //   return;
    // } else if (res.isSuccess) {
    //   this.setState({
    //     listDataClient: [],
    //   });
    //   if (res.data) {
    //     res.data.forEach((item) => {
    //       let objTemp = {
    //         value: item.id,
    //         label: item.title,
    //       };
    //       this.state.listDataClient.push(objTemp);
    //     });
    //   }
    // } else {
    //   messageService.messageNotify("", res.message, "warning");
    //   return;
    // }
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
        .required("Please enter domain"),

      origin: string("Enter your OriginIP / Origin domain")
        .required("OriginIP / Origin domain is required")
        .test(
          "test-name",
          "Please enter the origin IP (multiple IP separated by “;” support up to 500 characters) or origin domain(maximum 1 domain).",
          (value) => {
            // Regex expression for validating IPv4
            const regexIPv4 =
              /(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/;

            // Regex expression for validating IPv6
            const regexIPv6 = /((([0-9a-fA-F]){1,4})\:){7}([0-9a-fA-F]){1,4}/;
            const domainRegex =
              /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/;

            if (value === undefined || value.trim() === "") return true;
            const arr = value.split(";");
            let isValid = false;
            let isValidIP = false;
            let isValidDomain = false;
            if (
              regexIPv4.test(arr[0].trim()) ||
              regexIPv6.test(arr[0].trim())
            ) {
              isValidIP = true;
            } else {
              if (domainRegex.test(arr[0].trim())) {
                isValidDomain = true;
              }
            }
            // const lstTemp = arr.shift();
            arr.forEach((item) => {
              if (item) {
                if (isValidIP) {
                  if (
                    regexIPv4.test(item.trim()) ||
                    regexIPv6.test(item.trim())
                  ) {
                    isValid = true;
                  } else {
                    isValid = false;
                    return false;
                  }
                } else {
                  if (isValidDomain) {
                    if (domainRegex.test(item.trim())) {
                      isValid = true;
                    } else {
                      isValid = false;
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
              }
            });
            if (isValid) return true;
            else return false;
          }
        ),

      port: string()
        .matches(
          /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
          "Enter correct port!"
        )
        .required("Please enter port"),
    });

    return (
      <>
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
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
                    <div className="row">
                      <div className="mb-1 col-md-12 d-flex">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioType"
                            checked={values.isRadioType === "http"}
                            onChange={this.onChangeRadioType}
                          />
                          <label
                            className="form-label"
                            style={{ marginTop: "7px" }}
                          >
                            Http
                          </label>
                        </div>
                        <div
                          className="form-check"
                          style={{ marginLeft: "10px" }}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioType"
                            checked={values.isRadioType === "https"}
                            onChange={this.onChangeRadioType}
                          />
                          <label
                            className="form-label"
                            style={{ marginTop: "7px" }}
                          >
                            Https
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-1 col-md-12">
                        <label className="form-label">
                          Origin IP / Origin Domain
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Origin IP / Origin Domain"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="origin"
                          value={values.origin || ""}
                          className="form-control"
                        />
                        {errors.origin && touched.origin && (
                          <div className="invalid-feedback">
                            {errors.origin}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-1 col-md-6">
                        <label className="form-label">
                          Port <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Port"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="port"
                          value={values.port || ""}
                          className="form-control"
                        />
                        {errors.port && touched.port && (
                          <div className="invalid-feedback">{errors.port}</div>
                        )}
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="btn-xs btn btn-light"
                      onClick={() => {
                        this.toggle();
                      }}
                      style={{ color: "#181f39" }}
                    >
                      <i className="fas fa-close"></i> Cancel
                    </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(FormikForm2);
