import React from 'react';

function InputText() {
  return (
    <div>
      <label htmlFor="inputId">
        Planet
        <input
          id="inputId"
          type="text"
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default InputText;
