import LoginForm from "../LoginPage/Login";
import Dashboard from "../Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import ComplaintsTable from "../TableComponent/Complaints/Table"
import UserTable from "../TableComponent/UserTable/Table"
import CarsTable from "../TableComponent/CarsTable/Table"
import PaymentTable from "../TableComponent/PaymentTable/Table";
import Menu from '../MenuComponent/Menu';

const App = () => {
  return (
    <Routes>
      <Route
        path="/cars"
        Component={() => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: 10 + "px",
              }}
            >
              <Menu />
              <CarsTable />
            </div>
          );
        }}
      />
      <Route
        path="/users"
        Component={() => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: 10 + "px",
              }}
            >
              <Menu />
              <UserTable />
            </div>
          );
        }}
      />{" "}
      <Route
        path="/complaints"
        Component={() => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: 10 + "px",
              }}
            >
              <Menu />
              <ComplaintsTable />
            </div>
          );
        }}
      />
            <Route
        path="/payment"
        Component={() => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: 10 + "px",
              }}
            >
              <Menu />
              <PaymentTable />
            </div>
          );
        }}
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
