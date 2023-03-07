function tool() {
    df=hot_to_dataframe(hot1,col=true)
    result=[[],[]]
    delimiter=$('#delimiter').val()
    space=$('#space').val()
    data=hot1.getData()
    maxrow=hot1.countRows()
    maxcol=hot1.countCols()
    transposed = data[0].map((_, colIndex) => data.map(row => row[colIndex]))
    for (i=0; i<maxrow; i++) {
        result[i]=new Array(maxcol)
    }

    //$.each(df.listColumns(), function(counter, val) {
    for (i=0; i<maxrow; i++) {
        for (j=0; j<maxcol; j++) {
            //join text from the previous columns together
            try{
                subarray=transposed[j].slice(0,i+1)
                result[i][j]=subarray.join(delimiter+space)
            }catch{

            }

        }
    }

    datawithcol = result
    data_to_hot("#table2",datawithcol)
}

function init() {
    listener_table([hot1])
    listener_configure(["#delimiter","#space"])
    //todo add vertical and horizontal option

     $('#delimiter').html("")
    $('#delimiter').append('<option value=",">Separated by Comma ,</option>')
    $('#delimiter').append('<option value="; ">Separated by Semicolon ;</option>')
    $('#delimiter').append('<option value="-">Separated by Minus Sign -</option>')
    $('#delimiter').append('<option value="+">Separated by Minus Plus +</option>')
    $('#delimiter').append('<option value="_">Separated by Underscore _</option>')
    $('#delimiter').append('<option value="*">Separated by Star *</option>')
    $('#delimiter').append('<option value=".">Separated by Dot .</option>')
    $('#delimiter').append('<option value="·">Separated by Interpunct ·</option>')
    $('#delimiter').append('<option value=" ">Separated by Space </option>')
    $('#delimiter').append('<option value="  ">Separated by Tab   </option>')
    $('#delimiter').append('<option value="\n">Separated by New Line</option>')

    $('#space').append('<option value=" ">Include Space</option>')
    $('#space').append('<option value="">Exclude Space</option>')
    tool()
}