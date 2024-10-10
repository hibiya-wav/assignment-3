/*
* Daniel Santos Martinez
* CS450-101
* Assignment 3
* */

import React, {Component} from 'react'
import * as d3 from 'd3';
import Child1 from './Child1';
import Child2 from './Child2';
import tips_csv_data from './tips.csv';
import './App.css';

class App extends Component {

    // process CSV data
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let self = this
        d3.csv(tips_csv_data, function (dataset) {
            return {
                total_bill: parseFloat(dataset.total_bill),
                tip: parseFloat(dataset.tip),
                day: dataset.day
            };
        })
            .then(dataset => {
                self.setState({data: dataset});
                // console.log(data);
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="App">
                <div id={"center_div"}>
                    <Child1 data_1={this.state.data}></Child1>
                    <Child2 data_2={this.state.data}></Child2>
                </div>
            </div>
        );
    }
}

export default App;
