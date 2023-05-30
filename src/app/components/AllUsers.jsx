

import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button
} from "@mui/material";


import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

import {  useNavigate } from 'react-router-dom';



function AllUSers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setuser] = useState([]);
  const [update, setupdate] = useState();
  const [totalrecord, settotalrecord] = useState("");
  const navigate = useNavigate();


  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = ` ${token}`;
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage ?? page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getuser();

  }, [update, page, rowsPerPage]);

  const getuser = () => {

    axios
      .get(`http://localhost:3000/admin/userget?limit=${rowsPerPage}&page=${page}`)
      .then((res) => {
        settotalrecord(res.data.data.count);
        return setuser(res.data.data.user);
      });
  };

  const handleClick = (row) => {
    // console.log(row);
    axios.post(`http://localhost:3000/admin/userstatusupadate?id=${row._id}`)
      .then((response) => {
        console.log(response.data);
        getuser();
      })
  }

  const viewuser = (row) => {
    // console.log(row);
    const rowid = row._id;
    navigate('/viewuser',{state:rowid})
    // axios.get(`http://localhost:3000/admin/viewuser?id=${row._id}`)
    // .then((response) => {
    //   console.log(response.data);
    //   const statusdata = response.data
      // console.log("navigate");  
    // })
  }


  return (
    <div>


      <Table
        sx={{ minWidth: 650 }}
        style={{ border: "2px solid black" }}
        className="text-lg"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow style={{ width: 100 }}>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              No.
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Image
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              UserName
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Email
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Age
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Gender
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Mobile No
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              status
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              View
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {user?.map((row, i) => (
            <TableRow
              style={{ border: "2px solid black" }}
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">
                <img
                  src={"http://localhost:3000/" + row?.image}
                  height="70px"
                  width="100px"
                  alt="image"
                  srcset=""
                />
              </TableCell>

              <TableCell align="left">{row?.userName}</TableCell>
              <TableCell align="left">{row?.email}</TableCell>

              <TableCell align="left">{row?.age ? row?.age : "-"}</TableCell>
              <TableCell align="left">{row?.gender ? row?.gender : "-"}</TableCell>
              <TableCell align="left">{row?.mobileNo ? row?.mobileNo : "-"}</TableCell>
              <TableCell align="left" >
                <Button
                  style={{ margin: "0 0 0 0px", width: "100px" }}
                  color="primary"
                  variant="outlined"
                  type="submit"
                  onClick={() => handleClick(row)}
                >
                  {row?.status === true ? "Active" : "Inactive"}  
                </Button>
              </TableCell>
              <TableCell align="left" >
                <Button
                  style={{ margin: "0 0 0 0px", width: "100px" }}
                  color="primary"
                  variant="filled"
                  type="submit"
                  onClick={() => viewuser(row)}
                >
                  View
                </Button>
              </TableCell>

              {/* <Button
                  style={{ margin: "0 0 0 0px", width: "80px" }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => handleClick(row)}
                >
                  Update
                </Button> */}
              {/* <Button
                  style={{ margin: "0 0 0 3px", width: "75px" }}
                  // startIcon={<DeleteIcon />}
                  color="secondary"
                  variant="contained"
                  type="submit"
                  onClick={() => handleClickDelete(row)}
                >
                  Delete
                </Button> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalrecord}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </div>
  );
}

export default AllUSers;
