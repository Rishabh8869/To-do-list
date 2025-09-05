// save entire list to local storage
function savelist(){
    let itemsarray = [];
    let list = document.querySelectorAll('#items .list')
    list.forEach(function(item){
        itemsarray.push(item.textContent.replace('X',' ').trim());
    });

    localStorage.setItem('items', JSON.stringify(itemsarray));
}


// function to load list from local storage
function loadlist(){
    let items = JSON.parse(localStorage.getItem('items'));
    if(items){
        items.forEach(function(item){
            addtext(item);
        });
    }
}
document.addEventListener('DOMcontentLoaded' , loadlist());

let submit = document.querySelector('input[type="submit"]');
submit.addEventListener('click' , additem);

function addtext(newtext){
    if(newtext != ''){
        let newitem = document.createElement('li');
        newitem.className = "list";
        newitem.appendChild(document.createTextNode(newtext));
        
        let newbutton = document.createElement('button');
        newbutton.className = "delete";
        newbutton.appendChild(document.createTextNode('X'));
    
        newitem.appendChild(newbutton);
    
        let list = document.getElementById('items');
    
        list.appendChild(newitem);
        savelist();
    }  
}
function additem(e){
    e.preventDefault();
    let input = document.getElementById('item');
    let newtext = input.value;
    console.log(newtext);
    addtext(newtext);
    input.value = '';
}

let dellist = document.getElementById('items');
dellist.addEventListener('click' , deleteitem);

function deleteitem(e){
    if(e.target.classList.contains('delete')){
        let conf = confirm("Do you really want to delete this task");
        if(conf){
            let delli = e.target.parentNode;
            dellist.removeChild(delli);
            savelist();
        }
    }
}

let search = document.getElementById('filter');
search.addEventListener('keyup' , searchitem);

function searchitem(e){
    let searchtext = e.target.value.toLowerCase();
    let list = document.getElementsByClassName('list');

    Array.from(list).forEach(function(item){
        let itemname = item.firstChild.textContent;
        if(itemname.toLowerCase().indexOf(searchtext) != -1){
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    });
}
