import { Card, CardBody,  CardTitle, Row, Col } from "reactstrap";
// import {ContextHelper} from "./ProjectTable"

const SalesChart = (props) => {
  const {totalUsers}=props;
  
  
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">User Summary</CardTitle>
        <div className="bg-primary text-white my-3 p-3 rounded">
          <Row>
            <Col md="6">
              <h6>Total User</h6>
              <h4 className="mb-0 fw-bold">{totalUsers}</h4>
            </Col>
            <Col md="6">
              <h6>Total Login User</h6>
              <h4 className="mb-0 fw-bold">{totalUsers}</h4>
            </Col>
            
          </Row>
        </div>
     
      </CardBody>
    </Card>
  );
};

export default SalesChart;
