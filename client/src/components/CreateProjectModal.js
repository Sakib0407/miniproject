import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { useForm } from "react-hook-form";
import {
    DatePicker,MuiPickersUtilsProvider
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
 import axios from 'axios'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 420,
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    padding: "40px 40px",
    boxShadow: theme.shadows[5],
    borderRadius: " 6px",
  },
  header: {
    paddingBottom: "20px",
  },
  heading: {},
  icon: {
    marginTop: "5px",
    marginRight: "0px",
    cursor: "pointer"
  },
  input: {
    border: "2px solid #ededed",
    marginTop: "20px",
    width: "330px",
    height: "45px",
    padding: "10px",
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
    },
    " &::placeholder": {
      fontSize: "16px",
      color: "#ccc",
      fontWeight: "400",
      letterSpacing: ".2px",
      fontFamily: "Inter",
    },
  },
  textarea: {
    height: "100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    marginTop: "15px",
    padding: "2px 8px",
  },
  textFont: {
    color: "#a3a3a3",
    fontSize: "17px",
    fontWeight: "500",
  },
  priceFont: {
    color: "#b8b6b6",
    fontSize: "16px",
    fontWeight: "400",
  },
  button:{
      padding: '10px 25px',
      marginTop: '20px',
      backgroundColor:'#0276FD'
  },
  underline: {
    "& .MuiInput-underline:before": {
      borderBottom: "none"
    },
    "&:hover .MuiInput-underline:before": {
        borderBottom: "none"
      },
    "& .MuiInput-underline:after": {
      borderBottom: "none"
    }
  }
}));

export default function CreateProjectModal({ open, setOpen }) {
    const { handleSubmit, register, errors } = useForm({});
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [state, setState] = React.useState({
    name: "",
    summary: "",
    cost: 0
  })
  const [fees, setFess]= useState(0)
  const [amount, setAmount]= useState(0)
  
  let total = 0
  

  const { name,summary,cost} = state
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async() =>{

  //   const { data } = await axios.post('http://localhost:3000/project',
  //   {name, summary ,date,cost})
  //   console.log(data)
  handleClose()
   }
  const handleDate = ( ) =>{
      
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid
        container
        className={classes.header}
        alignItems="center"
        justify="space-between"
      >
        <Grid item></Grid>
        <Grid item>
          <Typography variant="h4" fontWeight="bold">
            Create Project
          </Typography>
        </Grid>
        <Grid item className={classes.icon} onClick={handleClose}>
          <ClearIcon />
        </Grid>
      </Grid>
      <Divider />
      <Grid container></Grid>
      <Grid container className={classes.form}>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <Grid
            container
            direction="column"
            alignitem="center"
            justify="center"
          >
            <Grid item>
              <input placeholder="Title" name='name' onChange={handleChange} className={classes.input} ref={register({ required: true, maxLength: 10 })} />
              {errors.name?.type === "required" && "Title cannot be empty"}
      {errors.name?.type === "maxLength" && "Your input exceed maximun length"}
            </Grid>
            <Grid item>
              <textarea
                placeholder="Description"
                className={`${classes.input}  ${classes.textarea}`} onChange={handleChange} name='summary' ref={register({ required: true, maxLength: 200 })}
              />
               {errors.summary?.type === "required" && "Description cannot be empty"}
      {errors.summary?.type === "maxLength" && "Your input exceed maximun length"}
            </Grid>
            <Grid item>
              <input
                placeholder="Upload Attachment"
                name='Upload'
                className={classes.input} ref={register} 
              disabled/>
            </Grid>
            <Grid item>
            <MuiPickersUtilsProvider todayLabel    utils={DateFnsUtils}>
            <DatePicker minDate={new Date()}     className={`${classes.input} ${classes.underline}`} value={date}  onChange={ () => setDate(date)}/>
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <input placeholder="cost Cost" onChange={handleChange} name='cost'className={classes.input}ref={register({required: true, min: 100, max: 10000})} />
              {errors.cost && "Cost must be between 100-100000"}

            </Grid>
          </Grid>
       
      <Grid container className={classes.price}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.textFont} variant="subtitle1">
              CleverX transaction fees(20%)
            </Typography>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Typography className={classes.priceFont} variant="subtitle1">
             {fees}
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.textFont} variant="subtitle1">
              Total amount in $USD
            </Typography>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Typography className={classes.priceFont} variant="subtitle1">
            { amount}
            </Typography>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.price} justify='center'>
        <Button className={classes.button}  type='submit' variant="contained" color="primary">
         Create cost
        </Button>
      </Grid>
      </form>
      </Grid>
      
    </div>
  );

  return (
    <Grid container alignItems="center" justify="center">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Grid>
  );
}
