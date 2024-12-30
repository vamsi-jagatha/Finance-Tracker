import { useUser } from "@clerk/clerk-react";
import RecordsForm from "../../components/RecordsForm";
import RecordsTable from "../../components/RecordsTable";
import { Oval, ThreeDots } from "react-loader-spinner";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Card from "../../components/Card";

import AmountsChart from "../../components/Chart";
import { cardData } from "../../data";

// fetchAllRecords function
const fetchAllRecords = async (
  userId,
  setAllRecords,
  setTotalAmount,
  setIncomeAmount,
  setExpenseAmount,
  setIsLoading
) => {
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

    const total = data.reduce((sum, record) => sum + (record.amount || 0), 0);
    const expenses = data.reduce(
      (sum, record) => sum + (record.amount < 0 ? Math.abs(record.amount) : 0),
      0
    );
    const incomes = data.reduce(
      (sum, record) => sum + (record.amount > 0 ? record.amount : 0),
      0
    );

    setAllRecords(data);
    setTotalAmount(total);
    setExpenseAmount(expenses);
    setIncomeAmount(incomes);
  } catch (err) {
    console.error("Error fetching records:", err);
  } finally {
    setIsLoading(false);
  }
};

// Dashboard component
const Dashboard = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const { user } = useUser();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (user?.id) {
      fetchAllRecords(
        user.id,
        setAllRecords,
        setTotalAmount,
        setIncomeAmount,
        setExpenseAmount,
        setIsLoading
      );
    }
  }, [user]);

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
  const chartData = allRecords.map((record) => {
    const amount = record.amount || 0;
    const date = new Date(record.date).toLocaleDateString();
    return {
      name: date,
      savings: amount,
      income: amount > 0 ? amount : 0,
      expense: amount < 0 ? Math.abs(amount) : 0,
    };
  });

  const getAmountForCategory = (categoryType) => {
    switch (categoryType) {
      case "income":
        return incomeAmount;
      case "expenses":
        return expenseAmount;
      default:
        return totalAmount;
    }
  };

  return (
    <main
      className={` relative top-16 p-6 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-[90vh]`}
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
          <header className="mb-4">
            <h1 className=" text-4xl md:text-6xl font-bold inline-flex items-center font-ragnear">
              Welcome{" "}
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
              !
            </h1>
          </header>
          <div className="flex flex-col lg:flex-row gap-6">
            <section className="flex-1">
              <RecordsForm
                addRecordCallback={addRecordToTable}
                updateRecordCallback={updateRecordInTable}
                recordToUpdate={recordToUpdate}
                setRecordToUpdate={setRecordToUpdate}
              />
            </section>
            <section className="flex-1">
              <h2 className="text-2xl mb-4 font-semibold">Overview</h2>
              <div className="flex gap-5 items-center flex-wrap">
                {cardData.map((card) => {
                  return (
                    <Card
                      key={card.id}
                      title={card.title}
                      icon={card.icon}
                      amount={getAmountForCategory(card.categoryType)}
                      bgColor={card.bgColor}
                      iconColor={card.iconColor}
                    />
                  );
                })}
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Graph</h2>
                <AmountsChart data={chartData} />
              </div>
              <div className="flex-grow-2 overflow-y-auto max-h-screen mt-6">
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
                    <h2 className="text-2xl font-semibold mb-4">
                      {" "}
                      Finances Table
                    </h2>
                    <RecordsTable
                      allRecords={allRecords}
                      setAllRecords={setAllRecords}
                      setRecordToUpdate={setRecordToUpdate}
                      deleteRecordCallback={deleteRecordFromTable}
                    />
                  </>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
