
/* Written By: Nolan Miller */

const button = document.querySelector("button");
const showResult = document.querySelector(".results");

const showAttemptsButton = document.querySelector("#show-attempts");
const attemptView = document.querySelector("#display-attempts");
const attempts = [];

const statsView = document.querySelector("#display-stats");
const showStatsButton = document.querySelector("#show-stats");
const stats = {'#15d715':0, '#3076f8':0,'yellow':0,'red':0};

const timeToHit = 3; // configure this variable for time that you are trying to hit

let startTime = null;
let endTime = null;
let color = 'white';


// handles timer button
let attempt_number = 1;
button.addEventListener("click", () => {


    if (startTime) {
        endTime = Math.round(Date.now());
        console.log("end - " + endTime);

        let result = Math.abs((endTime - startTime) / 1000);

        let check = (Math.abs(timeToHit - result));
        if (check <= 0.095) {
            color = '#15d715';
        }
        else if (Math.abs(3 - result) <= 0.2) {
            color = '#3076f8';

        }
        else if (Math.abs(3 - result) <= 0.5) {
            color = 'yellow';

        }
        else {
            color = 'red';

        }

        stats[color] += 1;

        attempts.push(result);

        showResult.innerText = result;
        showResult.style.backgroundColor = color;

        startTime = null;
        endTime = null;

        button.classList.remove("stop");
        button.classList.add("start");
        button.innerText = "Start";


    }
    else {
        startTime = Math.round(Date.now());
        console.log("start - " + startTime);

        button.classList.remove("start");
        button.classList.add("stop");
        button.innerText = "Stop";

    }

});

// handle button that shows attempts
showAttemptsButton.addEventListener("click", () => {
    attemptView.innerHTML = null;
    for (let i = 0; i < attempts.length; i++) {
        //console.log(attempts[i]['result']);
        attemptView.innerHTML += `<h4>Attempt ${i+1}:</h4> ${attempts[i]} </br>`;

    }

});


// handle button that shows statistics
showStatsButton.addEventListener("click", () => {
    statsView.innerHTML = null;
    let avgAttempts = (attempts.reduce((x, y) => x + y)) / attempts.length;

    statsView.innerHTML +=
        `<h4>Number of attempts: ${attempts.length}</h4> </br>
         <h4>Lowest Guess:</h4> ${Math.min(...attempts)} </br>
         <h4>Highest Guess:</h4> ${Math.max(...attempts)} </br>
         <h4>Average Time:</h4> ${Number.parseFloat(avgAttempts).toFixed(3)} </br>
         <canvas id="chartId" height="175" width="290"></canvas> </br>
         <p style="font-size: 10px">*Click button again to refresh chart</p>`;


    // code for chart
    var chrt = document.getElementById("chartId").getContext("2d");
    var chartId = new Chart(chrt, {
        type: 'pie',
        data: {
            labels: ["~0.5", "~0.2", "~0.95", "else"],
            datasets: [{
                data: [stats['yellow'],
                    stats['#3076f8'],
                    stats['#15d715'],
                    stats['red']],
                backgroundColor: ['yellow', '#3076f8', '#15d715','red'],
                hoverOffset: 5
            }],
        },
        options: {
            responsive: false,
        },
    });

});



