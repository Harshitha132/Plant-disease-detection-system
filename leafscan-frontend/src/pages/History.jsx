import React, { useState } from "react";

function History() {

  const [history, setHistory] = useState(
    JSON.parse(
      localStorage.getItem(
        "plantRecoveryHistory"
      )
    ) || []
  );

  const deleteHistory = (index) => {

    const updatedHistory =
      [...history];

    updatedHistory.splice(
      index,
      1
    );

    localStorage.setItem(
      "plantRecoveryHistory",
      JSON.stringify(
        updatedHistory
      )
    );

    setHistory(
      updatedHistory
    );
  };

  const clearAllHistory = () => {

    localStorage.removeItem(
      "plantRecoveryHistory"
    );

    setHistory([]);
  };

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Plant Scan History
        </h1>

        {history.length > 0 && (

          <button
            onClick={
              clearAllHistory
            }
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Clear All
          </button>

        )}

      </div>

      {history.length === 0 ? (

        <p className="text-gray-400">
          No scans found.
        </p>

      ) : (

        history.map(
          (item, index) => (

            <div
              key={index}
              className="bg-white/10 p-4 rounded-xl mb-4 border border-white/10"
            >

              {item.image && (

                <img
                  src={item.image}
                  alt="plant"
                  className="w-48 rounded-lg mb-3"
                />

              )}

              <h2 className="text-xl font-semibold mb-2">
                Disease: {item.disease}
              </h2>

              <p>
                Recovery: {item.recoveryPercentage}%
              </p>

              <p>
                Day: {item.day}
              </p>

              <button
                onClick={() =>
                  deleteHistory(
                    index
                  )
                }
                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          )
        )

      )}

    </div>

  );
}

export default History;