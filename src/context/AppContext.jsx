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
    Number(localStorage.getItem("expense")) || 0,
  )

  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("expenses")) || [],
  )

  const addBalance = (price) => {
    setWalletBalance((prev) => prev + Number(price))
    localStorage.setItem("walletBalance", walletBalance + Number(price))
  }

  const addExpense = (transaction) => {
    if (walletBalance < transaction.price) return alert("Insufficient Balance")
    setTransactions((prev) => [...prev, transaction])
    setExpenses((prev) => prev + Number(transaction.price))
    setWalletBalance((prev) => prev - Number(transaction.price))
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, transaction]),
    )
    localStorage.setItem("expenses", expenses + Number(transaction.price))
    localStorage.setItem(
      "walletBalance",
      walletBalance - Number(transaction.price),
    )
  }

  const updateExpense = (transaction) => {
    if (walletBalance < transaction.price) return alert("Insufficient Balance")
    const oldTransaction = transactions.find((t) => t.id === transaction.id)
    const priceDiff = Number(transaction.price) - Number(oldTransaction.price)

    let updateTransaction = {
      ...oldTransaction,
      ...transaction,
    }

    const updatedTransactions = transactions.map((t) =>
      t.id === transaction.id ? updateTransaction : t,
    )

    setTransactions(updatedTransactions)
    setExpenses((prev) => prev + priceDiff)
    setWalletBalance((prev) => prev - priceDiff)

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions))
    localStorage.setItem("expenses", expenses + priceDiff)
    localStorage.setItem("walletBalance", walletBalance - priceDiff)
    setSelectedId("")
  }

  const deleteExpense = (id, price) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
    setExpenses((prev) => prev - Number(price))
    setWalletBalance((prev) => prev + Number(price))
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions.filter((item) => item.id !== id)),
    )
    localStorage.setItem("expenses", expenses - Number(price))
    localStorage.setItem("walletBalance", walletBalance + Number(price))
  }

  const getCategoryPercentages = () => {
    const categoryTotals = transactions.reduce(
      (acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.price)
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
        price: categoryTotals[category],
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
