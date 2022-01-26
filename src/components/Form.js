import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesData, fecthApi } from '../actions';
import './Form.css';

const FOOD = 'Alimentação';
const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = [FOOD, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: FOOD,
  exchangeRates: [],
};

class Form extends React.Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    const { id } = this.state;
    const { currencies, getWalletData, expenses } = this.props;
    await currencies();
    this.setState({ exchangeRates: getWalletData });
    expenses(this.state);
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: FOOD,
      exchangeRates: [],
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { getWalletData } = this.props;
    return (
      <form className="form-div">
        <div className="test-field">
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              type="text"
              name="value"
              data-testid="value-input"
              id="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Fique a vontade para adcionar uma descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              id="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                Object.keys(getWalletData)
                  .filter((code) => code !== 'USDT')
                  .map((c) => (
                    <option key={ c } data-testid={ c }>
                      {c}
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            Formas de pagamento:
            <select
              name="method"
              data-testid="method-input"
              id="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              {payments.map((p) => (
                <option id={ p } key={ p } value={ p }>
                  { p }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              name="tag"
              data-testid="tag-input"
              id="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              { tags.map((t) => (
                <option id={ t } key={ t } value={ t }>
                  { t }
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          className="btn-header"
          type="button"
          name="expense"
          id="expense"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>);
  }
}

const mapStateToProps = (state) => ({
  getWalletData: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fecthApi()),
  expenses: (payload) => dispatch(expensesData(payload)),
});

Form.propTypes = {
  getWalletData: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

// auxílio da colega Nathália Miranda;
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
export default connect(mapStateToProps, mapDispatchToProps)(Form);
