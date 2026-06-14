
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
		RouteId(): "/(client)" | "/(admin)" | "/" | "/(client)/about" | "/(admin)/admin" | "/(client)/contact" | "/(client)/services" | "/(client)/services/[slug]";
		RouteParams(): {
			"/(client)/services/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(client)": { slug?: string | undefined };
			"/(admin)": Record<string, never>;
			"/": { slug?: string | undefined };
			"/(client)/about": Record<string, never>;
			"/(admin)/admin": Record<string, never>;
			"/(client)/contact": Record<string, never>;
			"/(client)/services": { slug?: string | undefined };
			"/(client)/services/[slug]": { slug: string }
		};
		Pathname(): "/" | "/about" | "/admin" | "/contact" | "/services" | `/services/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/Lg1.jpg" | "/Lg2.jpg" | "/Lg3.jpg" | "/Lg4.png" | string & {};
	}
}