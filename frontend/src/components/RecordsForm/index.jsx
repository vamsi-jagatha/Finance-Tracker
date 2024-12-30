import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { financeCategories, paymentMethods } from "../../data";

const RecordsForm = ({
  addRecordCallback,
  updateRecordCallback,
  recordToUpdate,
  setRecordToUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user } = useUser();
  const addUrl = import.meta.env.VITE_ADD_RECORD;
  const updateUrl = import.meta.env.VITE_UPDATE_RECORD;

  useEffect(() => {
    if (recordToUpdate) {
      setTitle(recordToUpdate.title);
      setAmount(recordToUpdate.amount);
      setCategory(recordToUpdate.category);
      setPaymentMethod(recordToUpdate.paymentMethod);
    }
  }, [recordToUpdate]);

  const addRecord = async (record) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(addUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add record");
      }

      const savedRecord = await response.json();
      addRecordCallback(savedRecord);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      clearForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (record) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${updateUrl}/${record._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update record");
      }

      const updatedRecord = await response.json();
      updateRecordCallback(updatedRecord);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      clearForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordForm = async (e) => {
    e.preventDefault();

    const record = {
      userId: user?.id,
      date: recordToUpdate?.date || new Date(),
      title,
      amount: Number(amount),
      category,
      paymentMethod,
    };

    if (recordToUpdate) {
      await updateRecord({ ...record, _id: recordToUpdate._id });
    } else {
      await addRecord(record);
    }
  };

  const clearForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
    setRecordToUpdate(null);
  };

  return (
    <div className="sticky top-40 left-0 flex-1 bg-gray-100 max-w-sm p-6 rounded-3xl text-black shadow-2xl">
      <form onSubmit={handleRecordForm} className="space-y-6">
        <h1 className="text-4xl font-semibold text-center text-blue-500">
          Manage Record
        </h1>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-gray-700">
            Category
          </label>
          <select
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {financeCategories.map((group) => (
              <optgroup key={group.categoryType} label={group.categoryType}>
                {group.categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="paymentMethod" className="text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            required
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select payment method
            </option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.name}>
                {method.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 disabled:bg-gray-400"
        >
          {loading
            ? "Processing..."
            : recordToUpdate
            ? "Update Record"
            : "Add Record"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Action successful!</p>}
      </form>
    </div>
  );
};

export default RecordsForm;
