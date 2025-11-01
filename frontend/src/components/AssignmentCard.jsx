// import React from "react";

// export default function AssignmentCard({
//   assignment,
//   submissions,
//   user,
//   onSubmit,
//   onDelete,
//   isAdmin,
// }) {
//   // Get all users from localStorage
//   const allUsers = JSON.parse(localStorage.getItem("sam_users") || "[]");
//   const students = allUsers.filter((u) => u.role === "student");

//   const submittedCount = students.filter(
//     (s) => submissions?.[assignment.id]?.[s.email]
//   ).length;
//   const totalCount = students.length;
//   const progress = totalCount > 0 ? (submittedCount / totalCount) * 100 : 0;

//   const isSubmitted =
//     user?.email && submissions?.[assignment.id]?.[user.email] ? true : false;

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 flex flex-col justify-between">
//       <div>
//         <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
//         <p className="text-gray-500 mb-2">Created on: {assignment.date}</p>
//         <a
//           href={assignment.driveLink}
//           target="_blank"
//           rel="noreferrer"
//           className="text-indigo-600 hover:underline font-medium"
//         >
//           Open Drive Link
//         </a>
//       </div>

//       <div className="mt-4">
//         {isAdmin ? (
//           <div>
//             <p className="font-semibold mb-1 text-sm text-gray-600">
//               Submissions Progress:
//             </p>
//             <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
//               <div
//                 className="bg-green-500 h-3 rounded-full"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//             <p className="text-sm text-gray-500 mb-3">
//               {submittedCount}/{totalCount} submitted
//             </p>
//             <button
//               onClick={() => onDelete(assignment.id)}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
//             >
//               Delete Assignment
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {isSubmitted ? (
//               <p className="text-green-600 font-medium">
//                 ✅ Submitted successfully!
//               </p>
//             ) : (
//               <button
//                 onClick={() => onSubmit(assignment.id)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
//               >
//                 Mark as Submitted
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import React, { useState } from "react";

// export default function AssignmentCard({
//   assignment,
//   submissions,
//   user,
//   onSubmit,
//   onDelete,
//   isAdmin,
// }) {
//   const [confirming, setConfirming] = useState(false);

//   const allUsers = JSON.parse(localStorage.getItem("sam_users") || "[]");
//   const students = allUsers.filter((u) => u.role === "student");

//   const submittedCount = students.filter(
//     (s) => submissions?.[assignment.id]?.[s.email]
//   ).length;
//   const totalCount = students.length;
//   const progress = totalCount > 0 ? (submittedCount / totalCount) * 100 : 0;

//   const isSubmitted =
//     user?.email && submissions?.[assignment.id]?.[user.email] ? true : false;

//   return (
//     <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] text-white">
//       {/* Title and Link */}
//       <div>
//         <h3 className="text-2xl font-bold mb-2 text-yellow-300 tracking-wide">
//           {assignment.title}
//         </h3>
//         <p className="text-sm text-gray-200 mb-3">
//           📅 Created on:{" "}
//           <span className="font-medium text-white">{assignment.date}</span>
//         </p>

//         <a
//           href={assignment.driveLink}
//           target="_blank"
//           rel="noreferrer"
//           className="text-indigo-300 hover:text-indigo-100 font-semibold underline underline-offset-4 transition"
//         >
//           Open Drive Link →
//         </a>
//       </div>

//       {/* Actions Section */}
//       <div className="mt-6">
//         {isAdmin ? (
//           <div>
//             <p className="font-semibold mb-1 text-sm text-gray-100">
//               Submission Progress
//             </p>

//             <div className="w-full bg-gray-600/40 rounded-full h-3 mb-2 overflow-hidden">
//               <div
//                 className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>

//             <p className="text-sm text-gray-300 mb-4">
//               {submittedCount}/{totalCount} students submitted
//             </p>

//             <button
//               onClick={() => onDelete(assignment.id)}
//               className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md"
//             >
//               🗑 Delete Assignment
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-4 items-center">
//             {isSubmitted ? (
//               <p className="text-green-300 font-semibold text-lg">
//                 ✅ Submitted successfully!
//               </p>
//             ) : confirming ? (
//               <div className="flex flex-col items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
//                 <p className="text-gray-100 font-medium text-center">
//                   Are you sure you’ve submitted this assignment?
//                 </p>
//                 <div className="flex justify-center gap-4">
//                   <button
//                     onClick={() => {
//                       onSubmit(assignment.id);
//                       setConfirming(false);
//                     }}
//                     className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg"
//                   >
//                     Yes, Confirm
//                   </button>
//                   <button
//                     onClick={() => setConfirming(false)}
//                     className="bg-gray-400/70 hover:bg-gray-500 text-white px-5 py-2 rounded-lg font-semibold shadow-lg"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setConfirming(true)}
//                 className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
//               >
//                 🚀 Mark as Submitted
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function AssignmentCard({
  assignment,
  submissions,
  user,
  onSubmit,
  onDelete,
  isAdmin,
}) {
  const [confirming, setConfirming] = useState(false);

  // All users from local storage
  const allUsers = JSON.parse(localStorage.getItem("sam_users") || "[]");
  const students = allUsers.filter((u) => u.role === "student");

  // Submission tracking
  const submittedCount = students.filter(
    (s) => submissions?.[assignment.id]?.[s.email]
  ).length;
  const totalCount = students.length;
  const progress = totalCount > 0 ? (submittedCount / totalCount) * 100 : 0;

  const isSubmitted =
    user?.email && submissions?.[assignment.id]?.[user.email] ? true : false;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 ease-in-out">
      {/* Assignment Info */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
          {assignment.title}
        </h3>
        <p className="text-gray-400 mb-2 text-sm">
          Created on: <span className="font-medium text-gray-300">{assignment.date}</span>
        </p>
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm underline"
        >
          📂 Open Drive Link
        </a>
      </div>

      {/* Progress Section */}
      <div className="mt-6">
        <p className="font-semibold mb-1 text-sm text-gray-300">
          Submission Progress:
        </p>
        <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div
            className={`absolute left-0 top-0 h-full ${
              progress === 100 ? "bg-green-500" : "bg-indigo-500"
            } rounded-full transition-all duration-700`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          {submittedCount}/{totalCount} students submitted (
          {progress.toFixed(0)}%)
        </p>

        {/* Student View */}
        {!isAdmin && (
          <div className="flex flex-col gap-3">
            {isSubmitted ? (
              <p className="text-green-400 font-semibold text-center">
                ✅ You’ve already submitted this assignment.
              </p>
            ) : confirming ? (
              <div className="flex flex-col gap-2 items-center">
                <p className="text-gray-300 font-medium text-center">
                  Are you sure you’ve submitted it?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onSubmit(assignment.id);
                      setConfirming(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Yes, Confirm
                  </button>
                  <button
                    onClick={() => setConfirming(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirming(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Mark as Submitted
              </button>
            )}
          </div>
        )}

        {/* Admin View */}
        {isAdmin && (
          <button
            onClick={() => onDelete(assignment.id)}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Delete Assignment
          </button>
        )}
      </div>
    </div>
  );
}

