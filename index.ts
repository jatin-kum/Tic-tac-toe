const boxes: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".box");
const resetBtn: HTMLButtonElement | null = document.querySelector("#reset-btn");
const newGameBtn: HTMLButtonElement | null = document.querySelector("#new-btn");
const msgContainer: HTMLDivElement | null = document.querySelector(".msg-container");
const msg: HTMLParagraphElement | null = document.querySelector("#msg");

let turnO: boolean = true; //playerX, playerO
let count: number = 0; //To Track Draw

const winPatterns: number[][] = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = (): void => {
  turnO = true;
  count = 0;
  enableBoxes();
  if (msgContainer) {
    msgContainer.classList.add("hide");
  }
};

boxes.forEach((box: HTMLButtonElement) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    const isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = (): void => {
  if (msg) {
    msg.innerText = `Game was a Draw.`;
    if (msgContainer) {
      msgContainer.classList.remove("hide");
    }
    disableBoxes();
  }
};

const disableBoxes = (): void => {
  boxes.forEach((box: HTMLButtonElement) => {
    box.disabled = true;
  });
};

const enableBoxes = (): void => {
  boxes.forEach((box: HTMLButtonElement) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner: string): void => {
  if (msg) {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    if (msgContainer) {
      msgContainer.classList.remove("hide");
    }
    disableBoxes();
  }
};

const checkWinner = (): boolean => {
  for (const pattern of winPatterns) {
    const pos1Val = boxes[pattern[0]].innerText;
    const pos2Val = boxes[pattern[1]].innerText;
    const pos3Val = boxes[pattern[2]].innerText;

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
