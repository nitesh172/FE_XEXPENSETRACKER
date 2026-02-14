import "./App.css"
import ExpenseTracker from "./components/Sections/ExpenseTracker"
import RecentTransaction from "./components/Sections/RecentTransaction"
import TopExpenses from "./components/Sections/TopExpenses"

function App() {
  return (
    <div className="App">
      <ExpenseTracker />
      <RecentTransaction />
      <TopExpenses />
    </div>
  )
}

export default App
