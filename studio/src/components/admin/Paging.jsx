import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

// import Validate from 'utils/ValidateInput'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center'
  },
  formControl: {
    marginLeft: theme.spacing(4)
  }
}));

function Paging(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Pagination count={props.count} page={props.page} onChange={props.handlePageChange} variant="outlined" shape="rounded" color="secondary" />
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.limit}
          onChange={props.handleLimitChange}
          autoWidth
          placeholder="Limit"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
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

export default compose(withConnect)(Paging)