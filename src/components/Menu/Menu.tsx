import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBullseye } from '@fortawesome/free-solid-svg-icons';

import './Menu.css';


interface MenuState {
    listAlgoOpen: Boolean,
    listPatternOpen: Boolean,
    listSpeedOpen: Boolean,
    selectedSpeed: String
}

class Menu extends React.Component <any, MenuState> {
    constructor(props: any) {
        super(props);

        this.state = {
            listAlgoOpen: false,
            listPatternOpen: false,
            listSpeedOpen: false,
            selectedSpeed: "fast"
        }

        this.onClickStart = this.onClickStart.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
        this.toggleList = this.toggleList.bind(this);

        this.selectAlgorithm = this.selectAlgorithm.bind(this);
        this.selectSpeed = this.selectSpeed.bind(this);
        this.selectPattern = this.selectPattern.bind(this);
    }
    onClickStart() {
        this.props.startAlgorithm();
    }

    onClickClear() {
        this.props.clearBoard();
    }

    selectAlgorithm(ev: any) {
        const algorithm = ev.target.dataset.value;
        this.props.selectAlgorithm(algorithm);
    }

    selectSpeed(ev: any) {
        const speed = ev.target.dataset.value;
        this.props.selectSpeed(speed);
        this.setState({selectedSpeed: speed});
    }

    selectPattern(ev: any) {
        const pattern = ev.target.dataset.value;
        this.props.selectPattern(pattern);
    }

    toggleList(list: String): any {
        if(list === "listAlgo") {
            this.setState(prevState => ({
                listAlgoOpen: !prevState.listAlgoOpen,
                listPatternOpen: false,
                listSpeedOpen: false,
            }));
        } else if(list === "listPattern") {
            this.setState(prevState => ({
                listAlgoOpen: false,
                listPatternOpen: !prevState.listPatternOpen,
                listSpeedOpen: false,
            }));
        } else if(list === "listSpeed") {
            this.setState(prevState => ({
                listAlgoOpen: false,
                listPatternOpen: false,
                listSpeedOpen: !prevState.listSpeedOpen,
            }));
        }
    }

    render() {
        const listAlgoOpen = this.state.listAlgoOpen;
        const listPatternOpen = this.state.listPatternOpen;
        const listSpeedOpen = this.state.listSpeedOpen;

        return (
            <div className="Menu">
                <h1>Pathfinder</h1>
                <div className="SelectBar-wrapper" >
                    <div className="SelectBar">
                        <div className="dd" onClick={(e) => this.toggleList("listAlgo")}>
                            <div className="dd-header-algo">
                                <p>ALGORITHMS</p>
                                <FontAwesomeIcon className="arrow-down" icon={faCaretDown} />
                            </div>
                            {listAlgoOpen && <ul className="dd-list">
                                {["Dijkstra", "A*Search", "BFS", "DFS"].map((item:String,index:number) => {
                                    return <li className="dd-list-item" key={index} data-value={item} 
                                        onClick={this.selectAlgorithm} >{item}</li>
                                })}
                            </ul>}
                        </div>
                        
                        <div className="dd" onClick={(e) => this.toggleList("listPattern")}>
                            <div className="dd-header-pattern">
                                <p>PATTERNS&MAZES</p>
                                <FontAwesomeIcon className="arrow-down" icon={faCaretDown} />
                            </div>
                            {listPatternOpen && <ul className="dd-list">
                                {["empty grid", "recursive maze", "random maze", "wall", "snail pattern", "stair pattern"].map((item:String,index:number) => {
                                    return <li className="dd-list-item" key={index} data-value={item}
                                        onClick={this.selectPattern} >{item}</li>
                                })}
                            </ul>}
                        </div>
                        
                        <button onClick={this.onClickStart}>{this.props.currentAlgorithm.toUpperCase()}</button>

                        <p onClick={this.onClickClear}>CLEAR BOARD</p>

                        <div className="dd" onClick={(e) => this.toggleList("listSpeed")}>
                            <div className="dd-header-speed">
                                <p>SPEED: {this.state.selectedSpeed}</p>
                                <FontAwesomeIcon className="arrow-down" icon={faCaretDown} />
                            </div>
                            {listSpeedOpen && <ul className="dd-list">
                                {["slow", "average", "fast"].map((item:String,index:number) => {
                                    return <li className="dd-list-item" key={index} data-value={item}
                                        onClick={this.selectSpeed} >{item}</li>
                                })}
                            </ul>}
                        </div>
                    </div>
                </div>
                <div className="legend-wrapper">
                    <div className="legend">
                        <div className="legend-start-node">
                            <p>start:</p>
                            <div id="start-node-image"></div>
                        </div>
                        <div className="legend-target-node">
                            <p>target: </p>
                            <FontAwesomeIcon id="target-node-image" icon={faBullseye} />
                        </div>
                        <div className="legend-wall-node">
                            <p>wall:</p>
                            <div id="wall-node-image"></div>
                        </div>
                        <div className="legend-visited-node">
                            <p>visited:</p>
                            <div id="visited-node-image"></div>
                        </div>
                        <div className="legend-path-node">
                            <p>path:</p>
                            <div id="path-node-image"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;