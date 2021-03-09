import React from "react";
import { Row, Col } from "react-bootstrap";
import MultiField from './MultiField'
import Icon from '@material-ui/core/Icon';

function MultiInputs({selected, setSelected, items}) { 

  function handleAdd() {
    const values = [...selected];
    values.push({ id: 1, amount: 0 });
    setSelected(values)
  }

  function handleRemove() { 
    const values = [...selected];
    values.pop()
    setSelected(values) 
  }

  function handleChange(i, e) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      id: e.value
    })
    setSelected(values)  
  }

  function handleAmountChange(i, e) {
    const values = [...selected]
    values.splice(i, 1, {
      ...values[i],
      amount: e.target.value
    })
    setSelected(values)
  }

  
  return (
    <div className="multi-inputs">
        {selected.map((field, idx) => {
          return(
              <div key={`${field}-${idx}`}>
                <MultiField 
                  handleRemove={handleRemove} 
                  handleChange={handleChange}
                  handleAmountChange={handleAmountChange}
                  idx={idx} 
                  items={items}
                  count={selected.length}
                  field={field}
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
export default MultiInputs