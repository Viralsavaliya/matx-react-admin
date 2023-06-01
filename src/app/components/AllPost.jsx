import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Popover,
  Typography
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';



function AllPost() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [post, setpost] = useState([]);
  const [update, setupdate] = useState();
  const [totalrecord, settotalrecord] = useState("");
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [ids, setids] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event,row) => {
    console.log(row,"rowrow")
    setids(row._id)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const handleOptionSelect = (option) => {
      console.log(option);
      console.log(ids);
      setSelectedOption(option); 
      handleClose();

      axios.post(`http://localhost:3000/admin/poststatusupadate?id=${ids}`, {status:option})
      .then((response) => {
        console.log(response.data);
        getuser();
        selectedOption("")
        console.log(selectedOption ,"selected");
      })
    };

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;


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
      .get(`http://localhost:3000/admin/allpost?limit=${rowsPerPage}&page=${page}`)
      .then((res) => {
        settotalrecord(res.data.data.count);
        return setpost(res.data.data.post);
      });
  };

  // const handleClickone = () => {
  //   console.log(selectedOption);
 

  // }

  const viewuser = (row) => {
    console.log(row);
    const rowid = row._id;
    navigate('/viewpost', { state: rowid })
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
              Title
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              discripation
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
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Action  
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {post?.map((row, i) => (
            <TableRow
              style={{ border: "2px solid black" }}
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">
              {row?.image ?
                (<img
                  src={"http://localhost:3000/" + row?.image}
                  width="100%"
                  height="30%"
                  alt=""
                  srcset="" />)
                : (<video
                  src={"http://localhost:3000/" + row?.video}
                  controls
                  height="100px"
                  width="100%"
                />)
              }
              </TableCell>

              <TableCell align="left">{row?.title}</TableCell>
              <TableCell align="left">
                {" "}
                <div dangerouslySetInnerHTML={{ __html: row.discripation }} />
              </TableCell>
              <TableCell align="left">
              {row.status === 'Pending' ? (
                  <Button  variant="contained" >
                    {row.status}
                  </Button>
                ) : row.status === 'Approved' ? (
                  <Button  variant="contained" color="success" >
                    {row.status}
                  </Button>
                ) : row.status === 'Rejected' ? (
                  <Button  variant="contained" color="error">
                    {row.status}
                  </Button>
                ) : null}
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

              <TableCell align="left">
                  <Button onClick={(event)=> handleClick(event,row)}>
                  {/* <FontAwesomeIcon icon={faEllipsisAlt}  /> */}Edit
                  </Button>
                

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    <Button onClick={() => handleOptionSelect(0, row)}>Pending</Button>
                    <br />
                    <Button color="success" onClick={() => handleOptionSelect(1, row)}>
                      Approved
                    </Button>
                    <br />
                    <Button color="error" onClick={() => handleOptionSelect(2, row)}>
                      Rejected
                    </Button>
                  </Typography>
                </Popover>
              </TableCell>
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

export default AllPost;



