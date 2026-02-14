import { useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { IoFastFoodOutline } from "react-icons/io5"
import { MdCardTravel, MdOutlineEdit } from "react-icons/md"
import { RiMovie2AiLine } from "react-icons/ri"
import { RxCross1 } from "react-icons/rx"
import ReactModal from "react-modal"
import { useAppContext } from "../../context/AppContext"

function RecentTransaction() {
  const { transactions, deleteExpense, setSelectedId, expenseModalOpen } =
    useAppContext()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  )

  return (
    <div className="section recent-transactions">
      <h2 className="ubuntu-bold-italic">Recent Transactions</h2>

      <div className="recent-transactions-section">
        {transactions.length === 0 ? (
          <div
            className="ubuntu-normal"
            style={{
              color: "black",
              fontSize: "20px",
              margin: 20,
            }}
          >
            No transactions!
          </div>
        ) : (
          currentTransactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item, index) => (
              <div className="transaction-row" key={index}>
                <div className="left">
                  <div className="icon">
                    {item.category === "food" ? (
                      <IoFastFoodOutline />
                    ) : item.category === "entertainment" ? (
                      <RiMovie2AiLine />
                    ) : (
                      <MdCardTravel />
                    )}
                  </div>

                  <div className="info">
                    <p className="title">{item.title}</p>
                    <p className="date">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="right">
                  <span className="amount">₹{item.amount}</span>

                  <button
                    onClick={() => deleteExpense(item.id, item.amount)}
                    className="btn delete"
                  >
                    <RxCross1 />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(item.id)
                      expenseModalOpen()
                    }}
                    className="btn edit"
                  >
                    <MdOutlineEdit />
                  </button>
                </div>
              </div>
            ))
        )}

        {transactions.length > 3 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <FaArrowLeft />
            </button>
            <span className="active">{currentPage}</span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <FaArrowRight />
            </button>
          </div>
        )}

        <ReactModal
          isOpen={false}
          contentLabel="onRequestClose Example"
          onRequestClose={() => {}}
        >
          <p>Modal text!</p>
          <button onClick={() => {}}>Close Modal</button>
        </ReactModal>
      </div>
    </div>
  )
}

export default RecentTransaction
