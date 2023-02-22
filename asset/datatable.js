$(document).ready(function() {

d_data={
"#table1": [
        ['Year', 'Honda', 'NIO', 'Li'],
        ['2017', 0, 0, 0],
        ['2018', 10, "上海", 12],
        ['2019', 20, 11, 14],
      ],
"#table2": [
         ['Year', 'BMW', 'Audi', 'Tesla'],
        ['2018', 0, 0, 0],
        ['2019', 10, 11, 12],
        ['2020', 20, 11, 14],
      ],
"#table3": [[1,2,3],[4,5,6]],
}

d_readonly={
"#table1":false,
"#table2":false,
"#table3":true,
}


for(let [index, item] of ["#table1","#table2","#table3"].entries() ){
    $(item).handsontable({
      data: d_data[item],
      width: '100%',
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      readOnly: d_readonly[item],
      licenseKey:'non-commercial-and-evaluation'
    })
}


hot1 =$("#table1").handsontable('getInstance')
hot2 =$("#table2").handsontable('getInstance')
hot3 =$("#table3").handsontable('getInstance')
hot1.addHook('afterChange', (row, amount) => {
    myjoin()
})
hot2.addHook('afterChange', (row, amount) => {
    myjoin()
})

//set color of table 1 and 2
function setColor(hot){
var rows=hot.countRows();  // get the count of the rows in the table
for(var row=0; row<rows; row++){  // go through each row of the table
        var cell = hot.getCell(row,0);
        cell.style.background = "#00FF90";
}
}

setColor(hot1)
setColor(hot2)






function myjoin(){
//get data
data1=hot1.getData()
data2=hot2.getData()
df1 = new dfd.DataFrame(data1, { columns: data1[0] })
df2 = new dfd.DataFrame(data2, { columns: data2[0] })

//join
jointype=$("#jointype").val()
console.log(jointype)
df3 = dfd.merge({ "left": df1, "right": df2, "on": ["Year"], how: jointype})
data3=dfd.toJSON(df3,{ format: 'column' })

//for some reason the column title is in the bottom, use this function to make it top
data3=[data3[data3.length-1]].concat(data3)
data3.pop()


//create table
    $("#table3").handsontable({
      data: data3,
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      readOnly: d_readonly["#table3"],
      licenseKey:'non-commercial-and-evaluation'
    })

    setColor(hot1)
    setColor(hot2)
    setColor(hot3)

 }



$('#jointype').change(function() {
    myjoin()
})


myjoin()


function downloadCSV(){
//doenst work yet
    var str = encodeURIComponent($('div[id$=table3] > .ht_master').html())
    var uri = 'data:text/csv;charset=utf-8,' + str;

    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = "joined.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


function downloadEXCEL(){
    window.open('data:application/vnd.ms-excel' + encodeURIComponent($('div[id$=table3] > .ht_master').html() )  );

}


function downloadHOT(){

}

$("#download").click(function(e) {
    //downloadEXCEL()
});


const exportPlugin = hot3.getPlugin('exportFile');
const button = document.querySelector('#download');

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
      });
    });





//guideline starts
steps = document.querySelector("#steps");
steps = ''

let wizards = [
  {
    complete: true,
    number: 1,
    title: "Verify Identity",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat pariatur minima nemo? Facilis veniam reprehenderit quaerat aspernatur, quis voluptas voluptate."
  },
  {
    complete: false,
    number: 2,
    title: "Create Account",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat pariatur minima nemo? Facilis veniam reprehenderit quaerat aspernatur, quis voluptas voluptate."
  },
    {
    complete: false,
    number: 3,
    title: "Login",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat pariatur minima nemo? Facilis veniam reprehenderit quaerat aspernatur, quis voluptas voluptate."
  },
];

let tickIcon = `<svg viewBox="0 0 512 512" width="100" title="check">
        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />`;

steps.innerHTML = wizards
  .map(function (wizard) {
    return (
      `<div class='step'>` +
      `<div class='number ${wizard.complete && 'completed'}'>` +
      (wizard.complete ? tickIcon : wizard.number) +
      `</div>` +
      `<div class='info'>` +
      `<p class='title'>${wizard.title}</p>` +
      `<p class='text'>${wizard.text}</p>` +
      "</div>" +
      "</div>"
    );
  })
  .join("");







})