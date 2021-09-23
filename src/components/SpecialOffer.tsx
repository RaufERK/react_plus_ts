import React, { useContext } from 'react'
import { PizzaIF } from '../models/pizza.model'
import SpecialOfferCSS from './SpecialOffer.module.css'
import { AddToCartProps } from './AddToCart'
import { useAddToCard } from './WithAddToCard'

//Using HOC
// import AddToCart from './AddToCart'


export interface SpecialOfferProps extends AddToCartProps {
  pizza: PizzaIF
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({ pizza }) => {
  const addToCart = useAddToCard();

  const { name, description, price, id } = pizza;
  return (
    <div className={SpecialOfferCSS.container}>
      <h2>{name}</h2>
      <p>{id}</p>
      <p>{description}</p>
      <p>price: {price}</p>
      <button onClick={() => addToCart(pizza)}>ADD TO CART</button>
    </div>
  );
}

export default SpecialOffer

// Using HOC
// export default AddToCart(SpecialOffer);
