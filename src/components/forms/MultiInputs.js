import React from "react";
import { Form, Button } from "react-bootstrap";
import MultiField from './MultiField'

function MultiInputs({selected, setSelected, items}) { 

  function handleAdd() {
    const values = [...selected];
    values.push({ id: 1, amount: 0 });
    setSelected(values)
  }

  function handleRemove(i) {
    const values = [...selected];
    values.splice(i, 1);
    setSelected(values)  
  }

  function handleChange(i, e) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      id: e.target.value
    })
    setSelected(values)  
  }

  function handleAmountChange(i, e) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      amount: e.target.value
    })
    setSelected(values)
  }

  return (
    <div className="multi-inputs">
      
          {selected.map((field, idx) => {
            return(
              <div key={`${field}-${idx}`}>
                <MultiField 
                  handleRemove={handleRemove} 
                  handleChange={handleChange}
                  handleAmountChange={handleAmountChange}
                  idx={idx} 
                  items={items}
                  />
              </div>
            )
          })}

        <button type="button" onClick={() => handleAdd()}>+</button> 
      
    </div>
  )
}
export default MultiInputs