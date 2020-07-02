import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state= {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            localStorage.setItem("userId", nextProps.auth.user.id);
            this.props.changeMenu();
          this.props.history.push("/forum-home"); // push user to list when they login
        }if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/forum-home");
        }
      }  

    onChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(userData);

        this.setState({
            email: '',
            password: ''
        });

        console.log(userData);
    }
    render(){
        const {errors} = this.state;
    return(
        <div>
            <h3>Login</h3>
                <form noValidate onSubmit={this.onSubmit}>
                <div className ="form-group">
                    <label>Email: </label>
                    <span className="red-text">
                        {errors.email}
                        {errors.emailnotfound}
                    </span>
                    <input type="email"
                        id="email"
                        required
                        className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                          })}
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder="ex: name@email.com"
                        errors={errors.email}
                        />
                        <div>
                    <label>Password: </label>
                    <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                    </span>
                    <input type="password"
                        id="password"
                        required
                        className={classnames("", {
                            invalid: errors.password || errors.passwordincorrect
                          })}
                        value={this.state.password}
                        onChange={this.onChange}
                        errors={errors.password}
                        />    
                        </div>   

                </div>
                <p className="grey-text text-darken-1">Don't have an account? <Link to="/user">Register</Link></p>
            <div className="form-group">
                <input type="submit" className="btn btn-outline-primary" value="Login" />
            </div>
                </form>
        </div>

    );
}
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { loginUser }
    )(Login);
