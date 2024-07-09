
function handleJumpToTerms(jumpParams) {
  var jumpUrl = ''
  if (jumpParams.termsType == 'privacy') {
    jumpUrl = jumpParams.urlType + '/privacy.html'
  }
  if (jumpParams.termsType == 'agreement') {
    jumpUrl = jumpParams.urlType + '/agreement.html'
  }
  var f = document.createElement('form');
  f.style.display = 'none';
  f.action = jumpUrl;
  f.method = 'post';
  f.innerHTML = '<input type="hidden" name="copyright" value="' + jumpParams.termsFullName + '"/><input type="hidden" name="abbreviation" value="' + jumpParams.termsAbbreviation + '"/>'
  document.body.appendChild(f);
  f.submit();
}

// 条款（隐私政策、用户协议）弹框
handleTermsPopup()

/**
 * 条款弹框（无跳转）：隐私政策or用户协议
 * 绑定事件：
 *  1.点击footer文字，显示弹框
 *  2.点击关闭按钮和遮罩（阻止冒泡），隐藏弹框
 */
function handleTermsPopup() {
  $('.read-terms').click(function () {
    var terms = $(this).data('terms')
    $('.popup-box').fadeIn()
    $('.show-' + terms).show().scrollTop(0, 0)
  })
  $('.popup-close').click(function () {
    $('.popup-box').hide()
    $('.show-agreement').hide()
    $('.show-privacy').hide()
    $('.show-function').hide()
  })
  $('.popup-box').click(function () {
    $('.popup-close').click()
  })
  $('.popup-content').click(function (e) {
    e.stopPropagation()
  })
}


// 判断是否为移动端
function isMobile() {
  if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true; // 移动端
  } else {
    return false
  }
}


// 获取当前年份
var date = new Date();
$('.fullyear').text(date.getFullYear())



// 按时间间隔加数字
function usageNum(type) {
  var view_no
  if (type == 'totalNum') {
    view_no = parseInt((new Date().getTime() - 1658869172780) / 10000)
  } else {
    view_no = parseInt((new Date().getTime() - 1632631069036) / 10000)
  }
  return view_no
}
$('.total-num').text(toThousands(usageNum('totalNum')))
$('.zhuanhuan-num').text(toThousands(usageNum('zhuanhuanNum')))

// 计算总和
function handleNum(type) {
  var getNowNum = $('.total-num').text()
  var getzhuanhuanNum = $('.zhuanhuan-num').text()
  if (type == 'click') {
    var calNum = getNum(getNowNum) + 1
    var zhuanhuanCalNum = getNum(getzhuanhuanNum) + 6
  } else {
    var calNum = usageNum('totalNum')
    var zhuanhuanCalNum = usageNum('zhuanhuanNum') + 6
  }
  var numToStr = toThousands(calNum)
  var zhuanhuanNumToStr = toThousands(zhuanhuanCalNum)
  $('.total-num').text(numToStr)
  $('.zhuanhuan-num').text(zhuanhuanNumToStr)
}
handleNum('autoAdd')
// 点击触发计算
$('.download-total').click(function () {
  handleNum('click')
})

// 每10秒触发一次计算
var timer
clearInterval(timer)
timer = setInterval(function () {
  var getNowNum = $('.total-num').text()
  var getzhuanhuanNum = $('.zhuanhuan-num').text()
  var calNum = getNum(getNowNum) + 1
  var zhuanhuanCalNum = getNum(getzhuanhuanNum) + 6
  var numToStr = toThousands(calNum)
  var zhuanhuanNumToStr = toThousands(zhuanhuanCalNum)
  $('.total-num').text(numToStr)
  $('.zhuanhuan-num').text(zhuanhuanNumToStr)
}, 10000)

// 去掉字符串中出现的所有逗号
function getNum(str) {
  var num = parseInt(str.replace(/,/g, ""))
  return num;
}

// 数字转字符串，每三位一个逗号
function toThousands(num) {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}