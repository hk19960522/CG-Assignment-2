#version 400

in Data
{
	vec3 position;
	vec3 normal;
	vec2 texcoord;
} data;

out vec4 outColor;

uniform sampler2D Tex;
uniform sampler2D NoiseTex;
uniform float epslion;
uniform vec4 edgeColor;

//there should be a out vec4 in fragment shader defining the output color of fragment shader(variable name can be arbitrary)


void main() {


}