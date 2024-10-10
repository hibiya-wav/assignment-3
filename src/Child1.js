/*
* Daniel Santos Martinez
* CS450-101
* Assignment 3
* */

import React, {Component} from 'react'
import * as d3 from 'd3';

class Child1 extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.data_1);
    }

    componentDidUpdate() {
        d3.select("#scatter_plot_visualization").selectAll("*").remove();

        let data = this.props.data_1;
        let width = 500;
        let height = 300;
        let margin = {top: 40, right: 60, bottom: 60, left: 80};

        let svg_scatter_plot = d3.select("#scatter_plot_visualization")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        let center_plot = svg_scatter_plot.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // scales
        let xScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) {
                return d.total_bill;
            })])
            .range([0, width]);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) {
                return d.tip;
            })])
            .range([height, 0]);

        // axis
        let xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(11);

        let yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10);

        // make the scatter plot
        center_plot.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.total_bill);
            })
            .attr("cy", function (d) {
                return yScale(d.tip);
            })
            .attr("r", 5)
            .attr("fill", "#69b3a2");

        center_plot.append("g")
            .attr("class", "xaxis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        center_plot.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate()")
            .call(yAxis)

        svg_scatter_plot.append("text")
            .attr("class", "xAxisLabel")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", height + margin.top + margin.bottom - 20)
            .attr("font-family", "Georgia")
            .attr("font-size", 16)
            .text("Total Bill");

        // yaxis
        svg_scatter_plot.append("text")
            .attr("class", "yAxisLabel")
            .attr("text-anchor", "middle")
            .attr("x", -(height + margin.top + margin.bottom) / 2)
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .attr("font-family", "Georgia")
            .attr("font-size", 16)
            .text("Tips");

        // title
        svg_scatter_plot.append("text")
            .attr("class", "titleLabel")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", margin.top / 2)
            .attr("font-family", "Georgia")
            .attr("font-size", 16)
            .text("Total Bill vs Tips");
    }

    render() {
        return (
            <div id={"scatter_plot_visualization"}></div>
        );
    }
}

export default Child1;
