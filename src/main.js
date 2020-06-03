import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tactoetic from './tactoetic.js';
import Game2048 from './2048.js';
class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        return(
            <Router>
                <Switch>
                    <Route path={`/tactoe`} component={Tactoetic}/>
                    <Route path={`/`} component={Game2048}/>
                </Switch>
            </Router>
        )
    }
}
export default Main;