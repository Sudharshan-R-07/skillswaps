
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  Coins,
  TrendingUp,
  History,
  Plus,
  Filter,
} from "lucide-react";

const initialTransactions = [
  {
    id: 1,
    title: "Skill Exchange Reward",
    description: "React mentoring session",
    type: "earned",
    amount: 50,
    date: "Nov 05, 2026",
    status: "Completed",
  },
  {
    id: 2,
    title: "Course Enrollment",
    description: "UI/UX Design Fundamentals",
    type: "spent",
    amount: 30,
    date: "Nov 04, 2026",
    status: "Completed",
  },
  {
    id: 3,
    title: "Daily Learning Reward",
    description: "Learning streak reward",
    type: "earned",
    amount: 10,
    date: "Nov 03, 2026",
    status: "Completed",
  },
  {
    id: 4,
    title: "Mentoring Session",
    description: "JavaScript mentoring",
    type: "spent",
    amount: 20,
    date: "Nov 02, 2026",
    status: "Completed",
  },
  {
    id: 5,
    title: "Welcome Bonus",
    description: "New learner reward",
    type: "earned",
    amount: 100,
    date: "Nov 01, 2026",
    status: "Completed",
  },
];

export default function Wallet() {
  const [balance, setBalance] = useState(250);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filter, setFilter] = useState("all");

  const totalEarned = transactions
    .filter((item) => item.type === "earned")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalSpent = transactions
    .filter((item) => item.type === "spent")
    .reduce((sum, item) => sum + item.amount, 0);

  const filteredTransactions = transactions.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const addDemoCredits = () => {
    const amount = 50;

    const transaction = {
      id: Date.now(),
      title: "Demo Credit Reward",
      description: "Test wallet reward",
      type: "earned",
      amount,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Completed",
    };

    setBalance((prev) => prev + amount);
    setTransactions((prev) => [transaction, ...prev]);

    alert("50 demo credits added!");
  };

  const spendDemoCredits = () => {
    const amount = 20;

    if (balance < amount) {
      alert("Insufficient credits!");
      return;
    }

    const transaction = {
      id: Date.now(),
      title: "Demo Credit Usage",
      description: "Test wallet purchase",
      type: "spent",
      amount,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Completed",
    };

    setBalance((prev) => prev - amount);
    setTransactions((prev) => [transaction, ...prev]);

    alert("20 demo credits spent!");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600">
              SKILLSWAP REWARDS
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              My Credit Wallet
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your credits and track your learning rewards.
            </p>
          </div>

          {/* Wallet Balance */}
          <section className="mb-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-7 text-white sm:p-10">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-3">
                  <WalletIcon size={24} />
                </div>

                <p className="font-medium text-indigo-100">
                  Available Balance
                </p>
              </div>

              <div className="mt-8 flex items-end gap-3">
                <h2 className="text-5xl font-bold">
                  {balance}
                </h2>

                <span className="mb-2 text-lg text-indigo-100">
                  Credits
                </span>
              </div>

              <p className="mt-3 text-sm text-indigo-100">
                Use credits to enroll in courses and book skill sessions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={addDemoCredits}
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  <Plus size={18} />
                  Add Demo Credits
                </button>

                <button
                  onClick={spendDemoCredits}
                  className="rounded-xl border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10"
                >
                  Spend 20 Credits
                </button>
              </div>
            </div>

            {/* Wallet Information */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <Coins size={24} />
                </div>

                <h2 className="font-bold text-slate-900">
                  Credit System
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Gift className="mt-1 text-indigo-600" size={20} />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Earn Credits
                    </p>
                    <p className="text-sm text-slate-500">
                      Teach skills and complete learning activities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-1 text-emerald-600" size={20} />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Grow Your Balance
                    </p>
                    <p className="text-sm text-slate-500">
                      Exchange skills to earn platform rewards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">
                  Demo wallet
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-700">
                  Credits shown here are simulated. No real money or
                  payment transactions are processed.
                </p>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                  <ArrowDownLeft size={22} />
                </div>
                <p className="text-sm text-slate-500">
                  Total Earned
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                +{totalEarned}
              </h2>
              <p className="mt-1 text-sm text-emerald-600">
                Credits received
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-red-100 p-3 text-red-600">
                  <ArrowUpRight size={22} />
                </div>
                <p className="text-sm text-slate-500">
                  Total Spent
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                -{totalSpent}
              </h2>
              <p className="mt-1 text-sm text-red-500">
                Credits used
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                  <History size={22} />
                </div>
                <p className="text-sm text-slate-500">
                  Transactions
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                {transactions.length}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Wallet activities
              </p>
            </div>
          </section>

          {/* Transaction History */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-col justify-between gap-4 border-b p-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Transaction History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View your credit activity.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={18} className="text-slate-500" />

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="earned">Credits Earned</option>
                  <option value="spent">Credits Spent</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  No transactions found.
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-slate-50 sm:px-6"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-xl p-3 ${
                          transaction.type === "earned"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "earned" ? (
                          <ArrowDownLeft size={22} />
                        ) : (
                          <ArrowUpRight size={22} />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {transaction.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {transaction.description}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "earned"
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.type === "earned" ? "+" : "-"}
                        {transaction.amount} credits
                      </p>

                      <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
