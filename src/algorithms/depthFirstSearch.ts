
function depthFirstSearch(graph: any, startNode: any, endNode: any): any {
    const visitedNodesInOrder: any = [];
    const target = depthFirstSearchRec(graph, startNode, startNode, endNode, visitedNodesInOrder);
    const path = traversePath(startNode, target);
    return {
        visitedNodesInOrder: visitedNodesInOrder,
        path: path
    };
}

function depthFirstSearchRec(graph: any, u: any, startNode: any, endNode: any, visitedNodesInOrder: any): any {
    u.isVisited = true;
    visitedNodesInOrder.push(u);

    //stop at end node
    if((u.row === endNode.row) && (u.column === endNode.column)) {
        return u;
    }

    //get neighbour nodes of u
    const adj = getNeighbours(graph, u);

    for(let i = 0; i < adj.length; i++) {
        const v = adj[i];

        //visit if not visited
        if(!v.isVisited) {
            v.prev = u;

            return depthFirstSearchRec(graph, v, startNode, endNode, visitedNodesInOrder);
        }
    }
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

export default depthFirstSearch;