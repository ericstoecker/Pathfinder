//creates a snail pattern in grid
function snail(grid: any) {
    const wallNodes = [];

    let node = grid[10][25];
    node.isWall = true;
    node.weightForNeigh = Infinity;
    wallNodes.push(node);

    node = grid[10][24];
    node.isWall = true;
    node.weightForNeigh = Infinity;
    wallNodes.push(node);

    let row = 10;
    let col = 23;
    for(let i = 0; i < 4; i++) {

        //go downwards
        for(let j = 0; j < 4+4*i; j++) {
            const node = grid[row][col];

            node.isWall = true;
            node.weightForNeigh = Infinity;
            wallNodes.push(node);

            row++;
        }

        //go rightwards
        for(let j = 0; j < 4+4*i; j++) {
            const node = grid[row][col];

            node.isWall = true;
            node.weightForNeigh = Infinity;
            wallNodes.push(node);

            col++;
        }

        //go upwards
        for(let j = 0; j < 6+4*i; j++) {
            const node = grid[row][col];

            node.isWall = true;
            node.weightForNeigh = Infinity;
            wallNodes.push(node);

            row--;
        }

        //go leftwars
        for(let j = 0; j < 6+4*i; j++) {
            const node = grid[row][col];

            node.isWall = true;
            node.weightForNeigh = Infinity;
            wallNodes.push(node);

            col--;
        }
    }
    return {
        wallNodes: wallNodes,
        grid: grid
    }
}

export default snail;