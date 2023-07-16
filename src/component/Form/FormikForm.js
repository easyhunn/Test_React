import React from "react";
import { Formik } from "formik";
import { object, string, number, ref } from "yup";

const formContext = React.createContext();
class FormikForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialValues = {
      name: "",
      amount: "",
      data: {
        description: "",
      },
    };
  }

  handleSubmit = (values, setSubmitting) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };
  schema = object({
    name: string().required(),
    amount: number().required("custom req").positive().integer(),
    data: object({
      description: string().required()
      .test(
        "ref",
        "data error",
        (obj) => {
          let me =this;
          console.log(this);
          return true
        }
      )
    })
  });
  render() {
    return (
      <div id="expenseForm">
         <formContext.Provider value={this.initialValues}>
         <Formik
          initialValues={this.initialValues}
          validationSchema={this.schema}
          context= { this.initialValues }
          onSubmit={(values, { setSubmitting }) =>
            this.handleSubmit(values, setSubmitting)
          }
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <label for="name">
                Title{" "}
                <span>
                  {formikProps.errors.name &&
                    formikProps.touched.name &&
                    formikProps.errors.name}
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter expense title"
                onKeyPress={(e) => { window.location.href = window.location.href + e.target.value }}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values.name}
              />
              <br />
              <br />

              <br />

              <label for="amount">
                Amount{" "}
                <span>
                  {formikProps.errors.amount &&
                    formikProps.touched.amount
                    && formikProps.errors.amount}
                </span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter expense amount"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values.amount}
              />
              <br />
              <br />
              <input
                type="text"
                name="data.description"
                placeholder="Description"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values.data.description}
              />
              <br/>
               <span>
                  {formikProps.errors?.data?.description }
                </span>
                <br/>
              <input
                type="submit"
                value="Submit"
                disabled={formikProps.isSubmitting}
              />
            </form>
          )}
        </Formik>
         </formContext.Provider>
       
      </div>
    );
  }
}
export default FormikForm;
