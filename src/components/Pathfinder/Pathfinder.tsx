import React from 'react';
import './Pathfinder.css';

import Grid from '../Grid/Grid';
import Menu from '../Menu/Menu';

//import algorithms
import dijkstra from '../../algorithms/dijkstra';
import breadthFirstSearch from '../../algorithms/breadthFirstSearch';
import aStar from '../../algorithms/aStar';
import depthFirstSearch from '../../algorithms/depthFirstSearch';

import recursiveMaze from '../../algorithms/recursiveMaze';
import random from '../../algorithms/random';
import stair from '../../algorithms/stair';
import snail from '../../algorithms/snail';

interface PathfinderState {
    grid: any,
    startNode:any,
    endNode: any,
    mouseIsPressed: Boolean,
    settings: {
      currentAlgo: String,
      delay: number,
    },
    hasStarted: Boolean
}

class Pathfinder extends React.Component <{}, PathfinderState> {
    constructor(props:any) {
        super(props);
    
        this.state = {
            grid: [[]],
            startNode: undefined,
            endNode: undefined,
            mouseIsPressed: false,
            settings: {
              currentAlgo: "a*search",
              delay: 10
            },
            hasStarted: false
        }

        this.createGrid = this.createGrid.bind(this);
        this.startAlgorithm = this.startAlgorithm.bind(this);
        this.visualizeAlgorithm = this.visualizeAlgorithm.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.gridCopy = this.gridCopy.bind(this);

        //bind event handler
        this.changeMousePressed = this.changeMousePressed.bind(this);
        this.addWall = this.addWall.bind(this);
        this.addWeight = this.addWeight.bind(this);
        this.selectSpeed = this.selectSpeed.bind(this);
        this.selectAlgorithm = this.selectAlgorithm.bind(this);
        this.setStartNode = this.setStartNode.bind(this);
        this.setEndNode = this.setEndNode.bind(this);
        this.selectPattern = this.selectPattern.bind(this);
        this.createSingleWall = this.createSingleWall.bind(this);

        //bind algorithms
        this.dijkstra = this.dijkstra.bind(this);
        this.breadthFirstSearch = this.breadthFirstSearch.bind(this);
        this.aStar = this.aStar.bind(this);

        this.recursiveMaze = this.recursiveMaze.bind(this);
        this.randomPattern = this.randomPattern.bind(this);
        this.stair = this.stair.bind(this);
        this.snail = this.snail.bind(this);
      }
    
      //creates 50x100 grid with node objects
      createGrid() {
        const grid = [];
    
        //iterate through rows
        for(let i = 0; i < 25; i++) {
          const row = [];
          //iterate through columns
          for(let j = 0; j < 58; j++) {
            const node = {
                weightForNeigh: 1,
                isVisited: false,
                prev: undefined,
                isWall: false,
                value: 1,
                row: i,
                column: j
            }
            if((i === 12) && (j === 10)) {
              this.setState({startNode: node});
            }
            if((i === 12) && (j === 25)) {
              this.setState({endNode: node});
            }
            row.push(node);
          }
          grid.push(row);
        }
        this.setState({grid: grid});
      }

      changeMousePressed() {
        this.setState({mouseIsPressed: !this.state.mouseIsPressed});
      }

      //transforms node into a wall
      addWall(row: number, column: number) {
        const node = this.state.grid[row][column];
        if(!node.isStart && !node.isEnd && !this.state.hasStarted) {
          node.weightForNeigh = Infinity;
          node.isWall = true;

          const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
          nodeObject.className='node-wall';
        }

      }

      //handles speed selection
      selectSpeed(speed: String) {
        const settings = this.state.settings;
        speed = speed.toLowerCase();
        
        if(speed === "slow") {
          settings.delay = 300;
        } else if(speed === "average") {
          settings.delay = 60;
        } else {
          settings.delay = 5;
        }

        this.setState({settings: settings});
      }

      selectAlgorithm(algorithm: String) {
        const settings = this.state.settings;
        algorithm = algorithm.toLowerCase();

        settings.currentAlgo = algorithm;
        this.setState({settings: settings});
      }

      //selects and directly creates choosen pattern
      selectPattern(pattern: String) {
        pattern = pattern.toLowerCase();

        if(pattern === "recursive maze") {
          this.recursiveMaze();
        } else if(pattern === "empty grid") {
          this.clearBoard();
        } else if(pattern === "wall") {
          this.createSingleWall();
        } else if(pattern === "random maze") {
          this.randomPattern();
        } else if(pattern === "stair pattern") {
          this.stair();
        } else if(pattern === "snail pattern") {
          this.snail();
        }
      }

