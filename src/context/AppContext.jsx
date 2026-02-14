import React, { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false)
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)

  const [selectedId, setSelectedId] = useState("")

  const expenseModalClose = () => setIsOpenExpenseModal(false)
  const incomeModalClose = () => setIsOpenIncomeModal(false)

  const expenseModalOpen = () => setIsOpenExpenseModal(true)
  const incomeModalOpen = () => setIsOpenIncomeModal(true)

  const [walletBalance, setWalletBalance] = useState(
    Number(localStorage.getItem("walletBalance")) || 5000,
  )
  const [expenses, setExpenses] = useState(
    Number(localStorage.getItem("expenses")) || 0,
  )

  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || [],
  )

  const addBalance = (amount) => {
    setWalletBalance((prev) => prev + Number(amount))
    localStorage.setItem("walletBalance", walletBalance + Number(amount))
  }

  const addExpense = (transaction) => {
    if (walletBalance < transaction.amount) return alert("Insufficient Balance")
    setTransactions((prev) => [...prev, transaction])
    setExpenses((prev) => prev + Number(transaction.amount))
    setWalletBalance((prev) => prev - Number(transaction.amount))
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, transaction]),
    )
    localStorage.setItem("expenses", expenses + Number(transaction.amount))
    localStorage.setItem(
      "walletBalance",
      walletBalance - Number(transaction.amount),
    )
  }

  const updateExpense = (transaction) => {
    if (walletBalance < transaction.amount) return alert("Insufficient Balance")
    const oldTransaction = transactions.find((t) => t.id === transaction.id)
    const amountDiff =
      Number(transaction.amount) - Number(oldTransaction.amount)

    let updateTransaction = {
      ...oldTransaction,
      ...transaction,
    }

    const updatedTransactions = transactions.map((t) =>
      t.id === transaction.id ? updateTransaction : t,
    )

    setTransactions(updatedTransactions)
    setExpenses((prev) => prev + amountDiff)
    setWalletBalance((prev) => prev - amountDiff)

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions))
    localStorage.setItem("expenses", expenses + amountDiff)
    localStorage.setItem("walletBalance", walletBalance - amountDiff)
    setSelectedId("")
  }

  const deleteExpense = (id, amount) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
    setExpenses((prev) => prev - Number(amount))
    setWalletBalance((prev) => prev + Number(amount))
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions.filter((item) => item.id !== id)),
    )
    localStorage.setItem("expenses", expenses - Number(amount))
    localStorage.setItem("walletBalance", walletBalance + Number(amount))
  }

  const getCategoryPercentages = () => {
    const categoryTotals = transactions.reduce(
      (acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount)
        return acc
      },
      { food: 0, entertainment: 0, travel: 0 },
    )

    return Object.keys(categoryTotals)
      .map((category) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value:
          expenses > 0
            ? Math.round((categoryTotals[category] / expenses) * 100)
            : 0,
        amount: categoryTotals[category],
      }))
      .sort((a, b) => b.value - a.value)
  }

  return (
    <AppContext.Provider
      value={{
        walletBalance,
        expenses,
        transactions,
        addBalance,
        addExpense,
        deleteExpense,
        isOpenExpenseModal,
        isOpenIncomeModal,
        expenseModalClose,
        incomeModalClose,
        expenseModalOpen,
        incomeModalOpen,
        selectedId,
        setSelectedId,
        updateExpense,
        getCategoryPercentages,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
