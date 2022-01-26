import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import { fecthApi } from '../actions';
import Table from '../components/Table';
import './Wallet.css';
import walletheader from '../imagens/walletheader.png';
// import carteira from '../imagens/carteira.png';

const BRL = 'BRL';

class Wallet extends React.Component {
  componentDidMount() {
    const { getWalletData } = this.props;
    getWalletData();
  }

  // Ask sendo o valor do cambio;

  onlyAsk = (exchangeRates, currency) => Object.values(exchangeRates)
    .filter(({ code, codein }) => code === currency && codein !== 'BRLT')
    .map(({ ask }) => ask)

  currencyConverter() {
    const { expensesWallet } = this.props;
    const converter = expensesWallet.map(({ value, currency, exchangeRates }) => ({
      value,
      currency,
      finalPrice: this.onlyAsk(exchangeRates, currency),
    }));
    // AllPrices recebe um array de preços para poder fazer uma soma através do reduce;
    const allPrices = converter.map(({ value, finalPrice }) => ({
      allValues: (Number(value * finalPrice)),
    }));
    return allPrices.reduce((acc, crr) => acc + crr.allValues, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <header className="header-div">
          <img
            src={ walletheader }
            alt="porquinho"
            width="80px"
          />
          <h2 className="title">TrybeWallet</h2>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{(this.currencyConverter()).toFixed(2)}</p>
          <p data-testid="header-currency-field">{BRL}</p>
        </header>
        <div className="img-form-conteiner">
          {/* <img
            src={ carteira }
            alt="wallet"
            width="200"
          /> */}
          <Form />
        </div>
        <div className="container-table">
          <Table />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesWallet: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getWalletData: () => dispatch(fecthApi()),
});

Wallet.propTypes = {
  email: PropTypes.instanceOf(Object).isRequired,
  getWalletData: PropTypes.arrayOf(PropTypes.object).isRequired,
  expensesWallet: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
