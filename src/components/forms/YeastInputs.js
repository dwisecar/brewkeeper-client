import React from "react";
import YeastField from "./YeastField";

function YeastInputs({selected, setSelected, items}) { 

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