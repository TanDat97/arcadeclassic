import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  text404:{
    fontSize: '5rem',
    marginBottom: 0,
  },
}));

export default function Admin404(props) {
  const classes = useStyles();
  const gotoDashboard = () => {
    props.history.push('/admin/dashboard')
  }
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={8}>
          <Grid container direction="column" justify="center" alignItems="flex-start">
            <h1 className={classes.text404}>404</h1>
            <h3>OPP! This Page Could Not Be Found</h3>
            <Button variant="contained" color="primary" onClick={gotoDashboard}>
              Go to Dashboard
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
