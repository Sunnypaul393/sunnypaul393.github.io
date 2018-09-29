$(document).ready(function($) {

	var cc = 1 + Math.floor(Math.random() * 12);

	$(".color-switch ul li a.change").click(function(){
		$(".color-switch ul li a").removeClass("active");
		$(this).addClass("active");
		return false;
	});
	
	$("#green").click(function(){
		$("#color" ).attr("href", "#green");
		$(".logo" ).attr("src", "imgs/green/logo@2x.png");
		$("#section-one" ).css("background", "url(imgs/green/section-one.jpg) no-repeat center 0");
		$(".circle-icon img.rotation" ).attr("src", "imgs/green/circle-rotate.png");
		$(".caption-map .logo_contact" ).attr("src", "imgs/green/logo@2x.png");
		setCookie('color', 'green', 365);
		return false;
	});
	
	$("#gray").click(function(){
		$("#color" ).attr("href", "css/theme-gray.css?" + cc);
		$(".logo" ).attr("src", "imgs/gray/logo@2x.png");
		$("#section-one" ).css("background", "url(imgs/gray/section-one.jpg) no-repeat center 0");
		$(".circle-icon img.rotation" ).attr("src", "imgs/gray/circle-rotate.png");
		$(".caption-map .logo_contact" ).attr("src", "imgs/gray/logo@2x.png");
		setCookie('color', 'gray', 365);
		return false;
	});
	
	$("#brown").click(function(){
		$("#color" ).attr("href", "css/theme-brown.css?" + cc);
		$(".logo" ).attr("src", "imgs/brown/logo@2x.png");
		$("#section-one" ).css("background", "url(imgs/brown/section-one.jpg) no-repeat center 0");
		$(".circle-icon img.rotation" ).attr("src", "imgs/brown/circle-rotate.png");
		$(".caption-map .logo_contact" ).attr("src", "imgs/brown/logo@2x.png");
		setCookie('color', 'brown', 365);
		return false;
	});
	
	$("#blue").click(function(){
		$("#color" ).attr("href", "css/theme-blue.css?" + cc);
		$(".logo" ).attr("src", "imgs/blue/logo@2x.png");
		$("#section-one" ).css("background", "url(imgs/blue/section-one.jpg) no-repeat center 0");
		$(".circle-icon img.rotation" ).attr("src", "imgs/blue/circle-rotate.png");
		$(".caption-map .logo_contact" ).attr("src", "imgs/blue/logo@2x.png");
		setCookie('color', 'blue', 365);
		return false;
	});
	
	$("#yellow").click(function(){
		$("#color" ).attr("href", "css/theme-yellow.css?" + cc);
		$(".logo" ).attr("src", "imgs/yellow/logo@2x.png");
		$("#section-one" ).css("background", "url(imgs/yellow/section-one.jpg) no-repeat center 0");
		$(".circle-icon img.rotation" ).attr("src", "imgs/yellow/circle-rotate.png");
		$(".caption-map .logo_contact" ).attr("src", "imgs/yellow/logo@2x.png");
		setCookie('color', 'yellow', 365);
		return false;
	});
	
});

function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

$(function() {
	var cc = 1 + Math.floor(Math.random() * 121);
	var color=getCookie("color");
	if ((color != "") && (color != "green")) {
		document.getElementById(color).className += " active";
			$(".logo" ).attr("src", "imgs/"+color+"/logo@2x.png");
			$("#color").attr("href", "css/theme-"+color+".css?" + cc);
			$("#section-one" ).css("background", "url(imgs/"+color+"/section-one.jpg) no-repeat center 0")
			$(".circle-icon img.rotation" ).attr("src", "imgs/"+color+"/circle-rotate.png");
			$(".caption-map .logo_contact" ).attr("src", "imgs/"+color+"/logo@2x.png");
	} else {
		document.getElementById('green').className += " active";
			$("#color").attr("href", "#green");
	}
});

$(".color-switch i").click(function(){
  	$(".color-switch").toggleClass("open");
});
