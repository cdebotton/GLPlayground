import invariant from 'invariant';

class ShaderUtil {
  static domShaderProgram({ gl, vertex, fragment, doValidate }) {
    invariant(
      'string' === typeof vertex,
      `Expected vertex to be a string, received ${typeof vertex}`,
    );

    invariant(
      'string' === typeof fragment,
      `Expected fragment to be a string, received ${typeof fragment}`,
    );

    const vs = ShaderUtil.createShader(gl, vertex, gl.VERTEX_SHADER);
    invariant(vs, `Unable to create vertex shader from ${vertex}.`);

    const fs = ShaderUtil.createShader(gl, fragment, gl.FRAGMENT_SHADER);
    invariant(fs, `Unable to create fragment shader from${fragment}.`);

    return ShaderUtil.createProgram(gl, vs, fs, true);
  }

  static createShader(gl, src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      throw new Error(`Error compiling shader: ${src}, [${gl.getShaderInfoLog(shader)}]`);
    }

    return shader;
  }

  static createProgram(gl, vs, fs, doValidate) {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      throw new Error(`Error creating shader program: ${gl.getProgramInfoLog(program)}`);
    }

    if (doValidate) {
      gl.validateProgram(program);
      if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        gl.deleteProgram(program);
        throw new Error(`Error validating program: ${gl.getProgramInfoLog(program)}`);
      }
    }

    gl.detachShader(program, vs);
    gl.detachShader(program, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return program;
  }
}

export default ShaderUtil;
