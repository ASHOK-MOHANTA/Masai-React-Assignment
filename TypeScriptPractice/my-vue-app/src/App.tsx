import './App.css'


/**
 * 
 * @returns -- return 30% of salary income
 * @param salary -- the user income/salary
 */

function App() {
 

  function calcuLateTax(salary:number){
    return salary*.04;
  }
  console.log(calcuLateTax(100));

  return (
    <>
      
    </>
  )
}

export default App
