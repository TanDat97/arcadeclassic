/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles"
// import { Grid, Button } from "@material-ui/core"

// import { postAction } from '_actions'
// import Validate from 'utils/ValidateInput'

const useStyles = makeStyles(theme => ({

}));

function PostDetail(props) {
  const classes = useStyles();
  const [id, setId] = React.useState(0)
  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    if (params.toString() !== '') {
      const id = params.get('id')
      if (id) {
        setId(id)
      }
    }
  }, [props.location.path])
  return (
    <div className={classes.root}>
      detail post {id}
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
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(PostDetail)