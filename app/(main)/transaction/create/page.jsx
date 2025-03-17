

"use client"; // Add this at the top since hooks require client components

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getTransaction } from "@/actions/transaction";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";

export default function AddTransactionPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit"); // Use .get() instead of ?.edit

  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedAccounts = await getUserAccounts();
      setAccounts(fetchedAccounts);

      if (editId) {
        const transaction = await getTransaction(editId);
        setInitialData(transaction);
      }
    }

    fetchData();
  }, [editId]);

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}



// import { getUserAccounts } from "@/actions/dashboard";
// import { defaultCategories } from "@/data/categories";
// import { AddTransactionForm } from "../_components/transaction-form";
// import { getTransaction } from "@/actions/transaction";

// export default async function AddTransactionPage({ searchParams }) {
//   const accounts = await getUserAccounts();
//   const editId = searchParams?.edit;

//   let initialData = null;
//   if (editId) {
//     const transaction = await getTransaction(editId);
//     initialData = transaction;
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-5">
//       <div className="flex justify-center md:justify-normal mb-8">
//         <h1 className="text-5xl gradient-title ">Add Transaction</h1>
//       </div>
//       <AddTransactionForm
//         accounts={accounts}
//         categories={defaultCategories}
//         editMode={!!editId}
//         initialData={initialData}
//       />
//     </div>
//   );
// }


