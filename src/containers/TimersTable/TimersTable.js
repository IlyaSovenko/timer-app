import React from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {indigo600,blue50,} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import {Link} from "react-router-dom";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { removeTimer as actionCreator } from '../../actions/timers';

import Graph from '../../components/Graph/Graph';
import styles from './TimersTable.css';
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

    makeTableRows = (timers) => timers.map((object,index) => (
                <TableRow style={{ color: indigo600 }} selectable={false} key={index} >
                    <TableRowColumn className={[styles.text,styles.idColumn].join(' ')}>{index + 1}</TableRowColumn>
                    <TableRowColumn className={styles.text}>{object.timerName}</TableRowColumn>

                    <TableRowColumn className={styles.text}>
                        {convertDateToTime(new Date(object.timeStart))}
                    </TableRowColumn>
                    <TableRowColumn className={styles.text}>
                        {convertDateToTime(new Date(object.timeEnd))}
                    </TableRowColumn>
                    <TableRowColumn className={styles.text}>
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
            ));


    render(){

        const customStyles = {
            bodyBackground: {backgroundColor:blue50},
            textColor: { color: indigo600 }
        };

        const tableRows = this.makeTableRows(this.state.timers);

        return(
            <div className={styles.container} >
                <Table multiSelectable={false}  >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
                        <TableRow>
                            <TableHeaderColumn className={styles.idColumn}>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name of task</TableHeaderColumn>
                            <TableHeaderColumn>Time start</TableHeaderColumn>
                            <TableHeaderColumn>Time end</TableHeaderColumn>
                            <TableHeaderColumn>Time spent</TableHeaderColumn>
                            <TableHeaderColumn />
                            <TableHeaderColumn />
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} style={customStyles.bodyBackground} showRowHover={true}>
                        {tableRows}
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