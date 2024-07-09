$(document).ready(function(){var i={CODE128:{text:"只能包含ASCII字符（数字、大小写字母及常用符号）",allows:"ASCII字符，即数字、大小写字母及常用符号",pattern:/^[\x00-\x7F\xC8-\xD3]+$/},CODE128A:{text:"只能包含数字、大写字母及部分特殊字符（不能包含小写字母）",allows:"数字、大写字母及部分特殊字符",pattern:/^[\x00-\x5F\xC8-\xCF]+$/},CODE128B:{text:"只能包含数字、大小写字母及部分特殊字符",allows:"数字、大小写字母及部分特殊字符",pattern:/^[\x20-\x7F\xC8-\xCF]+$/},CODE128C:{text:"只能由数字组成，并且必须是偶数个数字",allows:"数字，且位数必须是偶数",pattern:/^(\xCF*[0-9]{2}\xCF*)+$/},EAN13:{text:"只能由13位数字组成",allows:"数字，且必须是13位",pattern:/^[0-9]{13}$/},EAN8:{text:"只能由8位数字组成",allows:"数字，且必须是8位",pattern:/^[0-9]{8}$/},UPC:{text:"只能由12位数字组成",allows:"数字，且必须是12位",pattern:/^[0-9]{12}$/},ITF:{text:"只能由数字组成，并且必须是偶数个数字",allows:"数字，且位数必须是偶数",pattern:/^([0-9]{2})+$/},ITF14:{text:"只能由14位数字组成",allows:"数字，且必须是14位",pattern:/^[0-9]{14}$/},MSI:{text:"只能由数字组成",allows:"仅限数字",pattern:/^[0-9]+$/},pharmacode:{text:"只能由数字组成，且介于 3 - 131070 之间",allows:"数字，要求介于 3 - 131070 之间",pattern:function(t){return 3<=t&&t<=131070}}},o=function(t,e){if(!t)return"";var a=t.src;if(void 0===a)return"";var n="",r=/^data:image\/(.+?);base64,(.+)/.exec(a);return n=null!==r?r[1]:a.substr(a.lastIndexOf(".")+1),e?"."+n:n};$("input[name='display-text']").change(function(){"true"==$(this).val()?$("#font-options").slideDown("fast"):$("#font-options").slideUp("fast")}),$("#font-family").change(function(){$(this).css({"font-family":$(this).val()})});var s=$("#btn-save"),l=$(".barcode-output");$("#btn-generator").click(function(){var t=$("#tool-text").val(),e=$("#barcode-type").val();if(s.attr("disabled","disabled"),""==t)return tips_error("请填写要生成条形码的内容！"),$("#tool-text").focus(),!1;if(""==e)return tips_error("请选择条码类型！"),$("#barcode-type").focus(),!1;var a=function(t,e){if(10<(e=e.map(function(t){return $.trim(t)}).filter(function(t){return""!==t})).length)return{status:!1,errors:"每次不能超过10条"};var a=i[t];if(void 0===a)return{status:!0,code:e};var n=[],r="function"==typeof a.pattern?a.pattern:function(t){return a.pattern.test(t)};return e.forEach(function(t,e){r(t)||n.push(e+1)}),0<n.length?{status:!1,errors:n=t+" "+a.text+"。<br>-&gt; 第 "+n.join(", ")+" 行不符合要求"}:{status:!0,code:e}}(e,t=t.split("\n"));if(!a.status)return tips_error(a.errors),!1;var n=t.map(function(t){return $("<img/>",{data:{text:$.trim(t)},class:"barcode hide"})}),r={format:e,background:"#ffffff",lineColor:"#000000",fontSize:parseInt($("#font-size").val()),height:parseInt($("#bar-height").val()),width:$("#bar-width").val(),margin:parseInt($("#bar-margin").val()),textMargin:parseInt($("#bar-text-margin").val()),displayValue:$("input[name='display-text']:checked").val(),font:$("#font-family").val(),fontOptions:"bold",textAlign:$("input[name='text-align']:checked").val(),valid:function(t){t||tips_error("条码内容不符合所选条码类型规则！")}};l.html(n),n.forEach(function(t,e){var a=t.data("text");if(void 0===a)return!0;t.JsBarcode(a,r),t.removeClass("hide")}),tips_clear(),s.removeAttr("disabled","disabled")}),$("#btn-save").click(function(){var t=l.find(".barcode");if(0!==t.length){var e="";if(1===t.length){e="barcode_"+t.data("text"),function(t,e){var a=(e=e||{}).filename?e.filename:"下载",n=e.ext?e.ext:o(t);n=n&&"."+n;var r=document.createElement("a");r.href=t.src,r.download=a+n,r.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window}))}(t[0],{filename:e})}else{var a=new JSZip,n=new Date;t.each(function(){e=$(this).data("text")+o(this,!0),a.file(e,function(t,e){if(!t)return"";var a=t.src;if(void 0===a)return"";var n=/^data:image\/(.+?);base64,(.+)/;return e&&n.test(a)&&(a=a.replace(n,"$2")),a}(this,!0),{base64:!0,date:n})}),a.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}).then(function(t){saveAs(t,"barcode.zip")},function(t){tips_error("保存失败！")})}}})});