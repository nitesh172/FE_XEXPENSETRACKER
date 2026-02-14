import { useState, useEffect } from "react"
import { useAppContext } from "../../context/AppContext"

function TopExpenses() {
  const { getCategoryPercentages, transactions } = useAppContext()

  const [data, setData] = useState([])

  useEffect(() => {
    setData(getCategoryPercentages())
  }, [transactions])

  return (
    <div className="section top-expenses">
      <h2 className="ubuntu-bold-italic">Top Expenses</h2>
      <div className="top-expenses-section">
        {data.map((item, index) => (
          <div className="expense-row" key={index}>
            <span className="expense-label ubuntu-normal">{item.name}</span>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopExpenses
