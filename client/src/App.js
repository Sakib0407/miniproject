import { Grid,makeStyles } from "@material-ui/core";
import View from "./page/View";

const useStyles = makeStyles({
  root:{
      height:'100vh'
  }
})
function App() {
  const classes= useStyles()
  return (
    <>
   
    <Grid  className={classes.root} container alignItems='center' justify='center' >
     <View />
    </Grid>
    </>
  );
}

export default App;
