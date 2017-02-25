import './styles/index.css';

import GLInstance from './modules/GLInstance';
import RenderLoop from './modules/RenderLoop';
import Model from './modules/Model';

import TestShader from './shaders/TestShader';

const gl = GLInstance('glcanvas')
  .fSetSize(500, 500)
  .fClear();

let uPointSizeLocation = -1;
let uAngle = 0;

const gShader = new TestShader(gl);

const mesh = gl.fCreateMeshVAO({
  name: 'dots',
  arrayIndex: null,
  arrayVertices: [0, 0, 0],
});

mesh.drawMode = gl.POINTS;

const gModel = new Model(mesh);
const gPointSizeStep = 3;
const gAngleStep = (Math.PI / 180) * 90;

let gPointSize = 0;
let gAngle = 0;

const onRender = (dt) => {
  gl.fClear();

  gShader
    .activate()
    .set({
      size: (Math.sin((gPointSize += gPointSizeStep * dt)) * 10) + 30,
      angle: gAngle += gAngleStep * dt
    })
    .renderModel(gModel);
};

const render = new RenderLoop(onRender).start();
