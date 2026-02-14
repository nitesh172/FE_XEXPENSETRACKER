import { PieChart } from "@mui/x-charts/PieChart"
import ReactModal from "react-modal"
import { useAppContext } from "../../context/AppContext"
import AddIncome from "../modals/AddIncome"
import AddExpense from "../modals/AddExpense"
import { useEffect, useState } from "react"

function ExpenseTracker() {
  const {
    walletBalance,
    expenses,
    isOpenExpenseModal,
    isOpenIncomeModal,
    expenseModalClose,
    incomeModalClose,
    expenseModalOpen,
    incomeModalOpen,
    getCategoryPercentages,
    transactions,
  } = useAppContext()

  const [data, setData] = useState([])

  useEffect(() => {
    setData(getCategoryPercentages())
  }, [transactions])

  return (
    <div className="section expense-section">
      <h1 className="ubuntu-bold">Expense Tracker</h1>
      <div className="expense-tracker-section">
        <div className="expense-tracker">
          <div className="ubuntu-regular">
            Wallet Balance:{" "}
            <span className="ubuntu-bold wallet-balance">₹{walletBalance}</span>
          </div>
          <button
            onClick={incomeModalOpen}
            className="expense-tracker-button ubuntu-bold button-add-income"
          >
            + Add Income
          </button>
        </div>
        <div className="expense-tracker">
          <div className="ubuntu-regular">
            Expenses:{" "}
            <span className="ubuntu-bold expense-balance">₹{expenses}</span>
          </div>
          <button
            onClick={expenseModalOpen}
            className="expense-tracker-button ubuntu-bold button-add-expense"
          >
            + Add Expense
          </button>
        </div>
        <div>
          <PieChart
            series={[
              {
                data: data.map((item) => ({
                  id: item.name,
                  value: item.value,
                  label: item.name,
                })),
                colors: ["#ff6384", "#36a2eb", "#ffce56"],
              },
            ]}
            width={200}
            height={200}
            slotProps={{
              legend: {
                direction: "row",
                position: {
                  vertical: "bottom",
                  horizontal: "middle",
                },
              },
            }}
            sx={{
              "& .MuiPieArc-root": {
                stroke: "none",
              },
              "& .MuiChartsLegend-label": {
                fill: "#ffffff",
                color: "#ffffff",
              },
              "& .MuiChartsLegend-mark": {
                stroke: "none",
              },
              "& .MuiChartsLegend-root": {
                marginTop: "18px",
              },
            }}
          />
        </div>
      </div>
      <ReactModal
        isOpen={isOpenIncomeModal}
        ariaHideApp={false}
        onRequestClose={incomeModalClose}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <AddIncome close={incomeModalClose} />
      </ReactModal>
      <ReactModal
        isOpen={isOpenExpenseModal}
        ariaHideApp={false}
        onRequestClose={expenseModalClose}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <AddExpense close={expenseModalClose} />
      </ReactModal>
    </div>
  )
}

export default ExpenseTracker
