import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CounterWrapper from "./component/Counter/CounterWrapper";
import Intro from "./component/Intro/Intro";
import ReactTable from "./component/Table/ReactTable";
import CustomModal from "./component/Modal/CustomModal";
import FormikForm from "./component/Form/FormikForm";
export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App appName="henryApp"/>}>
            <Route index element={<Intro />} />
            <Route path="Counter" element={<CounterWrapper />} />
            <Route path="Table" element={<ReactTable />} />
            <Route path="Modal" element={<CustomModal />} />
            <Route path="Form" element={<FormikForm />} />

            {/* <Route path="Intro" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }