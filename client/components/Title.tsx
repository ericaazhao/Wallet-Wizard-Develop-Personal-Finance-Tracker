import router from "next/router";
import React, { useEffect, useState } from "react";

function Title() {
  const [title, setTitle] = useState<{ title: string }>({ title: "Loading..." });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/title`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTitle(data);
      });
  }, []);

  return (
    <div>
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.replace("/")}
      >
        {title.title}
      </h1>
    </div>
  );
}

export default Title;