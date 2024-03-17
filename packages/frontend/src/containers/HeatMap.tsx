import { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as d3 from "d3";
import "./HeatMap.css";

const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };

type HeatmapProps = {
  width: number;
  height: number;
  data: { x: string; y: string; value: number }[];
};

export default function Heatmap({ width, height, data }: HeatmapProps) {
  // bounds = area inside the axis
  // const boundsWidth = width - MARGIN.right - MARGIN.left;
  // const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // groups
  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  // x and y scales
  const xScale = useMemo(() => {
    return d3.scaleBand().range([0, width]).domain(allXGroups).padding(0.01);
  }, []);

  const yScale = useMemo(() => {
    return d3.scaleBand().range([height, 0]).domain(allYGroups).padding(0.01);
  }, []);

  const [min, max] = d3.extent(data.map((d) => d.value));

  if (!min || !max) {
    return null;
  }

  // Color scale
  const colorScale = d3
    .scaleLinear()
    .domain([Number(min), Number(max)])
    .range(["white", "green"]);

  // Build the rectangles
  const allRects = data.map((d, i) => {
    return (
      <rect
        key={i}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={14}
        height={14}
        opacity={1}
        fill={colorScale(d.value)}
        stroke={"grey"}
      />
    );
  });

  // const xLabels = allXGroups.map((name, i) => {
  //   const xPos = xScale(name) ?? 0;
  //   return (
  //     <text
  //       key={i}
  //       x={xPos + xScale.bandwidth() / 2}
  //       y={boundsHeight + 10}
  //       textAnchor="middle"
  //       dominantBaseline="middle"
  //       fontSize={10}
  //     >
  //       {name}
  //     </text>
  //   );
  // });

  // const yLabels = allYGroups.map((name, i) => {
  //   const yPos = yScale(name) ?? 0;
  //   return (
  //     <text
  //       key={i}
  //       x={-5}
  //       y={yPos + yScale.bandwidth() / 2}
  //       textAnchor="end"
  //       dominantBaseline="middle"
  //       fontSize={10}
  //     >
  //       {name}
  //     </text>
  //   );
  // });

  const monthLabels = () => {
    const currentMonth = new Date().getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const months = Array.from(
      { length: 4 },
      (_, i) => monthNames[(currentMonth - i + 12) % 12]
    );
    return (
      <Container>
        <Row>
          {months.reverse().map((month, i) => (
            <Col key={i} className="monthLabels">
              {month}
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  return (
    <Container fluid>
      <Col>
        <Row>
          <svg viewBox={`0 0 ${width} ${height}`}>
            <g transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}>
              {allRects}
            </g>
          </svg>
        </Row>
        <Row>{monthLabels()}</Row>
      </Col>
    </Container>
  );
}
