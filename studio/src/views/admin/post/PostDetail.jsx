/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import clsx from 'clsx'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// core components
import GridItem from "components/common/Grid/GridItem"
import GridContainer from "components/common/Grid/GridContainer"
import CustomInput from "components/common/CustomInput/CustomInput"
import Button from "components/common/CustomButtons/Button"
import Card from "components/common/Card/Card"
import CardHeader from "components/common/Card/CardHeader"
import CardBody from "components/common/Card/CardBody"
import CardFooter from "components/common/Card/CardFooter"
import IOSSwitch from "components/common/CustomInput/IOSSwitch"

import { postAction } from '_actions'
// import Validate from 'utils/ValidateInput'

const useStyles = makeStyles(theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    width: '100%', // Fix IE 11 issue.
  },
  margin: {
    margin: '10px 0',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 200,
  },
}));

function PostDetail(props) {
  const classes = useStyles();
  const [postId, setPostId] = React.useState(0)
  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    if (params.toString() !== '') {
      const id = params.get('post_id')
      if (id) {
        setPostId(id)
        props.getOnePost({ post_id: id })
      }
    }
  }, [props.location.path])
  return (
    <div className={classes.root}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Title</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type='text'
                      labelWidth={40}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Overview</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type='text'
                      labelWidth={70}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Create Time</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type='text'
                      labelWidth={90}
                      value='aa'
                      disabled
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Update Time</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type='text'
                      labelWidth={90}
                      disabled
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3} md={3}>
                  <FormGroup className={clsx(classes.margin)}>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          // checked={state.checkedB}
                          // onChange={handleChange('checkedB')}
                          value="checkedB"
                        />
                      }
                      label="Block status"
                    />
                  </FormGroup>
                </GridItem>
                <GridItem xs={12} sm={3} md={3}>
                  <FormGroup className={clsx(classes.margin)}>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          // checked={state.checkedB}
                          // onChange={handleChange('checkedB')}
                          value="checkedB"
                        />
                      }
                      label="Enable comment"
                    />
                  </FormGroup>
                </GridItem>
                <GridItem xs={12} sm={3} md={3}>
                  <FormGroup className={clsx(classes.margin)}>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          // checked={state.checkedB}
                          // onChange={handleChange('checkedB')}
                          value="checkedB"
                        />
                      }
                      label="Verify Status"
                    />
                  </FormGroup>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOnePost: post_id => dispatch(postAction.adminGetOnePostRequest(post_id))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(PostDetail)