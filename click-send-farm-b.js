if (!window.location.href.includes("screen=am_farm")) {
    window.location.href = game_data.link_base_pure + "am_farm"
}

if (typeof macroSendFarm !== "undefined") clearInterval(macroSendFarm);

index = 0;
buttonsSendB = document.querySelectorAll('#plunder_list .farm_icon_b');
function sendFarm() {
    let cLcurrentAmount = document.getElementById('light').innerHTML
    if (cLcurrentAmount >= 2 && buttonsSendB[index]) {
        buttonsSendB[index].click();
        index++;
    } else {
        clearInterval(macroSendFarm)
    }
}

macroSendFarm = setInterval(sendFarm, 250);