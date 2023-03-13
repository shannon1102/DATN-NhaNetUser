import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

export default function ManageProductTable() {
  const { user } = React.useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + user.token;

  const [list, setList] = useState();
  let { data, isFetching, error } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/products?userId=${user.id}`,
    opts
  );
  console.log("Data?????????????", data);

  console.log("Dataaaaaa??????????", data);
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      console.log("Opts", id);
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`,
        opts
      );
      setList(list.filter((item) => item.id !== id));
    } catch (err) {}
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="deleteButton"
              onClick={() => {
                console.log("<><<<<<", params);
                handleDelete(params.row?.id);
              }}
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 200,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 200,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 200,
  },
  {
    field: "numFloors",
    headerName: "Tầng",
    width: 100,
  },
  {
    field: "numBedRooms",
    headerName: "Phòng ngủ",
    width: 100,
  },
  {
    field: "squaredMeterArea",
    headerName: "Diện tích",
    width: 100,
  },
  {
    field: "lengthMeter",
    headerName: "Dài",
    width: 100,
  },
  {
    field: "widthMeter",
    headerName: "Rộng",
    width: 100,
  },

  {
    field: "houseType",
    headerName: "Loại nhà",
    width: 100,
  },
  {
    field: "detailAddress",
    headerName: "Địa chỉ cụ thể",
    width: 200,
  },
  {
    field: "ward",
    headerName: "Xã/Phường",
    width: 100,
  },
  {
    field: "district",
    headerName: "Quận/Huyện",
    width: 100,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 100,
  },

  ];

  return (
    <Box sx={{ width: "100%", minWidth: "1200px" }}>
      {list && (
        <DataGrid
          autoHeight={true}
          rows={list}
          // columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          columns={columns.concat(actionColumn)}
          disableRowSelectionOnClick
          autoWidth={true}
          getRowId={(row) => row?.id}
        />
      )}
    </Box>
  );
}
