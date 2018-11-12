#version 400

layout(location = 0) in vec3 pos;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 tex;

uniform mat4 MV;
uniform mat4 P;
uniform mat4 N;

out Data
{
	vec3 position;
	vec3 normal;
	vec2 texcoord;
} data;

void main() {
	gl_Position = P * MV * vec4(pos, 1.0);

	data.position = pos;
	data.normal = normal;
	data.texcoord = tex;
}