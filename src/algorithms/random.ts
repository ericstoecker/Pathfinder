
function random(grid: any, startNode: any, endNode: any) {
    const wallNodes = [];

    //for every row in grid
    for(let i = 0; i < grid.length; i++) {
        const randomNodes = [];

        //pick 20 random columns(can be duplicates)
        for(let k = 0; k < 20; k++) {
            const col = randomInt(0, grid[i].length-1);

            randomNodes.push(col);
        }

        //create wall nodes
        for(let j = 0; j < randomNodes.length; j++) {
            const col = randomNodes[j];
            const node = grid[i][col];

            if(!(((node.row === startNode.row) && (node.column === startNode.column)) ||
                ((node.row === endNode.row) && (node.column === endNode.column)) )) {
                node.isWall = true;
                node.weightForNeigh = Infinity;
                wallNodes.push(node);
            }
        }
    }
    return {
        wallNodes: wallNodes,
        grid: grid
    }
}

//returns a random integer between min and max
function randomInt(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default random;