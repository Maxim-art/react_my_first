import React, { useState } from 'react';
import PropTypes from 'prop-types';

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  // const [value, setValue] = useState('');
  const input = useInputValue();

  function submitHandler(event) {
    event.preventDefault();

    // if (value.trim()) {
    //   onCreate(value);
    //   setValue('');
    // }
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form onSubmit={submitHandler} action="">
      <input
        // value={value}
        // onChange={(event) => {
        //   return setValue(event.target.value);
        // }}
        {...input.bind}
        type="text"
      />
      <button type="submit">add</button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
