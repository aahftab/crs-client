import { useEffect, useState } from "react";
import parse from "html-react-parser";
function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/fetchComplaints", {
        mode: "cors",
        method: "GET",
        credentials: "include",
      }).then((res) => res.json());
      setData(response);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    data.map((complaint) =>{
      let str = "";
      for (const key in complaint) {
        str += `
        <div key=${key}>
          <span>${key} : </span>
          <span>${complaint[key]}</span>
        </div>
        `;
      }
      return parse(str);
    }   
    ))
}

export default Dashboard;
