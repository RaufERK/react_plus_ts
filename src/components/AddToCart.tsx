import React from "react";
import { useDispatchState } from './AppState'
import { PizzaIF } from '../models/pizza.model'


export interface AddToCartProps {
  addToCart: (props: PizzaIF) => void;
}

function AddToCart<OriginslProps>(ChildComponent: React.ComponentType<OriginslProps>) {
  const AddToCartHOC = (props: OriginslProps) => {
    const dispatch = useDispatchState()

    const handleAddToCartClick = (pizzaItem: PizzaIF) => {
      dispatch({ type: 'ADD_TO_CARD', payload: pizzaItem })
    }

    return <ChildComponent addToCart={handleAddToCartClick} {...props as OriginslProps} />
  }


  return AddToCartHOC;
}



export default AddToCart;
