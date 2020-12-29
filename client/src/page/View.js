import React,{useState} from "react";
import {Grid, Button,makeStyles } from '@material-ui/core'
import CreateProjectModal from "../components/CreateProjectModal";

const useStyles = makeStyles({
   
})

const View = () => {
    const classes= useStyles()
    const [isOpen, setIsOpen] = useState(false)
  return (
    <Grid container  alignItems='center' justify='center'>
        <Grid item>
      <Button variant="contained" color="primary" onClick={ () => setIsOpen(!isOpen)}>
        Open
      </Button>
      {
          isOpen && <CreateProjectModal  open={isOpen} setOpen={setIsOpen}/>
      }
      </Grid>
    </Grid>
  );
};

export default View;
