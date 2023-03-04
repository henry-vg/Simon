const numBtn = 5,
  spaBtn = 30,
  btns = [],
  onTime = 500,
  offTime = 500,
  numbers = true,
  colors = true;

let diaBtn,
  seq = [],
  mySeq = [],
  start,
  labelPoints,
  points = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  diaBtn = (width - (numBtn + 1) * spaBtn) / numBtn;

  background(20);

  start = new startObject();
  labelPoints = new labelPointsObject();

  for (let i = 0; i < numBtn; i++) {
    btns.push(new btnObject(i));
  }

  enableBtns(false);
}

function btnObject(i) {
  this.index = i;
  this.hue = i * floor(255 / numBtn);
  this.outBackColor = color((colors) ? `hsba(${this.hue}, 100%, 100%, 0.5)` : `hsba(${this.hue}, 0%, 0%, 0.5)`);
  this.outForeColor = color((colors) ? `hsba(${this.hue}, 100%, 80%, 1)` : `hsba(${this.hue}, 0%, 20%, 1)`);
  this.outBorderColor = color((colors) ? `hsba(${this.hue}, 100%, 80%, 1)` : `hsba(${this.hue}, 0%, 20%, 1)`);
  this.overBackColor = color((colors) ? `hsba(${this.hue}, 100%, 80%, 1)` : `hsba(${this.hue}, 0%, 20%, 1)`);
  this.overForeColor = color((colors) ? `hsba(${this.hue}, 100%, 100%, 0.5)` : `hsba(${this.hue}, 0%, 0%, 0.5)`);
  this.overBorderColor = color((colors) ? `hsba(${this.hue}, 100%, 100%, 0.5)` : `hsba(${this.hue}, 0%, 0%, 0.5)`);
  this.disabledBackColor = color((colors) ? `hsba(${this.hue}, 100%, 100%, 0.16)` : `hsba(${this.hue}, 0%, 0%, 0.16)`);
  this.disabledForeColor = color((colors) ? `hsba(${this.hue}, 100%, 80%, 0.33)` : `hsba(${this.hue}, 0%, 20%, 0.33)`);
  this.disabledBorderColor = color((colors) ? `hsba(${this.hue}, 100%, 80%, 0.33)` : `hsba(${this.hue}, 0%, 20%, 0.33)`);
  this.glowColor = color((colors) ? `hsba(${this.hue}, 100%, 100%, 1)` : `hsba(${this.hue}, 0%, 0%, 1)`);
  this.btn = createButton((numbers) ? str(i + 1) : '');
  this.btn.size(diaBtn, diaBtn);
  this.btn.style('background', this.outBackColor);
  this.btn.style('color', this.outForeColor);
  this.btn.style('border', `${diaBtn / 20}px solid ${this.outBorderColor}`);
  this.btn.style('border-radius', '50%');
  this.btn.style('font', `${2 * diaBtn / 5}px Verdana`);
  this.btn.style('outline-style', 'none');
  this.btn.style('user-select', 'none');
  this.btn.style('cursor', 'pointer');
  this.btn.position(spaBtn + i * (spaBtn + diaBtn), (height - diaBtn) / 2);
  this.btn.mouseOver(function () { btnOver(btns[i]) });
  this.btn.mouseOut(function () { btnOut(btns[i]) });
  this.btn.mouseClicked(function () { btnClick(btns[i]) });
  this.blink = function () {
    this.btn.style('box-shadow', `0 0 ${diaBtn / 3}px ${diaBtn / 25}px ${this.glowColor}`);

    setTimeout(function (obj) {
      obj.btn.style('box-shadow', 'none');
    }, onTime, btns[this.index]);
  }
}

