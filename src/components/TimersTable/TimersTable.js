import React from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {indigo600,blue50} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import {Link} from "react-router-dom";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { removeTimer as actionCreator } from '../../actions/timers';

import Graph from '../Graph/Graph';
import { convertDateToTime } from '../../utils/time';


class TimersTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            timers: this.props.timers
        };
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.timers !== this.state.timers){
            this.setState({timers: nextProps.timers});
        }
    }

    handleDeleteTimer(numOfTimer){
        this.props.actions(numOfTimer);
    }


    render(){
        return(
            <div >
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

                <Graph timers={this.state.timers}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    timers: state.timers.items
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(TimersTable);