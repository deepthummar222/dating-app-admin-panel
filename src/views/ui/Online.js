import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import React, { useState, useEffect } from 'react';

const Latest = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://62.72.59.185:3000/api/v1/user/user/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  // Filter users to show only those with user.isUserOnline === true
  const onlineUsers = users.filter(user => user.isUserOnline === true);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Online User Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of Online User
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {onlineUsers.length > 0 ? (
                onlineUsers.map(user => (
                  <tr key={user.id} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={user.profileImage}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-1">
                          <h6 className="mb-0">{user.nickName}</h6>
                          <span className="text-muted">{user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No online users found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Latest;
