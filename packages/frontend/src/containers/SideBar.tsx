import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Heatmap from "./HeatMap.tsx";
import { data } from "./Data.tsx";

export default function SideBar() {
  return (
    <Container className="sidebarWrap">
      <Row className="sidebar1">
        <Col>
          <Heatmap data={data} width={250} height={200} />
        </Col>
      </Row>
      <Row className="sidebar2">
        <Col></Col>
      </Row>
    </Container>
  );
}
