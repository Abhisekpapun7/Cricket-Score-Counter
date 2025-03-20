let team1, team2, battingTeam, bowlingTeam, bowler = "Bowler 1";
let runs = 0, wickets = 0, totalOvers, ballsBowled = 0, ballsInOver = 0;
let isFirstInnings = true;
let firstInningsScore = 0;

function setupTeams() {
    team1 = document.getElementById("team1").value;
    team2 = document.getElementById("team2").value;
    totalOvers = document.getElementById("overs").value;
    if (!team1 || !team2 || !totalOvers) {
        alert("Please enter all match details.");
        return;
    }
    battingTeam = team1;
    bowlingTeam = team2;
    document.getElementById("setupScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("team-names").innerText = battingTeam + " vs " + bowlingTeam;
    document.getElementById("runs").innerText = runs;
    document.getElementById("wickets").innerText = wickets;
    document.getElementById("batsman").innerText = "Player " + (wickets + 1);
    document.getElementById("bowler").innerText = bowler;
    document.getElementById("total-overs").innerText = totalOvers;
    document.getElementById("remaining-overs").innerText = (totalOvers * 6 - ballsBowled) / 6;
    document.getElementById("target").innerText = isFirstInnings ? "--" : firstInningsScore + 1;
    document.getElementById("balls-count").innerText = ballsInOver;
}

function addRuns(value) {
    if (wickets < 10) {
        runs += value;
        ballsBowled++;
        ballsInOver++;
        checkOver();
        checkGameStatus();
        updateDisplay();
    }
}

function addExtra(value, type) {
    if (wickets < 10) {
        runs += value;
        alert(type + "! Extra run added.");
        updateDisplay();
    }
}

function addWicket() {
    if (wickets < 10) {
        wickets++;
        ballsBowled++;
        ballsInOver++;
        checkOver();
        checkGameStatus();
        updateDisplay();
    }
}

function checkOver() {
    if (ballsInOver === 6) {
        ballsInOver = 0;
        alert("Over Completed!");
    }
}

function checkGameStatus() {
    if (isFirstInnings && (wickets === 10 || ballsBowled >= totalOvers * 6)) {
        firstInningsScore = runs;
        runs = 0;
        wickets = 0;
        ballsBowled = 0;
        ballsInOver = 0;
        isFirstInnings = false;
        alert(bowlingTeam + " will now bat. Target: " + (firstInningsScore + 1));
        [battingTeam, bowlingTeam] = [bowlingTeam, battingTeam];
    } else if (!isFirstInnings) {
        if (runs > firstInningsScore) {
            alert(battingTeam + " wins!");
            disableButtons();
        } else if (ballsBowled >= totalOvers * 6 || wickets === 10) {
            alert(bowlingTeam + " wins!");
            disableButtons();
        }
    }
}

function disableButtons() {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}