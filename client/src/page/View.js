import React, { useState, useContext, useEffect } from "react";
import { Grid, Button, makeStyles, Typography } from "@material-ui/core";
import CreateProjectModal from "../components/CreateProjectModal";
import PayModal from "../components/PayModal";
import { UserContext } from "../Context";
import DescriptionIcon from "@material-ui/icons/Description";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";

const useStyles = makeStyles({
  succes: {
    width: "500px",
    
  },
  bg: {
    width: "500px",
    margin: "4px 0",
    padding: "30px 35px",
    backgroundColor: "#fafafb",
  },
  icon: {
    marginRight: "10px",
    color: "#66bb6a",
  },
  blue: {
    fontSize: "23px",
    color: "#42a5f5",
    fontStyle: "italic",
  },
  textFont: {
    color: "#343434",
    fontWeight: "600",
  },
  priceFont: {
    color: "#b8b6b6",
    fontSize: "14px",
    fontWeight: "400",
  },
  sub: {
    color: "#747474",
    fontWeight: "500",
    fontSize: "17px",
  },
  small: {
    color: "#42a5f5",
  },
  h6: {
    fontSize: "16px",
    color: "#212121",
    fontWeight: "500",
    marginLeft: "14px",
  },
  button:{
    padding: '10px 25px',
    marginTop: '20px',
    backgroundColor:'#0276FD'
},
});

const View = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [pay, setPay] = useState(false);
  const [data, setData] = useState();
  const cont = useContext(UserContext);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setData(cont.api);
    cont.api && setTax((cont.api.cost / 100) * 20);
  }, [cont.api]);
  console.log(data, cont.tax);
  return (
    <Grid container alignItems="center" justify="center">
      {data ? (
        <Grid container className={classes.succes}>
          <Grid container justify="flex-end" alignItems="center">
            <DescriptionIcon className={classes.icon} />
            <Typography className={classes.blue} variant="h4">
              Your project request
            </Typography>
          </Grid>
          <Grid container className={classes.bg}>
            <Grid container justify="space-between" alignItems="flex-start">
              <Grid item>
                <Typography className={classes.textFont} variant="h4">
                  I'll be your businees expert
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="flex-end">
                  <Typography variant="h4" color="primary">
                    {`$ ${data.cost}`}
                  </Typography>
                  <Typography className={classes.priceFont} variant="subtitle1">
                    {`Total:${tax}`}
                  </Typography>
                  <Typography className={classes.priceFont} variant="subtitle1">
                    (CleverX fees + 20%)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.bg}>
            <Grid container justify="space-between" alignItems="flex-start">
              <Grid item>
                <Typography className={classes.sub} variant="h4">
                  Instead of the typical seamless color transisiton you see in
                  gradient
                </Typography>
              </Grid>
              <Grid container spacing={6}>
                <Grid item>
                  <Grid container alignItems="center">
                    <CalendarTodayOutlinedIcon
                      className={classes.small}
                      fontsize="small"
                    />
                    <h6 className={classes.h6}>2 dilivery date</h6>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <CalendarTodayOutlinedIcon
                      className={classes.small}
                      fontsize="small"
                    />
                    <h6 className={classes.h6}>Attachment</h6>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify='flex-end'>
            <Button className={classes.button}  type='submit' variant="contained" color="primary">
             Cancel
        </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            Open
          </Button>
          {isOpen && (
            <CreateProjectModal
              pay={pay}
              setPay={setPay}
              open={isOpen}
              setOpen={setIsOpen}
            />
          )}
          {pay && <PayModal pay={pay} setPay={setPay} />}
        </Grid>
      )}
    </Grid>
  );
};

export default View;
