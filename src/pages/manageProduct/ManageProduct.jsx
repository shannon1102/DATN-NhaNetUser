
import Sidebar from "../../components/sidebar/Sidebar";
import { Paper } from "@mui/material";

import ManageProductTable from "./ManageProductTable";
import Topbar from "../../components/topbar/Topbar";

const ManageProduct = () => {
  return (
    <div className="home">
      <Topbar />
      <div className="depositBody">
        <Sidebar></Sidebar>
        <div className="depositContainer">
          <Paper>
            <h1>Danh sách tin bán:</h1>
            <hr></hr>
          </Paper>

          <div className="listContainer">
            {/* <DepositTable /> */}
            <Paper>
              <ManageProductTable></ManageProductTable>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
