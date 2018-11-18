#version 400

in Data
{
	vec3 position;
	vec3 normal;
	vec2 texcoord;
} data;

struct Light
{
	vec3 position;
	vec3 La;
	vec3 Ld;
	vec3 Ls;
};

struct Material
{
	vec3 Ka;
	vec3 Kd;
	vec3 Ks;
	float gloss;
};

out vec4 outColor;

uniform sampler2D Tex;
uniform Light light;
uniform Material mat;

uniform vec3 eye;
uniform mat4 G2L;

uniform int isBlinn;

//there should be a out vec4 in fragment shader defining the output color of fragment shader(variable name can be arbitrary)

void phong(vec3 light_pos, vec3 eye, out vec3 ambient, out vec3 diffuse, out vec3 spec) {
	vec3 n = data.normal;

	vec3 l = normalize( light_pos - data.position );
	vec3 v = normalize( eye - data.position );


	if (isBlinn == 1) {
		vec3 h = normalize((l + v) / 2);
		ambient = light.La * mat.Ka;
 
		float lDotn = max( dot( l, n ), 0.0 );
		diffuse = light.Ld * mat.Kd * lDotn;
 
		spec = light.Ls * mat.Ks * pow( max( dot(h,n) , 0.0 ), mat.gloss ); 
	}
	else {
		vec3 r = reflect( -l, n );
		ambient = light.La * mat.Ka;
 
		float lDotn = max( dot( l, n ), 0.0 );
		diffuse = light.Ld * mat.Kd * lDotn;
 
		spec = light.Ls * mat.Ks * pow( max( dot(r,v) , 0.0 ), mat.gloss ); 
	}	
}

void main() {
	vec4 texColor = texture2D(Tex, data.texcoord);
	vec3 ambient;
	vec3 diffuse;
	vec3 spec;
	vec3 light_pos = vec3(G2L * vec4(light.position, 1.0));

	phong(light_pos, vec3(G2L * vec4(eye, 1.0)), ambient, diffuse, spec);
	vec4 color = vec4(ambient + diffuse, 1.0) * texColor + vec4(spec, 1.0);

	outColor = color / dot(light_pos - data.position, light_pos - data.position);

	//outColor = color / (pow(distance(light_pos, data.position), 2.0));
}
