import React from 'react';
import CartCSS from './Cart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { AppStateContext } from './AppState'

interface Props { }
interface State {
  isOpen: boolean;
}

export default class Cart extends React.Component<Props, State> {

  #cartRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.#cartRef = React.createRef();
  }

  clickFarAwayHandler = (event: MouseEvent) => {
    if (!this.#cartRef?.current?.contains(event.target as Node)) {
      this.setState({ isOpen: false })
    }
  }

  componentDidMount() {
    console.log('componentDidMount ==>');
    document.addEventListener('click', this.clickFarAwayHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickFarAwayHandler)
  }

  cartHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState(prev => ({ ...prev, isOpen: !prev.isOpen }))
  }

  render() {
    return (
      <AppStateContext.Consumer>{(state) => {
        return <div className={CartCSS.cartContainer} ref={this.#cartRef} >
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


