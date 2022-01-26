import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Table.css';

class Table extends Component {
  render() {
    const { expensesExchanges } = this.props;
    return (
      <div className="div-table">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesExchanges.map(({
              id,
              description,
              value,
              currency,
              method,
              tag,
              exchangeRates,
            }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value)}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  {(Number(exchangeRates[currency].ask) * Number(value))
                    .toFixed(2)}

                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                  >
                    Editar/Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
// Explicação da tabela obtida em acesso: https://www.homehost.com.br/blog/criar-sites/tabela-html/;
const mapStateToProps = (state) => ({
  expensesExchanges: state.wallet.expenses,
});

Table.propTypes = {
  expensesData: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
