
import MinPriorityQueue from '../datastructures/minPriorityQueue/minPriorityQueue';

function aStar(graph: Array<any>, startNode: any, endNode: any) {
    //array to store nodes
    const nodes = [];
    const visitedNodesInOrder = [];
    

    //initialize all values with infinity(except for start node)
    for(let i = 0; i < graph.length; i++) {
        for(let j = 0; j < graph[i].length; j++) {
            //set start node to 0
            if((startNode.row === i) && (startNode.column === j)) {
                graph[i][j].value = 0;
            } else {
                graph[i][j].value = Infinity;
            }
            
            nodes.push(graph[i][j]);
        }
    }
    
    //create min-priority-queue as min-heap
    const queue = new MinPriorityQueue(nodes);

    
    while(queue.minHeap.heapsize >= 0) {
        //extract next node
        const u = queue.extractMinimum();

        //would otherwise start visiting random nodes, if end node couldn't be found
        if(u.value === Infinity) {
            return {
                visitedNodesInOrder: visitedNodesInOrder,
                shortestPath: undefined
            }
        }
        //add node to visited nodes
        visitedNodesInOrder.push(u);
        
        //check if u is endpoint
        if((u.row === endNode.row) && (u.column === endNode.column)) {
            const shortestPath = traversePath(startNode, u);
            return {
                visitedNodesInOrder: visitedNodesInOrder,
                shortestPath: shortestPath
            };
        //else keep searching
        } else {
            u.isVisited = true;
        
            //adjacency list of neighbours
            const adj = getNeighbours(graph, u);

            //const adj = u.neighbours;
            for(let i = 0; i < adj.length; i++) {
                const v = adj[i];
                //search index in map of heap
                const index = queue.minHeap.map.get(`${v.row},${v.column}`);

                //calculate heuristic
                const heuristic = calculateManhattanSquared(v, endNode);

                if(v.value > u.value + v.weightForNeigh + heuristic) {
                    queue.decreaseKey(index, u.value + v.weightForNeigh + heuristic);
                    v.prev = u;
                    /* updateGrid(v.row, v.column, v); */
                    graph[v.row][v.column] = v;
                }
            }
            graph[u.row][u.column] = u;
        }
    }
    return {
        visitedNodesInOrder: visitedNodesInOrder,
        shortestPath: null
    }; 
}

//follow shortest path backwards and return it
function traversePath(startNode: any, endpoint: any) {
    const shortestPath = [];
    //start at endpoint
    let node = endpoint;
    while(!(node === startNode)) {
        shortestPath.push(node);
        if(node.prev) {
            node = node.prev;
        } else {
            break;
        }
    }
    return shortestPath;
}

//get neighbour nodes of node u in grid
function getNeighbours(grid: any, u: any) {
    const neighbours = [];

    const row = u.row;
    const column = u.column;

    //top neighbour
    if(row - 1 >= 0) {
      const topNeighbour = grid[row-1][column];
      neighbours.push(topNeighbour);
    }
    //bottom neighbour
    if((row + 1  < grid.length)) {
      const botNeighbour = grid[row+1][column];
      neighbours.push(botNeighbour);
    }
    //left neighbour
    if(column - 1 >= 0) {
      const leftNeighbour = grid[row][column-1];
      neighbours.push(leftNeighbour);
    }
    //right neighbour
    if(column + 1 < grid[row].length) {
      const rightNeighbour = grid[row][column+1];
      neighbours.push(rightNeighbour);
    }
    return neighbours;
}

//returns squared manhattan distance
function calculateManhattanSquared(node: any, endNode: any) {
    return Math.pow(Math.abs(node.row-endNode.row) + Math.abs(node.column-endNode.column), 2);
}

export default aStar;