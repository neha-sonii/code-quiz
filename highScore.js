let scoreBtn = document.querySelector("#view-high-score");


// rank previous score in order by retrieving score from localStorage

function printHighScore() {
    let highScore =JSON.parse(window.localStorage.getItem("highscore")) || [];

    highScore.sort(function (a, b) {
        return  b.score - a.score;
    })

    highScore.forEach(function (score) {
        let liTag =  document.createElement("li");
        liTag.textContent = score.name + "-" + score.score;
        let olEl = document.querySelector("#highscore");
        olEl.appendChild(liTag);
    });
}

// Clear previous score when user click

function clearHighScore() {
    window.localStorage.removeItem("highscore");
    window.location.reload();

}

let clear = document.getElementById("clear");
clear.onclick = clearHighScore;

printHighScore();