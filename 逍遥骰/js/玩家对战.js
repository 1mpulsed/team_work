//骰子点数1~6图片数组 /image/0.png为棋盘底色
touziarrays = ["/image/0.png", "/image/1.png", "/image/2.png", "/image/3.png", "/image/4.png", "/image/5.png", "/image/6.png"]

var diceflag = 1   //骰子标志
var leftboardflag = 0  //左棋盘标志
var rightboardflag = 0   //右棋盘标志
var step = 0   //偶数左棋盘下 奇数右棋盘下
var dianshu     //随机生成的骰子点数1~6
var L_Socre     //左边棋盘分数和
var R_Socre     //右边棋盘分数和


function yaotouzi() {       //点击""摇骰"按钮触发的'yaotouzi'函数
    if (diceflag === 1 && leftboardflag === 0 && rightboardflag === 0) {
        dianshu = Math.floor(Math.random() * 6 + 1)
        document.getElementById("touziId").src = touziarrays[dianshu]

        diceflag = 0

        if (step % 2 === 0) {       //解锁左边棋盘
            step++
            leftboardflag = 1
            rightboardflag = 0
            whichturn("LeftBoard", 1)
        }
        else {                  //解锁右边棋盘
            step++
            leftboardflag = 0
            rightboardflag = 1
            whichturn("RightBoard", 1)
        }
        console.log(`step:${step} leftboardflag:${leftboardflag} rightboardflag:${rightboardflag} diceflag:${diceflag}`) //用于调试



    }

}

function putdice(Id) {      //点击棋盘中的格子触发的放置骰子函数
    if (diceflag === 0) {
        if (leftboardflag === 1 && rightboardflag === 0) {   //如果左边棋盘处于解锁状态
            if ((document.getElementById(Id).id).match(/L/i))  //限制只有点击左边棋盘才能触发onclick事件
                document.getElementById(Id).src = touziarrays[dianshu] //将被点击的格子用随机生成的骰子点数对应的图片覆盖



            clear(Id)
            leftsocre()
            rightsocre()
            gameover("L")
            whichturn("LeftBoard", 0)
            leftboardflag = 0  //左边棋盘放置完一颗骰子后将左边棋盘封锁
            diceflag = 1    //解锁骰子

            console.log(`step:${step} leftboardflag:${leftboardflag} rightboardflag:${rightboardflag} diceflag:${diceflag}`)//用于调试
        }
        else {   //如果右边棋盘处于解锁状态
            if ((document.getElementById(Id).id).match(/R/i)) //限制只有点击右边棋盘才能触发onclick事件
                document.getElementById(Id).src = touziarrays[dianshu]  //将被点击的格子用随机生成的骰子点数对应的图片覆盖



            clear(Id)

            rightsocre()
            leftsocre()
            gameover("R")
            whichturn("RightBoard", 0)
            rightboardflag = 0  //右边棋盘放置完一颗骰子后将右边棋盘封锁
            diceflag = 1      //解锁骰子

            console.log(`step:${step} leftboardflag:${leftboardflag} rightboardflag:${rightboardflag} diceflag:${diceflag}`)//用于调试
        }
    }




}


function clear(Id) {        //消除对应另一边棋盘同一行的相同点数骰子
    if (document.getElementById(Id).id.match(/R([1-6]-)/i)) {       //如果刚下的骰子位于右边棋盘
        row = document.getElementById(Id).id.match(/R([1-6]-)/i)[1]   //得到该骰子的行数
        //console.log(n)
        idName = "L" + row      //该骰子对应另一边棋盘（左边）的同一行骰子的id名拼接
        console.log(document.getElementById(idName + 1).src)
        //console.log(document.getElementById(idName + 1).src.match(/image\/.?([1-6])\.png/i)[1])
        //console.log(typeof (document.getElementById(idName + 1).src.match(/image\/.?([1-6])\.png/i)[1]))
        for (j = 1; j < 4; j++) {
            if ((document.getElementById(idName + j).src.match(/image\/.?([0-6])\.png/i)[1]) == dianshu) {
                document.getElementById(idName + j).src = "/image/0.png"   //将点数与该骰子相同的格子用棋盘底色图片覆盖
            }
        }
    } else {        //左边同理
        row = document.getElementById(Id).id.match(/L([1-6]-)/i)[1]
        idName = "R" + row
        console.log(document.getElementById(idName + 2).src)
        for (j = 1; j < 4; j++) {
            if ((document.getElementById(idName + j).src.match(/image\/.?([0-6])\.png/i)[1]) == dianshu) {
                document.getElementById(idName + j).src = "/image/0.png"
            }
        }
    }

}

