import React, { useReducer, useState } from 'react';
import { useCreateNewOrderMutation } from '../state/userApi';

const CHANGE_INPUT = 'CHANGE_INPUT';
const RESET_FORM = 'RESET_FORM';

const initialState = {
  fullName: '',
  size: '',
  toppings: [],
};



// BUILD REDUCER TO HANDLE FORM
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      if (name === 'topping') {
        // Toggle topping
        const updatedToppings = state.toppings.includes(value)
          ? state.toppings.filter((topping) => topping !== value)
          : [...state.toppings, value];
        return { ...state, toppings: updatedToppings };
      }
      return { ...state, [name]: value };
    }
    case RESET_FORM: {
      return { fullName: '', size: '', toppings: [] };
    }
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});
  const [createNewOrder, { error: createOrderError, isLoading: creatingOrder }] = useCreateNewOrderMutation();

  // OnChange
  const onChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      dispatch({ type: CHANGE_INPUT, payload: { name: 'topping', value } });
    } else {
      dispatch({ type: CHANGE_INPUT, payload: { name, value } });
    }
  };

  // OnReset
  const onReset = () => {
    dispatch({ type: RESET_FORM });
    setErrors({});
  };

  // OnSubmit with Yup validation
  const onSubmit = (e) => {
    e.preventDefault();

    createNewOrder(state)
      .unwrap()
      .then(() => {
        onReset();
      })
      .catch((err) => console.log(err));

  };

  // JSX
  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {createOrderError && <div className='failure'>{createOrderError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onChange}
          />
          {errors.fullName && <div className="error">{errors.fullName}</div>}
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={state.size}
            onChange={onChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
          {errors.size && <div className="error">{errors.size}</div>}
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            value="1"
            type="checkbox"
            checked={state.toppings.includes("1")}
            onChange={onChange}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            value="2"
            type="checkbox"
            checked={state.toppings.includes("2")}
            onChange={onChange}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            value="3"
            type="checkbox"
            checked={state.toppings.includes("3")}
            onChange={onChange}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            value="4"
            type="checkbox"
            checked={state.toppings.includes("4")}
            onChange={onChange}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            value="5"
            type="checkbox"
            checked={state.toppings.includes("5")}
            onChange={onChange}
          />
          Ham<br />
        </label>
      </div>
      <button type="button" onClick={onReset}>Reset</button>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
