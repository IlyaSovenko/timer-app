import React from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {indigo600,pink700} from 'material-ui/styles/colors';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/timers';

import { convertDateToTime } from '../../utils/time';


class Timer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            timerName: '',
            timerValue: new Date('0'),
            timerWorking: false,
            timerErrorOpen: false,
        };
    }

    componentWillMount(){
        if(this.props.timeStart !== 0){
            this.timeStart = new Date(this.props.timeStart);
            this.setState((prevState,prevProps) => ({timerWorking: true,timerValue: new Date(Date.parse(prevState.timerValue) + (new Date() - new Date(this.props.timeStart)))}));
            this.timer = setInterval(() => {this.setState((prevState) => ({timerValue: new Date(Date.parse(prevState.timerValue)+1000)}))},1000);
        }
    }

    timer = 0;
    timeStart = 0;

    handleTimerBtn(){
        if(!this.state.timerWorking) {
            this.timeStart = new Date();
            this.setState({timerWorking: true});
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
            this.setState((prevSt)=>({timerWorking: false,timerValue: new Date('0'),timerName: ''}));
            clearInterval(this.timer);
            this.props.actions.endNewTimer();
        }
    }

    handleDialogBtn(){
        this.setState((prevSt) => ({timerErrorOpen: !prevSt.timerErrorOpen}));
    }

    handleTimerName(event){
        this.setState({timerName: event.target.value});
    }

    render(){
        const actionsForTimer = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleDialogBtn.bind(this)}
            />,
        ];

        return (
            <div className="timer">
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
                    label={this.state.timerWorking ? 'Stop' : 'Start'}
                    style={{marginTop:50,width:100,margin: 'auto'}}
                    labelColor={indigo600}
                    onClick={this.handleTimerBtn.bind(this)}
                />

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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    timers: state.timers.items,
    timeStart: state.timers.timeStart
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Timer);