var faces = [];
// var leftEye = [];
// var rightEye = [];
// var head = [];
// var mouth = [];
// var center = [];
// var eyeCenter = [];

var numberOfFaces = 0;

var zoom = 2;

// var button;

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  // if (faces.length >= 1) {

    for (var i = 0; i < faces.length; i++) {
      DrawFace(faces[i]);

    // }
  }
  console.log(numberOfFaces + "/" + faces.length);
}

function DrawFace(face) {

  if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
      face.state === brfv4.BRFState.FACE_TRACKING) {
    // fDS : face dots shifted
    numberOfFaces +=1;
    
    //translate to center
    let center = {
      x: face.points[29].x,
      y: face.points[29].y,
    }

    let head = {
      w: face.points[16].x - face.points[0].x,
      h: (face.points[8].y - face.points[29].y) * 2,
    }

    let leftEye = {
      x: face.points[41].x - center.x,
      y: face.points[41].y - center.y,
      w: face.points[40].x - face.points[41].x,
      h: face.points[40].y - face.points[38].y,
    }

    let rightEye = {
      x: face.points[46].x - center.x,
      y: face.points[46].y - center.y,
      w: face.points[46].x - face.points[47].x,
      h: face.points[47].y - face.points[43].y,
    }

    let upperLip = {
      x1: face.points[48].x - center.x,
      y1: face.points[48].y - center.y,
      x2: face.points[61].x - center.x,
      y2: face.points[61].y - center.y,
      x3: face.points[63].x - center.x,
      y3: face.points[63].y - center.y,
      x4: face.points[54].x - center.x,
      y4: face.points[54].y - center.y,
    }

    let lowerLip = {
      x2: face.points[67].x - center.x,
      y2: face.points[67].y - center.y,
      x3: face.points[65].x - center.x,
      y3: face.points[65].y - center.y,
    }

    // culculate angle of tilt

    let a = atan2(face.points[16].x - face.points[0].x, face.points[16].y - face.points[0].y,);

    // draw

    push();
    translate(center.x, center.y);
    rotate(-a + 90);

    // draw head
    fill(255);
    stroke(0);
    strokeWeight(4);
    ellipse(0, 0, head.w * 1.2, head.h);


    // draw lips

    bezier(
      upperLip.x1, upperLip.y1 * 0.95,
      upperLip.x2, upperLip.y2,
      upperLip.x3, upperLip.y3,
      upperLip.x4, upperLip.y4 * 0.95,
    );
    bezier(
      upperLip.x1, upperLip.y1 * 0.95,
      lowerLip.x2, lowerLip.y2,
      lowerLip.x3, lowerLip.y3,
      upperLip.x4, upperLip.y4 * 0.95,
    );

    // draw eyes
    fill(0);
    ellipse(leftEye.x, leftEye.y, leftEye.w, leftEye.h);
    ellipse(rightEye.x, rightEye.y, rightEye.w, rightEye.h);

    pop();

//     let fDS = [];
//     let center = [
//       (face.vertices[0 * 2] + (face.vertices[16 * 2] - face.vertices[0 * 2]) / 2) * 2,
//       (face.vertices[1 * 2 + 1] + (face.vertices[15 * 2 + 1] - face.vertices[1 * 2 + 1]) / 2) * 2,
//     ];
//     // print (face);

//     // print(face.points[0].x, face.points[0].y, face.points[1].x, face.points[1].y);

//     for (var i = 0; i < face.vertices.length; i += 2) {
//       fDS[i / 2] = [face.vertices[i] * 2 - center[0], face.vertices[i + 1] * 2 - center[1]];
//     }

//     let head = [
//       0, 0,
//       fDS[16][0] - fDS[0][0],
//       (fDS[8][1] - fDS[29][1]) * 2
//     ];

//     let leftEye = [
//       fDS[41][0] + (fDS[40][0] - fDS[41][0]),
//       fDS[41][1],
//       fDS[40][0] - fDS[41][0],
//       fDS[40][1] - fDS[38][1],
//     ]
//     let rightEye = [
//       fDS[47][0] + (fDS[46][0] - fDS[47][0]) / 2,
//       fDS[46][1],
//       fDS[46][0] - fDS[47][0],
//       fDS[47][1] - fDS[43][1],
//     ]
//     let mouth = [
//       fDS[60][0] + (fDS[64][0] - fDS[60][0]) / 2,
//       fDS[62][1],
//       fDS[64][0] - fDS[60][0],
//       fDS[66][1] - fDS[62][1],
//     ]

//     let a = atan2(fDS[16][0] - fDS[0][0], fDS[16][1] - fDS[0][1]);

//     push();
//     translate(center[0], center[1]);
//     rotate(-a + 90);
//     fill(255);
//     stroke(0);
//     strokeWeight(4);
//     ellipse(head[0], head[1], head[2] * 1.2, head[3]);
//     bezier(
//       fDS[48][0], fDS[48][1] * 0.95,
//       fDS[67][0], fDS[67][1],
//       fDS[65][0], fDS[65][1],
//       fDS[54][0], fDS[54][1] * 0.95,
//     );
//     bezier(
//       fDS[48][0], fDS[48][1] * 0.95,
//       fDS[61][0], fDS[61][1],
//       fDS[63][0], fDS[63][1],
//       fDS[54][0], fDS[54][1] * 0.95,
//     );
//     pop();

//     push();
//     translate(center[0], center[1]);
//     rotate((-a + 90));
//     // console.log(-a, -a + 90, (-a + 90) / 2);
//     fill(0);
//     ellipse(leftEye[0], leftEye[1], leftEye[2] * 1.2, leftEye[3] * 1.2);
//     // bezier(
//     // 	fDS[37][0],fDS[37][1],
//     // 	fDS[38][0],fDS[38][1],
//     // 	fDS[40][0],fDS[40][1],
//     // 	fDS[41][0],fDS[41][1],
//     // );
//     // bezier(
//     // 	fDS[38][0],fDS[38][1],
//     // 	fDS[37][0],fDS[37][1],
//     // 	fDS[41][0],fDS[41][1],
//     // 	fDS[40][0],fDS[40][1],
//     // );
//     ellipse(rightEye[0], rightEye[1], rightEye[2] * 1.2, rightEye[3] * 1.2);

//     pop();

//     // for (var k = 0; k < fDS.length; k += 1) {
//     //   let x = fDS[k][0];
//     //   let y = fDS[k][1];
//     //   noStroke();
//     //   fill(200);
//     //   push();
//     //   translate(center[0], center[1]);
//     //   ellipse(x, y, 2, 2);
//     //   pop();
//     // }
  }
}
