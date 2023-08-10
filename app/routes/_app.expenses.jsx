import {Outlet, Link, useLoaderData} from '@remix-run/react'
import { FaDownload, FaPlus } from 'react-icons/fa'

import ExpensesList from '~/components/expenses/ExpensesList'
import { getExpenses } from '../data/expenses.server'
import { requireUserSession } from '../data/auth.server'
// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     title: 'First Expense',
//     amount: 12.99,
//     date: new Date().toISOString()
//   },  {
//     id: 'e2',
//     title: 'Second Expense',
//     amount: 14.99,
//     date: new Date().toISOString()
//   }
// ]
export default function Expenses() {
 const expenses =  useLoaderData()
const hasExpenses = expenses && expenses.length > 0
    return (
      <>
      
      <Outlet />
      <section id='expenses-actions'>
        <Link to='add'><FaPlus /><span>Add Expenses</span></Link>
        <a href="/expenses/raw">
          <FaDownload />
          <span>Load Raw Date</span>
        </a>

      </section>
      <main>
        {
          hasExpenses &&<ExpensesList expenses={expenses} />
        }
        {
          !hasExpenses && <section id='no-expenses'>
            <h1>No expenses found!</h1>
            <p>Start <Link to='add'>adding some </Link> today</p>
          </section>
        }
        
      </main>
      </>
    )
  }
export async function loader({request}){
  const userId = await requireUserSession(request)

  const expenses = await getExpenses(userId)
  return expenses
}
  