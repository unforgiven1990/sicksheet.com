function exampletool(){
return  {
"#table1": [
        ['List'],
        ['Max, Bob,Lisa, Kevin, James'],
        ['Max,Bob,Lisa,Kevin,James'],
    ]
}
}

function tool() {
    data=hot1.getData()
    result=[]

    countRows = hot1.countRows()
    countCols = hot1.countCols()

    for (var i = 0; i < countRows; i++) {
      result[i] = new Array(countCols);
    }

    for (var i = 0; i < countRows; i++) {
        for (var j = 0; j < countCols; j++) {
            try{
                //dont add comma if comma already there
                //todo add space after point, x or what ever functions
                //todo add space before point, x, or whatever signs
                //remove space after xxx
                //remove space before xxx
                //basically regular expression unfolded
                //String functions = [add,remove,replace] X [space,comma,etc] [Before,after] [space,comma, etc]
                //String functions = [get until] X [space,comma,etc] [Before,after] [space,comma, etc]
                result[i][j] = s=String(data[i][j]).replaceAll(", ",",").replaceAll(",",", ")
            }catch{
                result[i][j] = data[i][j]
            }
        }
    }
    datawithcol = result
    data_to_hot("#table2",datawithcol)
}



//init function
function init() {
    listener_table([hot1])
    tool()
}