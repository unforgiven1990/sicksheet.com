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

    function initiate_sortoptions(){
        data1=hot1.getData()
        columns=data1[0]
            $('#sortcol').html("")

        $.each(columns, function(index, val) {
            $('#sortcol').append('<option value="'+val+'">'+val+'</option>')
        })
    }


    function mysort(){
        //get data
        data1=hot1.getData()
        sortcol=$("#sortcol option:selected").val()
        asc=$("#asc option:selected").val()
        asc = (asc === 'true');
        colheader1=data1[0]
        data1.shift()

        //do with data-forge-ts
        df1 = new dfjs.DataFrame(data1, colheader1)
        df2=df1.sortBy(sortcol,asc)
        datawithcol=[df2.listColumns()].concat(df2.toArray())


        //create table
        $("#table2").handsontable(init(data=datawithcol))
        hot2 =$("#table2").handsontable('getInstance')
        hot2.updateSettings({
        //readOnly: true, // make table cells read-only
        editor: false
        });

        //add little highlight to indicate the swapped result
        //todo
        colindex=colheader1.indexOf(sortcol)
        console.log(colindex)
        setColorIndex(hot2,color1,colindex)
    }


    //init function
    hot1 =$("#table1").handsontable('getInstance')
    hot2 =$("#table2").handsontable('getInstance')

    hot1.addHook('afterChange', (row, amount) => {
        initiate_sortoptions()
        mysort()
    })



    $('#sortcol').change(function() {
        mysort()
    })

    $('#asc').change(function() {
        mysort()
    })

    $(".mytooltip").tooltip()
    initiate_sortoptions()
    $("#sortcol").val("Age")
    $("#sortcol").trigger("change")


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