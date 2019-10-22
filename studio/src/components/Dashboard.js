import React from 'react'
import { compose } from 'redux'

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
          <div className="c_header">
            <div className="c_header__inner">
              <div className="c_header__logo_container">
                <a href="#" className="c_header__logo_wrap">
                  <img className="udemy-logo" src="https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg"
                    alt="Udemy" width="110" height="32" data-purpose="udemy-brand-logo" />
                </a>
              </div>
              <div className="c_header__left">
                <div className="dropdown dropdown__topics">
                  <a className="dropdown_toggle" role="button" id="header.browse">
                    <span className="udi udi-explore">
                      <i className="fas fa-align-justify"></i>
                    </span>
                    <span> Categories</span>
                  </a>
                </div>
              </div>
              <div className="c_header__right">
                <div className="visible-xl-block visible-lg-block">
                  <div className="dropdown dropdown__topics">
                    <a className="dropdown_toggle" role="button" id="header.instructor">
                      Teach on Udemy
                    </a>
                  </div>
                </div>
                <div className="visible-lg-block visible-xl-block header_right_divider"></div>

                <div className="shopping_cart">
                  <div className="dropdown dropdown__icon">
                    <a className="dropdown_toggle" role="button" id="header.dropdown.cart">
                      <div className="fx pos_r text_center">
                        <span>
                          <i className="fas fa-cart-arrow-down fa-2x"></i>
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="dropdown dropdown__login">
                  <div>
                    <button className="btn_quaternary btn login_user" type="button" id="id_btn_login"
                      onClick={this.togglePopupLogin}>
                      Log In
                    </button>
                  </div>
                </div>
                <div className="dropdown dropdown__signup">
                  <div>
                    <button className="btn_primary btn signup_user" type="button" id="id_btn_signup">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* end of header */}
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

export default compose() (Dashboard)