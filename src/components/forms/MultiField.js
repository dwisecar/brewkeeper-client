import React from "react";
import { Form, Col } from "react-bootstrap";
import Select from 'react-select';

function MultiField({ 
  idx, 
  items, 
  handleChange, 
  handleAmountChange}) 
  {
    
//function that returns an array of the options for the select input. react-select requires {label, value} format
  const options = items => {
    let arr = []
    items.forEach(element => {
      arr = [...arr, {label: `${element.name} | ${element.srm_id}°L | ${element.potential}`, value: element.id}]
    });
    return arr
  }
  
  return (
      <Form.Row id={`multi-row-${idx}`}>
      <Col xs={7}>
        <Form.Label>Type</Form.Label>
        <Select
        className='select-input-new'
          options={options(items)}
          onChange={(e) => handleChange(idx, e)}
          placeholder="Select A Fermentable..."
        />
      </Col>
      <Col xs={2}>
        <Form.Label>Lbs</Form.Label>
        <Form.Control type="number" step="0.01" min="0" name="multi-select-amount" onChange={(e) => handleAmountChange(idx, e)}/>
      </Col>
      </Form.Row>
  )

}
export default MultiField