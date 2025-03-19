import { useRouter } from "next/router";
import Transaction from "../../components/Transaction";

const [transaction, setTransaction] = useState({
    name: "",
    category_id: "",
    amount: 0,
    description: "",
});

const [categories, setCategories] = useState([]);
useEffect(() => {
    fetch("http://localhost:3100/api/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
}, []);

const TransactionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") return <div>Loading...</div>;

  return <Transaction id={id} />;
};

export default TransactionPage;