import invariant from 'invariant';

import {
  ATTR_POSITION_LOC,
  ATTR_POSITION_NAME,
  ATTR_NORMAL_LOC,
  ATTR_NORMAL_NAME,
  ATTR_UV_LOC,
  ATTR_UV_NAME,
} from './GLInstance';

class ShaderUtil {
  static createProgramFromText({ gl, vertex, fragment, doValidate = true }) {
    const vs = ShaderUtil.createShader(gl, vertex, gl.VERTEX_SHADER);
    if (!vs) {
      return null;
    }

    const fs = ShaderUtil.createShader(gl, fragment, gl.FRAGMENT_SHADER);
    if (!fs) {
      gl.deleteShader(vs);
      return null;
    }

    return ShaderUtil.createProgram(gl, vs, fs, doValidate);
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

    gl.bindAttribLocation(program, ATTR_POSITION_LOC, ATTR_POSITION_NAME);
    gl.bindAttribLocation(program, ATTR_NORMAL_LOC, ATTR_NORMAL_NAME);
    gl.bindAttribLocation(program, ATTR_UV_LOC, ATTR_UV_NAME);

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

  static getStandardAttribLocations(gl, program) {
    return {
      position: gl.getAttribLocation(program, ATTR_POSITION_NAME),
      norm: gl.getAttribLocation(program, ATTR_NORMAL_NAME),
      uv: gl.getAttribLocation(program, ATTR_UV_NAME),
    };
  }
}

export default ShaderUtil;
