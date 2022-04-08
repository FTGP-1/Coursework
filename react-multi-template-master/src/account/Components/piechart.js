import React from 'react';
import ReactDOM from 'react-dom';

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/title')

export default class Pie extends React.Component {

    constructor(props) {
        super(props)
        this.setPieOption = this.setPieOption.bind(this)
        this.initPieChart = this.initPieChart.bind(this)
    }

    initPieChart() {
        const { data } = this.props
        let myChart = echarts.init(this.refs.pieChart)
        let options = this.setPieOption(data)
        myChart.setOption(options)
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.initPieChart()
        }, 1000) 
    }

    componentDidUpdate() {
        this.initPieChart()
    }

    render() {
        return (
            <div className="pie-react">
                <div ref="pieChart" style={{height: "300px"}}></div>
            </div>
        )
    }

    setPieOption(data) {
        return {
            title:{
              text:"Invest",
              left:"center",
              textStyle: {
                 fontSize: 25,
              }
            },
            color: ["#f8e367", "#99dfff", "#58c0f0", "#5ea6ff", "#ff9e48", "#bcbcbc"],
            series : [
                {
                    name: 'Proportion',
                    type: 'pie',
                    radius: ['60%', '80%'],
                    data: data,
                    label: {
                        show: true,
                        position: "outside",
                        textStyle:{
                          fontSize: 15
                        },
                        formatter: '{b}\n{c}\n{d}%'
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    }
                }
            ]
        }
    }
}