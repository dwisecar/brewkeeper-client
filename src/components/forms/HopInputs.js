import { Row, Col } from 'react-bootstrap'
import React from "react";
import HopField from './HopField'
import Icon from '@material-ui/core/Icon';

function HopInputs({selected, setSelected, items, updateStats}) { 

  function handleAdd() {
    const values = [...selected];
    values.push({ id: 1, amount: 0, additionTime: 60, boilAddition: true });
    setSelected(values)
  }

  function handleRemove(i) {
    const values = [...selected];
    values.splice(i, 1);
    setSelected(values)  
  }

  function handleChange(i, e) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      id: e.target.value
    })
    setSelected(values)
    setTimeout(() => {
      updateStats()
    }, 1000);   
  }

  function handleAmountChange(i, e) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      amount: e.target.value
    })
    setSelected(values)
  }

  function handleTimeChange(i, e) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      additionTime: e.target.value
    })
    setSelected(values)
  }

  function handleBoilChange(i, bool) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      boilAddition: bool
    })
    setSelected(values)
  }

  return (
    <div className="multi-inputs">
      
          {selected.map((field, idx) => {
            return(
              <div key={`${field}-${idx}`}>
                <HopField 
                  handleRemove={handleRemove} 
                  handleChange={handleChange}
                  handleAmountChange={handleAmountChange}
                  handleTimeChange={handleTimeChange}
                  handleBoilChange={handleBoilChange}
                  idx={idx} 
                  items={items}
                  count={selected.length}
                  />
              </div>
            )
          })}
        <Row>
          <Col xs={1}>
            <Icon 
              className="fa fa-plus-circle" 
              style={{ color: "black", cursor: "pointer" }} 
              onClick={() => handleAdd()}
            />
          </Col>
          <Col>
            {selected.length > 1 && 
              <Icon 
                className="fa fa-minus-circle"
                style={{ color: "brown", cursor: "pointer" }} 
                onClick={() => handleRemove()}
              />
            }
          </Col>
        </Row>
    </div>
  )
}
export default HopInputs