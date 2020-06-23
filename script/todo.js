const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo) {
    return toDo.id === 1;
}

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) { // filter는 배열에 모든 요소에 함수를 적용하고 True인 요소를 모아 새로운 배열을 만든다.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li"); // 빈 li 생성
    const delBtn = document.createElement("button"); // 버튼 생성
    const span = document.createElement("span"); // span 생성
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span); // span을 li에 넣음
    li.appendChild(delBtn); // delBtn을 li에 넣음
    li.id = newId;
    toDoList.appendChild(li); // li를 ul에 넣음
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; // 제출한 뒤 input칸을 초기화 시킨다.
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // parse는 JS Object를 Sting로 변환
        parsedToDos.forEach(function(toDo) { // forEach는 배열에 담겨있는 것들 각각에 한번씩 함수를 실행시켜준다.
            paintToDo(toDo.text);
        });
    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();