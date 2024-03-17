import { Container, Row, Col } from "react-bootstrap";
import Heatmap from "./HeatMap.tsx";
import { data } from "./Data.tsx";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

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
