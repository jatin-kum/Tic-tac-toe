var boxes = document.querySelectorAll(".box");
var resetBtn = document.querySelector("#reset-btn");
var newGameBtn = document.querySelector("#new-btn");
var msgContainer = document.querySelector(".msg-container");
var msg = document.querySelector("#msg");
var turnO = true; //playerX, playerO
var count = 0; //To Track Draw
var winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
var resetGame = function () {
    turnO = true;
    count = 0;
    enableBoxes();
    if (msgContainer) {
        msgContainer.classList.add("hide");
    }
};
boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        if (turnO) {
            //playerO
            box.innerText = "O";
            turnO = false;
        }
        else {
            //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        var isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
var gameDraw = function () {
    if (msg) {
        msg.innerText = "Game was a Draw.";
        if (msgContainer) {
            msgContainer.classList.remove("hide");
        }
        disableBoxes();
    }
};
var disableBoxes = function () {
    boxes.forEach(function (box) {
        box.disabled = true;
    });
};
var enableBoxes = function () {
    boxes.forEach(function (box) {
        box.disabled = false;
        box.innerText = "";
    });
};
var showWinner = function (winner) {
    if (msg) {
        msg.innerText = "Congratulations, Winner is ".concat(winner);
        if (msgContainer) {
            msgContainer.classList.remove("hide");
        }
        disableBoxes();
    }
};
var checkWinner = function () {
    for (var _i = 0, winPatterns_1 = winPatterns; _i < winPatterns_1.length; _i++) {
        var pattern = winPatterns_1[_i];
        var pos1Val = boxes[pattern[0]].innerText;
        var pos2Val = boxes[pattern[1]].innerText;
        var pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};
if (newGameBtn) {
    newGameBtn.addEventListener("click", resetGame);
}
if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
}
