import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";


const SalesChart1 = (props) => {
 
  const {online}=props
  const{offline}=props

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">User Summary</CardTitle>
        <div className="bg-primary text-white my-3 p-3 rounded">
          <Row>
            <Col md="6">
              <h6>Live User</h6>
              <h4 className="mb-0 fw-bold">{online}</h4>
            </Col>
            <Col md="6">
              <h6>offline User</h6>
              <h4 className="mb-0 fw-bold">{offline}</h4>
            </Col>
          </Row>
        </div>
     
      </CardBody>
    </Card>
  );
};

export default SalesChart1;
