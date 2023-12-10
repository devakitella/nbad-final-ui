import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const translate = (x, y) => `translate(${x},${y})`;

const Barchart = ({ expenses }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 400 - margin.left - margin.right,
      height = 360 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', translate(margin.left, margin.top));

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(expenses.map((d) => d.categoryName))
      .padding(0.2);

    svg
      .append('g')
      .attr('transform', translate(0, height))
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const y = d3.scaleLinear().domain([0, d3.max(expenses, (d) => d.amount)]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    svg
      .selectAll('mybar')
      .data(expenses)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.categoryName))
      .attr('y', (d) => y(d.amount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.amount))
      .attr('fill', '#5f0f40');
  }, [expenses]);

  return <svg width={460} height={400} ref={ref} />;
};

const LineChart = ({ expenses }) => {
  const [data, setData] = useState(expenses);

  const svgRef = useRef();

  useEffect(() => {
    const w = 360;
    const h = 200;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('background', '#c5f6fa');
    svg.selectAll('*').remove();

    const xScale = d3.scaleBand().domain(data.map((d) => d.categoryName)).range([0, w]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.amount)]).range([h, 0]);

    const generateScaledLine = d3
      .line()
      .x((d) => xScale(d.categoryName) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.amount))
      .curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(7);

    svg.append('g').call(xAxis).attr('transform', translate(0, h));
    svg.append('g').call(yAxis);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }, [data, expenses]);

  return <div><svg ref={svgRef} style={{ margin: '20px', display: 'block' }}></svg></div>;
};

const PieChart = ({ expenses, outerRadius, innerRadius }) => {
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([0, expenses.length]);

  useEffect(() => {
    drawChart();
  }, [expenses]);

  const drawChart = () => {
    d3.select('#pie-container')
      .select('svg')
      .remove();

    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', translate(width / 2, height / 2));

    svg.selectAll('*').remove();

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.amount);

    const arc = svg
      .selectAll()
      .data(pieGenerator(expenses))
      .enter();

    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.categoryName)
      .style('fill', 'white')
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return translate(x, y);
      });
  };

  return <div id="pie-container" />;
};

const ChartContainer = ({ expenses }) => {
  const hasExpenses = expenses.length > 0;

  return (
    <div>
      {hasExpenses && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Barchart expenses={expenses} />
        <LineChart expenses={expenses} />
        <PieChart expenses={expenses} outerRadius={100} innerRadius={50} />
      </div>
      )}
    </div>
  );
};

export default ChartContainer;
