import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";



const AppointmentDetails = () => {
      const navigate = useNavigate();
const appointments = [
{ id: 1, patient: "Suresh Patel", doctor: "Dr. Asha Nair", date: "2025-11-12", time: "10:00" },
{ id: 2, patient: "Anita Sharma", doctor: "Dr. Rajesh Kumar", date: "2025-11-14", time: "11:00" },
];


return (
<div className="admin-dashboard">
         <button className="mobile-back-btn" onClick={() => navigate("/admin-dashboard")}>
        <ArrowLeft size={22} />
      </button>

<main className="dashboard-content">

<table className="data-table">
<thead>
<tr>
<th>Patient</th>
<th>Doctor</th>
<th>Date</th>
<th>Time</th>
</tr>
</thead>
<tbody>
{appointments.map((a) => (
<tr key={a.id}>
<td>{a.patient}</td>
<td>{a.doctor}</td>
<td>{a.date}</td>
<td>{a.time}</td>
</tr>
))}
</tbody>
</table>
</main>
</div>
);
};


export default AppointmentDetails;