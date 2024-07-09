function writeFunc(init, toWhiteId, whiteId, complete) {
    var charIndex = -1;
    var stringLength = 0;
    var inputText;

    function writeContent(init, toWhiteId, whiteId) {
        if (init) {
            inputText = document.getElementById(toWhiteId).innerHTML;
        }
        if (charIndex === -1) {
            charIndex = 0;
            stringLength = inputText.length;
        }
        var initString = document.getElementById(whiteId).innerHTML;
        initString = initString.replace(/<SPAN.*$/gi, "");

        var theChar = inputText.charAt(charIndex);
        var nextFourChars = inputText.substr(charIndex, 4);
        if (nextFourChars === '<BR>' || nextFourChars === '<br>') {
            theChar = '<BR>';
            charIndex += 3;
        }
        initString = initString + theChar;
        document.getElementById(whiteId).innerHTML = initString;

        charIndex = charIndex + 1;

        if (charIndex <= stringLength) {
            setTimeout(function () {
                writeContent(false, toWhiteId, whiteId)
            }, 140);
        } else {
            complete();
        }
    }

    writeContent(init, toWhiteId, whiteId);
}
