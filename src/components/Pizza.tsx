import React, { useContext } from 'react'
import { PizzaIF } from '../models/pizza.model'
import PizzaCSS from './Pizza.module.css'
import { AddToCartProps } from './AddToCart'
// import AddToCart from './AddToCart'
import WithAddToCart from './WithAddToCard'


export interface PizzaProps extends AddToCartProps {
  pizza: PizzaIF;
}

const Pizza: React.FC<PizzaProps> = ({ pizza }) => {
  const { name, description, price, id } = pizza;
  // const dispatch = useDispatchState()
  // const handleAddToCartClick = () => {
  //   dispatch({ type: 'ADD_TO_CARD', payload: pizza })
  // }

  return (<li className={PizzaCSS.container}>
    <h2>{name}</h2>
    <p>{id}</p>
    <p>{description}</p>
    <p>price: {price}</p>

    <WithAddToCart>
      {({ addToCart }) => <button onClick={() => addToCart(pizza)}>ADD TO CART</button>}
    </WithAddToCart>

  </li>)

}
export default Pizza;
