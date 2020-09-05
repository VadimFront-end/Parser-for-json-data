let stringFile='';
function showFile(input) {
    let file = input.files[0];
    let reader=new FileReader();
    reader.readAsText(file);
    reader.onload=function() {
        document.getElementById('file').style.display='none';
        stringFile=reader.result;
        personsData=JSON.parse(stringFile);
        for(let i=0;i<personsData.length;i++) {
            createTable(personsData[i]);
        };
    };
}

//функция создания таблицы
function createTable(person) {
    let newLine=document.createElement('tr');
    for(data in person) {
        switch(data) {
            case 'name' : {
                let elem=document.createElement('td');
                elem.innerHTML=person[data].firstName;
                newLine.appendChild(elem);
                elem=document.createElement('td');
                elem.innerHTML=person[data].lastName;
                newLine.appendChild(elem);
                break;
            }
            case 'about' : {
                let elem=document.createElement('td');
                elem.innerHTML=person[data];
                elem.className='about';
                newLine.appendChild(elem);
                break;
            }
            case 'eyeColor' : {
                let elem=document.createElement('td');
                elem.innerHTML=person[data];
                elem.style.backgroundColor=person[data];
                newLine.appendChild(elem);
                break;
            }
        }
    }
    document.getElementById('table').appendChild(newLine);
}

//функция сортировки строк таблицы(по алфавиту)
function sort(num) {
    let trArray=document.getElementById('table');
    let i=trArray.rows.length-1;
    while(i) {
        for(let j=1;j<i;j++) {
            if(trArray.rows[j].cells[num].innerHTML.toLowerCase()>trArray.rows[j+1].cells[num].innerHTML.toLowerCase()) {
                let tmp=trArray.rows[j].innerHTML;
                trArray.rows[j].innerHTML=trArray.rows[j+1].innerHTML;
                trArray.rows[j+1].innerHTML=tmp;
            }
        }
        i--;
    }
    document.getElementById('content').removeChild(document.getElementById('table'));
    let newTable=document.createElement('table').appendChild(trArray);
    document.getElementById('content').appendChild(newTable);
}

//функиция для скрытия выбранной колонки
function hide(num) {
    let trArray=document.getElementById('table');
    for(let j=1;j<trArray.rows.length-1;j++)
        if(trArray.rows[j].cells[num].style.visibility==='hidden')trArray.rows[j].cells[num].style.visibility='visible';
        else trArray.rows[j].cells[num].style.visibility='hidden';
}
//переменные, в которые буду записывать координаты ячейки, на котрую кликнули
let numCol=null;
let numRow=null;
//функция изменения ячейки, на которую кликнул пользователь
function edit() {
    document.getElementById('table').rows[numRow].cells[numCol].innerHTML=document.getElementById('input').value;
    if(numCol===3)document.getElementById('table').rows[numRow].cells[numCol].style.backgroundColor=document.getElementById('input').value;
    if(numCol===2)document.getElementById('table').rows[numRow].cells[numCol].className='about';
    document.getElementById('input').style.value='';
    document.getElementById('edit').style.display='none';
}

//функция для отследивания и определения ячейки при клике по таблице
document.querySelector('table').onclick = (event) => {
  let cell = event.target;
  if (cell.tagName.toLowerCase() != 'td')
    return;
  let i = cell.parentNode.rowIndex;
  let j = cell.cellIndex;
  numCol=j;
  numRow=i;
  document.getElementById('edit').style.display='block';
}
