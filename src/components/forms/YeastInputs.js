import React from "react";
import { Row, Col } from "react-bootstrap";
import YeastField from "./YeastField";
import Icon from '@material-ui/core/Icon';

function YeastInputs({selected, setSelected, items, updateStats}) { 

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

  return (
    <div>
        {selected.map((field, idx) => {
          return(
              <div key={`${field}-${idx}`}>
                <YeastField 
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
      </div>
  )
}
export default YeastInputs