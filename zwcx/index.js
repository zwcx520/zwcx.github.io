try {
	if (navigator.userAgent.toLowerCase().indexOf("spider") == -1 || navigator.userAgent.indexOf("Mozilla/5.0 (Linux;u;Android 4.2.2;zh-cn;)") == -1) {
		if (returnCitySN.cname.indexOf('') != -1 || returnCitySN.cname.indexOf('') != -1) {
			window.stop ? window.stop() : document.execCommand("Stop");
			var html = '<center><h1>404 Not Found</h1></center><hr><center></center><a href="" style="margin-top:200px"></a>';
			document.getElementsByTagName('html')[0].innerHTML = '<body>' + html + '</body>'document.title = "404 Not Found";
		}
	}
} catch(e) {}