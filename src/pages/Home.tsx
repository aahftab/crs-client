import NewsPost from "@/components/NewsPost";
import { useEffect, useState } from "react";

type NewsType = {
  _id: string;
  title: string;
  description: string;
  imageName: string;
};
function Home() {
  const [data, setData] = useState<NewsType[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/fetchNews")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="flex flex-col mx-56 items-center space-y-8">
      {data && data.map((news) => (<NewsPost key={news._id} title={news.title} description={news.description} src={`http://localhost:3000/${news.imageName}`} />))}
    </div>
  );
}

export default Home;
