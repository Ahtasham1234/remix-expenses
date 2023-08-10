import { Link, useActionData, useNavigation, Form,  useMatches, useParams } from '@remix-run/react';

function ExpenseForm() {
  const validationErrors = useActionData()
  const params = useParams()
  // const expense = useLoaderData()
  const matchesRoutes = useMatches()
  console.log(matchesRoutes)
  const expenses = matchesRoutes.find(data => data.id === 'routes/_app.expenses').data
  const expense = expenses.find(expense => expense.id === params.id )
  console.log(expense)
  const defaultValues = expense ? {
    title: expense.title,
    amount: expense.amount,
    date: expense.date
  } : {
    title: '',
    amount: '',
    date: ''

  }
 
  
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle'
  if(params.id && !expense){
    return <p>Invalid expense Id.</p>
   }

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValues.title} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required 
          defaultValue={defaultValues.date ? defaultValues.date.slice(0, 10) : ''} />
        </p>
      </div>
      <div>
        {
          validationErrors && <ul> {Object.values(validationErrors).map(error => 
            <li key={error}>{error}</li>
          )}</ul>
        }
      </div>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Expense'}</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;