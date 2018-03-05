var faces = [];

var numberOfFaces = 0;

function setup() {
  var canvas = createCanvas(960, 720);
  canvas.parent('sketch-holder');
  ellipseMode(CENTER);
  angleMode(DEGREES);

  // button = createButton('Start');
  // button.position(videoSelect.x + videoSelect.width, 65);
  // button.mousePressed(start);
  // button.mousePressed(initExample);
}

function draw() {
  numberOfFaces = 0;
  background(255);

  for (var i = 0; i < faces.length; i++) {
    DrawFace(faces[i]);
  }

  if (numberOfFaces != 0) {
    console.log(faces[1]);
  } else if (frameCount % 30 == 0) {
    console.log(numberOfFaces + "/" + faces.length);
  }
}

function DrawFace(face) {

  if (face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING) {
    // fDS : face dots shifted
    numberOfFaces += 1;

    let fDS = [];

    let center = {
      x: (face.points[0].x + (face.points[16].x - face.points[0].x) / 2),
      y: (face.points[1].y + (face.points[15].y - face.points[1].y) / 2)
    }

    for (var i = 0; i < face.points.length; i += 1) {
      fDS[i] = {
        x: face.points[i].x - center.x,
        y: face.points[i].y - center.y
      }
    }

    let head = [
      0, 0, fDS[16].x - fDS[0].x,
      (fDS[8].y - fDS[29].y) * 2
    ];

    let leftEye = [
      fDS[41].x + (fDS[40].x - fDS[41].x) / 2,
      fDS[41].y,
      fDS[40].x - fDS[41].x,
      fDS[40].y - fDS[38].y
    ]

    let rightEye = [
      fDS[47].x + (fDS[46].x - fDS[47].x) / 2,
      fDS[46].y,
      fDS[46].x - fDS[47].x,
      fDS[47].y - fDS[43].y
    ]

    let lowerLip = [
      fDS[48].x,
      fDS[48].y * 0.95,
      fDS[67].x,
      fDS[67].y,
      fDS[65].x,
      fDS[65].y,
      fDS[54].x,
      fDS[54].y * 0.95
    ]

    let upperLip = [
      fDS[48].x,
      fDS[48].y * 0.95,
      fDS[61].x,
      fDS[61].y,
      fDS[63].x,
      fDS[63].y,
      fDS[54].x,
      fDS[54].y * 0.95
    ]

    let a = atan2(fDS[16][0] - fDS[0][0], fDS[16][1] - fDS[0][1]);

    push();
    translate(center.x, center.y);
    rotate(-a + 90);
    fill(255);
    stroke(0);
    strokeWeight(4);
    ellipse(head[0], head[1], head[2] * 1.2, head[3]);
    bezier(lowerLip[0], lowerLip[1], lowerLip[2], lowerLip[3], lowerLip[4], lowerLip[5], lowerLip[6], lowerLip[7]);
    bezier(upperLip[0], upperLip[1], upperLip[2], upperLip[3], upperLip[4], upperLip[5], upperLip[6], upperLip[7]);
    pop();

    push();
    translate(center.x, center.y);
    rotate((-a + 90));
    fill(0);
    ellipse(leftEye[0], leftEye[1], leftEye[2] * 1.2, leftEye[3] * 1.2);
    ellipse(rightEye[0], rightEye[1], rightEye[2] * 1.2, rightEye[3] * 1.2);
    pop();

  }
}

var Monitor = (opacity) => {
  document.getElementById("_imageData").style.opacity = opacity;
}
