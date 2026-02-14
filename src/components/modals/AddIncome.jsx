import React, { useState } from "react"
import { useAppContext } from "../../context/AppContext"

function AddIncome({ close }) {
  const { addBalance } = useAppContext()
  const [value, setValue] = useState(0)

  const onAddBalance = () => {
    addBalance(value)
    setValue(0)
    close()
  }

  return (
    <div>
      <h2 className="modal-title">Add Balance</h2>
      <form onSubmit={onAddBalance} className="modal-content">
        <input
          type="number"
          placeholder="Income Amount"
          className="modal-input"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="btn-coantiner">
          <button type="submit" className="modal-btn add">
            Add Balance
          </button>

          <button type="button" className="modal-btn cancel" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddIncome
