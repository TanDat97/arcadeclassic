import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Header from '../layout/Header'
import PopupLogin from '../layout/PopupLogin'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupLogin: false,
    }
  }

  togglePopupLogin = () => {
    this.setState({
      showPopupLogin: !this.state.showPopupLogin
    })
  }

  render() {
    return (
      <div>
        <div className="main_content_wrapper">
          <Header
            togglePopupLogin = {this.togglePopupLogin}
          />
          {
            this.state.showPopupLogin ?
            <PopupLogin
              closePopupLogin={this.togglePopupLogin}
            />
            :null
          }
          
        </div>
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