function startObject() {
  const fontSize = 0.04 * width;
  this.outBackColor = color('rgba(125, 125, 125, 1)');
  this.outForeColor = color('rgba(20, 20, 20, 1)');
  this.outBorderColor = color('rgba(20, 20, 20, 1)');
  this.overBackColor = color('rgba(20, 20, 20, 1)');
  this.overForeColor = color('rgba(125, 125, 125, 1)');
  this.overBorderColor = color('rgba(125, 125, 125, 1)');
  this.btn = createButton('Start!');
  this.btn.size(fontSize * 6, fontSize * 3);
  this.btn.style('background', this.outBackColor);
  this.btn.style('color', this.outForeColor);
  this.btn.style('border', `${this.btn.height / 20}px solid ${this.outBorderColor}`);
  this.btn.style('border-radius', '0.5em');
  this.btn.style('font', `${fontSize}px Verdana`);
  this.btn.style('outline-style', 'none');
  this.btn.style('user-select', 'none');
  this.btn.style('cursor', 'pointer');
  this.btn.position((width - this.btn.width) / 2, height - this.btn.height - spaBtn);
  this.btn.mouseOver(startOver);
  this.btn.mouseOut(startOut);
  this.btn.mouseClicked(startClick);
}

function labelPointsObject() {
  const fontSize = 0.05 * width;
  this.div = createDiv('');
  this.div.size(width, fontSize);
  this.div.position(0, spaBtn);
  this.div.style('color', 'white');
  this.div.style('background', 'transparent');
  this.div.style('text-align', 'center');
  this.div.style('font', `${fontSize}px Verdana`);
  this.div.style('outline-style', 'none');
  this.div.style('user-select', 'none');
  this.div.style('line-height', `${fontSize}px`);
}

function btnOver(obj) {
  obj.btn.style('background', obj.overBackColor);
  obj.btn.style('color', obj.overForeColor);
  obj.btn.style('border', `${diaBtn / 20}px solid ${obj.overBorderColor}`);
}

function btnOut(obj) {
  obj.btn.style('background', obj.outBackColor);
  obj.btn.style('color', obj.outForeColor);
  obj.btn.style('border', `${diaBtn / 20}px solid ${obj.outBorderColor}`);
}

function btnClick(obj) {
  mySeq.push(obj.index);
  const turn = mySeq.length - 1;
  if (mySeq[turn] != seq[turn]) {
    gameOver();
  }
  else if (turn == seq.length - 1) {
    points++;
    labelPoints.div.html(`Points: ${points}`, false);
    enableBtns(false);
    genSeq();
    background(0, 255, 0, 100);
    setTimeout(function () {
      background(20);
      startBlinking();
    }, offTime);
  }
}

function startOver() {
  start.btn.style('background', start.overBackColor);
  start.btn.style('color', start.overForeColor);
  start.btn.style('border', `${diaBtn / 20}px solid ${start.overBorderColor}`);
}

function startOut() {
  start.btn.style('background', start.outBackColor);
  start.btn.style('color', start.outForeColor);
  start.btn.style('border', `${diaBtn / 20}px solid ${start.outBorderColor}`);
}

function startClick() {
  background(20);
  seq = [];
  points = 0;
  start.btn.style('display', 'none');
  labelPoints.div.html(`Points: ${points}`, false);
  genSeq();
  startBlinking();
}

function genSeq() {
  seq.push(floor(random(numBtn)));
}

function startBlinking() {
  mySeq = [];
  let n = 0;

  const interval = setInterval(function () {
    btns[seq[n]].blink();
    n++;
    if (n >= seq.length) {
      clearInterval(interval);
      setTimeout(function () {
        enableBtns(true);
      }, offTime);
    }
  }, onTime + offTime);
}

function enableBtns(enable) {
  if (enable) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].btn.removeAttribute('disabled');
      btns[i].btn.style('cursor', 'pointer');
      btns[i].btn.style('background', btns[i].outBackColor);
      btns[i].btn.style('color', btns[i].outForeColor);
      btns[i].btn.style('border', `${diaBtn / 20}px solid ${btns[i].outBorderColor}`);
    }
  }
  else {
    for (let i = 0; i < btns.length; i++) {
      btns[i].btn.attribute('disabled', '');
      btns[i].btn.style('cursor', 'auto');
      btns[i].btn.style('background', btns[i].disabledBackColor);
      btns[i].btn.style('color', btns[i].disabledForeColor);
      btns[i].btn.style('border', `${diaBtn / 20}px solid ${btns[i].disabledBorderColor}`);
    }
  }
}

function gameOver() {
  background(255, 0, 0, 100);
  enableBtns(false);
  labelPoints.div.html(`GAME OVER! You made ${points} point${(points != 1) ? 's' : ''}.`, false);
  start.btn.html('Restart');
  start.btn.style('display', 'block');
}