// ==UserScript==
// @name         Identificar Ataque
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*screen=overview_villages*mode=incomings*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tribalwars.com.br
// @grant        none
// ==/UserScript==

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

if (!isRecaptchaWindowPresent()) {
    $("#select_all").click();
    $("#incomings_form").submit();

    setTimeout(function () {
        location.reload(true);
    }, 300000);
}
