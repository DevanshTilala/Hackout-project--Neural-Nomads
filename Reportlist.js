import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportsList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports").then((res) => {
      setReports(res.data);
    });
  }, []);

  return (
    <div>
      <h2>All Reports</h2>
      <ul>
        {reports.map((r) => (
          <li key={r._id}>
            <b>{r.category}</b> - {r.description}  
            ({r.status}) by {r.userId?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportsList;
