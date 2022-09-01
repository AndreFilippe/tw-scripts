// ==UserScript==
// @name         Continuos Recruting
// @version      0.2
// @description
// @author       André Filippe dos Santos
// @match https://*/*screen=train*
// @match https://*/*screen=stable*
// @match https://*/*screen=barracks*
// @match https://*/*screen=garage*
// @require https://code.jquery.com/jquery-2.2.4.min.js
// @run-at document-end
// ==/UserScript==

"use strict";

//Basic scripts
function isRecaptchaWindowPresent() {
    var isPresent = false;
    if (document.querySelector('#bot_check')) {
        isPresent = true;
    }
    if (document.querySelector('#rc-anchor-alert')) {
        isPresent = true;
    }
    if (document.querySelector("#rc-anchor-container")) {
        isPresent = true;
    }
    if (document.querySelector("#recaptcha-token")) {
        isPresent = true;
    }
    if ($(':contains(Proteção contra Bots)').val() !== undefined) {
        isPresent = true;
    }
    if (isPresent) {
        console.log("SE FERROU, RECAPTCHA TÁ NA AREA AUHEAUHEAUHAE");
    }
    return isPresent;
}

function randomTime(max, min) {
    let index = max - min;
    let random = Math.random() * index;
    return Math.round(parseInt(min) + random);
}

function pageRefresh() {
    setInterval(function () {
        timeEndNextUnit = $(`#replace_${game_data.screen} > table > tbody > tr > th:nth-child(2) > span`).html()
        if (timeEndNextUnit === undefined) {
            location.reload(true);
        }
    }, 30000);
}

let attack = {
    "spear": 0,
    "sword": 0,
    "axe": 6000,
    "spy": 500,
    "light": 2000,
    "heavy": 0,
    "ram": 400,
    "catapult": 0
}

let defense = {
    "spear": 9000,
    "sword": 4000,
    "axe": 0,
    "spy": 1000,
    "light": 0,
    "heavy": 1000,
    "ram": 0,
    "catapult": 100
}

const models = {
    '569|398': attack,
    '572|390': defense
}

const modelThisVillage = models[game_data.village.coord];

function getAmountRecruited(index) {
    try {
        return $(`#train_form > table > tbody > tr:nth-child(${index}) > td:nth-child(3)`).html().split('/')[1]
    } catch (err) {
        return 0
    }
}

function isAlreadyRecruiting(unidade) {
    return $(`.unit_sprite_smaller.${unidade}`).length > 0;
}

function isAvailableRecruitment(unidade) {
    try {
        return unit_build_block.unit_max(unidade) > 0;
    } catch (err) {
        return false;
    }
}

function setUnity(unidade, quantitade) {
    $(`input[name=${unidade}]`).focus().val(quantitade).blur();
}

function setRecruitmentByGroup(group) {
    if (isRecaptchaWindowPresent()) return;
    let countRecruit = 0;
    let units = recruitment.filter((unity) => unity.group === group);
    for (let unity of units) {
        console.log(
            unity,
            modelThisVillage[unity.name] > 0,
            getAmountRecruited(unity.indexAmountRecruited) < modelThisVillage[unity.name],
            !isAlreadyRecruiting(unity.name),
            isAvailableRecruitment(unity.name),
            $(`#train_form input[name='${unity.name}'`).length === 1
        );
        if (
            modelThisVillage[unity.name] > 0 &&
            getAmountRecruited(unity.indexAmountRecruited) < modelThisVillage[unity.name] &&
            !isAlreadyRecruiting(unity.name) &&
            isAvailableRecruitment(unity.name) &&
            $(`#train_form input[name='${unity.name}'`).length === 1
        ) {
            setUnity(unity.name, 1);
            countRecruit++;
        }
    }

    if (countRecruit > 0) recruit();
}

function recruit() {
    $("#train_form").submit();
}

let recruitment = [
    {
        name: 'spear',
        group: 'barracks',
        indexAmountRecruited: 2,
    },
    {
        name: 'sword',
        group: 'barracks',
        indexAmountRecruited: 3,
    },
    {
        name: 'axe',
        group: 'barracks',
        indexAmountRecruited: 4,
    },
    {
        name: 'spy',
        group: 'stable',
        indexAmountRecruited: 2,
    },
    {
        name: 'light',
        group: 'stable',
        indexAmountRecruited: 3,
    },
    {
        name: 'heavy',
        group: 'stable',
        indexAmountRecruited: 4,
    },
    {
        name: 'ram',
        group: 'garage',
        indexAmountRecruited: 2,
    },
    {
        name: 'catapult',
        group: 'garage',
        indexAmountRecruited: 3,
    }
]

if (window.location.href.includes("screen=barracks")) {
    setRecruitmentByGroup('barracks');
    pageRefresh();
}
if (window.location.href.includes("screen=stable")) {
    setRecruitmentByGroup('stable');
    pageRefresh();
}
if (window.location.href.includes("screen=garage")) {
    setRecruitmentByGroup('garage');
    pageRefresh();
}

if (
    window.location.href.includes("screen=train") &&
    window.location.href.includes("mode=mass")
) {

    // setRecruitmentByGroup('garage');
}



