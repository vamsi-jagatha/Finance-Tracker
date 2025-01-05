import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Oval } from "react-loader-spinner";
import Dropdown from "../Dropdown";
import { useState } from "react";

const RecordsTable = ({
  allRecords,
  setRecordToUpdate,
  deleteRecordCallback,
  isLoading,
  setRecordsFormVisible,
  handleSort,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  // Calculate records for the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = allRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  // Handle page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className=" flex-1 max-w-8xl  mx-auto rounded-xl shadow-2xl overflow-x-auto border border-gray-600/50">
      {/* Table */}
      <table className="w-full border-collapse ">
        <thead className="sticky top-0  z-10 ">
          <tr>
            <th
              colSpan="7"
              className="text-2xl md:text-4xl py-4 md:py-6 px-6 font-bold text-gray-600  text-left "
            >
              Your Finances
            </th>

            <th colSpan="2">
              <Dropdown handleSort={handleSort} />
            </th>
          </tr>
          <tr className="border-y border-gray-600/50 ">
            {[
              "S.No",
              "Title",
              "Amount",
              "Category",
              "Date",
              "Payment Method",
              "Type",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                scope="col"
                className="min-w-[80px] h-14 text-center text-sm md:text-base whitespace-nowrap  "
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
            currentRecords.map((record, index) => (
              <tr
                key={record._id}
                className="border-y border-gray-600/50 hover:bg-gray-500/20"
              >
                <td className="min-w-[80px] h-12 text-center">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
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
                <td
                  className="min-w-[150px] h-12 text-center"
                  title={record.amount}
                >
                  {record.amount > 0 ? (
                    <span className="bg-emerald-500 w-fit m-auto flex justify-center items-center text-white px-2 py-1 rounded-md">
                      {"income"}
                    </span>
                  ) : (
                    <span className="bg-red-500 w-fit m-auto flex justify-center items-center text-white px-2 py-1 rounded-md">
                      {"expense"}
                    </span>
                  )}
                </td>
                <td className="min-w-[200px] h-12 flex items-center justify-center gap-6">
                  <button
                    onClick={() => {
                      setRecordsFormVisible((prevState) => !prevState);
                      setRecordToUpdate(record);
                    }}
                    className="text-sm md:text-base"
                    title="update record"
                    aria-label={`Update record titled ${record.title}`}
                  >
                    <SquarePen />
                  </button>
                  <button
                    onClick={() => deleteRecordCallback(record._id)}
                    className="text-sm md:text-base"
                    aria-label={`Delete record titled ${record.title}`}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-600/50  px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={handlePreviousPage}
            className="relative inline-flex items-center rounded-md border border-gray-600  px-4 py-2 text-sm font-medium hover:bg-gray-600/50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-600  px-4 py-2 text-sm font-medium  hover:bg-gray-600/50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * recordsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * recordsPerPage)}
              </span>{" "}
              of <span className="font-medium">{allRecords.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <button
                onClick={handlePreviousPage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2  ring-1 ring-inset ring-gray-600 hover:bg-gray-600/30 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </button>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <button
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-blue-500 px-8 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {currentPage}
              </button>

              <button
                onClick={handleNextPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2  ring-1 ring-inset ring-gray-600 hover:bg-gray-600/30 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsTable;
