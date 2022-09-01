// ==UserScript==
// @name         Auto Farm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*screen=am_farm*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tribalwars.com.br
// @grant        none
// ==/UserScript==

// (function () {
let index = 0;

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

function getListButtonsB() {
    return $('#plunder_list .farm_icon_b');
}

function isTroopsAvailable() {
    const light = document.getElementById('light').innerHTML
    const spy = document.getElementById('spy').innerHTML
    return light >= 2 && spy >= 1;
}

function endMacro() {
    clearInterval(macroSendFarm);

    const linksPagination = $("#plunder_list_nav > table > tbody > tr > td > a");

    if (linksPagination.length) {
        linksPagination[0].click();
        return;
    }

    setTimeout(function () {
        if (game_data.player.villages > 1) {
            document.querySelector('#village_switch_right > span').click();
            return;
        }
        location.reload(true);
    }, 150000);
}

function clickButtonB($button) {
    if (
        $button &&
        !isRecaptchaWindowPresent() &&
        isTroopsAvailable()
    ) {
        $button.click();
        return;
    }
}

async function sendFarm() {
    const listButtonsB = getListButtonsB();

    for (button of listButtonsB) {
        clickButtonB(button);
        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    // endMacro();
}

macroSendFarm = setInterval(sendFarm, 250);

    //     let index = 0;
    //     let buttonsSendB = document.querySelectorAll('#plunder_list .farm_icon_b');
    //     function sendFarm() {
    //         let cLCurrentAmount = document.getElementById('light').innerHTML
    //         let spyCurrentAmount = document.getElementById('spy').innerHTML

    //         if (!isRecaptchaWindowPresent() && cLCurrentAmount >= 2 && spyCurrentAmount >= 1 && buttonsSendB[index]) {
    //             buttonsSendB[index].click();
    //             index++;
    //         } else {
    //             clearInterval(macroSendFarm)
    //             setTimeout(function () {
    //                 if (game_data.player.villages > 1) {
    //                     document.querySelector('#village_switch_right > span').click();
    //                     return;
    //                 }
    //                 location.reload(true);
    //             }, 150000);
    //         }
    //     }

    //     let macroSendFarm = setInterval(sendFarm, 250);
// })();