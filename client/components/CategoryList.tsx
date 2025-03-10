import React, { useEffect, useState } from "react";

type Category = {
    id: string;
    name: string;
    created_at: string;
};

function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("http://localhost:3100/api/category")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    return (
        <div>
            <h2>Categories</h2>
            <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid white" }}>
                <thead>
                    <tr style={{ backgroundColor: "#333", fontWeight: "bold", textTransform: "uppercase" }}>
                        <th style={{ border: "1px solid white", padding: "6px" }}>Id</th>
                        <th style={{ border: "1px solid white", padding: "6px" }}>Category Name</th>
                        <th style={{ border: "1px solid white", padding: "6px" }}>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((c, index) => (
                            <tr key={c.id || index} style={{ textAlign: "center" }}>
                                <td style={{ border: "1px solid white", padding: "6px" }}>{index + 1}</td>
                                <td style={{ border: "1px solid white", padding: "6px" }}>{c.name || "N/A"}</td>
                                <td style={{ border: "1px solid white", padding: "6px" }}>{c.created_at || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={{ textAlign: "center", padding: "6px" }}>No categories found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryList;