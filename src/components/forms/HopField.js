import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Select from 'react-select';

function HopField({ idx, items, handleChange, handleAmountChange, handleTimeChange, handleBoilChange}) {

  const [boilAddition, setBoilAddition] = useState(true)

  //function that returns an array of the options for the select input. react-select requires {label, value} format
  const options = items => {
    let arr = []
    items.forEach(element => {
      arr = [...arr, {label: element.name, value: element.id}]
    });
    return arr
  }

  return (
    <Form.Row>
      <Col xs={4}>
        <Form.Label>Type</Form.Label>
        <Select
          className='select-input-new'
          options={options(items)}
          onChange={(e) => handleChange(idx, e)}
          placeholder="Select A Hop..."
        />
      </Col>

      <Col xs={2}>
        <Form.Label>Oz</Form.Label>
        <Form.Control type="number" step="0.01" min="0" name="multi-select-amount"  onChange={(e) => handleAmountChange(idx, e)}/>
      </Col>

      <Col className="boil-btn">
        <BootstrapSwitchButton
          onstyle="dark"
          offstyle="success"
          checked={boilAddition}
          width={100}
          onlabel='Boil'
          offlabel='Dry Hop'
          onChange={checked => {
              handleBoilChange(idx, checked)
              setBoilAddition(checked)
          }}
        />
      </Col>
      
      <Col xs={4}>
        <Form.Label>Addition Time {boilAddition ? "(Minutes)" : "(Days)"}</Form.Label>
        <Form.Control type="number" min="0" name="multi-select-time"  onChange={(e) => handleTimeChange(idx, e)}/>
      </Col>

      </Form.Row>
  )

}
export default HopField