      //deletes all walls
      clearBoard() {
        if(this.state.hasStarted) {
          return;
        }

        const grid = [];
        const startNode = this.state.startNode;
        const endNode = this.state.endNode;
    
        //iterate through rows
        for(let i = 0; i < this.state.grid.length; i++) {
          const row = [];
          //iterate through columns
          for(let j = 0; j < this.state.grid[i].length; j++) {
            const node = {
                weightForNeigh: 1,
                isVisited: false,
                prev: undefined,
                isWall: false,
                value: 1,
                row: i,
                column: j
            }
            if((i===startNode.row) && (j===startNode.column)) {
              const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
              nodeObject.className='node-start';
            } else if((i===endNode.row) && (j===endNode.column)) {
              const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
              nodeObject.className='node-end';
            } else {
              const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
              nodeObject.className='node-normal';
            }
            row.push(node);
          }
          grid.push(row);
        }
        this.setState({grid: grid});     
      }

      setStartNode(row: number, column: number) {
        const node = this.state.grid[row][column];
        this.setState({startNode: node});
      }

      setEndNode(row: number, column: number) {
        const node = this.state.grid[row][column];
        this.setState({endNode: node});
      }

      //adds weight to a node
      addWeight(row: number, column: number) {
        const node = this.state.grid[row][column];
        if(!node.isStart && !node.isEnd && !this.state.hasStarted && !node.isWall) {
          node.weightForNeigh = 3;
          node.isWeight = true;
        }
        
      }

      //calls current algo
      startAlgorithm() {
        //checks if algorithm has started already
        if(this.state.hasStarted) {
          return;
        }

        this.setState({hasStarted: true});

        const delay = this.state.settings.delay;
        const currentAlgo = this.state.settings.currentAlgo;

        let visitedNodesInOrder;
        let shortestPath;

        //selects right algorithm
        if(currentAlgo === "dijkstra") {
          const result = this.dijkstra()
          visitedNodesInOrder = result?.visitedNodesInOrder;
          shortestPath = result?.shortestPath;
          
        } else if(currentAlgo === "bfs") {
          const result = this.breadthFirstSearch();
          visitedNodesInOrder = result?.visitedNodesInOrder;
          shortestPath = result?.shortestPath;

        } else if(currentAlgo === "a*search") {
          const result = this.aStar();
          visitedNodesInOrder = result?.visitedNodesInOrder;
          shortestPath = result?.shortestPath;

        } else if(currentAlgo === "dfs") {
          const result = this.depthFirstSearch();
          visitedNodesInOrder = result?.visitedNodesInOrder;
          shortestPath = result?.path;
        }

        //paints visited notes and path
        this.visualizeAlgorithm(visitedNodesInOrder, shortestPath, delay);

        this.setState({hasStarted: false});
      }

      visualizeAlgorithm(visitedNodesInOrder: any, shortestPath: any, delay: number) {
        const nodes = visitedNodesInOrder;

        const startNode = this.state.startNode;
        const endNode = this.state.endNode;

        for(let i = 0; i < nodes.length; i++) {
          setTimeout(() => {
            //get node
            const node = nodes[i];

            if((node.row === startNode.row) && (node.column === startNode.column)) {
              //change className of visited start node in Node.tsx
              const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
              nodeObject.className='node-start-visited';
            } else if((node.row === endNode.row) && (node.column === endNode.column)) {
              //change className of visited node in Node.tsx
              const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
              nodeObject.className='node-end-visited';
            } else {
              //change className of visited node in Node.tsx
              const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
              nodeObject.className='node-visited';
            }
          }, delay*i);
        }
        if(shortestPath) {
          for(let j = 0; j < shortestPath.length; j++) {
            setTimeout(() => {
              //get node
              const node = shortestPath[j];
  
              //change className of path node in Node.tsx
              const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
              nodeObject.className='node-path';
            }, nodes.length*delay + 350 + j*(delay+50));
          }
        }
      }

      //creates copy of current grid
      gridCopy() {
        //matrix to save copy
        const copy: Array<Array<any>> = [];
        const grid = this.state.grid;

        //make copy of grid(to not update the grid state in pathfinder because 
        //grid is would be a reference to this.state.grid)
        for(let i = 0; i < grid.length; i++) {
          const row = [];
          for(let j = 0; j < grid[i].length; j++) {
            row.push({ ...grid[i][j]});
          }
        
          copy.push(row);
        }

        return copy;
      }

      //algorithms

      dijkstra() {
        //copy of this.state.grid
        const grid = this.gridCopy();

        //copy start and end node
        const startNode = {...this.state.startNode};
        const endNode = {...this.state.endNode};
        
        const result = dijkstra(grid, startNode, endNode);
        
        return result;
      }

      breadthFirstSearch() {
        //copy of this.state.grid
        const grid = this.gridCopy();

        //copy start and end node
        const startNode = {...this.state.startNode};
        const endNode = {...this.state.endNode};

        const result = breadthFirstSearch(grid, startNode, endNode);

        return result;
      }

      depthFirstSearch() {
        //matrix to save copy
        const graph: Array<Array<any>> = [];
        const grid = this.state.grid;

        //make copy of grid(to not update the grid state in pathfinder because 
        //grid is would be a reference to this.state.grid)
        for(let i = 0; i < grid.length; i++) {
          const row = [];
          for(let j = 0; j < grid[i].length; j++) {
            row.push({ ...grid[i][j]});
          }
        
          graph.push(row);
        }

        const startNode = {...this.state.startNode};
        const endNode = {...this.state.endNode};

        const result = depthFirstSearch(graph, startNode, endNode);

        return result;
      }

