import React from "react";
import { Form, Button } from "react-bootstrap";


function MultiField({handleRemove, idx, items, handleChange, handleAmountChange}) {
  
  return (
    <>
      <Form.Control as="select" name="multi-select-name" onChange={(e) => handleChange(idx, e)}>
        {items.map(item => <option value={item.id}>{item.name}</option>)}
      </Form.Control>
      <Form.Control type="number" step="0.01" name="multi-select-amount" onChange={(e) => handleAmountChange(idx, e)}/>
      <button type="button" onClick={() => handleRemove(idx)}>X</button>
    </>
  )

}
export default MultiField