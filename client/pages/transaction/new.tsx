import TransactionForm from "@/componets/TransactionForm";

function Index() {
    const id = crypto.randomUUID();
    return (
        <div>
            <h1>Transaction Page</h1>
                        <TransactionForm id={id} />
        </div>
    );
}

export default Index;