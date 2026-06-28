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
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [3,2,4];

export const dictionary = {
		"/(client)": [10,[3]],
		"/(client)/about": [11,[3]],
		"/(admin)/admin": [~5,[2]],
		"/(admin)/admin/admins": [~6,[2]],
		"/(admin)/admin/admins/new": [~7,[2]],
		"/(admin)/admin/agents": [~8,[2]],
		"/(admin)/admin/agents/pending": [~9,[2]],
		"/(client)/agent": [~12,[3,4]],
		"/(client)/agent/new": [~13,[3,4]],
		"/(client)/agent/properties/[id]": [~14,[3,4]],
		"/(client)/contact": [15,[3]],
		"/(client)/login": [~16,[3]],
		"/(client)/properties": [~17,[3]],
		"/(client)/properties/[id]": [~18,[3]],
		"/(client)/services": [19,[3]],
		"/(client)/services/[slug]": [20,[3]]
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