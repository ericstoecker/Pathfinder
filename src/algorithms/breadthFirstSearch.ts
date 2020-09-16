
import Queue from '../datastructures/Queue/Queue';

function breadthFirstSearch(graph: any, startNode: any, endNode: any) {
    const visitedNodesInOrder = [];

    //queue to save elements to be visited
    const queue = new Queue();

    //enqueue start node
    queue.enqueue(startNode);

    while(!queue.isEmpty()) {
        //get next node
        const u = queue.dequeue().key;
        visitedNodesInOrder.push(u);

        if((u.row === endNode.row) && (u.column === endNode.column)) {
            const shortestPath = traversePath(startNode, u);
            return {
                visitedNodesInOrder: visitedNodesInOrder,
                shortestPath: shortestPath
            };
        }

        //get neighbour nodes
        const adj = getNeighbours(graph, u);

        //update all neighbours of u
        for(let i = 0; i < adj.length; i++) {
            const v = adj[i];
            if(!v.isVisited) {
                v.isVisited = true;
                v.prev = u;

                queue.enqueue(v);
            }
        }
    }
    return {
        visitedNodesInOrder: visitedNodesInOrder,
        shortestPath: null
    };
}

//follows shortest path backwards and return it
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

export default breadthFirstSearch;