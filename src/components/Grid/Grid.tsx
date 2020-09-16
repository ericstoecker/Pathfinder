import React from 'react';
import './Grid.css';

import Node from '../Node/Node';


class Grid extends React.Component <any> {

    render() {
        
        return (
            <div className="grid-wrapper">
                
                {this.props.grid.map((row:any, indexRow:number) => {
                    
                    return (
                        <div className="grid-row" key={indexRow}>
                            {row.map((node:any, indexCol:number) => {
                                //console.log(this.props.grid[0].length*indexRow+indexCol);
                                return <Node
                                    key={indexCol}
                                    weightForNeigh={node.weightForNeigh} 
                                    isVisited={node.isVisited}
                                    isWall={node.isWall}
                                    prev={node.prev}
                                    value={node.value}
                                    startNode={this.props.startNode}
                                    endNode={this.props.endNode}
                                    row={node.row}
                                    column={node.column}
                                    addWall={this.props.addWall}
                                    addWeight={this.props.addWeight}
                                    mouseIsPressed={this.props.mouseIsPressed}
                                    changeMousePressed={this.props.changeMousePressed}
                                    setStartNode={this.props.setStartNode}
                                    setEndNode={this.props.setEndNode}
                                ></Node>
                            })}
                        </div>
                    );
                })}
                
            </div>
        );
    }
}

export default Grid;