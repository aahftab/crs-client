import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
function Dashboard() {
  type Complaint = {
    email: string;
    phone: string;
    name: string;
    gender: string;
    complaintType: string;
    date: string;
    time: string;
    state: string;
    district: string;
    location: string;
    description: string;
    suspects: { suspectName: string; suspectAddress: string }[];
  };
  const [data, setData] = useState<Complaint[]>([
    {
      email: "",
      phone: "",
      name: "",
      gender: "",
      complaintType: "",
      date: "",
      time: "",
      state: "",
      district: "",
      location: "",
      description: "",
      suspects: [{ suspectName: "", suspectAddress: "" }],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/fetchComplaints", {
        mode: "cors",
        method: "GET",
        credentials: "include",
      }).then((res) => {
        if (res.status === 401) {
          setData([]);
          toast({
            title: "Please login to view complaints",
            description: "Click to login",
            onClick: () => {
              window.open("/login", "_blank");
            },
          });
          return;
        } else {
          return res.json();
        }
      });
      setData(response);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="w-[60%] mx-auto">
      {data && data.map((complaint: Complaint, index) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="text-center font-bold">
                Complaint {index + 1}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <div>
              <TableRow>
                <TableCell className="w-[240px]">Email :</TableCell>
                <TableCell> {complaint.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone :</TableCell>
                <TableCell> {complaint.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name :</TableCell>
                <TableCell> {complaint.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender :</TableCell>
                <TableCell> {complaint.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ComplaintType :</TableCell>
                <TableCell> {complaint.complaintType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date :</TableCell>
                <TableCell> {complaint.date.split("T")[0]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Time :</TableCell>
                <TableCell> {complaint.time}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>State :</TableCell>
                <TableCell> {complaint.state}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>District :</TableCell>
                <TableCell> {complaint.district}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Location :</TableCell>
                <TableCell> {complaint.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description :</TableCell>
                <TableCell> {complaint.description}</TableCell>
              </TableRow>
              {complaint.suspects.map((suspect) => (
                <>
                  <TableRow>
                    <TableCell>Suspect Name :</TableCell>
                    <TableCell> {suspect.suspectName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Suspect Address :</TableCell>
                    <TableCell> {suspect.suspectAddress}</TableCell>
                  </TableRow>
                </>
              ))}
            </div>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}

export default Dashboard;
