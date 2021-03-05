import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";


function MultiField({
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
    <Form.Row id={`multi-row-${idx}`}>
      <Col xs={7}>
        <Form.Label>Type</Form.Label>
        <Form.Control as="select" name="multi-select-name" defaultValue={field} onChange={(e) => handleChange(idx, e)}>
          {items.map(item => <option value={item.id}>{item.name}</option>)}
        </Form.Control>
      </Col>
      <Col xs={3}>
        <Form.Label>Lbs</Form.Label>
        <Form.Control type="number" step="0.01" min="0" name="multi-select-amount" onChange={(e) => handleAmountChange(idx, e)}/>
      </Col>
      </Form.Row>
    </>
  )

}
export default MultiField