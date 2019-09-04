var sortInit = "&#x22EE;";
var sortAscending = "&darr;";
var sortDescending = "&uarr;";


/*
* Support Array.from For IE
* From MDN polyfill -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill
*/
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}

/*
* Support Array.find For IE (PolyFill)
* From https://tc39.github.io/ecma262/#sec-array.prototype.find
*/
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

/*
* Support String.prototype.includes For IE (PolyFill)
* From https://tc39.github.io/ecma262/#sec-array.prototype.find
*/
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }


  // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function(predicate) {
       // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return -1.
        return -1;
      },
      configurable: true,
      writable: true
    });
  }

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

function addStyles(){
  let head = document.getElementsByTagName('HEAD')[0];
  let link = document.createElement('link');
  link.rel = 'stylesheet';

  link.type = 'text/css';
  link.href = '../styles/tables.css';
  head.appendChild(link);
  //console.log("added styles");
}
function loadWindow(){
  addStyles();
}

function initTable(container, width, height){
  let tableOuter = document.createElement("div");
  tableOuter.classList.add("hp-tables-table-outer");
  tableOuter.style.width = (parseInt(width.replace("px" , "")) + 10) + "px";
  tableOuter.style.height = height;
  container.appendChild(tableOuter);
  left = (parseInt(tableOuter.clientWidth) - 10) + "px";
  right = "10px";
  console.log(left);

  let spaceForScroll = document.createElement("div");
  spaceForScroll.classList.add("hp-tables-table-scroll");
  spaceForScroll.style.width = left;

  tableInnerTop = document.createElement("div");
  tableInnerTop.classList.add("hp-tables-table-head");
  tableOuterContent = document.createElement("div");
  tableInnerContent = document.createElement("div");
  tableInnerContent.classList.add("hp-tables-table-content");
  //tableOuter.appendChild(spaceForScroll);

  tableOuter.appendChild(tableInnerTop);
  tableOuterContent.appendChild(tableInnerContent)
  tableOuter.appendChild(tableOuterContent);

  tableInnerTop.style.width = left;
  tableOuterContent.style.width = tableOuter.clientWidth + "px";
  tableInnerContent.style.width = left;


  tableInnerTop.style.height = "30px";
  tableOuterContent.style.height = (tableOuter.clientHeight - 32) + "px";
  tableOuterContent.classList.add("hp-tables-table-outer-content")
  return {header: tableInnerTop, entries: tableInnerContent};
}

function moveAllChildrenWithParent(htmlObj, moveX){
  let classes = Array.from(htmlObj.classList);
  let classOfCol = classes.find(function(objClass){ return objClass.includes("hp-table-column")});
  let allElementsOfCol = Array.from(document.getElementsByClassName(classOfCol));
  allElementsOfCol.forEach(function(element) {element.style.width = (parseInt(element.style.width.replace("px" , "")) + moveX) + "px"});

}

function getMovement(e, border) {
    return e.clientX - border.offsetLeft;
}

function resize(border , headersOnLeft, headersOnRight, index, evt){
  if(!evt.movementX){
    // Support for IE
    evt.movementX = getMovement(evt, border);
  }
  evt.movementX = parseInt(evt.movementX);
  lastHeaderOnLeft = headersOnLeft[headersOnLeft.length -1];
  firstHeaderOnRight = headersOnRight[0];
  widthOfLeft = lastHeaderOnLeft.clientWidth;
  widthOfRight = firstHeaderOnRight.clientWidth;

  minWidthLeft = parseInt((window.getComputedStyle(lastHeaderOnLeft).getPropertyValue("min-width")).replace("px", ""));
  minWidthRight = parseInt((window.getComputedStyle(firstHeaderOnRight).getPropertyValue("min-width")).replace("px", ""));
  if((widthOfLeft + evt.movementX) > minWidthLeft && (widthOfRight - evt.movementX) > minWidthRight){
    moveAllChildrenWithParent(firstHeaderOnRight , -(evt.movementX));
    moveAllChildrenWithParent(lastHeaderOnLeft , evt.movementX);
  }
}

