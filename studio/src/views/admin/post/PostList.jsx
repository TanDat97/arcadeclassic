/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
// core components
import GridItem from "components/common/Grid/GridItem"
import GridContainer from "components/common/Grid/GridContainer"
import Table from "components/common/Table/Table"
import Card from "components/common/Card/Card"
import CardHeader from "components/common/Card/CardHeader"
import CardBody from "components/common/Card/CardBody"
import PostListFilter from "components/admin/PostListFilter"
import Paging from "components/admin/Paging"

import Utils from "utils/Utils"
import DateUtils from "utils/DateUtils"
import { postAction } from '_actions'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

function PostList(props, { ...rest }) {
  const classes = useStyles()
  const [order, setOrder] = React.useState('create')
  const handleChangeOrder = (event) => {
    setOrder(event.target.value)
  }
  const [sort, setSort] = React.useState('decrease')
  const handleChangeSort = event => {
    setSort(event.target.value)
  }
  const [category, setCategory] = React.useState('')
  const handleChangeCategory = value => {
    setCategory(value)
  }
  const [category1, setCategory1] = React.useState({ value: '', justQuery: true })
  const handleChangeCategory1 = value => {
    setCategory1({ value, justQuery: true })
  }
  const [category2, setCategory2] = React.useState({ value: '', justQuery: true })
  const handleChangeCategory2 = value => {
    setCategory2({ value, justQuery: true })
  }
  const [category3, setCategory3] = React.useState({ value: '', justQuery: true })
  const handleChangeCategory3 = value => {
    setCategory3({ value, justQuery: true })
  }
  const [block, setBlock] = React.useState('')
  const handleChangeBlock = event => {
    setBlock(event.target.value)
  }
  const [comment, setComment] = React.useState('')
  const handleChangeComment = event => {
    setComment(event.target.value)
  }
  const [verify, setVerify] = React.useState('')
  const handleChangeVerify = event => {
    setVerify(event.target.value)
  }
  const [createStart, setCreateStart] = React.useState(null)
  const handleCreateStartChange = date => {
    setCreateStart(DateUtils.changeDateFormat(date, DateUtils.MMDDYYYY))
  }
  const [createEnd, setCreateEnd] = React.useState(null)
  const handleCreateEndChange = date => {
    setCreateEnd(DateUtils.changeDateFormat(date, DateUtils.MMDDYYYY))
  }
  const [updateStart, setUpdateStart] = React.useState(null)
  const handleUpdateStartChange = date => {
    setUpdateStart(DateUtils.changeDateFormat(date, DateUtils.MMDDYYYY))
  }
  const [updateEnd, setUpdateEnd] = React.useState(null)
  const handleUpdateEndChange = date => {
    setUpdateEnd(DateUtils.changeDateFormat(date, DateUtils.MMDDYYYY))
  }
  const [page, setPage] = React.useState(1)
  const handlePageChange = (event, value) => {
    setPage(value)
    onFilter(value, limit)
  }
  const [limit, setLimit] = React.useState(20)
  const handleLimitChange = event => {
    setLimit(event.target.value)
    onFilter(page, event.target.value)
  }
  const [count, setCount] = React.useState(0)

  const [filter, setFilter] = React.useState(false)
  const onFilter = (page, limit) => {
    setPage(page)
    setLimit(limit)
    setFilter(true)
  }
  const [unFilter, setUnFilter] = React.useState(false)
  const onUnFilter = () => {
    setDefaultState()
    setUnFilter(true)
  }
  const [lastFilter, setLastFilter] = React.useState('')

  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    if (params.toString() !== '') {
      const order = params.get('order')
      if (order) setOrder(order)
      const sort = params.get('sort')
      if (sort) setSort(sort)
      const category = parseInt(params.get('category'))
      if (category) setCategory(category)
      const category1 = parseInt(params.get('category1'))
      if (category1) setCategory1({ value: category1, justQuery: true })
      const category2 = parseInt(params.get('category2'))
      if (category2) setCategory2({ value: category2, justQuery: true })
      const category3 = parseInt(params.get('category3'))
      if (category3) setCategory3({ value: category3, justQuery: true })
      const block = params.get('block')
      if (block) setBlock(block)
      const comment = params.get('comment')
      if (comment) setComment(comment)
      const verify = params.get('verify')
      if (verify) setVerify(verify)
      const createStart = params.get('createStart')
      if (createStart) setCreateStart(createStart)
      const createEnd = params.get('createEnd')
      if (createEnd) setCreateEnd(createEnd)
      const updateStart = params.get('updateStart')
      if (updateStart) setUpdateStart(updateStart)
      const updateEnd = params.get('updateEnd')
      if (updateEnd) setUpdateEnd(updateEnd)
      const limit = params.get('limit')
      if (limit) setLimit(limit)
      const page = params.get('page')
      if (page) setPage(parseInt(page))
      callAdminGetPosts({ order, sort, category, block, comment, verify, createStart, createEnd, updateStart, updateEnd, page, limit })
    } else {
      callAdminGetPosts({ order: 'create', sort: 'decrease', page: 1, limit: 20 })
    }
    props.getCategoryRoot({ useCache: true })
  }, [props.location.path])

  React.useEffect(() => {
    let count = parseInt(props.post.total / limit)
    props.post.total === limit ? count += 0 : count += 1
    setCount(count)
    if (props.post.success === 1 && props.post.type === 'post') {
      const stringFilter = JSON.stringify({ order, sort, category, category1, category2, category3, block, comment, verify, createStart, createEnd, updateStart, updateEnd, page, limit })
      setLastFilter(stringFilter)
    }
  }, [props.post])

  React.useEffect(() => {
    const params = { order, sort, category, category1, category2, category3, block, comment, verify, createStart, createEnd, updateStart, updateEnd, page, limit }
    if (filter && (lastFilter !== JSON.stringify(params))) {
      const result = Utils.makeQuery(params)
      props.history.push(window.location.pathname + result.query)
      props.adminGetPosts(result.data)
    }
    setFilter(false)
  }, [filter])

  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    if (unFilter && params.toString() !== '') {
      props.history.push('/admin/posts')
      callAdminGetPosts({ order: 'create', sort: 'decrease', page: 1, limit: 20 })
    }
    setUnFilter(false)
  }, [unFilter])

  const callAdminGetPosts = (params) => {
    const result = Utils.makeQuery(params)
    props.adminGetPosts(result.data)
  }

  const setDefaultState = () => {
    setOrder('create')
    setSort('decrease')
    setPage(1)
    setLimit(20)
    setCategory('')
    setBlock('')
    setComment('')
    setVerify('')
    setCreateStart(null)
    setCreateEnd(null)
    setUpdateStart(null)
    setUpdateEnd(null)
  }

  const getDataForTable = () => {
    let data = []
    // eslint-disable-next-line array-callback-return
    props.post.posts.map(e => {
      const result = Utils.getDataWithKey(['post_id', 'title', 'overview', 'create_at', 'category_name', 'verify'], e)
      data.push(result)
    })
    return data
  }

  const gotoPostDetail = (post_id) => {
    props.history.push(`/admin/postdetail?post_id=${post_id}`)
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              List Post
            </h4>
            <p className={classes.cardCategoryWhite}>
              Change input to filter
            </p>
          </CardHeader>
          <PostListFilter
            order={order}
            handleChangeOrder={handleChangeOrder}
            sort={sort}
            handleChangeSort={handleChangeSort}
            category={category}
            handleChangeCategory={handleChangeCategory}
            category1={category1}
            handleChangeCategory1={handleChangeCategory1}
            category2={category2}
            handleChangeCategory2={handleChangeCategory2}
            category3={category3}
            handleChangeCategory3={handleChangeCategory3}
            block={block}
            handleChangeBlock={handleChangeBlock}
            comment={comment}
            handleChangeComment={handleChangeComment}
            verify={verify}
            handleChangeVerify={handleChangeVerify}
            createStart={createStart}
            handleCreateStartChange={handleCreateStartChange}
            createEnd={createEnd}
            handleCreateEndChange={handleCreateEndChange}
            updateStart={updateStart}
            handleUpdateStartChange={handleUpdateStartChange}
            updateEnd={updateEnd}
            handleUpdateEndChange={handleUpdateEndChange}
            handleFilter={onFilter}
            handleUnFilter={onUnFilter}
            page={page}
            limit={limit}
          />
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Overview", "Create at", "Category", "Verify"]}
              tableData={getDataForTable()}
              onClickRow={gotoPostDetail}
            />
          </CardBody>
          <Paging
            page={page}
            handlePageChange={handlePageChange}
            limit={limit}
            handleLimitChange={handleLimitChange}
            count={count}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adminGetPosts: (data) => dispatch(postAction.adminGetPostsRequest(data)),
    getCategoryRoot: (data) => dispatch(postAction.getCategoryRootRequest(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(PostList)