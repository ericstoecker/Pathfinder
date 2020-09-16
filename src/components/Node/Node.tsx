import React from 'react';
import './Node.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface VertexProps {
    weightForNeigh: number,
    isVisited: Boolean
    prev?: any,
    value: number,
    startNode: any,
    endNode: any,
    isWall: Boolean,
    mouseIsPressed: Boolean,
    row: number,
    column: number,
    addWall: any,
    addWeight: any,
    changeMousePressed: any,
    setStartNode: any,
    setEndNode: any,
}


class Node extends React.Component <VertexProps> {
    constructor(props: VertexProps) {
        super(props);

        
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    handleMouseDown() {
        if(!this.props.mouseIsPressed) {
            this.props.changeMousePressed();
            this.props.addWall(this.props.row, this.props.column);
            //this.props.addWeight(this.props.row, this.props.column);
        }
    }

    handleMouseUp() {
        if(this.props.mouseIsPressed) {
            this.props.changeMousePressed();
        }
    }

    handleMouseOver() {
        if(this.props.mouseIsPressed) {
            this.props.addWall(this.props.row, this.props.column);
            //this.props.addWeight(this.props.row, this.props.column);
        }
    }

    onDragStart(ev: any, isEnd: Boolean, isStart: Boolean) {
        //ev.preventDefault();
        if(isEnd) {
            ev.dataTransfer.setData("isStart", false);
            ev.dataTransfer.setData("isEnd", true);
        } else if(isStart) {
            ev.dataTransfer.setData("isEnd", false);
            ev.dataTransfer.setData("isStart", true);
        }
    }

    onDragOver(ev: any) {
        /* let isStart = ev.dataTransfer.getData("isStart");
        let isEnd = ev.dataTransfer.getData("isEnd");

        if(isStart === "true") {
            this.props.setStartNode(this.props.row, this.props.column);
        } else if(isEnd === "true") {
            this.props.setEndNode(this.props.row, this.props.column);
        } */
        ev.preventDefault();
    }

    onDrop(ev: any) {
        let isStart = ev.dataTransfer.getData("isStart");
        let isEnd = ev.dataTransfer.getData("isEnd");

        if(isStart === "true") {
            this.props.setStartNode(this.props.row, this.props.column);
        } else if(isEnd === "true") {
            this.props.setEndNode(this.props.row, this.props.column);
        }
    }

    render() {
        let isStart = false;
        let isEnd = false;
        const startNode = this.props.startNode;
        const endNode = this.props.endNode;
        if((this.props.row === startNode.row) && (this.props.column === startNode.column)) {
            isStart = true;
        } else if((this.props.row === endNode.row) && (this.props.column === endNode.column)) {
            isEnd = true;
        }

        return (
            <div className="Node">
                {(!isStart&&!isEnd) && 
                    <div className="node-normal" id={`node-${this.props.row}-${this.props.column}`}
                        onMouseOver={this.handleMouseOver}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e)}>
                    </div>}
                {(isStart) &&
                    <div className="node-start" id={`node-${this.props.row}-${this.props.column}`}
                        draggable onDragStart={(e) => this.onDragStart(e, false, true)}>
                        <FontAwesomeIcon icon={faChevronRight} id="start-icon" />
                    </div>}
                {(isEnd) && 
                    <div className="node-end" id={`node-${this.props.row}-${this.props.column}`}
                        draggable onDragStart={(e) => this.onDragStart(e, true, false)}>
                        <FontAwesomeIcon icon={faBullseye} id="target-icon" />
                    </div>}
            </div>
        );
    }
}

export default Node;