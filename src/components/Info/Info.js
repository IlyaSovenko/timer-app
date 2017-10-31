import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import ActionBack from 'material-ui/svg-icons/navigation/arrow-back';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import {Link} from "react-router-dom";

import {connect} from 'react-redux';

import {grey700,blue500} from 'material-ui/styles/colors';

import { convertDateToTime } from '../../utils/time';


class Info extends React.Component{
    render(){
        return(
            <Paper style={{width: '80%',margin: 'auto',marginTop: 15,paddingTop: 5}}>
                <Link to='/'>
                    <FlatButton
                        label='Back'
                        icon={<ActionBack/>}
                        primary={true}
                        style={{marginLeft: 5}}
                    />
                </Link>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                    <Paper style={{width: 100,height:150,margin: 10,textAlign: 'center',paddingTop: 10}}>
                        <span style={{color:grey700,fontSize:'1.1em'}}>№</span>
                        <Divider style={{marginLeft: '10%',marginTop: 10,marginBottom: 30,width: '80%'}}/>
                        <span style={{color: blue500,fontSize: '1.5em',marginTop: 25}}>{this.props.timer.id + 1}</span>
                    </Paper>
                    <Paper style={{width: 500,height:150,margin: 10,textAlign: 'center',paddingTop: 10}}>
                        <span style={{color:grey700,fontSize:'1.1em'}}>Name</span>
                        <Divider style={{marginLeft: '10%',marginTop: 10,marginBottom: 30,width: '80%'}}/>
                        <span style={{color: blue500,fontSize: '1.5em',marginTop: 25}}>{this.props.timer.timerName}</span>
                    </Paper>
                    <Paper style={{width: 200,height:150,margin: 10,textAlign: 'center',paddingTop: 10}}>
                        <span style={{color:grey700,fontSize:'1.1em'}}>Time start</span>
                        <Divider style={{marginLeft: '10%',marginTop: 10,marginBottom: 30,width: '80%'}}/>
                        <span style={{color: blue500,fontSize: '1.5em',marginTop: 25}}>
                            {convertDateToTime(new Date(this.props.timer.timeStart))}
                        </span>
                    </Paper>
                    <Paper style={{width: 200,height:150,margin: 10,textAlign: 'center',paddingTop: 10}}>
                        <span style={{color:grey700,fontSize:'1.1em'}}>Time end</span>
                        <Divider style={{marginLeft: '10%',marginTop: 10,marginBottom: 30,width: '80%'}}/>
                        <span style={{color: blue500,fontSize: '1.5em',marginTop: 25}}>
                            {convertDateToTime(new Date(this.props.timer.timeEnd))}
                        </span>
                    </Paper>
                    <Paper style={{width: 200,height:150,margin: 10,textAlign: 'center',paddingTop: 10}}>
                        <span style={{color:grey700,fontSize:'1.1em'}}>Time spend</span>
                        <Divider style={{marginLeft: '10%',marginTop: 10,marginBottom: 30,width: '80%'}}/>
                        <span style={{color: blue500,fontSize: '1.5em',marginTop: 25}}>
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