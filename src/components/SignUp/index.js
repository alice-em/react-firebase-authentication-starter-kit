import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom'

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  email: '',
  error: null,
  passwordOne: '',
  passwordTwo: '',
  username: '',
};

const SignUp = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreatUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        console.log(authUser)
        alert(authUser)
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        console.error(error)
        alert(error)
        this.setState({ error });
      });
    e.preventDefault();
  };

  render() {
    const {
      email,
      error,
      passwordOne,
      passwordTwo,
      username,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name={'username'}
          onChange={this.onChange}
          placeholder={'Full Name'}
          type={'text'}
          value={username}
        />
        <input
          name={'email'}
          onChange={this.onChange}
          placeholder={'Email Address'}
          type={'text'}
          value={email}
        />
        <input
          name={'passwordOne'}
          onChange={this.onChange}
          placeholder={'Password'}
          type={'password'}
          value={passwordOne}
        />
        <input
          name={'passwordTwo'}
          onChange={this.onChange}
          placeholder={'Confirm Password'}
          type={'password'}
          value={passwordTwo}
        />
        <button disabled={isInvalid} type={'submit'}>
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

const SignUpLink = () => (
  <p>
    {"Don't have an account? "}
    <Link to={ROUTES.SIGN_UP}>Sign up</Link>
  </p>
);

export default SignUp;
export { SignUpForm, SignUpLink };
