var KEYCODE_LIST = [32, 37, 38, 39, 40]

function keyDownListener(evt) {
	var evt  = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
 
  if (KEYCODE_LIST.indexOf(evt.keyCode) != -1) {
    keys[evt.keyCode] = true;
  }
}

function keyUpListener(evt) {
	var evt  = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);

  if (KEYCODE_LIST.indexOf(evt.keyCode) != -1) {
    keys[evt.keyCode] = false;
  }
}

document.addEventListener("keydown", keyDownListener, false);
document.addEventListener("keyup",   keyUpListener, false);