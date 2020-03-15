/* eslint-disable react-hooks/exhaustive-deps */
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

import { postAction } from '_actions'
// import Utils from '../../utils/Utils'
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

function PostListFilter(props) {
  const classes = useStyles()

  const [category1, setCategory1] = React.useState('')
  const handleChangeCategory1 = event => {
    setCategory1(event.target.value)
    setCategory2('')
    setCategory3('')
    props.handleChangeCategory2('')
    props.handleChangeCategory3('')
    if (event.target.value === '') {
      setCategoryList2([])
      setCategoryList3([])
    } else {
      getCategoryList2(event.target.value)
    }
    props.handleChangeCategory1(event.target.value)
    props.handleChangeCategory(event.target.value)
  }
  const [category2, setCategory2] = React.useState('')
  const handleChangeCategory2 = event => {
    setCategory2(event.target.value)
    setCategory3('')
    props.handleChangeCategory3('')
    if (event.target.value === '') {
      setCategoryList3([])
      props.handleChangeCategory(category1)
    } else {
      props.getCategoryChild({ id: event.target.value, useCache: true })
      props.handleChangeCategory(event.target.value)
    }
    props.handleChangeCategory2(event.target.value)
  }
  const [category3, setCategory3] = React.useState('')
  const handleChangeCategory3 = event => {
    setCategory3(event.target.value)
    if (event.target.value === '') {
      props.handleChangeCategory(category2)
    } else {
      props.handleChangeCategory(event.target.value)
    }
    props.handleChangeCategory3(event.target.value)
  }
  const [categoryList1, setCategoryList1] = React.useState([])
  const [categoryList2, setCategoryList2] = React.useState([])
  const [categoryList3, setCategoryList3] = React.useState([])

  React.useEffect(() => {
    setCategoryList1(props.post.rootCategory)
    setCategory1(props.category1.value)
    if (props.category1.value !== '') {
      getCategoryList2(props.category1.value)
    }
    setCategory2(props.category2.value)
    if (props.category2.value !== '') {
      props.getCategoryChild({ id: props.category2.value, useCache: true })
    }
  }, [props.post.rootCategory])

  React.useEffect(() => {
    setCategoryList3(props.post.childCategory)
  }, [props.post.childCategory])

  const getCategoryList2 = (root_id) => {
    for (let i = 0; i < props.post.rootCategory.length; i++) {
      if (props.post.rootCategory[i].root_id === root_id) {
        setCategoryList2(props.post.rootCategory[i].childs)
        break;
      }
    }
  }

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
                value={category1}
                onChange={handleChangeCategory1}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categoryList1.length > 0 ? categoryList1.map((e, index) => {
                  return (
                    <MenuItem value={e.root_id} key={index}>{e.root_name}</MenuItem>
                  )
                }) : ''}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label"></InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={category2}
                onChange={handleChangeCategory2}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categoryList2.length > 0 ? categoryList2.map((e, index) => {
                  return (
                    <MenuItem value={e.category_id} key={index}>{e.category_name}</MenuItem>
                  )
                }) : ''}
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label"></InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={category3}
                onChange={handleChangeCategory3}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categoryList3.length > 0 ? categoryList3.map((e, index) => {
                  return (
                    <MenuItem value={e.category_id} key={index}>{e.category_name}</MenuItem>
                  )
                }) : ''}
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
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryChild: data => dispatch(postAction.getCategoryChildRequest(data))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(PostListFilter)