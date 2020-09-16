

function recursiveMaze(grid: any, startNode: any, endNode: any) {
    const nodesInOrder: any = [];

    //create border(outer rows/ columns)
    for(let i = 0; i < grid[0].length; i++) {
        const node = grid[0][i];
        node.isWall = true;
        node.weightForNeigh = Infinity;
        nodesInOrder.push(node);
    }
    for(let j = 0; j < grid.length; j++) {
        let node = grid[j][0];
        node.isWall = true;
        node.weightForNeigh = Infinity;
        nodesInOrder.push(node);
        node = grid[j][grid[0].length-1];
        node.isWall = true;
        node.weightForNeigh = Infinity;
        nodesInOrder.push(node);
    }
    for(let k = grid[0].length-1; k >= 0; k--) {
        const node = grid[24][k];
        node.isWall = true;
        node.weightForNeigh = Infinity;
        nodesInOrder.push(node);
    }


    //start rows/columns
    const startRow = 1;
    const endRow = 23;
    const startCol = 1;
    const endCol = 56;

    //start recursion
    divideVertically(grid, startRow, endRow, startCol, endCol, nodesInOrder, startNode, endNode);

    return {
        nodesInOrder: nodesInOrder,
        grid: grid,
    };
}

//divides a given part of grid vertically
function divideVertically(grid: any, startRow: number, endRow: number, startCol: number, 
        endCol: number, nodesInOrder: any, startNode: any, endNode: any) {
    
    //check for end of recursion(only one column to divide)
    if(endCol === startCol) {
        return;
    }

    var middle = startCol + Math.floor((endCol - startCol) / 2) - 1;

    if(middle%2 === 1) {
        middle++;
    }
    
    //create Wall hole
    let hole1 = -1;
    let hole2 = -1;
    let hole3 = -1;
    let hole4 = -1;

    //check edges
    if(!grid[startRow-1][middle].isWall) {
        hole1 = startRow;
    }
    if(!grid[endRow+1][middle].isWall) {
        hole2 = endRow;
    }
    //create random hole
    if(grid[startRow-1][middle].isWall && grid[endRow+1][middle].isWall) {
        hole1 = randomInt(startRow, endRow);
    }
    //check for start and end node
    if(startNode.column === middle) {
        hole3 = startNode.row;
    }
    if(endNode.column === middle) {
        hole4 = endNode.row;
    }

    createWallCol(grid, middle, startRow, endRow, hole1, hole2, hole3, hole4, nodesInOrder);

    //divide created sub cells horizontally
    //divide left cell
    divideHorizontally(grid, startRow, endRow, startCol, middle-1, nodesInOrder, startNode, endNode);

    //divide right cell
    divideHorizontally(grid, startRow, endRow, middle+1, endCol, nodesInOrder, startNode, endNode);
}

//divides a given part of grid horizontally
function divideHorizontally(grid: any, startRow: number, endRow: number, startCol: number, 
        endCol: number, nodesInOrder: any, startNode: any, endNode: any) {
    
    //check for end of recursion(only one column to divide)
    if(endRow === startRow) {
        return;
    }

    let middle = startRow + Math.floor((endRow - startRow) / 2) - 1;

    if(middle%2 === 1) {
        middle++;
    }
    
    //create Wall with hole
    let hole1 = -1;
    let hole2 = -1;
    let hole3 = -1;
    let hole4 = -1;

    //check edges
    if(!grid[middle][startCol-1].isWall) {
        hole1 = startCol;
    }
    if(!grid[middle][endCol+1].isWall) {
        hole2 = endCol;
    }
    //create random hole
    if(grid[middle][startCol-1].isWall && grid[middle][endCol+1].isWall) {
        hole1 = randomInt(startCol, endCol);
    }
    //check for start and end node
    if(startNode.row === middle) {
        hole3 = startNode.column;
    }
    if(endNode.row === middle) {
        hole4 = endNode.column;
    }

    createWallRow(grid, middle, startCol, endCol, hole1, hole2, hole3, hole4, nodesInOrder);

    //divide created sub cells vertically
    //divide top cell
    divideVertically(grid, startRow, middle-1, startCol, endCol, nodesInOrder, startNode, endNode);

    //divide bot cell
    divideVertically(grid, middle+1, endRow, startCol, endCol, nodesInOrder, startNode, endNode);
}

//creates a wall row and puts all nodes in nodesInOrder
function createWallRow(grid: any, row: number, startCol: number, endCol: number, hole1: number, hole2: number, hole3: number,
    hole4: number, nodesInOrder: any) {

    //put all nodes of given row in nodesInOrder except for hole
    for(let i = startCol; i <= endCol; i++) {
        if((i !== hole1) && (i !== hole2) && (i !== hole3) && (i !== hole4)) {
            const node = grid[row][i];
            node.isWall = true;
            node.weightForNeigh = Infinity;
            nodesInOrder.push(node);
        }
    }
}

//creates a wall column and puts all nodes in nodesInOrder
function createWallCol(grid: any, col: number, startRow: number, endRow: number, hole1: number, hole2: number, hole3: number,
    hole4: number, nodesInOrder: any) {
    
    //put all nodes of given column in nodes except for hole
    for(let i = startRow; i <= endRow; i++) {
        if((i !== hole1) && (i !== hole2) && (i !== hole3) && (i !== hole4)) {
            const node = grid[i][col];
            node.isWall = true;
            node.weightForNeigh = Infinity;
            nodesInOrder.push(node);
        }
    }
}

//returns a random integer between min and max
function randomInt(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default recursiveMaze;