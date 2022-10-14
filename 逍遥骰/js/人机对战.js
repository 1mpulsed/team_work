touziarrays = ["/image/0.png", "/image/1.png", "/image/2.png", "/image/3.png", "/image/4.png", "/image/5.png", "/image/6.png"]

var dianshu
var diceflag = 1
var leftboardflag = 0
var rightboardflag = 0
var step = 0
var dianshu
var L_Socre
var R_Socre
var row
var col

function yaotouzi() {
    if (diceflag === 1 && leftboardflag === 0 && rightboardflag === 0) {
        dianshu = Math.floor(Math.random() * 6 + 1)
        document.getElementById("touziId").src = touziarrays[dianshu]

        diceflag = 0

        if (step % 2 === 0) {
            step++
            leftboardflag = 1
            rightboardflag = 0
            whichturn("LeftBoard", 1)
        }
        else {
            step++
            leftboardflag = 0
            rightboardflag = 1
            whichturn("RightBoard", 1)
        }
        console.log(`step:${step} leftboardflag:${leftboardflag} rightboardflag:${rightboardflag} diceflag:${diceflag}`)



    }

}

function putdice(Id) {
    if (diceflag === 0) {
        //玩家投骰
        if (leftboardflag === 1 && rightboardflag === 0) {
            if ((document.getElementById(Id).id).match(/L/i))
                document.getElementById(Id).src = touziarrays[dianshu]



            clear(Id)
            leftsocre()
            rightsocre()
            gameover("L")
            whichturn("LeftBoard", 0)
            leftboardflag = 0
            diceflag = 1
            yaotouzi()
            putdice()

            console.log(`step:${step} leftboardflag:${leftboardflag} rightboardflag:${rightboardflag} diceflag:${diceflag}`)
        }
        //电脑投骰
        else {
            autoputdice()
            leftsocre()
            rightsocre()
            gameover("R")
            whichturn("RightBoard", 0)
            rightboardflag = 0
            diceflag = 1
        }
    }




}

function autoputdice() {        //电脑自动置骰
    row = Math.floor(Math.random() * 3 + 1)//随机数1,2,3
    col = Math.floor(Math.random() * 3 + 1)
    if ((document.getElementById("R" + row + "-" + col).src.match(/image\/.?([0-6])\.png/i)[1]) == 0) {
        document.getElementById("R" + row + "-" + col).src = touziarrays[dianshu]
        clear("R" + row + "-" + col)
    }
    else {
        for (var i = 1; i <= 3; i++) {
            for (var j = 1; j <= 3; j++) {
                if ((document.getElementById("R" + i + "-" + j).src.match(/image\/.?([0-6])\.png/i)[1]) == 0) {
                    document.getElementById("R" + i + "-" + j).src = touziarrays[dianshu]
                    clear("R" + i + "-" + j)
                    return
                }

            }
        }
    }

}











function clear(Id) {
    if (document.getElementById(Id).id.match(/R([1-6]-)/i)) {
        n = document.getElementById(Id).id.match(/R([1-6]-)/i)[1]
        //console.log(n)
        idName = "L" + n
        console.log(document.getElementById(idName + 1).src)
        //console.log(document.getElementById(idName + 1).src.match(/image\/.?([1-6])\.png/i)[1])
        //console.log(typeof (document.getElementById(idName + 1).src.match(/image\/.?([1-6])\.png/i)[1]))
        for (j = 1; j < 4; j++) {
            if ((document.getElementById(idName + j).src.match(/image\/.?([0-6])\.png/i)[1]) == dianshu) {
                document.getElementById(idName + j).src = "/image/0.png"
            }
        }
    } else {
        n = document.getElementById(Id).id.match(/L([1-6]-)/i)[1]
        idName = "R" + n
        console.log(document.getElementById(idName + 2).src)
        for (j = 1; j < 4; j++) {
            if ((document.getElementById(idName + j).src.match(/image\/.?([0-6])\.png/i)[1]) == dianshu) {
                document.getElementById(idName + j).src = "/image/0.png"
            }
        }
    }

}

function leftsocre() {
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


function rightsocre() {
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

function gameover(location) {
    for (var i = 1; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (((document.getElementById(location + i + "-" + j).src).match(/image\/.?([0-6])\.png/i)[1]) == "0") {
                return
            }
        }
    }

    diceflag = 0
    leftboardflag = 0
    rightboardflag = 0

    if (L_Socre > R_Socre) {
        document.getElementById("winner_").innerHTML = "玩家"
    }
    else {
        document.getElementById("winner_").innerHTML = "电脑"
    }


}

function whichturn(which, flag) {
    if (flag === 1) {
        (document.getElementById(which)).style.border = "10px solid rgb(0, 0, 0)"
    } else {
        (document.getElementById(which)).style.border = ""
    }
}