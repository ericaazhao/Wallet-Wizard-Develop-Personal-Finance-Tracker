import TransactionForm from "@/components/TransactionForm";
import Title from "@/components/Title";
function Index() 

{
    const id = crypto.randomUUID();
    return <div style={{ textAlign: "center" }}>
   
   
      <Title />
      <div className='p-4 flex flex-col items-center'>
                <h1 className="text-xl font-bold mb-4">Transaction Page</h1>
                <TransactionForm id={id} />
            </div>
    </div>
   
   }

export default Index;