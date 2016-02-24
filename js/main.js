var monitordata = [];
function display(data) {
    console.log(data);
    $("#content").html("");
    $.each(data, function( index, value ){
        $("#content").append('<div class="col-lg-6 col-sm-6"><div class="panel panel-' + (value['monitors']['monitor'][0]['status'] == "9"  ? 'danger' : (value['monitors']['monitor'][0]['status'] == "8"  ? 'warning' : 'success')) + '"><div class="panel-heading">' + value['monitors']['monitor'][0]['friendlyname'] + '</div><div class="panel-body">' + value['monitors']['monitor'][0]['customuptimeratio'] + '% uptime in the last 14 Days - ' + value['monitors']['monitor'][0]['alltimeuptimeratio'] + '% overall<br/><br/><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" style="width:' + parseInt(value['monitors']['monitor'][0]['customuptimeratio']) + '%"></div><div class="progress-bar progress-bar-danger" role="progressbar" style="width:' + (100- parseInt(value['monitors']['monitor'][0]['customuptimeratio'])) + '%"></div></div></div></div></div>');
    });
    $("#loading").hide();
    $("#content").show();
    $("#footer").show();
    monitordata.length = 0;
}
function jsonUptimeRobotApi(data) {
  monitordata.push(data);
  if (monitordata.length >= monitors.length) {
      display(monitordata);
  }
}
function load() {
    $("#loading").show();
    $("#content").hide();
    $("#footer").hide();
    $.each(monitors, function( index, value ){
        $.ajax({
            dataType: 'jsonp',
            url: "https://api.uptimerobot.com/getMonitors?apiKey=" + value + "&format=json&responseTimes=1&responseTimesAverage=1&customUptimeRatio=14",
             async: false,
             cache: false,
      
        });
    });
}
var counter = refreshtime;
$(document).ready(function(){
    load();
    document.title = title;
    $("#toptitle").html(title);
    $("#footer").append('<div class="col-lg-12" id="footer"><div class="panel panel-default"><div class="panel-body">' + footermessage + '</div><div class="panel-footer"><i>Powered by <a href="https://github.com/Jbithell/status">JBithell Status</a> &amp; <a href="https://uptimerobot.com">Uptime Robot</a></i> | <i id="reloading-message"></i></div></div></div>');
    window.setInterval(function(){
        if (counter > 0) {
            $("#reloading-message").html("Reloading in " + counter + " second" + (counter != 1 ? 's' : ''));
            counter -= 1;
        } else {
            counter = refreshtime;
            load();
        }
    }, 1000);
});
