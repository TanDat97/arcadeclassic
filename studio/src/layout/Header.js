import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { accountAction } from '../actions'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    if (this.props.account.user === '' || this.props.account.user === 'fail') {
      this.props.getInfoUser()
    }

  }

  render() {
    var { account } = this.props
    console.log(account)
    return (
      <div className="c_header">
        <div className="c_header__inner">
          <div className="c_header__logo_container">
            <Link to="/" className="c_header__logo_wrap">
              <img className="udemy-logo" src="https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg"
                alt="Udemy" width="110" height="32" data-purpose="udemy-brand-logo" />
            </Link>
          </div>
          <div className="c_header__left">
            <div className="dropdown dropdown__topics">
              <Link to="#" className="dropdown_toggle" role="button" id="header.browse">
                <span className="udi udi-explore">
                  <i className="fas fa-align-justify"></i>
                </span>
                <span> Categories</span>
              </Link>
            </div>
          </div>
          {
            account.authenticated === 'success' ? // login success
              <div className="c_header__right">
                <div className="visible-xl-block visible-lg-block">
                  <div className="dropdown dropdown__topics">
                    <Link to="/" className="dropdown_toggle" role="button" id="header.instructor">
                      Teach on Udemy
                    </Link>
                  </div>
                </div>
                <div className="visible-lg-block visible-xl-block header_right_divider"></div>
                <div className="hidden-sm hidden-xs hidden-xxs">
                  <div className="dropdown dropdown__topics dropdown__mylearning">
                    <Link to="/" className="dropdown_toggle" role="button" id="header.instructor">
                      My Courses <i className="fas fa-caret-down"></i>
                    </Link>
                  </div>
                </div>
                <div className="wishlist visible-xl-block visible-lg-block">
                  <div className="wishlist_dropdown">
                    <div className="dropdown dropdown__icon">
                      <Link to="#" className="dropdown_toggle" role="button" id="header.dropdown.wishlist">
                        <div className="fx pos_r text_center">
                          <span className="has_num">
                            <i className="far fa-heart fa-2x"></i>
                          </span>
                          <span aria-label="2 items" className="badge">2</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="notify visible-xl-block visible-lg-block">
                  <div className="notify_dropdown">
                    <div className="dropdown dropdown__icon">
                      <Link to="#" className="dropdown_toggle" role="button" id="header.dropdown.notify">
                        <div className="fx pos_r text_center">
                          <span className="has_num">
                            <i className="far fa-bell fa-2x"></i>
                          </span>
                          <span aria-label="2 items" className="badge">3</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="shopping_cart">
                  <div className="dropdown dropdown__icon">
                    <Link to="/" className="dropdown_toggle" role="button" id="header.dropdown.cart">
                      <div className="fx pos_r text_center">
                        <span>
                          <i className="fas fa-cart-arrow-down fa-2x"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="profile">
                  <div className="profile_dropdown">
                    <div className="dropdown dropdown__user dropdown__icon dropdown_open_on_hover">
                      <Link to="/mypage" className="dropdown_toggle" role="button" id="header.dropdown.profile">
                        <div className="user_avatar user_avatar__initials" data-purpose="user_avatar">
                          <div className="user_avatar__inner fx_c">
                            <span className="user_initials">TD</span>
                          </div>
                        </div>
                      </Link>
                      <ul role="menu" className="dropdown_menu dropdown_menu_right"
                        aria-labelledby="header.profile">
                        <li role="presentation" className="menu__link backgroud_midnight_lighter">
                          <Link to="#" className="menu_flex menu_item" aria-label="Edit your profile" data-purpose="edit-profile"
                            href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <div className="user_avatar user_avatar__initials">
                              <div className="user_avatar__inner fx_c">
                                <span className="user_initials">TD</span>
                              </div>
                            </div>
                            <span className="fx ml_space_xs">
                              <span className="text_midnight ellipsis">
                                Tran Tan Dat
                              </span>
                              <span className="a11 text_midnight_lighter ellipsis">
                                trantandat130497@gmail.com
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Notifications</span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Purchase History</span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Account</span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Payment Method</span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>My Courses</span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Wishlist</span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Teach on Udemy</span>
                          </Link>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Help</span>
                          </Link>
                        </li>
                        <li role="presentation" className="menu__link">
                          <Link to="#" className="menu_flex menu_item" href="" rel=" noopener noreferrer" target="_self" role="menuitem">
                            <span>Log out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              :  // not login
              <div className="c_header__right">
                <div className="visible-xl-block visible-lg-block">
                  <div className="dropdown dropdown__topics">
                    <Link to="/" className="dropdown_toggle" role="button" id="header.instructor">
                      Teach on Udemy
                    </Link>
                  </div>
                </div>
                <div className="visible-lg-block visible-xl-block header_right_divider"></div>
                <div className="shopping_cart">
                  <div className="dropdown dropdown__icon">
                    <Link to="/" className="dropdown_toggle" role="button" id="header.dropdown.cart">
                      <div className="fx pos_r text_center">
                        <span>
                          <i className="fas fa-cart-arrow-down fa-2x"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="dropdown dropdown__login">
                  <div>
                    <button className="btn_quaternary btn login_user" type="button" id="id_btn_login"
                      onClick={this.props.togglePopupLogin}>
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
    getInfoUser: () => dispatch(accountAction.getInfoUserRequest()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(Header)