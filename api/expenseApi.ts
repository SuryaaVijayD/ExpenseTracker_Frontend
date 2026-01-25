import { Transaction } from '@/utils/types';

const BASE_URL = 'https://expensetracker-backend-5dac.onrender.com';

export const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const fetchExpensesByMonth = async (
  token: string,
  month: number,
  year: number
): Promise<Transaction[]> => {
  const res = await fetch(
    `${BASE_URL}/expenses/month?month=${month + 1}&year=${year}`,
    {
      headers: getAuthHeaders(token),
    }
  );

  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
};

/* ================= NEW HELPER ================= */
export const fetchTotalExpenseByMonth = async (
  token: string,
  month: number,
  year: number
): Promise<number> => {
  const expenses = await fetchExpensesByMonth(token, month, year);
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
};

export const addExpenseApi = async (
  token: string,
  data: {
    amount: number;
    category: string;
    description: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      ...data,
      expenseDate: new Date().toISOString(),
    }),
  });

  if (!res.ok) throw new Error('Failed to add expense');
  return res.json();
};



// import { Transaction } from '@/utils/types';

// const BASE_URL = 'https://expensetracker-backend-5dac.onrender.com';

// export const getAuthHeaders = (token: string) => ({
//   Authorization: `Bearer ${token}`,
//   'Content-Type': 'application/json',
// });

// export const fetchExpensesByMonth = async (
//   token: string,
//   month: number,
//   year: number
// ): Promise<Transaction[]> => {
//   const res = await fetch(
//     `${BASE_URL}/expenses/month?month=${month + 1}&year=${year}`,
//     {
//       headers: getAuthHeaders(token),
//     }
//   );

//   if (!res.ok) throw new Error('Failed to fetch expenses');
//   return res.json();
// };

// export const addExpenseApi = async (
//   token: string,
//   data: {
//     amount: number;
//     category: string;
//     description: string;
//   }
// ) => {
//   console.log("API Call: Adding Expense", data, "with token:", token);
//   const res = await fetch(`${BASE_URL}/expenses`, {
//     method: 'POST',
//     headers: getAuthHeaders(token),
//     body: JSON.stringify({
//       ...data,
//       expenseDate: new Date().toISOString(),
//     }),
//   });
//   console.log("API Response Status:", res.status);

//   if (!res.ok) throw new Error('Failed to add expense');
//   return res.json();
// };
