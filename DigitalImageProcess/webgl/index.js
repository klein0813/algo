let fragMain;
let key;

const canvas = document.getElementById('webgl');
const gl = canvas.getContext('webgl');
const vertexShaderSource = `
  attribute vec4 apos;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = apos;
    v_texCoord = a_texCoord;
  }
`;

fetch('./index.glsl').then(res => res.text()).then((text) => {
  fragMain = text;
  render();
});

// document.getElementsByName('button')
Array.prototype.forEach.call(document.getElementsByTagName('button'), (button) => {
  button.onclick = function () {
    const target = this.getAttribute('data-key');
    if (target !== key) {
      key = target;
      render(key);
    }
  }
});

function render(key) {
  if (key) {
    fetch(`./${key}.glsl`).then(res => res.text()).then((fragHander) => {
      draw(fragMain, fragHander);
    });
  } else {
    draw(fragMain);
  }
}

function draw(fragMain, fragHander = '') {
  fragmentShaderSource = `${fragHander}\n${fragMain}`;
  const aposData = new Float32Array([-1,0.5, 1,0.5, 1,-.5, -1,-.5]);
  const texCoordData = new Float32Array([0,1, 1,1, 1,0, 0,0]);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const posLocation = gl.getAttribLocation(program, 'apos');
  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, aposData, gl.STATIC_DRAW);
  gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posLocation);

  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, texCoordData, gl.STATIC_DRAW);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(texCoordLocation);

  const u_sampler = gl.getUniformLocation(program, 'u_sampler');
  // 创建纹理图像缓冲区
  const textureBuffer = gl.createTexture();
  // 纹理图片上下反转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  // 激活0号纹理单元TEXTURE0
  gl.activeTexture(gl.TEXTURE0);
  // 绑定纹理缓冲区
  gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
  // 设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // 设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const image = new Image();
  image.src = '../texture.jpg';
  image.onload = () => {
    // 设置纹素格式，jpg格式对应gl.RGB
    // texImage2D(target: number, level: number, internalformat: number, format: number, type: number, source: TexImageSource): void
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_sampler, 0);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  };
}
