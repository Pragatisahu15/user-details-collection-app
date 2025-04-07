import React from "react";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete }) => {
  const submittedLabel = () => {
    return users.length === 1 ? "" : "s";
  };

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">
        {users.length} User{submittedLabel()} Submitted the Form
      </h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div className="user-item" key={user._id}>
            <strong>
              {user.firstName} {user.lastName}
            </strong>
            <p>📞 Phone: {user.phone}</p>
            <p>📧 Email: {user.email}</p>
            <p>🏠 Address: {user.address}</p>

            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => onEdit(user)} // Edit button handler
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => onDelete(user._id)} // Delete button handler
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
