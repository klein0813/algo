#define USE_PRECISION;
precision highp float;

float gamma(vec3 color) {
  float powScalar = pow(color.r, 2.2) + pow(1.5 * color.g, 2.2) + pow(0.6 * color.b, 2.2);
  float powWeight = pow(1.0, 2.2) + pow(1.5, 2.2) + pow(0.6, 2.2);

  return pow(powScalar / powWeight, 1.0 / 2.2);
}

vec3 targetColor(vec4 color) {
  float gray = gamma(color.rgb);
  return vec3(gray, gray, gray);
}