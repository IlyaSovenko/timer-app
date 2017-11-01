import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import ActionBack from 'material-ui/svg-icons/navigation/arrow-back';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import {Link} from "react-router-dom";

import {connect} from 'react-redux';

import {grey700,indigo600} from 'material-ui/styles/colors';

import styles from './Info.css';
import { convertDateToTime } from '../../utils/time';



class Info extends React.Component{
    render(){
        const customStyle={
            mainTextStyle: {
                color: indigo600,
                fontSize: '1.5em'
            },
            secondaryTextStyle: {
                color: grey700,
                fontSize:'1.1em',
            },
        };
        return(
            <Paper className={styles.container}>
                <Link to='/'>
                    <FlatButton
                        label='Back'
                        icon={<ActionBack/>}
                        style={{color: indigo600}}
                    />
                </Link>
                <div className={styles.blocksContainer}>
                    <Paper className={styles.idBlock}>
                        <span style={customStyle.secondaryTextStyle}>№</span>
                        <Divider className={styles.divider}/>
                        <span style={customStyle.mainTextStyle}>{this.props.timer.id + 1}</span>
                    </Paper>
                    <Paper className={styles.nameBlock}>
                        <span style={customStyle.secondaryTextStyle}>Name</span>
                        <Divider className={styles.divider}/>
                        <span style={customStyle.mainTextStyle}>{this.props.timer.timerName}</span>
                    </Paper>
                    <Paper className={styles.timeBlock} >
                        <span style={customStyle.secondaryTextStyle}>Time start</span>
                        <Divider className={styles.divider}/>
                        <span style={customStyle.mainTextStyle}>
                            {convertDateToTime(new Date(this.props.timer.timeStart))}
                        </span>
                    </Paper>
                    <Paper className={styles.timeBlock}>
                        <span style={customStyle.secondaryTextStyle}>Time end</span>
                        <Divider className={styles.divider}/>
                        <span style={customStyle.mainTextStyle}>
                            {convertDateToTime(new Date(this.props.timer.timeEnd))}
                        </span>
                    </Paper>
                    <Paper className={styles.timeBlock}>
                        <span style={customStyle.secondaryTextStyle}>Time spend</span>
                        <Divider className={styles.divider}/>
                        <span style={customStyle.mainTextStyle}>
                            {convertDateToTime(new Date(this.props.timer.timeSpend))}
                        </span>
                    </Paper>
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = (state,props) => ({
    timer: state.timers.items.find((element) =>  element.id === Number(props.match.params.id))
});

export default connect(mapStateToProps,()=>({}))(Info);