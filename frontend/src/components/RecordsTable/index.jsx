import { Oval } from "react-loader-spinner";

const RecordsTable = ({
  allRecords,
  setRecordToUpdate,
  deleteRecordCallback,
  isLoading,
  setRecordsFormVisible,
}) => {
  return (
    <div className="relative flex-1 max-w-8xl max-h-72 md:max-h-80 mx-auto  bg-gray-100 rounded-3xl shadow-2xl text-black overflow-x-auto">
      <h2 className="text-4xl min-w-full mb-4 py-4 md:py-6 px-6 font-bold text-gray-600 sticky top-0 left-0 bg-gray-100">
        Your Expenses
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {[
              "S.No",
              "Title",
              "Amount",
              "Category",
              "Date",
              "Payment Method",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                scope="col"
                className="min-w-[80px] h-12 border-b-4 text-center text-sm md:text-base whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan="7"
                className="text-center text-gray-500 text-sm md:text-base h-40"
              >
                <Oval
                  visible={true}
                  strokeWidth="4"
                  secondaryColor="gray"
                  height="35"
                  width="35"
                  color="blue"
                  ariaLabel="oval-loading"
                />
              </td>
            </tr>
          ) : allRecords.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center text-gray-500 text-sm md:text-base h-40"
              >
                No records found
              </td>
            </tr>
          ) : (
            allRecords.map((record, index) => (
              <tr
                key={record._id}
                className="border-b even:bg-gray-50 odd:bg-white hover:bg-gray-100"
              >
                <td className="min-w-[80px] h-12 text-center">{index + 1}</td>
                <td
                  className="min-w-[150px] h-12 text-center truncate"
                  title={record.title}
                >
                  {record.title.length > 15
                    ? `${record.title.slice(0, 15)}...`
                    : record.title}
                </td>
                <td className="min-w-[120px] h-12 text-center">
                  {record.amount || "N/A"}
                </td>
                <td
                  className="min-w-[150px] h-12 text-center truncate"
                  title={record.category}
                >
                  {record.category.length > 15
                    ? `${record.category.slice(0, 15)}...`
                    : record.category}
                </td>
                <td className="min-w-[120px] h-12 text-center">
                  {record.date
                    ? new Date(record.date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td
                  className="min-w-[150px] h-12 text-center"
                  title={record.paymentMethod}
                >
                  {record.paymentMethod || "N/A"}
                </td>
                <td className="min-w-[200px] h-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setRecordsFormVisible((prevState) => !prevState);
                      setRecordToUpdate(record);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400 text-sm md:text-base"
                    aria-label={`Update record titled ${record.title}`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteRecordCallback(record._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 text-sm md:text-base"
                    aria-label={`Delete record titled ${record.title}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
