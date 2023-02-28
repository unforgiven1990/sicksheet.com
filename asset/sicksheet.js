//set color of table 1 and 2
function setColorIndex(hot, color="#fff",rowindex=0){
    var rows=hot.countRows();  // get the count of the rows in the table
    for(var row=0; row<rows; row++){  // go through each row of the table
            var cell = hot.getCell(row,rowindex);
            cell.style.background = color;
    }
}

function setColorColumn(hot, color="#fff",colindex=0){
    console.log(hot,color,colindex)
    var cols=hot.countCols();  // get the count of the rows in the table
    for(var col=0; col<cols; col++){  // go through each row of the table
            var cell = hot.getCell(colindex,col);
            cell.style.background = color;
    }
}