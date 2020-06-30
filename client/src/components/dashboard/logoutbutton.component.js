import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class LogoutbuttonComponent extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.changeMenu();
    };
    render() {
        const { user } = this.props.auth;
        return (
                        <button
                            style={{

                                borderRadius: "3px",
                                letterSpacing: "1.5px",

                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-outline-primary btn-logout"
                        >
                            Logout
                        </button>

        );
    }
}LogoutbuttonComponent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(LogoutbuttonComponent);