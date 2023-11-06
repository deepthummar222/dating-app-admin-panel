import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Latest from "./ui/Latest";
import SalesChart1 from "../components/salesChart1";
import { useNavigate } from "react-router-dom";

const Starter = () => {
  const [lenth1, setLenth1] = useState(0);
  const [users, setUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    let sessionData = sessionStorage.getItem("token");
    if (sessionData === null) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://62.72.59.185:3000/api/v1/user/user/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const length = data.data.length;
        setLenth1(length);
        setUsers(data.data.filter(user => user.isUserOnline === true).length);
        const offlineUsers = data.data.filter(user => !user.isUserOnline).length;
        setOfflineUsers(offlineUsers);
        
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <SalesChart totalUsers={lenth1} />
        </Col>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <SalesChart1 online={users}   offline={offlineUsers} />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Latest />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
