import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { PizzaIF } from '../models/pizza.model'


export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number
}

export interface AppStateValue {
  cart: {
    items: CartItem[]
  }
};

const initStateValue: AppStateValue = {
  cart: {
    items: []
  }
};

export const AppStateContext = createContext(initStateValue);
export const AppDispatchContext = createContext<
  React.Dispatch<AddToCartAction | InitCart> | null>(null);

export const useDispatchState = () => {
  const dispatch = useContext(AppDispatchContext)
  if (!dispatch) throw Error('RUN setState OUT from CONTEXT!!!')
  return dispatch
}

export interface Action<T> {
  type: T
}

export interface AddToCartAction extends Action<'ADD_TO_CARD'> {
  // type: 'ADD_TO_CARD', 
  payload: PizzaIF;
}

interface InitCart extends Action<'INIT_CARD'> {
  payload: AppStateValue['cart'];
}

function reducer(state: AppStateValue, action: AddToCartAction | InitCart) {
  switch (action.type) {
    case 'ADD_TO_CARD':
      const { id } = action.payload
      const already = state.cart.items.some(it => it.id === id);
      let items: CartItem[] = [];
      if (already) {
        items = state.cart.items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      } else {
        items = [...state.cart.items, { ...action.payload, quantity: 1 }]
      }
      return ({ ...state, cart: { items } })

    case 'INIT_CARD':
      return ({ ...state, cart: action.payload })
    default:
      return state;
  }

}

const localStorage = (): AppStateValue['cart'] => {
  const storage = window.localStorage.getItem('cart')
  return storage ? JSON.parse(storage) : { items: [] }
}
const showLocalStorage = () => console.log('LOCAl STORAGE = ', JSON.stringify(localStorage()));


export const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initStateValue)
  useEffect(() => {
    dispatch({ type: 'INIT_CARD', payload: localStorage() })
    console.log('REAL STATE =>', JSON.stringify(state));
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(state.cart))
    showLocalStorage()
  }, [state.cart])

  return (<>
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider >
  </>)

}
