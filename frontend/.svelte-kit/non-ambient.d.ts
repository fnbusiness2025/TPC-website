
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(client)" | "/(admin)" | "/" | "/(client)/about" | "/(admin)/admin" | "/(admin)/admin/admins" | "/(admin)/admin/admins/new" | "/(admin)/admin/agents" | "/(admin)/admin/agents/pending" | "/(client)/agent" | "/(client)/agent/new" | "/(client)/agent/properties" | "/(client)/agent/properties/[id]" | "/(client)/contact" | "/(client)/login" | "/(client)/properties" | "/(client)/properties/[id]" | "/(client)/services" | "/(client)/services/[slug]";
		RouteParams(): {
			"/(client)/agent/properties/[id]": { id: string };
			"/(client)/properties/[id]": { id: string };
			"/(client)/services/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(client)": { id?: string | undefined; slug?: string | undefined };
			"/(admin)": Record<string, never>;
			"/": { id?: string | undefined; slug?: string | undefined };
			"/(client)/about": Record<string, never>;
			"/(admin)/admin": Record<string, never>;
			"/(admin)/admin/admins": Record<string, never>;
			"/(admin)/admin/admins/new": Record<string, never>;
			"/(admin)/admin/agents": Record<string, never>;
			"/(admin)/admin/agents/pending": Record<string, never>;
			"/(client)/agent": { id?: string | undefined };
			"/(client)/agent/new": Record<string, never>;
			"/(client)/agent/properties": { id?: string | undefined };
			"/(client)/agent/properties/[id]": { id: string };
			"/(client)/contact": Record<string, never>;
			"/(client)/login": Record<string, never>;
			"/(client)/properties": { id?: string | undefined };
			"/(client)/properties/[id]": { id: string };
			"/(client)/services": { slug?: string | undefined };
			"/(client)/services/[slug]": { slug: string }
		};
		Pathname(): "/" | "/about" | "/admin" | "/admin/admins" | "/admin/admins/new" | "/admin/agents" | "/admin/agents/pending" | "/agent" | "/agent/new" | `/agent/properties/${string}` & {} | "/contact" | "/login" | "/properties" | `/properties/${string}` & {} | "/services" | `/services/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/Lg1.jpg" | "/Lg2.jpg" | "/Lg3.jpg" | "/Lg4.png" | "/Lg5.png" | "/login_bg.png" | string & {};
	}
}