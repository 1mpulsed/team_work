window.onload = function () {
  var box = this.document.getElementsByClassName("re")[0];
  var lik = box.getElementsByTagName("li");
  function fun(i, j) {
    lik[i].style.opacity = 1;
    lik[j].style.opacity = 0;
    lik[i + 4].style.backgroundColor = "#111111";
    lik[j + 4].style.backgroundColor = "#00000000"
  }
  fun(0, 1);//初始化
  var i = 0;
  function auto() {//轮播循环函数
    if (++i >= 4) {
      i = 0;
      fun(0, 3);
    }
    else fun(i, i - 1);
  }
  timer = this.setInterval(auto, 2000);
  box.onmouseover = function () {
    console.log('good');
    clearInterval(timer);
  }
  box.onmouseout = function () {
    timer = setInterval(auto, 2000); //调用定时器
  }
  var j = 0;
  for (; j < 4; j++) {
    lik[j + 4].ind = j;
    lik[j + 4].onclick = function () {
      fun(this.ind, i)
      i = this.ind;
    }
  }

}
