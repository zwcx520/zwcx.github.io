$(function(){$("#btn-replace").click(function(){$("#success-tips").hide();var t=$("#tool-text").val();if(t.length<=0)return tips_error("璇疯緭鍏ヨ澶勭悊鐨勬枃鏈紒"),$("#tool-text").focus(),!1;t=t.replace(new RegExp($("#text_from").val(),"g"),$("#text_to").val()),$("#tool-result").val(t)})});