import "./deposit.css";
// import Widget from "../../components/widget/Widget";
import Topbar from "../../components/topbar/Topbar";
import DepositTable from "./table/DepositTable";
import Sidebar from "../../components/sidebar/Sidebar";
import { Paper } from "@mui/material";

const Deposit = () => {
  return (
    <div className="home">
      <Topbar />
      <div className="depositBody">
        <Sidebar></Sidebar>
        <div className="depositContainer">
          <Paper>
            <h1>Danh sách giao dịch</h1>
            <hr></hr>
          </Paper>

          <div className="listContainer">
            <DepositTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
