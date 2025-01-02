import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { financeCategories, paymentMethods } from "../../data";
import { X } from "lucide-react";

const RecordsForm = ({
  addRecordCallback,
  updateRecordCallback,
  recordToUpdate,
  setRecordToUpdate,
  setRecordsFormVisible,
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
      setTimeout(() => setRecordsFormVisible(false), 3000);
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
    <div className="relative flex-1 bg-gray-200 max-w-sm md:max-w-md  p-6 rounded-xl text-black shadow-2xl">
      <div className="flex justify-end items-center absolute top-5 right-5">
        <button
          onClick={() => {
            clearForm();
            setError(null);
            setSuccess(false);
            setRecordToUpdate(null);
            setRecordsFormVisible((prevState) => !prevState);
          }}
          className="text-blue-600 p-2 rounded-full hover:bg-gray-300"
          title="close"
        >
          <X />
        </button>
      </div>
      <form onSubmit={handleRecordForm} className="">
        <h1 className="text-xl font-bold text-left text-blue-500 uppercase">
          {recordToUpdate ? "Update Record" : "Add Record"}
        </h1>
        <div className="flex flex-col mt-2">
          <label htmlFor="title" className="text-gray-700 mb-1">
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
        <div className="flex flex-col mt-2">
          <label htmlFor="amount" className="text-gray-700 mb-1">
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
        <div className="flex flex-col mt-2">
          <label htmlFor="category" className="text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
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
        <div className="flex flex-col mt-2">
          <label htmlFor="paymentMethod" className="text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            required
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
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
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 disabled:bg-gray-400 mt-10"
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
