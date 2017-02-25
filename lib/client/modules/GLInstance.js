import invariant from 'invariant';

export const ATTR_POSITION_NAME = 'a_position';
export const ATTR_POSITION_LOC = 0;
export const ATTR_NORMAL_NAME = 'a_norm';
export const ATTR_NORMAL_LOC = 1;
export const ATTR_UV_NAME = 'a_uv';
export const ATTR_UV_LOC = 2;

function GLInstance(canvasId) {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl2');

  invariant(gl, 'WebGL context is not available');

  gl.mMeshCache = [];

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
  };

  gl.fCreateMeshVAO = function({ name, arrayIndex, arrayVertices, arrayNormal, arrayUV }) {
    let rtn = {
      drawMode: this.TRIANGLES,
      vao: this.createVertexArray(),
    };

    this.bindVertexArray(rtn.vao);

    if (arrayVertices !== undefined && arrayVertices != null) {
      rtn.bufferVertices = this.createBuffer();
      rtn.vertexComponentLength = 3;
      rtn.vertexCount = arrayVertices.length / rtn.vertexComponentLength;

      this.bindBuffer(this.ARRAY_BUFFER, rtn.bufferVertices);
      this.bufferData(this.ARRAY_BUFFER, new Float32Array(arrayVertices), this.STATIC_DRAW);
      this.enableVertexAttribArray(ATTR_POSITION_LOC);
      this.vertexAttribPointer(ATTR_POSITION_LOC, 3, this.FLOAT, false, 0, 0);
    }

    if (arrayNormal !== undefined && arrayNormal != null) {
      rtn.bufferNormals = this.createBuffer();

      this.bindBuffer(this.ARRAY_BUFFER, rtn.bufferNormals);
      this.bufferData(this.ARRAY_BUFFER, new Float32Array(arrayNormal), this.STATIC_DRAW);
      this.enableVertexAttribArray(ATTR_NORMAL_LOC);
      this.vertexAttribPointer(ATTR_NORMAL_LOC, 3, this.FLOAT, false, 0, 0);
    }

    if (arrayUV !== undefined && arrayUV != null) {
      rtn.bufferUV = this.createBuffer();

      this.bindBuffer(this.ARRAY_BUFFER, rtn.bufferUV);
      this.bufferData(this.ARRAY_BUFFER, new Float32Array(arrayUV), this.STATIC_DRAW);
      this.enableVertexAttribArray(ATTR_UV_LOC);
      this.vertexAttribPointer(ATTR_UV_LOC, 2, this.FLOAT, false, 0, 0);
    }

    if (arrayIndex !== undefined && arrayIndex != null) {
      rtn.bufferIndex = this.createBuffer();
      rtn.indexCount = arrayIndex.length;

      this.bindBuffer(this.ELEMENT_ARRAY_BUFFER, rtn.bufferIndex);
      this.bufferData(this>ELEMENT_ARRAY_BUFFER, new Uint16Array(arrayIndex), this.STATIC_DRAW);
      this.bindBuffer(this.ELEMENT_ARRAY_BUFFER, null);
    }

    this.bindVertexArray(null);
    this.bindBuffer(this.ARRAY_BUFFER, null);

    this.mMeshCache[name] = rtn;

    return rtn;
  };

  return gl;
}

export default GLInstance;
