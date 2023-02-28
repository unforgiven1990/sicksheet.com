$(document).ready(function() {
    d_data={
        "#table1": [
            ['Name', 'Age','Car Brand'],
            ['Ali', "20","NIO"],
            ['Max', "33","Tesla"],
            ['James', "27","BMW"],
            ['Jane', "25","Mercedes"],
          ],
        "#table2": [
            []
          ],
    }

    d_readonly={
        "#table1":false,
        "#table2":false,
    }

    function init(data){
        return {
              data: data,
              rowHeaders: true,
              colHeaders: true,
              contextMenu: true,
              readOnly: false,
              renderAllRows: false,
              manualRowMove: true,
              manualColumnMove: true,
              colWidths: 100,
              width: '100%',
              height: 150,
              viewportColumnRenderingOffset:5,
              viewportRowRenderingOffset:5,
              licenseKey:'non-commercial-and-evaluation'
            }
    }

    for(let [index, item] of ["#table1","#table2"].entries() ){
        $(item).handsontable(init(data=d_data[item]))
    }


    function mytranspose(){
        //get data
        data1=hot1.getData()

        //do with data-forge-ts
        df1 = new dfjs.DataFrame(data1, data1[0])
        df2=df1.transpose()
        datawithcol=[].concat(df2.toArray())

        //create table
        $("#table2").handsontable(init(data=datawithcol))
        hot2 =$("#table2").handsontable('getInstance')
        hot2.updateSettings({
        //readOnly: true, // make table cells read-only
        editor: false
        });

        //add little highlight to indicate the swapped result
        setColorColumn(hot1,color1  )
        setColorIndex(hot2,color1  )
    }


    //init function
    hot1 =$("#table1").handsontable('getInstance')
    hot2 =$("#table2").handsontable('getInstance')

    hot1.addHook('afterChange', (row, amount) => {
        myjoin()
    })

    //set color of table 1 and 2
    function setColorIndex(hot, color="#fff"){
        var rows=hot.countRows();  // get the count of the rows in the table
        for(var row=0; row<rows; row++){  // go through each row of the table
                var cell = hot.getCell(row,0);
                cell.style.background = color;
        }
    }

    function setColorColumn(hot, color="#fff"){
        var cols=hot.countCols();  // get the count of the rows in the table
        for(var col=0; col<cols; col++){  // go through each row of the table
                var cell = hot.getCell(0,col);
                console.log(col)
                cell.style.background = color;
        }
    }


    $(".mytooltip").tooltip()
    mytranspose()


    //setup download button
    const exportPlugin = hot2.getPlugin('exportFile')
    const button = document.querySelector('#download')
    button.addEventListener('click', () => {
        exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: false,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: $("#jointype option:selected").text()+'_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv;charset=utf-8,',
        rowDelimiter: '\r\n',
        rowHeaders: true
        })
    })

})