function leftsocre() {      //左棋盘总得分实时计算
    var socre_tmp = []
    L_Socre = 0
    for (var i = 1; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            num = (document.getElementById("L" + i + "-" + j).src).match(/image\/.?([0-6])\.png/i)[1]
            socre_tmp[j - 1] = Number(num)
        }

        if (socre_tmp[0] == socre_tmp[1] && socre_tmp[1] == socre_tmp[2]) {
            L_Socre += socre_tmp[1] * Math.pow(3, 2)
        }
        else if (socre_tmp[0] !== socre_tmp[1] && socre_tmp[1] !== socre_tmp[2] && socre_tmp[0] !== socre_tmp[2]) {
            L_Socre += socre_tmp[0] + socre_tmp[1] + socre_tmp[2]
        }
        else {
            if (socre_tmp[0] == socre_tmp[1]) {
                L_Socre += socre_tmp[1] * Math.pow(2, 2) + socre_tmp[2]
            }
            else if (socre_tmp[0] == socre_tmp[2]) {
                L_Socre += socre_tmp[2] * Math.pow(2, 2) + socre_tmp[1]
            }
            else {
                L_Socre += socre_tmp[1] * Math.pow(2, 2) + socre_tmp[0]
            }
        }
    }

    document.getElementById("L_socre").innerHTML = L_Socre
}


function rightsocre() {          //右棋盘总得分实时计算
    var socre_tmp = []
    R_Socre = 0
    for (var i = 1; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            num = (document.getElementById("R" + i + "-" + j).src).match(/image\/.?([0-6])\.png/i)[1]
            socre_tmp[j - 1] = Number(num)
        }

        if (socre_tmp[0] == socre_tmp[1] && socre_tmp[1] == socre_tmp[2]) {
            R_Socre += socre_tmp[1] * Math.pow(3, 2)
        }
        else if (socre_tmp[0] !== socre_tmp[1] && socre_tmp[1] !== socre_tmp[2] && socre_tmp[0] !== socre_tmp[2]) {
            R_Socre += socre_tmp[0] + socre_tmp[1] + socre_tmp[2]
        }
        else {
            if (socre_tmp[0] == socre_tmp[1]) {
                R_Socre += socre_tmp[1] * Math.pow(2, 2) + socre_tmp[2]
            }
            else if (socre_tmp[0] == socre_tmp[2]) {
                R_Socre += socre_tmp[2] * Math.pow(2, 2) + socre_tmp[1]
            }
            else {
                R_Socre += socre_tmp[1] * Math.pow(2, 2) + socre_tmp[0]
            }
        }
    }

    document.getElementById("R_socre").innerHTML = R_Socre
}

function gameover(location) {       //游戏结束判断
    for (var i = 1; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (((document.getElementById(location + i + "-" + j).src).match(/image\/.?([0-6])\.png/i)[1]) == "0") {
                return
            }
        }
    }

    diceflag = 0            //
    leftboardflag = 0       //游戏结束后锁定骰子、左右棋盘
    rightboardflag = 0      //

    if (L_Socre > R_Socre) {
        document.getElementById("winner_").innerHTML = "玩家A"
    }
    else {
        document.getElementById("winner_").innerHTML = "玩家B"
    }


}

function whichturn(which, flag) {       //轮到谁了
    if (flag === 1) {
        (document.getElementById(which)).style.border = "10px solid rgb(0, 0, 0)"   //轮到谁，谁的棋盘边框变粗，提示该棋盘投掷骰子
    } else {
        (document.getElementById(which)).style.border = ""
    }
}