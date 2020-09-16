
function stair(grid: any, startNode: any, endNode: any) {
    const wallNodes = [];

    let col = 3;
    //iterate through rows
    //upstairs
    for(let i = grid.length-1; i >= 2; i--) {
        const node = grid[i][col];

        node.isWall = true;
        node.weightForNeigh = Infinity;
        wallNodes.push(node);

        //next column
        col++;
    }

    //downstairs
    for(let i = 3; i <= 19; i++) {
        const node = grid[i][col];

        node.isWall = true;
        node.weightForNeigh = Infinity;
        wallNodes.push(node);

        //next column
        col++;
    }

    //upstairs
    for(let i = 18; i >= 6; i--) {
        const node = grid[i][col];

        node.isWall = true;
        node.weightForNeigh = Infinity;
        wallNodes.push(node);

        //next column
        col++;
    }

    return {
        wallNodes: wallNodes,
        grid: grid
    }
}

export default stair;