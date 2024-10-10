/*
* Daniel Santos Martinez
* CS450-101
* Assignment 3
* */

import React, {Component} from 'react'
import * as d3 from 'd3';

class Child2 extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    };

    componentDidMount() {
        console.log(this.props.data_2);
    };

    componentDidUpdate() {
        d3.select("#bar_plot_visualization").selectAll("*").remove();
        let data = this.props.data_2;
        let width = 500;
        let height = 300;
        let margin = {top: 40, right: 60, bottom: 60, left: 80};


        let svg_bar_plot = d3.select("#bar_plot_visualization")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        let center_graph = svg_bar_plot.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const avgTipByDay = d3.rollups(
            data,
            v => d3.mean(v, d => d.tip),
            d => d.day
        );

        const days = avgTipByDay.map(d => d[0]);
        const avgTips = avgTipByDay.map(d => d[1]);

        // scales
        let xScale = d3.scaleBand()
            .domain(days)
            .rangeRound([0, width])
            .padding(0.2);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(avgTips)])
            .range([height, 0]);

        // axis
        let xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5);

        let yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(5);

        // make the scatter plot
        center_graph.selectAll("rect")
            .data(avgTipByDay)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                // return xScale(d.day);
                return xScale(d[0]);
            })
            .attr("y", function (d) {
                // return yScale(d.tip);
                return yScale(d[1]);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                // return height - yScale(d.tip)
                return height - yScale(d[1]);
            })
            .attr("fill", "#69b3a2");

        center_graph.append("g")
            .attr("class", "xaxis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        center_graph.append("g")
            .attr("class", "yaxis")
            // .attr("transform", "(100,0)")
            .call(yAxis)


        // x & y axis and title labels
        // xaxis
        svg_bar_plot.append("text")
            .attr("class", "xAxisLabel")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", height + margin.top + margin.bottom - 20)
            .attr("font-family", "Georgia")
            .attr("font-size", 16)
            .text("Day");

        // yaxis
        svg_bar_plot.append("text")
            .attr("class", "yAxisLabel")
            .attr("text-anchor", "middle")
            .attr("x", -(height + margin.top + margin.bottom) / 2)
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .attr("font-family", "Georgia")
            .attr("font-size", 16)
            .text("Average Tip");

        // title
        svg_bar_plot.append("text")
            .attr("class", "titleLabel")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", margin.top / 2)
            .attr("font-family", "Georgia")
            .attr("font-size", 16)
            .text("Average Tip by Day");
    };

    render() {
        return (
            <div id={"bar_plot_visualization"}></div>
        );
    }
}

export default Child2;
