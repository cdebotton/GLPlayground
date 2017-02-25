import invariant from 'invariant';

function GLInstance(canvasId) {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl2');

  invariant(gl, 'WebGL context is not available');

  gl.clearColor(1.0, 1.0, 1.0, 1.0);


  gl.fClear = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    return this;
  };

  gl.fSetSize = function(w, h) {
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`
    canvas.width = w;
    canvas.height = h;

    gl.viewport(0, 0, w, h);

    return this;
  };

  gl.fCreateArrayBuffer = function({ arrayVertices, isStatic = true }) {
    const bufferVertices = gl.createBuffer();

    this.bindBuffer(this.ARRAY_BUFFER, bufferVertices);
    this.bufferData(this.ARRAY_BUFFER, arrayVertices, isStatic ? this.STATIC_DRAW: this.DYNAMIC_DRAW);
    this.bindBuffer(this.ARRAY_BUFFER, null);

    return bufferVertices;
  }

  return gl;
}

export default GLInstance;
