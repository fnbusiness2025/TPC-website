export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [3];

export const dictionary = {
		"/(client)": [5,[3]],
		"/(client)/about": [6,[3]],
		"/(admin)/admin": [~4,[2]],
		"/(client)/agent": [~7,[3]],
		"/(client)/agent/new": [~8,[3]],
		"/(client)/contact": [9,[3]],
		"/(client)/login": [~10,[3]],
		"/(client)/properties": [~11,[3]],
		"/(client)/properties/[id]": [~12,[3]],
		"/(client)/services": [13,[3]],
		"/(client)/services/[slug]": [14,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.svelte';