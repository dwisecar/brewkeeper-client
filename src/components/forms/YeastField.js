import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";


function YeastField({
  handleRemove, 
  idx, 
  items, 
  handleChange, 
  handleAmountChange, 
  count,
  field}) 
  {

  return (
    <>
    <Form.Row>
      <Col xs={7}>
        <Form.Label>Type</Form.Label>
        <Form.Control as="select" name="multi-select-name" defaultValue={field} onChange={(e) => handleChange(idx, e)}>
          {items.map(item => <option value={item.id}>{item.name}</option>)}
        </Form.Control>
      </Col>
      <Col xs={5}>
        <Form.Label>Amount (..ex 1 pack)</Form.Label>
        <Form.Control type="number" step="0.01" name="multi-select-amount" onChange={(e) => handleAmountChange(idx, e)}/>
      </Col>
      <Col>
        {/* {count > 1 && <button type="button" onClick={() => {handleRemove(idx)}}>X</button>} */}
      </Col>
      </Form.Row>
    </>
  )

}
export default YeastField