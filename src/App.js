import React, { Component } from 'react';
import './App.css';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {indigo600,blue50,pink700} from 'material-ui/styles/colors';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './actions/timers';
import {Link} from "react-router-dom";
import { convertDateToTime } from './utils/time';



class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentTitle: '',
            currentTimeStart: 0,
            currentTimeEnd: 0,
            currentTimeSpend: 0,
            infoDialogOpen: false,
            timerName: '',
            timerValue: new Date('0'),
            timerBtnText: 'Start',
            timerErrorOpen: false,
            timers: this.props.timers ,
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

    componentWillMount(){
        if(this.props.timeStart !== 0){
            this.timeStart = new Date(this.props.timeStart);
            this.setState((prevState,prevProps) => ({timerValue: new Date(Date.parse(prevState.timerValue) + (new Date() - new Date(this.props.timeStart)))}));
            this.handleTimerBtn();
        }
        this.calcDataForGraphic();
    }

    timer = 0;
    timeStart = 0;

    calcDataForGraphic(){
        const timers = this.state.timers;
        console.log(timers);
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

    handleDeleteTimer(numOfTimer){
        this.props.actions.removeTimer(numOfTimer);
        let timers = this.state.timers;
        timers.splice(numOfTimer,1);
        this.setState({timers});
        this.calcDataForGraphic();
    }

    handleTimerBtn(){
        if(this.state.timerBtnText === 'Start') {
            if(this.timeStart === 0) {
                this.timeStart = new Date();
            }
            this.setState({timerBtnText: 'Stop'});
            this.timer = setInterval(() => {this.setState((prevState) => ({timerValue: new Date(Date.parse(prevState.timerValue)+1000)}))},1000);
            this.props.actions.startNewTimer(this.timeStart);
        }else{
            if(!this.state.timerName){
                this.handleDialogBtn();
                return;
            }
            const newTimer = {
                timerName:this.state.timerName,
                timeStart: this.timeStart,
                timeEnd: new Date(),
                timeSpend: this.state.timerValue
            };

            this.props.actions.addTimer(newTimer);
            this.setState((prevSt)=>({timerBtnText: 'Start',timerValue: new Date('0'),timerName: '',timers: [...prevSt.timers,newTimer]}),() => {this.calcDataForGraphic()});
            clearInterval(this.timer);
            this.timeStart = 0;
            this.props.actions.endNewTimer();
        }
    }

    handleDialogBtn(){
        this.setState((prevSt) => ({timerErrorOpen: !prevSt.timerErrorOpen}));
    }

    handleInfoDialog(numOfTimer){

        this.setState((prevSt) => ({
            infoDialogOpen: true,
            currentTitle: prevSt.timers[numOfTimer].timerName,
            currentTimeStart: convertDateToTime(prevSt.timers[numOfTimer].timeStart),
            currentTimeEnd: convertDateToTime(prevSt.timers[numOfTimer].timeEnd),
            currentTimeSpend: convertDateToTime(prevSt.timers[numOfTimer].timeSpend)
        }));

    }

    handleCloseInfoDialog = () => {
        this.setState({infoDialogOpen: false})
    }


    handleTimerName(event){
        this.setState({timerName: event.target.value});
    }

    render() {
        const actionsForTimer = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleDialogBtn.bind(this)}
            />,
        ];
        const actionsForInfo = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseInfoDialog}
            />,
        ];

        return (
          <div className="App">
              <TextField
                  value={this.state.timerName}
                  onChange={this.handleTimerName.bind(this)}
                  floatingLabelText="Name of your task"
                  style={{margin: 'auto',marginBottom:30,color:indigo600}}
                  underlineStyle={{color:indigo600}}
              />
              <Paper
                  style={{
                      height: 300,
                      width: 300,
                      paddingTop:135,
                      fontSize: '25px',
                      margin:'auto',
                      textAlign: 'center',
                      display: 'inline-block',
                      marginBottom: 30,
                      color:indigo600
                  }}
                  zDepth={2}
                  circle={true}
              >
                  {convertDateToTime(this.state.timerValue)}
              </Paper>
              <RaisedButton
                  label={this.state.timerBtnText.toUpperCase()}
                  style={{marginTop:50,width:100,margin: 'auto'}}
                  labelColor={indigo600}
                  onClick={this.handleTimerBtn.bind(this)}
              />

              <Table multiSelectable={false} style={{width:'80%',margin:'auto',marginTop:15}} >
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
                      <TableRow>
                          <TableHeaderColumn style={{width:20}}>ID</TableHeaderColumn>
                          <TableHeaderColumn>Name of task</TableHeaderColumn>
                          <TableHeaderColumn>Time start</TableHeaderColumn>
                          <TableHeaderColumn>Time end</TableHeaderColumn>
                          <TableHeaderColumn>Time spent</TableHeaderColumn>
                          <TableHeaderColumn />
                          <TableHeaderColumn />
                      </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} style={{backgroundColor: blue50}} showRowHover={true}>
                      {this.state.timers.map((object,index)=>{
                          return(
                              <TableRow style={{color: indigo600}} selectable={false} key={index} >
                                  <TableRowColumn style={{fontSize: '1.1em',width:20}}>{index + 1}</TableRowColumn>
                                  <TableRowColumn style={{fontSize: '1.1em'}}>{object.timerName}</TableRowColumn>

                                  <TableRowColumn style={{fontSize: '1.1em'}}>
                                      {convertDateToTime(new Date(object.timeStart))}
                                  </TableRowColumn>
                                  <TableRowColumn style={{fontSize: '1.1em'}}>
                                      {convertDateToTime(new Date(object.timeEnd))}
                                  </TableRowColumn>
                                  <TableRowColumn style={{fontSize: '1.1em'}}>
                                      {convertDateToTime(new Date(object.timeSpend))}
                                  </TableRowColumn>

                                  <TableRowColumn>
                                      <Link to={`info/${index}`}>
                                          <RaisedButton
                                              labelColor={indigo600}
                                              label={'Info'.toUpperCase()}
                                          />
                                      </Link>
                                  </TableRowColumn>
                                  <TableRowColumn>
                                      <RaisedButton
                                          labelColor={indigo600}
                                          label={'Delete'.toUpperCase()}
                                          onClick={this.handleDeleteTimer.bind(this,index)}/>
                                  </TableRowColumn>
                              </TableRow>
                          )
                      })}
                  </TableBody>
              </Table>

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

              <Dialog
                  title="Empty task name"
                  actions={actionsForTimer}
                  modal={false}
                  open={this.state.timerErrorOpen}
                  onRequestClose={this.handleDialogBtn.bind(this)}
                  titleStyle={{color:pink700}}
              >
                  You are trying close your task without name,enter the title and try again!
              </Dialog>
              <Dialog
                  title="Info about timer"
                  actions={actionsForInfo}
                  modal={false}
                  open={this.state.infoDialogOpen}
                  onRequestClose={this.handleCloseInfoDialog}
                  titleStyle={{color: indigo600}}
              >
                  Name of timer: <span style={{color: indigo600,marginRight: 7}}>{this.state.currentTitle}</span>
                  Time start : <span style={{color: indigo600,marginRight: 7}}>{this.state.currentTimeStart}</span>
                  Time end : <span style={{color: indigo600,marginRight: 7}}>{this.state.currentTimeEnd}</span>
                  Time spend : <span style={{color: indigo600}}>{this.state.currentTimeSpend}</span>
              </Dialog>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    timers: state.timers.items,
    timeStart: state.timers.timeStart
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(App);