(function () {
    var isQrcodeAgent = /com.onlybeyond.QRcode/.test(window.navigator.userAgent);
    if (isQrcodeAgent) {
        var link = document.getElementById('zencodelink');
        if (link) {
            link.remove();
        }
    }
})();