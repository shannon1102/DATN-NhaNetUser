import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AuthContext } from '../../../context/AuthContext';
import useFetch from '../../../hooks/useFetch';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { format } from 'date-fns';


export default function DepositTransactionTable() {
    const {user} = React.useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    opts.headers.Authorization = "Bearer " + user.token;
    
    const [list, setList] = useState();
    let {data,isFetching,error} = useFetch(`${process.env.REACT_APP_BASE_URL}/deposits/me`,opts)
    console.log("Data",data);
    
    console.log("Dataaaaaa", data);
    useEffect(() => {
      setList(data);
    }, [data])


    const handleDelete = async (id) => {
        try {
          console.log("Opts", id);
          await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/deposits/${id}`,
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
                <div
                  className="deleteButton"
                  onClick={() => {
                    console.log("<><<<<<", params);
                    handleDelete(params.row?.id);
                  }}
                >
                  Delete
                </div>
              </div>
            );
          },
        },
      ];
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: "customerName",
            headerName: "Tên người đặt cọc",
          },
          {
            field: "customerEmail",
            headerName: "Email người đặt cọc",
          },
          {
            field: "customerPhone",
            headerName: "Số điện thoại",
          },
          {
            field: "createdAt",
            headerName: "Ngày tạo",
            renderCell: (params) => {

            return  format(new Date(params.row.createdAt),"dd/MM/yyyy")
            }
          },
          {
            field: "price",
            headerName: "Số tiền đặt cọc",
          },
         {
          field: "ownerName",
          headerName: "Người bán",
          type: "text",
          renderCell: (params) => {
            return <div className="rowitem">{params.row.product.user.name}</div>;
          }
        
        },
         {
          field: "ownerPhone",
          headerName: "SĐT người bán",
          type: "text",
       
          renderCell: (params) => {
            return <div className="rowitem">{params.row.product.user?.phone || ""}</div>;
          }
        }, {
          field: "productId",
          headerName: "ID SP",
          type: "text",
        },
        {
          field: "productName",
          headerName: "Tiêu đề",
          type: "text",
          renderCell: (params) => {
            return <div className="rowitem">{params.row.product.title || ""}</div>;
          }
        }
      ];
      
      
   

  return (
    <Box sx={{width: "100%",minWidth:"1200px" }}>
        {list  && <DataGrid
        autoHeight ={true}
        rows={list}
        // columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        columns = {columns.concat(actionColumn)}

        disableRowSelectionOnClick
        autoWidth={true}
        getRowId={(row) => row?.id}
      />}
     </Box>
  );
}
