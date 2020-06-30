import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { registerUser } from "../actions/authActions";
import classnames from 'classnames';

class CreateUser extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state= {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    onChangePasswordConfirm(e){
        this.setState({
            passwordConfirm: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }

        this.props.registerUser(user, this.props.history);

        console.log(user);

        axios.post('http://localhost:4000/appli-job-app-tracker/user/add', user)
            .then(res => console.log(res.date));

        this.setState({
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        });
    }
    render (){
        const {errors} = this.state;
        return(
            <div className="contentcontainer" style={{marginTop: 10}}>
                <h3>Create New Account</h3>
                <form noValidate onSubmit={this.onSubmit}>
                <div>
                    <label >Username: <span className="form__required">*</span></label>
                    <span className="red-text">{errors.username}</span>
                    <input type="text"
                        id="username"
                        required
                        className={classnames("", {
                            invalid: errors.username
                          })}
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        error={errors.username}
                        />
                        <div>
                    <label>Email: <span className="form__required">*</span></label>
                    <span className="red-text">{errors.email}</span>
                    <input type="email"
                        id="email"
                        required
                        className={classnames("", {
                            invalid: errors.email
                          })}
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        placeholder="ex: name@email.com"
                        error={errors.email}
                        />
                        </div>
                        <div>
                    <label>Password: <span className="form__required">*</span></label>
                    <span className="red-text">{errors.password}</span>
                    <input type="password"
                        id="password"
                        required
                        className={classnames("", {
                            invalid: errors.password
                          })}
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        error={errors.password}
                        />
                        </div>
                        <div>
                    <label>Confirm Password: <span className="form__required">*</span></label>
                    <span className="red-text">{errors.passwordConfirm}</span>
                    <input type="password"
                        id="passwordConfirm"
                        required
                        className={classnames("", {
                            invalid: errors.passwordConfirm
                          })}
                        value={this.state.passwordConfirm}
                        onChange={this.onChangePasswordConfirm}
                        error={errors.password}
                        />
                        </div>           

                </div>
            <div className="form-group">
                <input type="submit" className="btn btn-outline-primary" value="Create Account" />
            </div>
                </form>
            </div>
        )
    }
}

CreateUser.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
) (withRouter(CreateUser));