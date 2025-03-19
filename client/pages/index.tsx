import CategoryList from "@/components/CategoryList";
import TransactionList from "@/components/TransactionList";
import Link from "next/link";

function Index() {
    return (
        <div>
            <br /><br />
            <CategoryList /><br /><br />
            <TransactionList /><br /><br />
            <Link href="/transaction/new">Create New Transaction</Link>
        </div>
    );
}

export default Index;