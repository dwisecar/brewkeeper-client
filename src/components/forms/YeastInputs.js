import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import MultiField from './MultiField'
import YeastField from "./YeastField";

function YeastInputs({selected, setSelected, items}) { 

  function handleAdd() {
    const values = [...selected];
    values.push({ id: 1, amount: 0 });
    setSelected(values)
  }

  function handleRemove() { 
    const values = [...selected];
    values.pop()
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
    <div>
        {selected.map((field, idx) => {
          return(
              <div key={`${field}-${idx}`}>
                <YeastField
                  handleRemove={handleRemove} 
                  handleChange={handleChange}
                  handleAmountChange={handleAmountChange}
                  idx={idx} 
                  items={items}
                  count={selected.length}
                  field={field}
                  />
              </div>
          )
        })}
      {selected.length > 1 && <Button className="btn-circle" type="button" variant="danger" onClick={() => handleRemove()}>Remove</Button>}
        <Button 
          className="btn-circle"
          onClick={() => handleAdd()}
        >Add Yeast</Button>
      </div>
  )
}
export default YeastInputs