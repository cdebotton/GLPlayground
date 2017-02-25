import './styles/index.css';

import GLInstance from './modules/GLInstance';
import ShaderUtil from './modules/ShaderUtil';
import RenderLoop from './modules/RenderLoop';

import vertex from './glsl/vertex.vs';
import fragment from './glsl/fragment.fs';

const gl = GLInstance('glcanvas');
let gVertexCount = 0;
let uPointSizeLocation = -1;
let uAngle = 0;
let gRLoop;

gl.fSetSize(500, 500)
  .fClear();


const program = ShaderUtil.domShaderProgram({
  gl,
  vertex,
  fragment,
  doValidate: true,
});

gl.useProgram(program);

const aPositionLocation = gl.getAttribLocation(program, 'a_position');
uAngle = gl.getUniformLocation(program, 'uAngle');
uPointSizeLocation = gl.getUniformLocation(program, 'uPointSize');

gl.useProgram(null);

const arrayVertices = new Float32Array([0, 0, 0]);
const bufferVertices = gl.fCreateArrayBuffer({ arrayVertices, isStatic: true });

gVertexCount = arrayVertices.length / 3;

gl.useProgram(program);

gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertices);
gl.enableVertexAttribArray(aPositionLocation);
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

let gPointSize = 0;
const gPointSizeStep = 3;
let gAngle = 0;
const gAngleStep = (Math.PI / 180) * 90;

const onRender = (dt) => {
  gPointSize += gPointSizeStep * dt;
  const size = (Math.sin(gPointSize) * 10) + 30;

  gl.uniform1f(uPointSizeLocation, size);

  gAngle += gAngleStep * dt;
  gl.uniform1f(uAngle, gAngle);

  gl.fClear();
  gl.drawArrays(gl.POINTS, 0, gVertexCount);
};

const render = new RenderLoop(onRender).start();
