import React, { useState } from "react";
import { Form, ButtonGroup, Button } from "react-bootstrap";

function HopField({handleRemove, idx, items, handleChange, handleAmountChange, handleTimeChange, handleBoilChange}) {

  const [boilAddition, setBoilAddition] = useState(true)

  return (
    <>
      <Form.Control as="select" name="multi-select-name" onChange={(e) => handleChange(idx, e)}>
        {items.map(item => <option value={item.id}>{item.name}</option>)}
      </Form.Control>
      <Form.Label>Oz</Form.Label>
      <Form.Control type="text" name="multi-select-amount" placeholder={0} onChange={(e) => handleAmountChange(idx, e)}/>
      <Form.Label>Addition Time {boilAddition ? "in Minutes" : "in Days"}</Form.Label>
      <Form.Control type="text" name="multi-select-time" placeholder={60} onChange={(e) => handleTimeChange(idx, e)}/>
      <ButtonGroup>
        <Button variant="secondary" onClick={() => (handleBoilChange(idx, true), setBoilAddition(true))}>Boil</Button>
        <Button variant="secondary" onClick={() => (handleBoilChange(idx, false), setBoilAddition(false))}>Dry-Hop</Button>
      </ButtonGroup>
      <button type="button" onClick={() => handleRemove(idx)}>X</button>
    </>
  )

}
export default HopField