import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import {useNavigate} from '@remix-run/react'
import { deleteExpense, updateExpense } from "../data/expenses.server";
import { validateExpenseInput } from "../data/validation.server";
import {redirect} from '@remix-run/node'


export default function ExpensesDetails() {
  const navigate = useNavigate()
  function closeHandler(){
    navigate('..')

  }
    return (
      <Modal onClose={closeHandler}>
      <ExpenseForm />
      </Modal>
    )
  }
  
  // export async function loader({params}){
  //   const expenseId = params.id
  //   const expense = await getExpense(expenseId)
  //   return expense
  // }
  export async function action({params, request}){
    if(request.method === 'POST'){
      const expenseId = params.id
      const formData = await request.formData()
      const expenseData = Object.fromEntries(formData)
      try {
  
        validateExpenseInput(expenseData)
      }catch(error){
        return error
      }
  
     await updateExpense(expenseId, expenseData)
     return redirect('/expenses')

    }else if (request.method === 'DELETE') {
      const expenseId = params.id
   
         await deleteExpense(expenseId)
         return {
          deleteId : expenseId
        }
       
    
    }
   

  }