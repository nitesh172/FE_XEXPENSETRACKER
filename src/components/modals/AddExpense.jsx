import React, { useState } from "react"
import { useAppContext } from "../../context/AppContext"

function AddExpense({ close }) {
  const { addExpense, selectedId, transactions, updateExpense } =
    useAppContext()

  const Items = selectedId
    ? transactions.find((item) => item.id === selectedId)
    : {
        id: Math.random(),
        title: "",
        amount: null,
        category: "",
        date: new Date(),
      }

  const [value, setValue] = useState(Items)

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const onAddExpense = () => {
    selectedId ? updateExpense(value) : addExpense(value)
    setValue(0)
    close()
  }

  return (
    <div>
      <h2 className="modal-title">
        {selectedId ? "Edit Expenses" : "Add Expenses"}
      </h2>
      <form onSubmit={onAddExpense} className="modal-content">
        <div className="input-container">
          <input
            type="text"
            placeholder="Title"
            className="modal-input"
            value={value.title}
            name="title"
            required
            onChange={onChange}
          />
          <input
            type="number"
            placeholder="Price"
            className="modal-input"
            name="amount"
            required
            value={value.amount}
            onChange={onChange}
          />
        </div>

        <div className="input-container">
          <select
            placeholder="Select Category"
            style={{ flex: 1 }}
            className="modal-input"
            name="category"
            required
            onChange={onChange}
            value={value.category}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            className="modal-input"
            value={value.date}
            required
            name="date"
            onChange={onChange}
          />
        </div>

        <div className="btn-coantiner">
          <button type="submit" className="modal-btn add">
            Add Expenses
          </button>

          <button type="button" className="modal-btn cancel" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddExpense
