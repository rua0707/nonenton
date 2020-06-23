const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1")

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${
                            minutes < 10? `0${minutes}` : minutes} : ${
                            seconds < 10 ? `0${seconds}` : seconds}`; // ?는 if 처럼 동작한다. seconds가 10보다 작으면(?) 앞에 0을 붙히고 출력하고 아니면(:) 그래도 출력

}

function init() {
    getTime();
    setInterval(getTime, 1000); // 처음인자는 함수, 두번째인자는 초(밀리초): 설정한 시간 간격으로 함수를 작동시킨다.
}
init();