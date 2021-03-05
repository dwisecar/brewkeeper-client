import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";


function YeastField({
  idx,
  items, 
  handleChange, 
  handleAmountChange, 
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
        <Form.Control type="number" step="1" min="0" defaultValue={1} name="multi-select-amount" onChange={(e) => handleAmountChange(idx, e)}/>
      </Col>
      </Form.Row>
    </>
  )

}
export default YeastField