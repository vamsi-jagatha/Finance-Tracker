import { useUser } from "@clerk/clerk-react";
import RecordsForm from "../../components/RecordsForm";
import RecordsTable from "../../components/RecordsTable";
import { Oval, ThreeDots } from "react-loader-spinner";
import { useEffect, useState, useContext, useMemo } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Card from "../../components/Card";
import { useLocation } from "react-router-dom";
import AmountsChart from "../../components/Chart";
import { cardData } from "../../data";
import Sidebar from "../../components/Sidebar";

// fetchAllRecords function
const fetchAllRecords = async (userId, setAllRecords, setIsLoading) => {
  if (!userId) return;

  const url = `${import.meta.env.VITE_GET_ALL_RECORDS}/${userId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch records");
    }
    const data = await response.json();

    setAllRecords(data);
  } catch (err) {
    console.error("Error fetching records:", err);
  } finally {
    setIsLoading(false);
  }
};

// Dashboard component
const Dashboard = () => {
  const location = useLocation();
  const currentHash = location.hash;
  const [allRecords, setAllRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [newBudget, setNewBudget] = useState(0);
  const [showRecordsForm, setShowRecordsForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  const { user } = useUser();
  const { theme } = useContext(ThemeContext);

  // handleSort function
  const handleSort = (field, isAscOrder) => {
    const sortedRecords = [...allRecords].sort((a, b) => {
      if (isAscOrder) {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
    setAllRecords(sortedRecords);
  };

  useEffect(() => {
    if (user?.id) {
      fetchAllRecords(user.id, setAllRecords, setIsLoading);
    }
  }, [user]);

  const calculateRecordsTotals = async () => {
    const url = `${import.meta.env.VITE_CALCULATE_TOTAL}/${user.id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to calculate totals");
    }
    const data = await response.json();
    setTotalAmount(data.balance);
    setIncomeAmount(data.totalIncome);
    setExpenseAmount(data.totalExpense);
  };

  // recalculateTotals function
  const recalculateTotals = (records) => {
    const total = records.reduce(
      (sum, record) => sum + (record.amount || 0),
      0
    );
    const expenses = records.reduce(
      (sum, record) => sum + (record.amount < 0 ? Math.abs(record.amount) : 0),
      0
    );
    const incomes = records.reduce(
      (sum, record) => sum + (record.amount > 0 ? record.amount : 0),
      0
    );

    setTotalAmount(total);
    setExpenseAmount(expenses);
    setIncomeAmount(incomes);
  };

  calculateRecordsTotals();

  // addRecordToTable function
  const addRecordToTable = (addedRecord) => {
    setAllRecords((prevRecords) => {
      const updatedRecords = [...prevRecords, addedRecord];
      recalculateTotals(updatedRecords);
      return updatedRecords;
    });
  };

  // updateRecordInTable function
  const updateRecordInTable = (updatedRecord) => {
    setAllRecords((prevRecords) => {
      const updatedRecords = prevRecords.map((record) =>
        record._id === updatedRecord._id ? updatedRecord : record
      );
      recalculateTotals(updatedRecords);
      return updatedRecords;
    });
  };

  // deleteRecordFromTable function
  const deleteRecordFromTable = async (recordId) => {
    const url = `${import.meta.env.VITE_DELETE_RECORD}/${recordId}`;
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete record");
      }
      setAllRecords((prevRecords) => {
        const updatedRecords = prevRecords.filter(
          (record) => record._id !== recordId
        );
        recalculateTotals(updatedRecords);
        return updatedRecords;
      });
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  // chartData
  const chartData = useMemo(() => {
    return allRecords.map((record) => {
      const amount = record.amount || 0;
      const date = new Date(record.date).toLocaleDateString();
      return {
        date: date,
        savings: amount,
        income: amount > 0 ? amount : 0,
        expense: amount < 0 ? Math.abs(amount) : 0,
      };
    });
  }, [allRecords]);

  const getAmountForCategory = (categoryType) => {
    switch (categoryType) {
      case "income":
        return incomeAmount;
      case "expenses":
        return -expenseAmount;
      default:
        return totalAmount;
    }
  };

  const handleAddBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid budget amount.");
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_POST_BUDGET}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            budgetAmount: amount,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setShowBudgetForm(false);
        } else {
          alert(data.message || "Error saving budget");
        }
      } catch (err) {
        console.error("Error saving budget:", err);
        alert("There was an error saving your budget.");
      }
    }
  };

  useEffect(() => {
    if (user?.id) {
      const fetchBudget = async () => {
        const url = `${import.meta.env.VITE_GET_BUDGET}/${user.id}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching budget:", errorData.message);
            return;
          }
          const data = await response.json();
          setNewBudget(data.budget || 0);
          console.log(data);
        } catch (err) {
          console.error("Error fetching budget:", err);
        }
      };

      fetchBudget();
    }
  }, [user]);

  const dashboardDetails = () => {
    return (
      <>
        {showBudgetForm && (
          <section
            className={`fixed left-0 top-0 w-screen h-screen ${
              theme === "dark" ? "bg-black/60" : "bg-white/50"
            } z-50 flex items-center justify-center`}
          >
            {/* Modal */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-black border border-gray-600/50 text-white"
                  : "bg-white text-black"
              }  p-8 rounded-lg shadow-lg w-3/4 md:w-1/3`}
            >
              <h2 className="text-3xl md:text-4xl font-ragnear font-semibold mb-4">
                Set Your Budget
              </h2>
              <p className="text-md md:text-lg mb-4">
                Enter the amount for your budget. This will help you monitor
                your expenses.
              </p>

              <input
                type="number"
                className={`w-full  py-2 px-4 rounded-lg border border-gray-600/50 mb-4 ${
                  theme === "dark"
                    ? "bg-black  text-white"
                    : "bg-white text-black"
                }`}
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="Enter budget amount"
              />

              <div className="flex justify-between">
                <button
                  className="bg-blue-600 text-white  py-1 md:py-2 px-4 rounded-lg text-md md:text-lg hover:bg-blue-700 transition duration-300"
                  onClick={handleAddBudget}
                >
                  Set Budget
                </button>
                <button
                  className="bg-gray-300 text-black  py-1 md:py-2 px-4 rounded-lg text-md md:text-lg hover:bg-gray-400 transition duration-300"
                  onClick={() => setShowBudgetForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        )}

        {showRecordsForm && (
          <section
            className={`fixed left-0 top-0  w-screen h-screen ${
              theme === "dark" ? "bg-black/60" : "bg-white/50"
            }  z-50 flex items-center justify-center`}
          >
            <RecordsForm
              addRecordCallback={addRecordToTable}
              updateRecordCallback={updateRecordInTable}
              recordToUpdate={recordToUpdate}
              setRecordToUpdate={setRecordToUpdate}
              setRecordsFormVisible={setShowRecordsForm}
            />
          </section>
        )}

        <section className="flex-1  md:ml-32 lg:ml-64">
          <div className="flex justify-between flex-col md:flex-row gap-6 md:items-center  mb-6 md:mb-10 ">
            <h1 className=" text-4xl md:text-6xl font-bold inline-flex items-center font-ragnear ">
              Hello,{" "}
              {isLoading ? (
                <ThreeDots
                  visible={true}
                  strokeWidth="4"
                  secondaryColor="gray"
                  height="35"
                  width="35"
                  color="blue"
                  ariaLabel="oval-loading"
                />
              ) : (
                <span className="text-blue-500 font-ragnear ml-4 md:ml-5 mr-2 md:mr-3">
                  {user?.firstName}
                </span>
              )}
              👋
            </h1>
            <div className="  flex items gap-6  ">
              <button
                className="border-blue-600 border-2 text-blue-500  p-2 rounded-lg "
                onClick={() => setShowRecordsForm(!showRecordsForm)}
              >
                Add Record
              </button>
              <button
                className="bg-blue-600 p-2 rounded-lg text-white"
                onClick={() => setShowBudgetForm(!showBudgetForm)}
              >
                Add Budget
              </button>
            </div>
          </div>
          <h2 className="text-4xl m-10 mb-10 ml-0 font-semibold text-gray-500 font-ragnear ">
            Overview
          </h2>
          <div className="flex gap-5 items-center  flex-wrap  md:flex-nowrap">
            {cardData.map((card) => {
              return (
                <Card
                  key={card.id}
                  title={card.title}
                  icon={card.icon}
                  amount={getAmountForCategory(card.categoryType)}
                  bgColorLight={card.bgColorLight}
                  bgColorDark={card.bgColorDark}
                  iconColor={card.iconColor}
                />
              );
            })}
          </div>
          <div className="mb-6">
            <h2 className="text-4xl m-5 mb-10 ml-0 font-semibold text-gray-500 font-ragnear ">
              Analytics
            </h2>
            <AmountsChart data={chartData} />
          </div>
          <div className="flex-grow-2 overflow-y-auto max-h-full mt-6">
            {isLoading ? (
              <div className="flex justify-center min-w-96 h-[70vh] w-[70vw] items-center">
                <Oval
                  visible={true}
                  strokeWidth="4"
                  secondaryColor="gray"
                  height="35"
                  width="35"
                  color="blue"
                  ariaLabel="oval-loading"
                />
              </div>
            ) : (
              <>
                <h2 className="text-4xl m-5 mb-10 ml-0 font-semibold text-gray-500 font-ragnear ">
                  {" "}
                  Transactions
                </h2>
                <RecordsTable
                  allRecords={allRecords}
                  setAllRecords={setAllRecords}
                  setRecordToUpdate={setRecordToUpdate}
                  deleteRecordCallback={deleteRecordFromTable}
                  setRecordsFormVisible={setShowRecordsForm}
                  handleSort={handleSort}
                />
              </>
            )}
          </div>
        </section>
      </>
    );
  };

  const budgetDetails = () => {
    return (
      <section className="flex-1 md:ml-32 lg:ml-64">
        <div className="py-10 px-6 min-h-[80vh] text-white bg-blue-600/50 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-ragnear lg:text-6xl font-bold">
            Budget Guard: Your Smart Expense Monitor
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Set Your Budget, Stay Alert, Spend Wisely.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Current Balance Card */}
            <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Budget
              </h2>
              <p className="text-xl mt-2">Rs.{newBudget}</p>
            </div>
            <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Current Balance
              </h2>
              <p className="text-xl mt-2">Rs.{totalAmount.toFixed(2)}</p>
            </div>
            {/* Total Expenses Card */}
            <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Total Expenses
              </h2>
              <p className="text-xl mt-2">Rs.{expenseAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const notificationsDetails = () => {
    return (
      <section className="flex-1  md:ml-32 lg:ml-64">
        <h1>Notification</h1>
      </section>
    );
  };

  const helpDetails = () => {
    return (
      <section className="flex-1  md:ml-32 lg:ml-64">
        <h1>Help</h1>
      </section>
    );
  };

  const renderContent = (hash) => {
    switch (hash) {
      case "":
        return dashboardDetails();
      case "#budget":
        return budgetDetails();
      case "#notifications":
        return notificationsDetails();
      case "#help":
        return helpDetails();
      default:
        console.log("No matching case");
        return null;
    }
  };

  return (
    <main
      className={` relative top-16 p-6 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-[91vh]`}
    >
      {isLoading ? (
        <div className="min-h-[90vh] flex items-center justify-center">
          <Oval
            visible={true}
            strokeWidth="4"
            secondaryColor="gray"
            height="35"
            width="35"
            color="blue"
            ariaLabel="oval-loading"
          />
        </div>
      ) : (
        <>
          <header className="mb-4"></header>
          <div className="flex flex-col lg:flex-row gap-6">
            <Sidebar />
            {renderContent(currentHash)}
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
