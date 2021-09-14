import React from 'react';
import CartCSS from './Cart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { AppStateContext } from './AppState'

interface Props { }
interface State {
  isOpen: boolean;
}

export default class Cart extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  cartHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log((event.target as HTMLElement).nodeName);
    this.setState(prev => ({ ...prev, isOpen: !prev.isOpen }))
  }

  render() {
    return (
      <AppStateContext.Consumer>{(state) => {
        return <div className={CartCSS.cartContainer}>
          <button className={CartCSS.button}
            onClick={this.cartHandler}
          >
            <FiShoppingCart />
            <span > {state.cart.items.reduce((acc, item) => acc + item.quantity, 0)} pizzas</span>
          </button>
          <div className={CartCSS.cartDropDown}
            style={{
              display: this.state.isOpen ? 'block' : 'none'
            }}
          >
            <ul>
              {state.cart.items.map(({ id, name, quantity }) => <li key={id}>{name} &times; {quantity}</li>)}
            </ul>
          </div>
        </div >
      }}</AppStateContext.Consumer>

    )
  }
}


