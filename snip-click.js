
$($('#command-data-form').find('tbody')[0]).append(`<tr>
<td>Chegada:</td>
<td> 
    <input type="datetime-local" id="arrivalTime" step=".001"> 
</td>
</tr>
<tr>
<td>Envio:</td>
<td> 
    <input type="datetime-local" id="shippingTime" readonly step=".001"> 
</td>
</tr>
<tr>
<td> 
    <button type="button" id="toSchedule" class="btn">Agendar</button> 
</td>
</tr>`);

function getArrivalTime() {
    return new Date($('#arrivalTime').val());
}

function getDurationMilliseconds() {
    arrDuration = $('#command-data-form').find('td:contains("Duração:")').next().text().split(':').map(Number);
    var hours = arrDuration[0] !== '' ? parseInt(arrDuration[0]) * 60 * 60 : 0;
    var minutes = arrDuration[1] !== '' ? parseInt(arrDuration[1]) * 60 : 0;
    var seconds = arrDuration[2] !== '' ? parseInt(arrDuration[2]) * 1 : 0;

    return (hours + minutes + seconds) * 1000;
}

function calcShippingTime(){
    arrivalTime = getArrivalTime();
    durationMilliseconds = getDurationMilliseconds();
    return arrivalTime.getTime() - durationMilliseconds;
}
