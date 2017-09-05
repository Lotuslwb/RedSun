
function getIndex(activePointList) {
  return activePointList.map(function (point) {
    return point.index;
  })
}

function inActivePointList(activePointList,activePoint) {
  var exit = false;
  activePointList.map(function (point) {
    if (point.index == activePoint.index) {
      exit = true;
    }
  })
  return exit;
}

function drawActivePointList(myCtx,activePointList) {
  console.log(activePointList);
  myCtx.beginPath();
  myCtx.setStrokeStyle("red");
  myCtx.setLineWidth(4);
  for (var i = 0; i < activePointList.length; i++) {
    var activePoint = activePointList[i];
    if (i == 0) {
      myCtx.moveTo(activePoint.x, activePoint.y);
      console.log(activePoint.x, activePoint.y);
    } else {
      myCtx.lineTo(activePoint.x, activePoint.y);
      myCtx.stroke();
    }
  }
  myCtx.closePath();
}

//画圆
function drawCircle(myCtx,point) {
  //arc(x,y,r,startAngle,endAngle,counterclockwise)
  //counterclockwise -- 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针      
  // 绘制空心大圆
  myCtx.beginPath();
  myCtx.setStrokeStyle("#0075c3");
  myCtx.setLineWidth(1);
  myCtx.arc(point.x, point.y, point.r, 0, 2 * Math.PI, true);
  myCtx.closePath();
  myCtx.stroke();

  //绘制实心小圆
  myCtx.beginPath();
  myCtx.setFillStyle('#00a2ff');
  myCtx.arc(point.x, point.y, point.smallR, 0, 2 * Math.PI, true);
  myCtx.closePath();
  myCtx.fill();
}


//判断某个点 是否在圆内
function inBall(position, point, UsesmallR) {
  if (UsesmallR) {
    return !(position.x < (point.x - point.smallR) || position.x > (point.x + point.smallR) || position.y < (point.y - point.smallR) || position.y > (point.y + point.smallR));
  } else {
    return !(position.x < (point.x - point.r) || position.x > (point.x + point.r) || position.y < (point.y - point.r) || position.y > (point.y + point.r));
  }

}

module.exports = {
  //返回PointList里面的index
  getIndex: getIndex,
  //是否在选中的PointList里面
  inActivePointList: inActivePointList,
  //将选中的点连接成线
  drawActivePointList: drawActivePointList,
  //画同心圆
  drawCircle: drawCircle,
  //判断是否在某一个圆点
  inBall: inBall
}
