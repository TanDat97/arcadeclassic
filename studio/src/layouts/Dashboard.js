import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        Dashboard      
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account,
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

export default compose(withConnect) (Dashboard)