function stopResize(boundResize){
  window.removeEventListener('mousemove' , boundResize);
}

function addBorderListeners(border , index){
  let allHeaders = Array.from(document.querySelectorAll(".hp-tables-table-head .hp-table-item"));
  let headersOnLeft = allHeaders.slice(0, index+1);
  let headersOnRight = allHeaders.slice(index+1);
  /*
  * Credits: https://medium.com/@nguynvithng_34102
  * From the article https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
  */
  border.addEventListener('mousedown' , function(evt) {
    evt.preventDefault();
    let boundResize = resize.bind(this, border, headersOnLeft, headersOnRight, index)
    window.addEventListener('mousemove' , boundResize);
    window.addEventListener('mouseup' , stopResize.bind(this, boundResize));
    });
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function getNextState(curState){
  let nextState = sortInit;
  if(curState === decodeHtml(sortInit)){
    nextState = sortAscending;
  }
  else if(curState === decodeHtml(sortAscending)){
    nextState = sortDescending;
  }
  else if(curState === decodeHtml(sortDescending)){
    nextState = sortAscending;
  }
  return nextState;
}

function sortButtonClicked(evt){
  let target = evt.target;
  let parent = target.parentElement ? target.parentElement : target.parentNode;
  let gParent = parent.parentElement ? parent.parentElement : parent.parentNode;
  let currentState = target.innerText;
  let nextState = getNextState(currentState);
  let allEntries = document.querySelectorAll(".hp-tables-table-entry");
  var len = allEntries.length;
  var indices = new Array(len);
  for (var i = 0; i < len; ++i) indices[i] = i;

  let sortButtons = Array.from(document.querySelectorAll(".hp-table-item-sort-state"));
  sortButtons.forEach(function(sortButton){sortButton.innerHTML = sortInit});
  let indexOfParent = Array.from(gParent.children).findIndex(function(myChild){return myChild == parent});
  let tableContent = document.querySelector(".hp-tables-table-content");
  //console.log(indexOfParent);
  if(nextState === sortDescending){
    //Sort In descending order
    indices.sort(function (a, b) {
      value1 = allEntries[a];
      value2 = allEntries[b];
      let v1 = value1.children[indexOfParent].querySelector(".hp-table-item-inner-name span");
      let v2 = value2.children[indexOfParent].querySelector(".hp-table-item-inner-name span");
      if(v1.innerText > v2.innerText) return 1;
      if(v1.innerText < v2.innerText) return -1;
      return 0;
    });
    indices.forEach(function(index){
      tableContent.appendChild(allEntries[index]);
    });
  }
  else {
    //Sort In ascending order
    indices.sort(function (a, b) {
      value1 = allEntries[a];
      value2 = allEntries[b];
      let v1 = value1.children[indexOfParent].querySelector(".hp-table-item-inner-name span");
      let v2 = value2.children[indexOfParent].querySelector(".hp-table-item-inner-name span");
      if(v1.innerText < v2.innerText) return 1;
      if(v1.innerText > v2.innerText) return -1;
      return 0;
    });
    indices.forEach(function(index){
      tableContent.appendChild(allEntries[index]);
    });
  }

  target.innerHTML = nextState;

}


function addHeaders(table , headersObj){
    table.headerObjects = headersObj;
    let header = table.header;
    headersObj.forEach(function(headerObj , index){
      let headerHTML = document.createElement("div");
      headerHTML.classList.add("hp-table-item");
      headerHTML.classList.add("hp-table-column-" + (headerObj.name).split(" ").join("-"));
      headerHTML.style.height = "30px";
      let headerHTMLInnerName = document.createElement("div");
      headerHTMLInnerName.classList.add("hp-table-item-inner-name");
      let headerHTMLInnerSortState = document.createElement("div");
      headerHTMLInnerSortState.classList.add("hp-table-item-sort-state");
      headerHTMLInnerName.innerHTML = '<span>' + headerObj.name + '</span>';
      header.appendChild(headerHTML);

      //last index dont add a border on right
      if(index != headersObj.length - 1){

        let width = (headerObj.width.replace("px" , "") - 2) + "px";
        headerHTML.style.width = width;
        border = document.createElement("div");
        border.classList.add("hp-table-item-border");
        border.style.height = "30px";
        header.appendChild(border);

      }
      else{
        headerHTML.style.width = headerObj.width;
      }
      headerHTML.appendChild(headerHTMLInnerName);
      if(headerObj.sortable){
        headerHTMLInnerSortState.innerHTML  = sortInit;
        headerHTML.appendChild(headerHTMLInnerSortState);
      }
    });

    borders = Array.from(document.querySelectorAll(".hp-tables-table-head .hp-table-item-border"));

    borders.forEach(function(border , index){addBorderListeners(border,index)});

    sortButtons = Array.from(document.querySelectorAll(".hp-table-item-sort-state"));
    sortButtons.forEach(function(sortButton,index){sortButton.onclick = sortButtonClicked});
}

function addEntries(table , entries){
  let headersObj = table.headerObjects;
  let header = table.header;
  entries.forEach(function(entry){
    let htmlEntry = document.createElement("div");
    htmlEntry.classList.add("hp-tables-table-entry");
    table.entries.appendChild(htmlEntry);
    headersObj.forEach(function(headerObj , index){
      let objName = headerObj.name;
      let objSelection = entry[objName];
      let objHTML = document.createElement("div");
      objHTML.classList.add("hp-table-item");
      objHTML.classList.add("hp-table-column-" + (headerObj.name).split(" ").join("-"));
      objHTML.style.height = "35px";
      let objHTMLInnerName = document.createElement("div");
      objHTMLInnerName.classList.add("hp-table-item-inner-name");
      switch(headerObj.type){
        case 'stateColor': {
                    let stateMap = headerObj.states;
                    let colorToShow = stateMap[objSelection];
                    let coloredDiv = document.createElement("div");
                    coloredDiv.classList.add("hp-tables-cell-state-color");
                    if(colorToShow){
                      coloredDiv.style.background = colorToShow;
                    }
                    else{
                      coloredDiv.style.background = 'white';
                    }
                    objHTMLInnerName.appendChild(coloredDiv);
                    break;
                  }
        case 'roundedStateColor': {
                    let stateMap = headerObj.states;
                    let colorToShow = stateMap[objSelection];
                    let coloredDiv = document.createElement("div");
                    coloredDiv.classList.add("hp-tables-cell-state-color");
                    coloredDiv.classList.add("hp-tables-cell-state-color-round");
                    if(colorToShow){
                      coloredDiv.style.background = colorToShow;
                    }
                    else{
                      coloredDiv.style.background = 'white';
                    }
                    objHTMLInnerName.appendChild(coloredDiv);
                    break;
                  }
        default: {
                  if(objSelection){
                    objHTMLInnerName.innerHTML = '<span>' + objSelection + '</span>';
                  }
                  else{
                    objHTMLInnerName.innerHTML = "<br/>"
                  }
                  break;
                }
      }
      htmlEntry.appendChild(objHTML);
      //last index dont add a border on right
      if(index != headersObj.length - 1){
        width = (headerObj.width.replace("px" , "") - 2) + "px";
        objHTML.style.width = width;
        border = document.createElement("div");
        border.classList.add("hp-table-item-border");
        border.style.height = "35px";
        htmlEntry.appendChild(border);

      }
      else{
        objHTML.style.width = headerObj.width;
      }
      objHTML.appendChild(objHTMLInnerName);
    });
  });
}


window.onload = loadWindow;
