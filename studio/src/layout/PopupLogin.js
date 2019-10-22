import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { accountAction } from '../actions'

const loading = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

class PopupLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      isLogging: false,
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
      isLogging: true,
    });
    const { email, password } = this.state
    if (email && password) {
      this.props.login(email, password)
    }
  }


  render() {
    var { account } = this.props
    var { submitted, isLogging } = this.state
    return (
      <div id="id_loginbox" className="modal">
        <div className="modal_dialog">
          <div className="modal_content">
            <div className="loginbox_v4">
              <div className="loginbox_v4_header">
                Login with Social Media or Manually
              </div>
              <div className="loginbox_v4_content">
                <div className="social_button facebook fxac">
                  <i className="fab fa-facebook-f tab"></i>
                  Login with Facebook
                </div>
                <div className="social_button google fxac">
                  <i className="fab fa-google tab"></i>
                  Login with Google
                </div>
                <form className="form_login" onSubmit={this.handleSubmit}>
                  <div className="form_section">
                    <div id="tooltip_reference_name" className="tooltip_reference pos_r ">
                      <input type="email" name="email" placeholder="Email" required=""
                        className="textinput form_control" id="id_email" maxLength="64" onChange={this.handleChange} />
                    </div>
                    <div className="icon_auth">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                  <div className="form_section">
                    <div id="tooltip_reference_name" className="tooltip_reference pos_r ">
                      <input type="password" name="password" placeholder="Password" required=""
                        className="textinput form_control" id="id_password" maxLength="64" onChange={this.handleChange} />
                    </div>
                    <div className="icon_auth">
                      <i className="fas fa-lock"></i>
                    </div>
                  </div>
                  <button className="btn btn_primary full_width">
                    Log In
                  </button>
                  {
                    account.authenticated==='loading' && submitted && isLogging && <img src={loading} alt=""/>
                  }
                </form>
                <div className="pos_r text_center">
                  <a className="forgot_password">Forgot Password</a>
                </div>
                <div className="loginbox_v4__footer">
                  Don't have an account
                  <a>Sign up</a>
                </div>
              </div>
            </div>
            <button data-purpose="close_popup" aria-label="Close" type="button" className="close btn btn-default"
              onClick={this.props.closePopupLogin}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
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
    login: (email, password) => dispatch(accountAction.userLoginRequest(email, password)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PopupLogin)