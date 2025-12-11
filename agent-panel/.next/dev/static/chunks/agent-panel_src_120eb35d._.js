(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/agent-panel/src/contexts/theme-context.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProviderContext",
    ()=>ThemeProviderContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const initialState = {
    theme: "system",
    setTheme: ()=>null
};
const ThemeProviderContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](initialState);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-panel/src/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$contexts$2f$theme$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/contexts/theme-context.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ThemeProvider({ children, defaultTheme = "dark", storageKey = "agent-panel-theme", ...props }) {
    _s();
    const [theme, setTheme] = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultTheme);
    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ThemeProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const stored = localStorage.getItem(storageKey);
            if (stored) setTheme(stored);
        }
    }["ThemeProvider.useEffect"], [
        storageKey
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ThemeProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            if (theme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                root.classList.add(systemTheme);
                return;
            }
            root.classList.add(theme);
        }
    }["ThemeProvider.useEffect"], [
        theme
    ]);
    const value = {
        theme,
        setTheme: (theme)=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem(storageKey, theme);
            }
            setTheme(theme);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$contexts$2f$theme$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProviderContext"].Provider, {
        ...props,
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/theme-provider.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "W8D4/Q1J7zkRqv7jhld4gmhU6go=");
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=agent-panel_src_120eb35d._.js.map