import Shader from '../../modules/Shader';

import vertex from './glsl/vertex.vs';
import fragment from './glsl/fragment.fs';

class TestShader extends Shader {
  constructor(gl) {
    super(gl, vertex, fragment);

    this.uniformLoc.uPointSize = gl.getUniformLocation(this.program, 'uPointSize');
    this.uniformLoc.uAngle = gl.getUniformLocation(this.program, 'uAngle');

    gl.useProgram(null);
  }

  set({ size, angle }) {
    this.gl.uniform1f(this.uniformLoc.uPointSize, size);
    this.gl.uniform1f(this.uniformLoc.uAngle, size);

    return this;
  }
}

export default TestShader;
