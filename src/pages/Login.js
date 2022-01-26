import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginEmail } from '../actions';
import telaLogin from '../imagens/telaLogin.png';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton() {
    const { email, password } = this.state;
    const minCaractere = 6;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i;
    const validateEmail = regexEmail.test(String(email).toLowerCase());
    const validatePassword = password.length >= minCaractere;
    if (validateEmail && validatePassword) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
    // regex obtido pelo site SatackOverFlow,
    // link 'https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail'
    // Validação do email com auxílio do colega Luis Gustavo, para compreender 'test';
  }

  render() {
    const { email, buttonDisabled } = this.state;
    const { history, inputDispatch } = this.props;
    return (
      <div className="img-container-login">
        <div className="form-login">
          <form className="card-login">
            <h3 className="text">Login</h3>
            <label htmlFor="email" className="text">
              email:
              <input
                type="email"
                name="email"
                data-testid="email-input"
                id="email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password" className="text">
              senha:
              <input
                type="password"
                name="password"
                data-testid="password-input"
                id="password"
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="login-button"
              type="button"
              disabled={ buttonDisabled }
              onClick={ () => {
                inputDispatch(email);
                history.push('/carteira');
              } }
            >
              Entrar
            </button>
          </form>
        </div>
        <div className="img-phrase">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
          <h1>TrybeWallet</h1>
          <p>sua nova forma de economizar</p>
          <img
            src={ telaLogin }
            alt="ilustracao-pessoa-com-carteira"
            width="350"
            className="img-logo"
          />
        </div>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  inputDispatch: (payload) => dispatch(loginEmail(payload)),
});
// loginEmail é a minha action, dessa forma o mapDispatch coloca todos os dados (payload), dentro da store;

Login.propTypes = {
  inputDispatch: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
