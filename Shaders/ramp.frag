#version 400

in Data
{
	vec3 position;
	vec3 normal;
	vec2 texcoord;
} data;

out vec4 outColor;

uniform sampler2D Tex;
uniform sampler2D rampTex;
uniform vec3 lightPos;
uniform float step;
uniform mat4 G2L;

//there should be a out vec4 in fragment shader defining the output color of fragment shader(variable name can be arbitrary)

float ramp(vec3 light_pos) {
	
	vec3 n = normalize(data.normal);
	vec3 l = normalize(light_pos - data.position);
	
	float d = max(0.1, min(0.9, dot(n, l)));
	return texture2D(rampTex, vec2(d, 0.5)).r;

	d = floor(d * step);

	return d / step;
}

void main() {
	vec4 texColor = texture2D(Tex, data.texcoord);
	vec3 light_pos = vec3(G2L * vec4(lightPos, 1.0));

	outColor = texColor * ramp(light_pos);
}