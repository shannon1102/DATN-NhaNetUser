import { Card, Paper } from "@material-ui/core";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import "./checkoutSucces.css";
import Topbar from "../../topbar/Topbar";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Sidebar from "../../sidebar/Sidebar";
// import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function PaySuccess() {
  const rows = { id: 1, lastName: "Snow", firstName: "Jon", age: 35 };
  return (<>
      <Topbar></Topbar>
      <div className="bodyContainer">
        <Sidebar></Sidebar>
        <div className="checkoutSucess">
          <Grid container spacing={2} component={Paper}>
            <Grid item xs={12}>
            <div className="messageHeader">
            <CheckCircleOutlineIcon className="iconSuccess"></CheckCircleOutlineIcon>
              <Typography
                className="notifyPaySuccessTitle"
                variant="h5"
                gutterBottom
              >
                Bạn đã đặt cọc thành công !!!
              </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
             
            <Typography className="notifyPaySuccess" variant="subtitle1">
                Xem lại hóa đơn thanh toán đặt cọc qua email tra lại mail
              </Typography>
           
            </Grid>
            {/* <Grid item xs={12}>
              <Box sx={{ height: "200px", width: "100%" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Id sản phẩm</TableCell>
                        <TableCell align="right">Tên sản phẩm</TableCell>
     
                        <TableCell align="right">Người đặt cọc</TableCell>
                        <TableCell align="right">Số điện thoại </TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">
                         Thời gian
                        </TableCell>
                        <TableCell align="right">
                          Số tiền 
                        </TableCell>
                        <TableCell align="right">
                          Phương thức thanh toán
                        </TableCell>
                        <TableCell align="right">
                          Phương thức thanh toán
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key={rows.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {rows.lastName}
                        </TableCell>
                        <TableCell align="right">{rows.id}</TableCell>
                        <TableCell align="right">{rows.id}</TableCell>
                        <TableCell align="right">{rows.id}</TableCell>
                        <TableCell align="right">{rows.id}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid> */}
          </Grid>
        </div>
      </div>
    </>)
}
 