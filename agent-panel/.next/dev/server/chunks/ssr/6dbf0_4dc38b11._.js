module.exports = [
"[project]/agent-panel/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// packages/react/use-previous/src/use-previous.tsx
__turbopack_context__.s([
    "usePrevious",
    ()=>usePrevious
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function usePrevious(value) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]({
        value,
        previous: value
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (ref.current.value !== value) {
            ref.current.previous = ref.current.value;
            ref.current.value = value;
        }
        return ref.current.previous;
    }, [
        value
    ]);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/agent-panel/node_modules/@radix-ui/react-switch/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Root",
    ()=>Root,
    "Switch",
    ()=>Switch,
    "SwitchThumb",
    ()=>SwitchThumb,
    "Thumb",
    ()=>Thumb,
    "createSwitchScope",
    ()=>createSwitchScope
]);
// src/switch.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/primitive/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-use-size/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContextScope"])(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
    const [button, setButton] = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, (node)=>setButton(node));
    const hasConsumerStoppedPropagationRef = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControllableState"])({
        prop: checkedProp,
        defaultProp: defaultChecked ?? false,
        onChange: onCheckedChange,
        caller: SWITCH_NAME
    });
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(SwitchProvider, {
        scope: __scopeSwitch,
        checked,
        disabled,
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].button, {
                type: "button",
                role: "switch",
                "aria-checked": checked,
                "aria-required": required,
                "data-state": getState(checked),
                "data-disabled": disabled ? "" : void 0,
                disabled,
                value,
                ...switchProps,
                ref: composedRefs,
                onClick: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onClick, (event)=>{
                    setChecked((prevChecked)=>!prevChecked);
                    if (isFormControl) {
                        hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
                        if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
                    }
                })
            }),
            isFormControl && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SwitchBubbleInput, {
                control: button,
                bubbles: !hasConsumerStoppedPropagationRef.current,
                name,
                value,
                checked,
                required,
                disabled,
                form,
                style: {
                    transform: "translateX(-100%)"
                }
            })
        ]
    });
});
Switch.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].span, {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
    });
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef)=>{
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(ref, forwardedRef);
    const prevChecked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrevious"])(checked);
    const controlSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])(control);
    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const input = ref.current;
        if (!input) return;
        const inputProto = window.HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
        const setChecked = descriptor.set;
        if (prevChecked !== checked && setChecked) {
            const event = new Event("click", {
                bubbles
            });
            setChecked.call(input, checked);
            input.dispatchEvent(event);
        }
    }, [
        prevChecked,
        checked,
        bubbles
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("input", {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0
        }
    });
});
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
    return checked ? "checked" : "unchecked";
}
var Root = Switch;
var Thumb = SwitchThumb;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RefreshCw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
            key: "v9h5vc"
        }
    ],
    [
        "path",
        {
            d: "M21 3v5h-5",
            key: "1q7to0"
        }
    ],
    [
        "path",
        {
            d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
            key: "3uifl3"
        }
    ],
    [
        "path",
        {
            d: "M8 16H3v5",
            key: "1cv678"
        }
    ]
];
const RefreshCw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("refresh-cw", __iconNode);
;
 //# sourceMappingURL=refresh-cw.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RefreshCw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Lock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }
    ],
    [
        "path",
        {
            d: "M7 11V7a5 5 0 0 1 10 0v4",
            key: "fwvmzm"
        }
    ]
];
const Lock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("lock", __iconNode);
;
 //# sourceMappingURL=lock.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/scale.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Scale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 3v18",
            key: "108xh3"
        }
    ],
    [
        "path",
        {
            d: "m19 8 3 8a5 5 0 0 1-6 0zV7",
            key: "zcdpyk"
        }
    ],
    [
        "path",
        {
            d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",
            key: "1yorad"
        }
    ],
    [
        "path",
        {
            d: "m5 8 3 8a5 5 0 0 1-6 0zV7",
            key: "eua70x"
        }
    ],
    [
        "path",
        {
            d: "M7 21h10",
            key: "1b0cd5"
        }
    ]
];
const Scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("scale", __iconNode);
;
 //# sourceMappingURL=scale.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/scale.js [app-ssr] (ecmascript) <export default as Scale>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Scale",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/scale.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LockOpen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }
    ],
    [
        "path",
        {
            d: "M7 11V7a5 5 0 0 1 9.9-1",
            key: "1mm8w8"
        }
    ]
];
const LockOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("lock-open", __iconNode);
;
 //# sourceMappingURL=lock-open.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript) <export default as Unlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Unlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TriangleAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
];
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("triangle-alert", __iconNode);
;
 //# sourceMappingURL=triangle-alert.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Info
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 16v-4",
            key: "1dtifu"
        }
    ],
    [
        "path",
        {
            d: "M12 8h.01",
            key: "e9boi3"
        }
    ]
];
const Info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("info", __iconNode);
;
 //# sourceMappingURL=info.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-down", __iconNode);
;
 //# sourceMappingURL=chevron-down.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Save
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
            key: "1c8476"
        }
    ],
    [
        "path",
        {
            d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
            key: "1ydtos"
        }
    ],
    [
        "path",
        {
            d: "M7 3v4a1 1 0 0 0 1 1h7",
            key: "t51u73"
        }
    ]
];
const Save = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("save", __iconNode);
;
 //# sourceMappingURL=save.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Save",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RotateCcw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
            key: "1357e3"
        }
    ],
    [
        "path",
        {
            d: "M3 3v5h5",
            key: "1xhq8a"
        }
    ]
];
const RotateCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("rotate-ccw", __iconNode);
;
 //# sourceMappingURL=rotate-ccw.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotateCcw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript)");
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/gauge.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Gauge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 14 4-4",
            key: "9kzdfg"
        }
    ],
    [
        "path",
        {
            d: "M3.34 19a10 10 0 1 1 17.32 0",
            key: "19p75a"
        }
    ]
];
const Gauge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("gauge", __iconNode);
;
 //# sourceMappingURL=gauge.js.map
}),
"[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/gauge.js [app-ssr] (ecmascript) <export default as Gauge>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Gauge",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/gauge.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=6dbf0_4dc38b11._.js.map