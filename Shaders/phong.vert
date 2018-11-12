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
	mat4 MV;
} data;

void main() {
	gl_Position = P * MV * vec4(pos, 1.0);

	data.position = vec3(MV * vec4(pos, 1.0));
	//data.position = pos;
	data.normal = normalize(vec3(N * vec4(normal, 1.0)));
	//data.normal = normal;
	data.texcoord = tex;
	data.MV = MV;
}