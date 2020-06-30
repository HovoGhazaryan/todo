document.addEventListener('DOMContentLoaded', () => { toDoStyles(); });
renderMain();
const main = document.querySelector('#container');
const input = document.querySelector('.input');
const output = document.querySelector('.output');
const textInput = input.children[0].children[0];
const addButton = input.children[0].children[1];
let a;

/* Creating DOM concepts */
function renderMain() {
    const container = document.createElement('div');
    container.id = 'container';
    container.innerHTML = `<div style="
    display: flex; 
    justify-content: center; 
    width: 375px; 
    height: 667px; 
    background: linear-gradient(blue,skyblue); 
    border-radius: 15px;">
        <div class="input">
            <div><input type=text>
                <button onclick="toDo()">Add</button>
            </div>
        </div>
        <div class="output"></div>
    </div>`;
    document.body.appendChild(container);
}

/* Adding styles */
function toDoStyles() {
    document.body.style.margin = '0 auto';
    main.setAttribute('style', `display:flex; justify-content:center; width:100%;`);
    input.setAttribute('style', `display:flex; justify-content:center;`);
    /* Input Field Styles */
    textInput.setAttribute('style', `
        margin-top: 20px; 
        -webkit-appearance: none; 
        border: 2px solid white; 
        border-radius: 10px; 
        width: 250px; 
        height: 30px; 
        font-size: 20px;`
    );
    /* 'Add' Button Styles */
    addButton.setAttribute('style', `
        display: block; 
        margin-top: 20px; 
        margin-left: 20%; 
        cursor: pointer; 
        -webkit-appearance: none; 
        border: 2px solid white; 
        border-radius: 10px; 
        width: 150px; 
        height: 30px; 
        font-size: 20px; 
        outline: none; 
        font-family: Courier, Impact; 
        font-weight: bold;`
    );
    /* Change styles when mouse button hold pressed*/
    addButton.onmousedown = () => addButton.setAttribute('style', `
        display: block; 
        margin-top: 20px; 
        margin-left: 20%; 
        cursor: pointer; 
        -webkit-appearance: none; 
        border: 2px solid white; 
        border-radius: 10px; 
        width: 150px; 
        height: 30px; 
        font-size: 20px; 
        outline: none; 
        font-family: Courier, Impact; 
        font-weight: bold; 
        background: #1C3144; 
        color: white;`
    );
    /* Change styles to default when mouse button don't pressed */
    addButton.onmouseup = () => addButton.setAttribute('style', `
        display: block; 
        margin-top: 20px; 
        margin-left: 20%; 
        cursor: pointer; 
        -webkit-appearance: none; 
        border: 2px solid white; 
        border-radius: 10px; 
        width: 150px; 
        height: 30px; 
        font-size: 20px; 
        outline: none; 
        font-family: Courier, Impact; 
        font-weight: bold; 
        color: black;`
    );
    /* Results Block Styles */
    output.setAttribute('style', `
        position: absolute; 
        overflow: auto; 
        width: 350px; 
        height: 490px; 
        top: 15%; 
        border-radius: 15px; 
        background: white;`
    );
    if (document.body.clientWidth <= 768) main.children[0].style.width = '100%';
    else main.children[0].style.width = '375px';
    window.addEventListener('resize', function () {
        if (document.body.clientWidth <= 768) main.children[0].style.width = '100%';
        else main.children[0].style.width = '375px';
    });
}

/* ToDo Logic */
function toDo() {
    const input = document.querySelector('.input');
    const textInput = input.children[0].children[0];
    if (textInput.value) {
        const quest = document.createElement('div');
        quest.innerHTML = `<div style='word-break:break-all;'>${textInput.value}</div>`;
        quest.setAttribute('style', `
            margin: 10px 0 10px 10px;
            font-size: 20px;
            padding: 5px; 
            background: #006aff; 
            color: white;
            cursor: pointer;
            border-radius: 10px;
            width: 90%;`
        );
        const close = document.createElement('span');
        close.innerHTML = '&times;';
        close.setAttribute('style', `
            color: white;
            width: 10%;
            font-size: 25px;
            background: #eb4034;
            left: 85%;
            cursor: pointer;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            top: 2%;
            text-align: center;`
        );
        quest.addEventListener('click', function () { this.style.textDecoration = 'line-through #eb4034'; save(); });
        output.append(quest, close);
        save();

        close.addEventListener('mouseover', function () { this.style.display = 'block'; save();});
        close.addEventListener('mouseleave', function () { this.style.display = 'unset'; save();});
        close.addEventListener('click', function () {
            this.parentNode.removeChild(this.previousSibling);
            this.parentNode.removeChild(this);
            save();
        });
    }
}

/* Save data from ToDo list to localstorage */
function save() {
    try {
        a = output.innerHTML;
        localStorage.setItem('quests', a);
    } catch (e) {
        if (e===QuotaExceededError) {
            localStorage.removeItem(localStorage.length-1);
        }
    }
}

/* Get items from localstorage and show they */
if (localStorage.getItem('quests')) {
    output.innerHTML = localStorage.getItem('quests');
    for(let i=0; i<output.children.length; ++i){
        if(output.children[i].tagName=='SPAN') {
            output.children[i].addEventListener('mouseover', function () { this.style.display = 'block'; save(); });
            output.children[i].addEventListener('mouseleave', function () { this.style.display = 'unset'; save(); });
            output.children[i].addEventListener('click', function () {
                this.parentNode.removeChild(this.previousSibling);
                this.parentNode.removeChild(this);
                save();
            });
        } else {
            output.children[i].addEventListener('click', function () { this.style.textDecoration = 'line-through #eb4034'; save(); });
        }
    }
}