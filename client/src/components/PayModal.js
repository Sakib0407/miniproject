import React, { useState,useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, Typography, Divider, Button, Hidden } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserContext } from "../Context";

import IMG from "../img/VBM_COF.png";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";

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
    width: 490,
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
    cursor: "pointer",
  },
  arrow: {
    color: "#0276FD",
  },
  box: {
    marginTop: "25px",
    padding: "5px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid #ededed",
    borderRadius: "4px",
    cursor: "pointer",
  },
  check: {
    color: "#43a047",
  },
  visa: {
    width: "70px",
    marginLeft: "4px",
  },
  priceFont: {
    color: "#b8b6b6",
    fontSize: "16px",
    fontWeight: "500",
    justifySelf: "flex-end",
    marginBottom: "3px",
  },
  imgbox: {
    display: "flex",
    alignItems: "center",
  },
  select: {
    border: "2px solid #0276FD",
  },
  hidden: {
    display: "hidden",
    color: "#fff",
  },
  add: {
    marginBottom: "0",
    fontSize: "20px",
    marginLeft: "20px",
    padding: "4px 10px",
  },
  button:{
    padding: '10px 25px',
    marginTop: '20px',
    backgroundColor:'#0276FD'
},
btgird:{
    paddingTop: '80px'
}
}));

export default function PayModal({ pay, setPay }) {
  const classes = useStyles();
  const cont =  useContext(UserContext)

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [check, setCheck] = React.useState(true);

  const handleClose = () => {
    cont.fetch()
    setPay(false);
  };
  const onSubmit = async () => {
    //   const { data } = await axios.post('http://localhost:3000/project',
    //   {name, summary ,date,cost})
    //   console.log(data)
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid
        container
        className={classes.header}
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <ArrowBackIcon className={classes.arrow} />
        </Grid>
        <Grid item>
          <Typography variant="h4" fontWeight="bold">
           Choose Card
          </Typography>
        </Grid>
        <Grid item className={classes.icon} onClick={handleClose}>
          <ClearIcon />
        </Grid>
      </Grid>
      <Divider />
      <div style={{ marginTop: "50px" }}>
        <div
          className={
            check ? `${classes.box} ${classes.select}` : `${classes.box}`
          }
          onClick={() => setCheck(true)}
        >
          <div item className={classes.imgbox}>
            {check ? (
              <CircleChecked className={classes.check} />
            ) : (
              <CircleChecked className={classes.hidden} />
            )}
            <img src={IMG} className={classes.visa} />
          </div>

          <div>
            <Typography variant="subtitle1" className={classes.priceFont}>
              Visa credit card ending with 5453
            </Typography>
          </div>
        </div>
        <div
          className={
            !check ? `${classes.box} ${classes.select}` : `${classes.box}`
          }
          onClick={() => setCheck(false)}
        >
          <div item className={classes.imgbox}>
            {!check ? (
              <CircleChecked className={classes.check} />
            ) : (
              <CircleChecked className={classes.hidden} />
            )}

            <img src={IMG} className={classes.visa} />
          </div>

          <div>
            <Typography variant="subtitle1" className={classes.priceFont}>
              Visa credit card ending with 6234
            </Typography>
          </div>
        </div>
        <div className={classes.box}>
          <Typography
            variant="subtitle1"
            className={`${classes.priceFont} ${classes.add}`}
            style={{
              marginBottom: "0",
              fontSize: "20px",
              marginLeft: "20px",
              padding: "4px 10px",
            }}
          >
            + Add Card
          </Typography>
        </div>
      </div>
      <Grid className={classes.btgird} container justify='center'>
      <Button className={classes.button}  type='submit' variant="contained" onClick={  handleClose} >
         Pay
        </Button>
        </Grid>
    </div>
  );

  return (
    <Grid container alignItems="center" justify="center">
      <Modal
        open={pay}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Grid>
  );
}