      aStar() {
        //copy of this.state.grid
        const grid = this.gridCopy();

        //copy start and end node
        const endNode = {...this.state.endNode};
        const startNode = {...this.state.startNode};

        const result = aStar(grid, startNode, endNode);
        return result;
      }

      recursiveMaze() {
        this.clearBoard();

        //copy of this.state.grid
        let grid = this.gridCopy();

        //copy start and end node
        const startNode = {...this.state.startNode};
        const endNode = {...this.state.endNode};

        //call algorithm
        const result = recursiveMaze(grid, startNode, endNode);

        const nodesInOrder = result.nodesInOrder;
        grid = result.grid;
        //update grid
        this.setState({grid: grid});

        const delay = this.state.settings.delay;

        for(let i = 0; i < nodesInOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInOrder[i];

            //change className of node in Node.tsx
            const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
            nodeObject.className='node-wall';
          }, delay*i);
        }
      }

      randomPattern() {
        this.clearBoard();

        //copy of this.state.grid
        let grid = this.gridCopy();

        //copy start and end node
        const startNode = {...this.state.startNode};
        const endNode = {...this.state.endNode};

        const result = random(grid, startNode, endNode);

        const wallNode = result.wallNodes;
        grid = result.grid;
        //update grid
        this.setState({grid: grid});

        //visualize
        for(let i = 0; i < wallNode.length; i++) {
          setTimeout(() => {
            const node = wallNode[i];

            //change className of node in Node.tsx
            const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
            nodeObject.className='node-wall';
          }, 5*i);
        }
      }

      createSingleWall() {
        const startNode = this.state.startNode;
        const endNode = this.state.endNode;
        const grid = this.state.grid;
        let col = -1;

        if(Math.abs(startNode.column-endNode.column) >= 2) {
          if(startNode.column < endNode.column) {
            col = Math.floor(Math.random() * (endNode.column-1 - startNode.column) + startNode.column+1);
          } else {
            col = Math.floor(Math.random() * (startNode.column-1 - endNode.column) + endNode.column+1);
          }
          
          const hole = Math.floor(Math.random() * (grid.length-1));

          for(let i = 0; i < grid.length; i++) {
            if(i !== hole) {
              setTimeout(() => {
                const node = grid[i][col];
                node.isWall = true;
                node.weightForNeigh = Infinity;

                const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
                nodeObject.className='node-wall';
              }, 20*i);
            }

          }
        }
      }

      stair() {
        this.clearBoard();

        //copy of this.state.grid
        const grid = this.gridCopy();

        //copy start and end node
        const startNode = {...this.state.startNode};
        const endNode = {...this.state.endNode};

        const result = stair(grid, startNode, endNode);

        const wallNode = result.wallNodes;
        const newGrid = result.grid;

        //update grid
        this.setState({ grid: newGrid });

        //visualize
        for(let i = 0; i < wallNode.length; i++) {
          setTimeout(() => {
            const node = wallNode[i];

            //change className of node in Node.tsx
            const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
            nodeObject.className='node-wall';
          }, 15*i);
        }
      }

      snail() {
        this.clearBoard();

        //copy of this.state.grid
        const grid = this.gridCopy();

        /* //copy start and end node
        const startNode = {...this.state.startNode};
        const endNode = {...this.state.endNode}; */

        const result = snail(grid);

        const wallNode = result.wallNodes;
        const newGrid = result.grid;

        //update grid
        this.setState({ grid: newGrid });

        //visualize
        for(let i = 0; i < wallNode.length; i++) {
          setTimeout(() => {
            const node = wallNode[i];

            //change className of node in Node.tsx
            const nodeObject: any = document.getElementById(`node-${node.row}-${node.column}`);
            nodeObject.className='node-wall';
          }, 15*i);
        }
      }

    
      componentDidMount() {
        //create empty grid
        this.createGrid();
      }
    
      render() {
        return (
          <div className="Pathfinder">
              <Menu 
                startAlgorithm={this.startAlgorithm} 
                selectSpeed={this.selectSpeed} 
                selectAlgorithm={this.selectAlgorithm}
                selectPattern={this.selectPattern}
                currentAlgorithm={this.state.settings.currentAlgo}
                clearBoard={this.clearBoard}
                recursiveMaze={this.recursiveMaze}
              ></Menu>
              <Grid 
                grid={this.state.grid}
                startNode={this.state.startNode}
                endNode={this.state.endNode}
                addWall={this.addWall}
                addWeight={this.addWeight}
                mouseIsPressed={this.state.mouseIsPressed} 
                changeMousePressed={this.changeMousePressed}
                setStartNode={this.setStartNode}
                setEndNode={this.setEndNode}>
                </Grid>
          </div>
        );
      }
}

export default Pathfinder;