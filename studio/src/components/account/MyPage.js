import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Header from '../../layout/Header'

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div className="main_content_wrapper">
          <Header/>
          <div className="main_content">
            <div className="ud_component_browse__app">
              <div className="browse_container suppress_xl">
                <div id="edit_template">
                  <div id="main_section">
                    <div className="side_nav">
                      <div id="user_short">
                        <div className="fx_c">
                          <div className="user_avatar user_avatar__initials" data-purpose="user_avatar">
                            <div className="user_avatar__inner fx_c">
                              <span className="user_initials">TD</span>
                            </div>
                          </div>
                        </div>
                        <div className="tooltip_container">
                          <h3>Tran Tan Dat</h3>
                        </div>
                      </div>
                      <ul>
                        <li className="on_focus">
                          <a href="/user/edit-profile/" data-purpose="user_manage:edit-profile">
                            Profile
                          </a>
                        </li>
                        <li className="">
                          <a href="/user/edit-photo/" data-purpose="user_manage:edit-photo">
                            Photo
                          </a>
                        </li>
                        <li className="">
                          <a href="/user/edit-account/" data-purpose="user_manage:edit-account">
                            Account
                          </a>
                        </li>
                        <li className="">
                          <a href="/user/edit-credit-cards/" data-purpose="user_manage:edit-credit-cards">
                            Credit Cards
                          </a>
                        </li>
                        <li className="">
                          <a href="/user/edit-privacy/" data-purpose="user_manage:edit-privacy">
                            Privacy
                          </a>
                        </li>
                        <li className="">
                          <a href="/user/edit-notifications/"
                            data-purpose="user_manage:edit-notifications">
                            Notifications
                          </a>
                        </li>
                        <li className="">
                          <a href="/user/close-account/" data-purpose="user_manage:close-account">
                            Close Account
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="form_wrapper">
                      <h2>Public Profile</h2>
                      <h3>Infomation account</h3>
                      <form>
                        <div className="manage_fields_wrapper">
                          <div className="form_section__fake_label">
                            Basic:
                          </div>
                          <div className="form_field_container labeled form_section labeled__sr_only" id="form_item_name">
                            <div id="tooltip_reference_name" className="tooltip_reference pos_r ">
                              <input type="text" name="firstname" placeholder="First Name" required=""
                                className="textinput form_control" id="id_name" maxLength="64" />
                            </div>
                          </div>
                          <div className="form_field_container labeled form_section labeled__sr_only" id="form_item_surname">
                            <div id="tooltip_reference_surname" className="tooltip_reference pos_r ">
                              <input type="text" name="surname" placeholder="Last Name" required=""
                                className="textinput form_control" id="id_surname" maxLength="64" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(MyPage)