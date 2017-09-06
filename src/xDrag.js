!(function (win,Doc) {
  //导入css样式
  let cssText = '.wrapper{position:relative}.dragging{opacity: .8;z-index: 800;}.wrapper,.wrapper>:not(.dragging){-webkit-transition: all 0.4s ease-in-out;transition: all 0.4s ease-in-out;}.box{position:absolute}'
  var head = Doc.getElementsByTagName("head")[0];
  var style = Doc.createElement("style");
  style.innerHTML = cssText;
  head.appendChild(style);

  var xDrag = function (option) {
    var containerDom = Doc.getElementById(option.id);
    var unit = option.unit || 'px'
    var boxs = [].slice.call(document.getElementsByClassName(option.dragClassName), 0);
    var dragged; //当前被拖拽的元素
    var index; //当前拖拽元素在数组中的下标
    var idx;//当前移动到的位置所对应下标
    var move = false;
    var x,
        y;//初始点击时坐标值
    var stamp = 0;//初始点击时的时间戳
    var moveStamp = 0; // 初始移动时的时间戳
    var nowTop,
        nowLeft;//当前拖拽元素的top,left
    var gridGap = option.gridGap || 0
    var rowMax = option.rowMax
    var width = boxs[0].offsetWidth;
    var height = boxs[0].offsetHeight
    var nodeName = boxs[0].localName
    containerDom.addEventListener('mousedown', mouseDown, false)
    sortGrid()
    document.addEventListener('mouseup', mouseUp, false)



    function mouseDown (event) {
      event.preventDefault();
      moveStamp = 0; //每次触发重置
      var target = event.target;
      if( target.nodeName.toLowerCase() === nodeName) {
        dragged = target;
        index = find(dragged, boxs);
        x = event.clientX,
          y = event.clientY
        nowTop  = target.offsetTop
        nowLeft = target.offsetLeft
        target.classList.add('dragging')
        if (!move) {
          stamp = Date.now()
          containerDom.addEventListener('mousemove', mouseMove, false)
        }
      }
    }

    function mouseMove (event) {
      event.preventDefault()
      moveStamp = moveStamp === 0 ? Date.now() : moveStamp
      if (moveStamp-stamp < 600) {
        return
      }
      let top = nowTop + event.clientY - y,
          left = nowLeft + event.clientX - x
      sort(boxs, top, left)
      sortGrid(idx)
      dragged.style.cssText = 'top:'+ top + unit + ';left:'+ left + unit + ';'
    }


    function mouseUp (event) {
      containerDom.removeEventListener('mousemove', mouseMove, false)
      dragged.classList.remove('dragging')
      let endTop =  parseInt(index/rowMax) * (100 + gridGap),
          endLeft = index % rowMax * (100 + gridGap)
      dragged.style.cssText = 'top:'+ endTop + unit + ';left:'+ endLeft + unit + ';'
      move = false
    }

    function sortGrid (idx) {
      boxs.forEach(function(item, num) {
        if (index === num) {
          return
        }
        let top = parseInt(num/rowMax) * (height + gridGap),
            left = num % rowMax * (width + gridGap)
        item.style.cssText = 'top:' + top + unit + ';left:' + left + unit + ';'
      });
    }

    /**
     @method sort 根据当前拖拽元素的位置，对持有可拖拽元素的数组进行重排
     **/
    function sort (array,top,left) {
      idx = Math.round(top / (height + gridGap)) * rowMax + Math.round(left / (width + gridGap))
      if (idx >= 0 && idx < array.length) {
        var curr = array[index]
        array.splice(index,1)
        array.splice(idx,0,curr)
        index = idx
      }
      if (top < - (100 + gridGap)) { // 若移动到顶部优先放到首位
        array.unshift(array[index])
        index = index + 1
        array.splice(index, 1)
        index = 0;
      }
    }
  }





  /**
   @method find 返回待查找项最后一次出现在数组中的下标
   @param item {*} 查找项
   @param array {Array} 查找源
   @return ret {Number}
  **/
  function find(item, array) {
    var ret
    array.forEach(function(i, index) {
      if (i == item) {
        ret = index
      }
    })
    return ret
  }

  win.xDrag = xDrag
})(window,document)
