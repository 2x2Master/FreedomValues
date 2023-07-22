var max_state, max_social, max_econ, max_spend, max_land, max_nation, max_mil, max_leader, max_appli // Max possible scores
max_state = max_social = max_econ = max_spend = max_land = max_nation = max_mil = max_leader = max_appli = 0;
var state, social, econ, spend, land, nation, mil, leader, appli // User's scores
state = social = econ = spend = land = nation = mil = leader = appli = 0;
var qn = 0; // Question number
var prev_answer = null;
fetch("JSON/questions.json")
    .then(response => response.json())
    .then(data => load_questions(data))

function load_questions(data) {
    questions = data
    for (var i = 0; i < questions.length; i++) {
        max_state += Math.abs(questions[i].effect.state)
        max_social += Math.abs(questions[i].effect.social)
        max_econ += Math.abs(questions[i].effect.econ)
        max_spend += Math.abs(questions[i].effect.spend)
        max_land += Math.abs(questions[i].effect.land)
        max_nation += Math.abs(questions[i].effect.nation)
        max_mil += Math.abs(questions[i].effect.mil)
        max_leader += Math.abs(questions[i].effect.leader)
        max_appli += Math.abs(questions[i].effect.appli)
    }
    init_question();
}

function init_question() {
    document.getElementById("question-text").innerHTML = questions[qn].question;
    document.getElementById("question-number").innerHTML = "Question " + (qn + 1) + " of " + (questions.length);
    if (prev_answer == null) {
        document.getElementById("back_button").style.display = 'none';
        document.getElementById("back_button_off").style.display = 'block';
    } else {
        document.getElementById("back_button").style.display = 'block';
        document.getElementById("back_button_off").style.display = 'none';
    }

}

function next_question(mult) {
    state += mult*questions[qn].effect.state
    social += mult*questions[qn].effect.social
    econ += mult*questions[qn].effect.econ
    spend += mult*questions[qn].effect.spend
    land += mult*questions[qn].effect.land
    nation += mult*questions[qn].effect.nation
    mil += mult*questions[qn].effect.mil
    leader += mult*questions[qn].effect.leader
    appli += mult*questions[qn].effect.appli
    qn++;
    prev_answer = mult;
    if (qn < questions.length) {
        init_question();
    } else {
        results();
    }
}
function prev_question() {
    if (prev_answer == null) {
        return;
    }
    qn--;
    state -= prev_answer * questions[qn].effect.state;
    social -= prev_answer * questions[qn].effect.social;
    econ -= prev_answer * questions[qn].effect.econ;
    spend -= prev_answer * questions[qn].effect.spend;
    land -= prev_answer * questions[qn].effect.land;
    nation -= prev_answer * questions[qn].effect.nation;
    mil -= prev_answer * questions[qn].effect.mil;
    leader -= prev_answer * questions[qn].effect.leader;
    appli -= prev_answer * questions[qn].effect.appli;
    prev_answer = null;
    init_question();

}
function calc_score(score,max) {
    return (100*(max+score)/(2*max)).toFixed(1)
}
function results() {
    location.href = `results.html`
        + `?r=${calc_score(radi,max_state)}`
        + `&e=${calc_score(econ,max_social)}`
        + `&s=${calc_score(stte,max_econ)}`
        + `&n=${calc_score(natn,max_spend)}`
        + `&c=${calc_score(conv,max_land)}`
        + `&e=${calc_score(econ,max_nation)}`
        + `&s=${calc_score(stte,max_mil)}`
        + `&n=${calc_score(natn,max_leader)}`
        + `&c=${calc_score(conv,max_appli)}`
}
