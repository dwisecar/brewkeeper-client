import React from "react";
import { Form, Col } from "react-bootstrap";
import Select from 'react-select';

function YeastField({
  idx,
  items, 
  handleChange, 
  handleAmountChange}) 
  {

  //function that returns an array of the options for the select input. react-select requires {label, value} format
  const options = items => {
    let arr = []
    items.forEach(element => {
      arr = [...arr, {label: `${element.name} | Attenuation: ${element.attenuation_min}% - ${element.attenuation_max}%`, value: element.id}]
    });
    return arr
  }
  return (
    <>
    <Form.Row>
      <Col xs={7}>
        <Form.Label>Type</Form.Label>
        <Select
          className='select-input-new'
          options={options(items)}
          onChange={(e) => handleChange(idx, e)}
          placeholder="Select A Yeast Type..."
        />
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