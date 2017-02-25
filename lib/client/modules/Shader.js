import ShaderUtil from './ShaderUtil';

class Shader {
  constructor(gl, vertexShaderSrc, fragShaderSrc) {
    this.program = ShaderUtil.createProgramFromText({
      gl,
      vertex: vertexShaderSrc,
      fragment: fragShaderSrc,
    });

    if (this.program !== null) {
      this.gl = gl;
      gl.useProgram(this.program);
      this.attribLoc = ShaderUtil.getStandardAttribLocations(gl, this.program);
      this.uniformLoc = {};
    }
  }

  activate() {
    this.gl.useProgram(this.program);

    return this;
  }

  deactivate() {
    this.gl.useProgram(null);
    return this;
  }

  dispose() {
    if (this.gl.getParameter(this.gl.CURRENT_PROGRAM) === this.program) {
      this.gl.useProgram(null);
    }
    this.gl.deleteProgram(this.program);
  }

  prerender() {

  }

  renderModel(model) {
    this.gl.bindVertexArray(model.mesh.vao);

    if (model.mesh.indexCount) {
      this.gl.drawElements(model.mesh.drawMode, model.mesh.indexLength, gl.UNSIGNED_SHORT, 0);
    } else {
      this.gl.drawArrays(model.mesh.drawMode, 0, model.mesh.vertexCount);
    }

    this.gl.bindVertexArray(null);

    return this;
  }
}

export default Shader;
