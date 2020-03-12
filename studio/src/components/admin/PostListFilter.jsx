import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import clsx from 'clsx'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// import Validate from 'utils/ValidateInput'

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 15px",
    display: "flex",
    justifyContent: 'flex-start',
    flexWrap: "wrap",
    marginBottom: "-10px",
  },
  selectUnit: {
    // flex: 1,
    marginRight: "2px",
    display: 'flex',
    "&:last-child": {
      marginRight: 0,
    },
  },
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 100,
  },
  flexItem: {
    minWidth: 100,
    maxWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function PostList(props) {
  const classes = useStyles()
  // React.useEffect(() => {
  //   console.log(props)
  // }, [])
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <div className={classes.selectUnit}>
          <Paper variant="outlined">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Order by</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.order}
                onChange={props.handleChangeOrder}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'title'}>Title</MenuItem>
                <MenuItem value={'create'}>Create time</MenuItem>
                <MenuItem value={'update'}>Update time</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.sort}
                onChange={props.handleChangeSort}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'ascending'}>Ascending</MenuItem>
                <MenuItem value={'decrease'}>Decrease</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </div>
        <div className={classes.selectUnit}>
          <Paper variant="outlined">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.category}
                onChange={props.handleChangeCategory}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>False</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label"></InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.category}
                onChange={props.handleChangeCategory}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>False</MenuItem>
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label"></InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.category}
                onChange={props.handleChangeCategory}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>False</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </div>
        <div className={classes.selectUnit}>
          <Paper variant="outlined">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Block</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.block}
                onChange={props.handleChangeBlock}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Comment</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.comment}
                onChange={props.handleChangeComment}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={true}>Enable</MenuItem>
                <MenuItem value={false}>Disable</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Verify</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={props.verify}
                onChange={props.handleChangeVerify}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </div>
        <div className={classes.selectUnit}>
          <Paper variant="outlined">
            <FormControl className={clsx([classes.formControl, classes.flexItem])}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="create-from"
                label="From"
                value={props.createStart}
                onChange={props.handleCreateStartChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <FormHelperText>Create time</FormHelperText>
            </FormControl>
            <FormControl className={clsx([classes.formControl, classes.flexItem])}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="create-to"
                label="To"
                value={props.createEnd}
                onChange={props.handleCreateEndChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <FormHelperText>Create time</FormHelperText>
            </FormControl>
          </Paper>
        </div>
        <div className={classes.selectUnit}>
          <Paper variant="outlined">
            <FormControl className={clsx([classes.formControl, classes.flexItem])}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="update-from"
                label="From"
                value={props.updateStart}
                onChange={props.handleUpdateStartChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <FormHelperText>Update time</FormHelperText>
            </FormControl>
            <FormControl className={clsx([classes.formControl, classes.flexItem])}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="update-to"
                label="To"
                value={props.updateEnd}
                onChange={props.handleUpdateEndChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <FormHelperText>Update time</FormHelperText>
            </FormControl>
          </Paper>
        </div>
      </div>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<FilterListRoundedIcon />}
          onClick={() => props.handleFilter(parseInt(props.page), parseInt(props.limit))}
        >
          Filter
      </Button>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<FilterListRoundedIcon />}
          onClick={props.handleUnFilter}
        >
          Unfilter
      </Button>
      </div>
    </MuiPickersUtilsProvider>
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

export default compose(withConnect)(PostList)