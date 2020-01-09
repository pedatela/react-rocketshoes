import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md'

import { formatPrice } from '../../util/format'
import * as CartActions from '../../store/modules/cart/action'
import { Container, ProductTable, Total } from './styles';

class Cart extends Component {

  increment = product => {
    const { updateAmountRequest } = this.props
    updateAmountRequest(product.id, product.amount + 1)
  }

  decrement = product => {
    const { updateAmountRequest } = this.props
    updateAmountRequest(product.id, product.amount - 1)
  }


  removeFromCart = id => {
    const { removeFromCart } = this.props
    removeFromCart(id)
  }

  render() {
    const { cart, total } = this.props
    return (
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QNTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title}></img>
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => this.decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.amount}></input>
                    <button type="button" onClick={() => this.increment(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subtotal}</strong>
                </td>
                <td>
                  <button type="button" onClick={() => this.removeFromCart(product.id)}>
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
        <footer>
          <button type="button">Finalizar Pedido</button>
          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount)
  })),
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount
  }, 0))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)