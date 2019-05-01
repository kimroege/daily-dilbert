//https://cors.io/?https://dilbert.com/
//var url = "https://cors.io/?https://dilbert.com/strip/2019-04-30";





function go() {
	getDilbert(document.getElementById("datepicker").value);
}

$(function() {
	$("#datepicker").datepicker({ dateFormat: "yy-mm-dd"});
	$("#datepicker").datepicker("setDate", new Date());
	$("#datepicker").datepicker('option','minDate', new Date(1989, 4 - 1, 16));
	$("#datepicker").datepicker('option','maxDate', +0);
});


jQuery(function($) {

  $("#datepicker").datepicker({
    onSelect: function(dateText) {
      //display("Selected date: " + dateText + "; input's current value: " + this.value);
    }
  }).on("change", function() {
    //display("Got change event from field");
    go();
  });

  function display(msg) {
    $("<p>").html(msg).appendTo(document.body);
  }

});

document.onkeydown = function(e){
	if (e.keyCode == 37) {
		shift(-1);
	}
	if (e.keyCode == 39) {
		shift(+1);
	}
};


function getDilbert(date) {
	var baseurl = 'https://dilbert.com/strip/' + date;

	var corsProxy = 'https://cors.io/?'+baseurl;
	//var corsProxy = 'https://cors-anywhere.herokuapp.com/'+baseurl;
	url = corsProxy;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var html = xhttp.responseText;
	      var regex = /assets\.amuniversal\.com\/[a-z0-9]*/s;
	      var regex2 = /(?<=<span class="comic-title-name">).*?(?=<\/span>)/s;

	      var res = html.match(regex);
	      var title = html.match(regex2);
	      
	      var imgUrl = "https://"+res[0];

	      document.getElementById("dilbert").src=imgUrl;
	      document.getElementById("dilbertTitle").innerHTML=title;
	    }
	};
	xhttp.open("GET", url, true);
	//xhttp.setRequestHeader("x-requested-with", 'Dilbert');
	xhttp.send();
}


function shift(days) {
	var date = $('#datepicker').datepicker('getDate');
	date.setDate(date.getDate() +days);
    $('#datepicker').datepicker("setDate", date);
    go();
}