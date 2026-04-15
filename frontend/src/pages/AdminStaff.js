import React from "react";
import AdminLayout from "./AdminLayout";
import "./AdminStaff.css";

const staffData = [
  {
    name: "Catherine Hayes",
    role: "Manager",
    email: "catherine@hotel.com",
    phone: "+1 555-1001",
    shift: "Morning shift (6 AM – 2 PM)",
    status: "active"
  },
  {
    name: "Robert Chen",
    role: "Receptionist",
    email: "robert@hotel.com",
    phone: "+1 555-1002",
    shift: "Morning shift (6 AM – 2 PM)",
    status: "active"
  },
  {
    name: "Maria Santos",
    role: "Housekeeping",
    email: "maria@hotel.com",
    phone: "+1 555-1003",
    shift: "Morning shift (6 AM – 2 PM)",
    status: "active"
  },
  {
    name: "David Kim",
    role: "Concierge",
    email: "david@hotel.com",
    phone: "+1 555-1004",
    shift: "Afternoon shift (2 PM – 10 PM)",
    status: "active"
  },
  {
    name: "Anna Petrov",
    role: "Receptionist",
    email: "anna@hotel.com",
    phone: "+1 555-1005",
    shift: "Night shift (10 PM – 6 AM)",
    status: "active"
  },
  {
    name: "James Wilson",
    role: "Maintenance",
    email: "james@hotel.com",
    phone: "+1 555-1006",
    shift: "Morning shift (6 AM – 2 PM)",
    status: "on-leave"
  }
];

const AdminStaff = () => {
  return (
    <AdminLayout>
      <div className="staff-container">

        <h2>Staff</h2>
        <p className="subtitle">Manage employees and schedules</p>

        <div className="staff-grid">
          {staffData.map((staff, i) => (
            <div key={i} className="staff-card">

              <div className="staff-header">
                <div className="avatar">
                  {staff.name.charAt(0)}
                </div>

                <div className="info">
                  <h3>{staff.name}</h3>
                  <span className="role">{staff.role}</span>
                </div>

                <span className={`status ${staff.status}`}>
                  {staff.status}
                </span>
              </div>

              <div className="details">
                <p>📧 {staff.email}</p>
                <p>📞 {staff.phone}</p>
                <p>⏰ {staff.shift}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminStaff;