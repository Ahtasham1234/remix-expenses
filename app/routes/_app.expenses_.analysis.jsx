import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import { getExpenses } from '../data/expenses.server'
import { useLoaderData } from '@remix-run/react'
import Error from '../components/util/Error'
import { requireUserSession } from '../data/auth.server'

export default function ExpensesAnalysis() {
  const expenses = useLoaderData()
  console.log(expenses)
  if(!expenses || expenses.length === 0){
    return <section id='no-expenses'>
      <Error title='Something went wrong'><p>No Expense found</p></Error>
    </section>
  }
    return (
      <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
      </main>
    )
  }
  
  export async function loader({request}){
   const userId =  await requireUserSession(request)
    const expenses = await getExpenses(userId) 
    return expenses
  }