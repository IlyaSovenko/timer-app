import React from 'react';

import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

class Graph extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataForGraphic : [
                {name: '0', minutes: 0},
                {name: '1', minutes: 0},
                {name: '2', minutes: 0},
                {name: '3', minutes: 0},
                {name: '4', minutes: 0},
                {name: '5', minutes: 0},
                {name: '6', minutes: 0},
                {name: '7', minutes: 0},
                {name: '8', minutes: 0},
                {name: '9', minutes: 0},
                {name: '10', minutes: 0},
                {name: '11', minutes: 0},
                {name: '12', minutes: 0},
                {name: '13', minutes: 0},
                {name: '14', minutes: 0},
                {name: '15', minutes: 0},
                {name: '16', minutes: 0},
                {name: '17', minutes: 0},
                {name: '18', minutes: 0},
                {name: '19', minutes: 0},
                {name: '20', minutes: 0},
                {name: '21', minutes: 0},
                {name: '22', minutes: 0},
                {name: '23', minutes: 0},
            ],
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.timers !== this.props.timers){
            this.calcDataForGraphic(nextProps.timers);
        }
    }

    componentWillMount(){
        this.calcDataForGraphic(this.props.timers);
    }

    calcDataForGraphic(timers){
        let dataForGraphic = this.state.dataForGraphic;
        for(let j in dataForGraphic){
            dataForGraphic[j].minutes = 0;
        }
        for(let item in timers){
            if(timers[item].timeStart.getHours() === timers[item].timeEnd.getHours()) {
                dataForGraphic[timers[item].timeStart.getHours()].minutes += timers[item].timeSpend.getMinutes() + Math.round(timers[item].timeSpend.getSeconds()/60);
            }else{
                dataForGraphic[timers[item].timeStart.getHours()].minutes += 60 - timers[item].timeStart.getMinutes() - Math.round(timers[item].timeStart.getSeconds()/60);
                for(let i = timers[item].timeStart.getHours() + 1; i < timers[item].timeEnd.getHours();i++){
                    dataForGraphic[i].minutes = 60;
                }
                dataForGraphic[timers[item].timeEnd.getHours()].minutes += timers[item].timeEnd.getMinutes() + Math.round(timers[item].timeEnd.getSeconds()/60);
            }
        }
    }

    render(){
        return(
            <div>
                <BarChart
                    width={1100}
                    height={300}
                    data={this.state.dataForGraphic}
                    style={{margin:'auto',marginTop:30}}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid/>
                    <Tooltip/>
                    <Legend style={{marginTop: 6}} />
                    <Bar name="Minutes in this hour" dataKey="minutes" fill="#8884d8" />
                </BarChart>
            </div>
        )
    }
}

export default Graph;