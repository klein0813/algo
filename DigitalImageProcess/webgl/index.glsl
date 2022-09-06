// 判断宏定义是否存在
#ifndef USE_PRECISION
  precision highp float;
  vec3 targetColor(vec4 color) {
    return color.rgb;
  }
#endif

uniform sampler2D u_sampler;
varying vec2 v_texCoord;

void main() {
  vec4 color = texture2D(u_sampler, v_texCoord);
  gl_FragColor = vec4(targetColor(color), color.a);
}
