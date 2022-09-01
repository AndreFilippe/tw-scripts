"use strict";
//coordsA = [564,494];
//TWMap.context.FATooltip.distance(game_data.village.x, game_data.village.y, coordsA[0], coordsA[1]);

$(document).ready(function () {
    var villages = TWMap.villages;
    var villageKey = TWMap.villageKey;
    var key = {};
    var keySorted = {};
    var contador = 0;
    var tempo = 350;
    var x = 0;
    var altAldTempo = aleatorio(180000, 300000);
    //var altAldTempo = aleatorio(30000,60000);
    var villagesToSkip = []; // add the villages id as string to the array

    function aleatorio(superior, inferior) {
        let numPosibilidades = (superior - inferior);
        let aleat = Math.random() * numPosibilidades;
        return Math.round(parseInt(inferior) + aleat);
    }

    for (var j in villageKey) {
        key[contador] = villageKey[j];
        contador++;
    }

    var indice = 0;
    for (var s = 0; s <= contador; s++) {
        var coordsA = TWMap.CoordByXY(key[s]);
        let villageA = TWMap.context.FATooltip.distance(game_data.village.x, game_data.village.y, coordsA[0], coordsA[1]);

        indice = 0;

        for (var sb = 0; sb < contador; sb++) {

            var coordsB = TWMap.CoordByXY(key[sb]);
            var villageB = TWMap.context.FATooltip.distance(game_data.village.x, game_data.village.y, coordsB[0], coordsB[1]);

            if (villageA > villageB) {
                indice++;
            }
        }
        keySorted[indice] = key[s];
    }

    key = keySorted;
    // 999	'1030'	'Aldeia+de+b%C3%A1rbaros'	'489'	'568'	'0'	'706'	'0'
    contador = 0;
    for (var k in key) {

        var village = villages[key[k]];

        (function (villageA) {
            var tempoAgora = (tempo * ++x) - aleatorio(150, 300);
            setTimeout(function () {
                if (villageA.owner == "0" && !(villagesToSkip.length > 0 && villagesToSkip.includes(villageA.id))) {
                    //var coordAtual = TWMap.CoordByXY(key[k]);
                    console.log(villageA);
                    var coordAtual = TWMap.CoordByXY(villageA);
                    TWMap.mapHandler.onClick(coordAtual[0], coordAtual[1], new Event('click'));

                    var url = TWMap.urls.ctx["mp_farm_a"].replace(/__village__/, villageA.id).replace(/__source__/, game_data.village.id);

                    TribalWars.get(url, null, function (a) { TWMap.context.ajaxDone(null, url); }, undefined, undefined);

                    contador++;
                }
            }, tempoAgora);
        })(village);
    }

    function altAldeia() {
        //$('.arrowRight').click();
        //$('.groupRight').click();
        location.reload();
    }

    setInterval(altAldeia, altAldTempo);
});