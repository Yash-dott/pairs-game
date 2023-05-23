let game_board = document.querySelector(".game_board");
let current_score = document.querySelector(".current_score")
let high_score = document.querySelector(".high_score")
let items = [
    { id: 1, itemName: "airplane", imageName: "airplane" },
    { id: 2, itemName: "apple", imageName: "apple" },
    { id: 3, itemName: "balloon", imageName: "balloon" },
    { id: 4, itemName: "cake", imageName: "cake" },
    { id: 5, itemName: "ice-cream", imageName: "ice-cream" },
    { id: 6, itemName: "jerry", imageName: "jerry" },
    { id: 7, itemName: "jerry", imageName: "noodles" },
    { id: 8, itemName: "pan-cake", imageName: "pan-cake" },
    { id: 9, itemName: "pizza", imageName: "pizza" },
    { id: 10, itemName: "spider", imageName: "spider" },
    { id: 11, itemName: "tom", imageName: "tom" }
];
let arr = [];
let finalArray = [];
let currentClicks = 0;
let clickedCardDataIndex = [];
let prevClickedElem;
let currentClickedElem;
let score = 0;
let is_Processing = false;
let localStorageData

matchCardData = (currentClickedElem) => {

    is_Processing = true
    let clickedCardData = [];

    for (let i = 0; i < clickedCardDataIndex.length; i++) {
        clickedCardData.push(finalArray[clickedCardDataIndex[i]].itemName);
    };
    clickedCardDataIndex = [];

    if (clickedCardData[0] === clickedCardData[1]) {
        current_score.innerText = `Score: ${++score}`;
        is_Processing = false
        localStorage.setItem('highScore', localStorageData < current_score ? current_score : localStorageData);
    } else {
        setTimeout(() => {
            currentClickedElem.childNodes[1].classList.remove("show");
            prevClickedElem.childNodes[1].classList.remove("show");
            is_Processing = false
        }, 600)
    };
}

itemClicked = (elem, index) => {
    if (!is_Processing && !elem.childNodes[1].classList.contains("show")) {

        clickedCardDataIndex.push(index);
        if (currentClicks >= 1) {
            currentClicks = 0;
            matchCardData(elem)
        } else {
            prevClickedElem = elem;
            currentClicks++;
        };
        elem.childNodes[1].classList.add("show");
    }
};

createGameBoard = () => {

    for (let i = 0; i < 36; i++) {

        let html = `    <div class="item" onclick='itemClicked(this,${i})'>
                    <div class="inner">
                    <div class="back">
                        <img src='/assets/image/${finalArray[i].imageName}.jpg' alt="">
                    </div>
                    <div class="front">
                        <img src="/assets/image/texture.jpg" alt="">
                    </div>
                </div>
            </div>`;
        game_board.insertAdjacentHTML("beforeend", html);
    };
};


createFinalArray = () => {
    for (let i = 0; i < 36; i++) {
        let randomIndex = parseInt(Math.random() * arr.length);
        finalArray.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    };
    createGameBoard();
};

createItemArray = () => {
    for (let i = 0; i < 18; i++) {
        let randomIndex = parseInt(Math.random() * items.length);
        for (let j = 0; j < 2; j++) {
            arr.push(items[randomIndex]);
        };
    };
    createFinalArray();
};



window.addEventListener("load", () => {
    createItemArray();
    localStorageData = localStorage.getItem('highScore');
    !localStorageData ? localStorage.setItem('highScore', 0) : null; 
    high_score.innerText = `High score: ${ localStorageData ?  localStorageData : 0}`;
});