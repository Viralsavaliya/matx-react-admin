import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Radio,
  RadioGroup,
  Container,
  TextField,
  Typography,
  styled,
  Paper
} from "@mui/material";

import axios from "axios";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";





const validationSchema = yup.object({
  userName: yup
    .string("Enter Your Name")
    .min(2, "Min length")
    .max(50, "Max length"),
  password: yup
    .string("Enter Your password")
    .min(2, "Min length")
    .max(50, "Max length")
});

function ViewPost() {
  const [page, setPage] = useState(0);
  const [blog, setblog] = useState([]);
  const [data, setdata] = useState("");
  const [user, setuser] = useState("");
  const [update, setupdate] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(Date.now());
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [image, setimage] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const location = useLocation("/viewpost");

  console.log(location)




  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = ` ${token}`;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    fontSize: "20px",
    margin: "10px",
    // color: theme.palette.text.secondary,
  }));

  const getusers = () => {
    axios.get(`http://localhost:3000/admin/viewpost?id=${location.state}`)
      .then((res) => {
        setuser(res.data.data);
      })
  };

  const backtopage = () => {
    navigate('/post');
  }
  useEffect(() => {
    // setuser(location.state.data)
    getusers();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log('Error', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);







  return (
    <div>
      <Container >
        <Grid container spacing={2} style={{ border: "1px solid black", margin: "10px 0 ", borderRadius: "15px", padding: "5px" }}>
        <Grid xs={12} style={{ textAlign: "end" }}>
        <Button
            style={{ margin: "0 0 0 0px", width: "80px" , alignItems:"right"}}
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => backtopage()}
          >
            Back
          </Button>
          </Grid>
        
          <Grid xs={12} style={{ textAlign: "center" }}>
            <h1>View Post</h1>
          </Grid>
          <Grid item xs={4}>
            <div><img src={"http://localhost:3000/" + user?.image} width="100%" height="30%" alt="" srcset="" /></div>
            <div style={{ textAlign: "center", width: "100%", marginTop: 3 }}>
              <div>
                
              </div>
            </div>
          </Grid>
          <Grid item xs={8} >
            <Item><b>Title:</b>{user?.title}</Item>
            <Item><b>Discripation:</b><p dangerouslySetInnerHTML={{ __html: user.discripation }} /></Item>
          </Grid>
        </Grid>



      </Container>
    </div>
  );
}

export default ViewPost;

