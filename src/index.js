import React from "react";
import ReactDOM from "react-dom";
import {action, computed, configure, observable} from 'mobx';
import { observer } from 'mobx-react';
import './index.css';
configure({enforceActions: "always"});

const appState = {
    @observable weightBefore: 10,
    @observable waterPercentAfter: 98,

    @action setWeightBefore: (newValue) => {
        appState.weightBefore = +newValue;
    },
    @action setWaterPercentAfter: (newValue) => {
        appState.waterPercentAfter = +newValue;
    },
    @computed get weightAfter() {
        return (this.weightBefore / (100 - this.waterPercentAfter)).toFixed(2);
    }
};

@observer
class App extends React.Component {
    handleWeightChange = (e) => {
        this.props.appState.setWeightBefore(e.target.value);
    };

    handleWaterChange = (e) => {
        this.props.appState.setWaterPercentAfter(e.target.value);
    };

    render(){
        const {appState} = this.props;
        return (
            <section id="app">

                <div className='watermelon-box'>
                    <h1>Вес после усыхания: { appState.weightAfter } кг</h1>
                    <div className='watermelon'>
                        <Watermelon weight={appState.weightBefore} waterPercent={appState.waterPercentAfter}/>
                    </div>
                    <div className='sliders-box'>
                        <div className='slider'>
                            <strong>Начальный вес арбуза: {appState.weightBefore } кг</strong>
                            <input className='vertical-slider'type="range" onChange={this.handleWeightChange} value={appState.weightBefore} min={1} max={20}/>
                        </div>
                        <div className='slider'>
                            <strong>Процент воды после усыхания: { appState.waterPercentAfter }%</strong>
                            <input type="range" onChange={this.handleWaterChange} value={appState.waterPercentAfter} min={1} max={99}/>
                        </div>
                    </div>
                </div>
            </section>);
    }
}

@observer
class Watermelon extends React.Component{
    render(){
        const {weight, waterPercent} = this.props;
        const green = weight*10;
        const red = (green*waterPercent)/100;
        return(
            <svg height={400} width={400} >
                <g>
                    <circle
                        cx={200}
                        cy={200}
                        r={green}
                        fill="green"
                    />
                    <circle
                        cx={200}
                        cy={200}
                        r={red}
                        fill="red"
                    />
                </g>
            </svg>
        )
    };
}

ReactDOM.render(<App appState={appState}/>, document.getElementById("root"));
