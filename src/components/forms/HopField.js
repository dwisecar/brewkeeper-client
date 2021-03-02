import React, { useState } from "react";
import { Form, ButtonGroup, Button, Col } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function HopField({count, handleRemove, idx, items, handleChange, handleAmountChange, handleTimeChange, handleBoilChange}) {

  const [boilAddition, setBoilAddition] = useState(true)

  return (
    <Form.Row>
      <Col xs={4}>
        <Form.Label>Type</Form.Label>
          <Form.Control as="select" name="multi-select-name" onChange={(e) => handleChange(idx, e)}>
          {items.map(item => <option value={item.id}>{item.name}</option>)}
          </Form.Control>
      </Col>

      <Col xs={2}>
        <Form.Label>Oz</Form.Label>
        <Form.Control type="number" step="0.01" name="multi-select-amount"  onChange={(e) => handleAmountChange(idx, e)}/>
      </Col>
      
      <Col xs={4}>
      <Form.Label>Addition Time {boilAddition ? "(Minutes)" : "(Days)"}</Form.Label>
      <Form.Control type="number" name="multi-select-time"  onChange={(e) => handleTimeChange(idx, e)}/>
      </Col>

      <Col className="boil-btn">
        <BootstrapSwitchButton
          checked={boilAddition}
          width={100} height={38}
          onlabel='Boil'
          offlabel='Dry Hop'
          onChange={checked => {
              handleBoilChange(idx, checked)
              setBoilAddition(checked)
          }}
        />
      </Col>
      </Form.Row>
  )

}
export default HopField