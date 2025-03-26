import CategoryList from "@/components/CategoryList";
import Title from "@/components/Title";
import TransactionList from "@/components/TransactionList";

function Index() {
 return <div style={{ textAlign: "center" }}>


   <Title /><br /><br />
   <CategoryList /><br /><br />
   <TransactionList />
 </div>

}

export default Index;