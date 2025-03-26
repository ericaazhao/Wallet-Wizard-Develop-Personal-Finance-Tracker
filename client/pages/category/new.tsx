import CategoryForm from "@/components/CategoryForm";
import Title from "@/components/Title";

function Index(){
    const id = crypto.randomUUID();
    return <div style={{ textAlign: "center" }}>
   
   
      <Title />
      <div className='p-4 flex flex-col items-center'>
                <h1 className="text-xl font-bold mb-4">Category Page</h1>
                <CategoryForm id={id} />
            </div>
    </div>
   
   }

export default Index;