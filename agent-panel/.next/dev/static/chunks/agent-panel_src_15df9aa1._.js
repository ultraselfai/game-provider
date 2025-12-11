(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/agent-panel/src/components/ui/Slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const colorMap = {
    blue: {
        track: 'bg-blue-500',
        thumb: 'border-blue-500 bg-blue-500'
    },
    green: {
        track: 'bg-green-500',
        thumb: 'border-green-500 bg-green-500'
    },
    emerald: {
        track: 'bg-emerald-500',
        thumb: 'border-emerald-500 bg-emerald-500'
    },
    red: {
        track: 'bg-red-500',
        thumb: 'border-red-500 bg-red-500'
    },
    orange: {
        track: 'bg-orange-500',
        thumb: 'border-orange-500 bg-orange-500'
    },
    yellow: {
        track: 'bg-yellow-500',
        thumb: 'border-yellow-500 bg-yellow-500'
    },
    purple: {
        track: 'bg-purple-500',
        thumb: 'border-purple-500 bg-purple-500'
    }
};
function Slider({ min, max, value, onChange, step = 1, color = 'blue', className = '', disabled = false }) {
    const percentage = (value - min) / (max - min) * 100;
    const colors = colorMap[color];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative w-full h-2 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-slate-600/50 rounded-full"
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/components/ui/Slider.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-0 left-0 h-full ${colors.track} rounded-full transition-all duration-75`,
                style: {
                    width: `${percentage}%`
                }
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/components/ui/Slider.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "range",
                min: min,
                max: max,
                step: step,
                value: value,
                onChange: (e)=>onChange(parseFloat(e.target.value)),
                disabled: disabled,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed",
                style: {
                    margin: 0
                }
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/components/ui/Slider.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${colors.thumb} shadow-lg border-2 border-white pointer-events-none transition-all duration-75`,
                style: {
                    left: `calc(${percentage}% - 8px)`
                }
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/components/ui/Slider.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-panel/src/components/ui/Slider.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c = Slider;
const __TURBOPACK__default__export__ = Slider;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-panel/src/lib/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Configuration - centralizado para facilitar manutenção
// IMPORTANT: NEXT_PUBLIC_* vars are embedded at BUILD TIME, not runtime
// Detectar ambiente baseado no hostname do browser
__turbopack_context__.s([
    "ADMIN_API",
    ()=>ADMIN_API,
    "AGENT_API",
    ()=>AGENT_API,
    "API_BASE",
    ()=>API_BASE
]);
function getApiBase() {
    // Se estiver no servidor (SSR), usar variável de ambiente ou fallback
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // No browser, detectar automaticamente baseado no hostname
    const hostname = window.location.hostname;
    // Se estiver em produção (não localhost)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        return 'https://api.ultraself.space/api/v1';
    }
    // Desenvolvimento local
    return 'http://localhost:3006/api/v1';
}
const API_BASE = getApiBase();
const AGENT_API = `${API_BASE}/agent`;
const ADMIN_API = `${API_BASE}/admin`;
// Debug log (only in browser)
if ("TURBOPACK compile-time truthy", 1) {
    console.log('[Config] API_BASE:', API_BASE);
    console.log('[Config] Hostname:', window.location.hostname);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-panel/src/lib/pool-api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Pool API - Helpers para comunicação com a API do Pool
__turbopack_context__.s([
    "POOL_API",
    ()=>POOL_API,
    "depositToPool",
    ()=>depositToPool,
    "fetchPool",
    ()=>fetchPool,
    "fetchPoolLimits",
    ()=>fetchPoolLimits,
    "fetchPoolStats",
    ()=>fetchPoolStats,
    "fetchPoolTransactions",
    ()=>fetchPoolTransactions,
    "formatCurrency",
    ()=>formatCurrency,
    "formatPercent",
    ()=>formatPercent,
    "getPhaseBgColor",
    ()=>getPhaseBgColor,
    "getPhaseColor",
    ()=>getPhaseColor,
    "getPhaseDescription",
    ()=>getPhaseDescription,
    "getPhaseLabel",
    ()=>getPhaseLabel,
    "resetPoolStats",
    ()=>resetPoolStats,
    "setPoolPhase",
    ()=>setPoolPhase,
    "updatePoolConfig",
    ()=>updatePoolConfig,
    "withdrawFromPool",
    ()=>withdrawFromPool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/lib/config.ts [app-client] (ecmascript)");
;
const POOL_API = `${__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE"]}/pool`;
// Função auxiliar para pegar o agentId do localStorage
function getAgentId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const agentData = localStorage.getItem('agentData');
    if (!agentData) return null;
    const agent = JSON.parse(agentData);
    return agent.id;
}
// Função auxiliar para pegar o token
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem('agentToken');
}
// Headers padrão
function getHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        ...token ? {
            Authorization: `Bearer ${token}`
        } : {}
    };
}
async function fetchPool() {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const res = await fetch(`${POOL_API}/${agentId}`, {
            headers: getHeaders()
        });
        const data = await res.json();
        return {
            success: true,
            data: data.data || data
        };
    } catch (error) {
        console.error('[Pool API] Erro ao buscar pool:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function fetchPoolLimits() {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const res = await fetch(`${POOL_API}/${agentId}/limits`, {
            headers: getHeaders()
        });
        const data = await res.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error('[Pool API] Erro ao buscar limites:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function depositToPool(amount, description) {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const res = await fetch(`${POOL_API}/${agentId}/deposit`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                amount,
                description
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('[Pool API] Erro ao depositar:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function withdrawFromPool(amount, description) {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const res = await fetch(`${POOL_API}/${agentId}/withdraw`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                amount,
                description
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('[Pool API] Erro ao sacar:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function setPoolPhase(phase) {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const res = await fetch(`${POOL_API}/${agentId}/phase`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                phase
            })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('[Pool API] Erro ao definir fase:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function updatePoolConfig(config) {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const res = await fetch(`${POOL_API}/${agentId}/config`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(config)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('[Pool API] Erro ao atualizar config:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function fetchPoolTransactions(params) {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const queryParams = new URLSearchParams();
        if (params?.type) queryParams.append('type', params.type);
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.offset) queryParams.append('offset', params.offset.toString());
        const url = `${POOL_API}/${agentId}/transactions${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        const res = await fetch(url, {
            headers: getHeaders()
        });
        const data = await res.json();
        // API retorna: { success, data: { transactions: [], pagination: {} } }
        const transactions = data?.data?.transactions || data?.transactions || data?.data || [];
        const total = data?.data?.pagination?.total || data?.total || 0;
        return {
            success: true,
            data: transactions,
            total
        };
    } catch (error) {
        console.error('[Pool API] Erro ao buscar transações:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function fetchPoolStats(period) {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const url = `${POOL_API}/${agentId}/stats${period ? '?period=' + period : ''}`;
        const res = await fetch(url, {
            headers: getHeaders()
        });
        const data = await res.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error('[Pool API] Erro ao buscar stats:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
async function resetPoolStats() {
    const agentId = getAgentId();
    if (!agentId) return {
        success: false,
        message: 'Agente não autenticado'
    };
    try {
        const res = await fetch(`${POOL_API}/${agentId}/reset-stats`, {
            method: 'POST',
            headers: getHeaders()
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('[Pool API] Erro ao resetar stats:', error);
        return {
            success: false,
            message: 'Erro de conexão'
        };
    }
}
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}
function getPhaseColor(phase) {
    switch(phase){
        case 'retention':
            return 'text-red-400';
        case 'normal':
            return 'text-yellow-400';
        case 'release':
            return 'text-emerald-400';
        default:
            return 'text-slate-400';
    }
}
function getPhaseBgColor(phase) {
    switch(phase){
        case 'retention':
            return 'bg-red-500/20 border-red-500/50';
        case 'normal':
            return 'bg-yellow-500/20 border-yellow-500/50';
        case 'release':
            return 'bg-emerald-500/20 border-emerald-500/50';
        default:
            return 'bg-slate-500/20 border-slate-500/50';
    }
}
function getPhaseLabel(phase) {
    switch(phase){
        case 'retention':
            return '🔒 Retenção';
        case 'normal':
            return '⚖️ Normal';
        case 'release':
            return '💰 Liberação';
        default:
            return phase;
    }
}
function getPhaseDescription(phase) {
    switch(phase){
        case 'retention':
            return 'Jogadores ganham menos, pool acumula saldo';
        case 'normal':
            return 'Equilíbrio entre ganhos e retenção';
        case 'release':
            return 'Jogadores ganham mais, pool distribui lucros';
        default:
            return '';
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-panel/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-panel/src/components/ui/switch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-switch/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Switch({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "switch",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
            "data-slot": "switch-thumb",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
        }, void 0, false, {
            fileName: "[project]/agent-panel/src/components/ui/switch.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/switch.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Switch;
;
var _c;
__turbopack_context__.k.register(_c, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-panel/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-panel/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PoolSettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$Slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/components/ui/Slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/lib/pool-api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/components/ui/collapsible.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-panel/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/agent-panel/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function PoolSettingsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [agent, setAgent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pool, setPool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Form state
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isAutoPhase: true,
        retentionThreshold: 1000,
        releaseThreshold: 10000,
        maxRiskPercent: 30,
        retentionWinChance: 10,
        normalWinChance: 35,
        releaseWinChance: 65,
        retentionMaxMultiplier: 30,
        normalMaxMultiplier: 100,
        releaseMaxMultiplier: 250
    });
    // Confirm reset modal
    const [showResetModal, setShowResetModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resetting, setResetting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Painel explicativo colapsável
    const [showExplanation, setShowExplanation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PoolSettingsPage.useEffect": ()=>{
            const token = localStorage.getItem('agentToken');
            const agentData = localStorage.getItem('agentData');
            if (!token || !agentData) {
                router.push('/');
                return;
            }
            setAgent(JSON.parse(agentData));
            loadPool();
        }
    }["PoolSettingsPage.useEffect"], [
        router
    ]);
    async function loadPool() {
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPool"])();
            if (result.success && result.data) {
                setPool(result.data);
                setConfig({
                    isAutoPhase: result.data.isAutoPhase ?? true,
                    retentionThreshold: result.data.retentionThreshold ?? 1000,
                    releaseThreshold: result.data.releaseThreshold ?? 10000,
                    maxRiskPercent: result.data.maxRiskPercent ?? 30,
                    retentionWinChance: result.data.retentionWinChance ?? 10,
                    normalWinChance: result.data.normalWinChance ?? 35,
                    releaseWinChance: result.data.releaseWinChance ?? 65,
                    retentionMaxMultiplier: result.data.retentionMaxMultiplier ?? 30,
                    normalMaxMultiplier: result.data.normalMaxMultiplier ?? 100,
                    releaseMaxMultiplier: result.data.releaseMaxMultiplier ?? 250
                });
            }
        } catch (err) {
            setError('Erro ao carregar configurações');
            console.error(err);
        } finally{
            setLoading(false);
        }
    }
    async function handleSave() {
        setError('');
        setSuccess('');
        setSaving(true);
        if (config.retentionThreshold >= config.releaseThreshold) {
            setError('Threshold de retenção deve ser menor que o de liberação');
            setSaving(false);
            return;
        }
        if (config.retentionWinChance > config.normalWinChance || config.normalWinChance > config.releaseWinChance) {
            setError('Win Chance deve aumentar progressivamente: Retenção < Normal < Liberação');
            setSaving(false);
            return;
        }
        if (config.maxRiskPercent < 1 || config.maxRiskPercent > 100) {
            setError('Risco máximo deve estar entre 1% e 100%');
            setSaving(false);
            return;
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePoolConfig"])(config);
        setSaving(false);
        if (result.success) {
            setSuccess('Configurações salvas com sucesso!');
            loadPool();
        } else {
            setError(result.message || 'Erro ao salvar configurações');
        }
    }
    async function handleResetStats() {
        setResetting(true);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPoolStats"])();
        setResetting(false);
        if (result.success) {
            setSuccess('Estatísticas resetadas com sucesso!');
            setShowResetModal(false);
            loadPool();
        } else {
            setError(result.message || 'Erro ao resetar estatísticas');
        }
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[400px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                className: "size-8 animate-spin text-muted-foreground"
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
            lineNumber: 180,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard/pool",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                className: "size-4 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, this),
                                            "Voltar"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold tracking-tight",
                                children: "Configurações do Pool"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Configure os parâmetros de controle da banca"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-primary/30 bg-primary/5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "flex items-center gap-3 py-3 px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                    className: "size-5 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Saldo do Pool"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-xl font-bold ${(pool?.balance || 0) > 0 ? 'text-emerald-500' : 'text-red-500'}`,
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(pool?.balance || 0)
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive",
                children: error
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, this),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/50 text-emerald-500",
                children: success
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapsible"], {
                open: showExplanation,
                onOpenChange: setShowExplanation,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "border-primary/30 bg-primary/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "cursor-pointer hover:bg-primary/10 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                    className: "size-5 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    children: "Entenda o Pool"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: `size-5 text-primary transition-transform ${showExplanation ? 'rotate-180' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "pt-0 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-lg bg-muted border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center",
                                                        children: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 19
                                                    }, this),
                                                    "O que é o Pool?"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground leading-relaxed",
                                                children: [
                                                    "O Pool é o ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-primary",
                                                        children: "seu caixa de reserva"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 30
                                                    }, this),
                                                    " para pagar os prêmios dos jogadores. Ele se alimenta automaticamente das ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-red-500",
                                                        children: "perdas dos jogadores"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 55
                                                    }, this),
                                                    " e paga os",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-emerald-500",
                                                        children: " ganhos"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 19
                                                    }, this),
                                                    ". Quanto maior o pool, mais prêmios você pode liberar!"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-lg bg-muted border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold mb-3 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center",
                                                        children: "2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 19
                                                    }, this),
                                                    "As 3 Fases do Pool"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-3 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg bg-red-500/10 border border-red-500/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                        className: "size-4 text-red-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 266,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-red-500",
                                                                        children: "Retenção"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 267,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground mb-2",
                                                                children: "Pool baixo - precisa crescer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "text-xs text-muted-foreground space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: [
                                                                            "• WinChance: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-red-500",
                                                                                children: "5-15%"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                                lineNumber: 271,
                                                                                columnNumber: 40
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 271,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: "• Prêmios: Pequenos (3x-10x)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 272,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 270,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                                        className: "size-4 text-yellow-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 277,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-yellow-500",
                                                                        children: "Normal"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 278,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground mb-2",
                                                                children: "Pool saudável - operação padrão"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "text-xs text-muted-foreground space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: [
                                                                            "• WinChance: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-yellow-500",
                                                                                children: "25-40%"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                                lineNumber: 282,
                                                                                columnNumber: 40
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 282,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: "• Prêmios: Médios (até 50x)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 283,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                                                        className: "size-4 text-emerald-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 288,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-emerald-500",
                                                                        children: "Liberação"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 289,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground mb-2",
                                                                children: "Pool alto - hora de pagar!"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "text-xs text-muted-foreground space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: [
                                                                            "• WinChance: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-emerald-500",
                                                                                children: "45-60%"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                                lineNumber: 293,
                                                                                columnNumber: 40
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 293,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: "• Prêmios: Grandes (até 500x)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                        lineNumber: 294,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 292,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-lg bg-muted border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                                        className: "size-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Pool começa em R$ 0 - E agora?"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground leading-relaxed",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-primary",
                                                        children: "Não precisa depositar nada!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Quando o pool está zerado, o sistema entra automaticamente em ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "modo retenção máxima"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 54
                                                    }, this),
                                                    " (winChance 0%). Os jogadores vão jogar e perder naturalmente, e essas perdas vão ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "construindo o pool automaticamente"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 84
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 322,
                                            columnNumber: 15
                                        }, this),
                                        "Configurações Gerais"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-4 rounded-lg bg-muted",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium",
                                                        children: "Fase Automática"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: "Muda fase automaticamente baseado no saldo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                checked: config.isAutoPhase,
                                                onCheckedChange: (checked)=>setConfig({
                                                        ...config,
                                                        isAutoPhase: checked
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Risco Máximo por Payout (% do saldo)"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$Slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                        min: 1,
                                                        max: 100,
                                                        value: config.maxRiskPercent ?? 30,
                                                        onChange: (value)=>setConfig({
                                                                ...config,
                                                                maxRiskPercent: value
                                                            }),
                                                        color: "red",
                                                        className: "flex-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-16 text-right font-semibold",
                                                        children: [
                                                            config.maxRiskPercent ?? 30,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 344,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground mt-1",
                                                children: "Define o valor máximo que um único prêmio pode representar do saldo do pool"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 357,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: "Thresholds de Fase"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: "Defina os valores que determinam as transições de fase"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Threshold de Retenção (abaixo deste valor)"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 374,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                                                        children: "R$"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        value: config.retentionThreshold ?? 1000,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                retentionThreshold: parseFloat(e.target.value) || 0
                                                            }),
                                                        className: "pl-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-500 mt-1",
                                                children: [
                                                    "Quando saldo < ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.retentionThreshold || 0),
                                                    " → Fase Retenção"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 373,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Threshold de Liberação (acima deste valor)"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                                                        children: "R$"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        value: config.releaseThreshold ?? 10000,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                releaseThreshold: parseFloat(e.target.value) || 0
                                                            }),
                                                        className: "pl-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-500 mt-1",
                                                children: [
                                                    "Quando saldo > ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.releaseThreshold || 0),
                                                    " → Fase Liberação"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 404,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-yellow-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                    className: "size-4 inline mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Fase Normal:"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 17
                                                }, this),
                                                " Quando saldo está entre ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.retentionThreshold || 0),
                                                " e ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.releaseThreshold || 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 410,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-red-500/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "flex items-center gap-2 text-red-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 422,
                                            columnNumber: 15
                                        }, this),
                                        "Fase Retenção"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 421,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Win Chance (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 428,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: "1",
                                                max: "100",
                                                value: config.retentionWinChance ?? 10,
                                                onChange: (e)=>setConfig({
                                                        ...config,
                                                        retentionWinChance: parseFloat(e.target.value) || 0
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 429,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 427,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Multiplicador Máximo"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        min: "1",
                                                        max: "1000",
                                                        value: config.retentionMaxMultiplier ?? 30,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                retentionMaxMultiplier: parseFloat(e.target.value) || 0
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                                                        children: "x"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 426,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-yellow-500/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "flex items-center gap-2 text-yellow-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 457,
                                            columnNumber: 15
                                        }, this),
                                        "Fase Normal"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 456,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Win Chance (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 463,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: "1",
                                                max: "100",
                                                value: config.normalWinChance ?? 35,
                                                onChange: (e)=>setConfig({
                                                        ...config,
                                                        normalWinChance: parseFloat(e.target.value) || 0
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 464,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 462,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Multiplicador Máximo"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 473,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        min: "1",
                                                        max: "1000",
                                                        value: config.normalMaxMultiplier ?? 100,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                normalMaxMultiplier: parseFloat(e.target.value) || 0
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                                                        children: "x"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 472,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 461,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 454,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-emerald-500/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "flex items-center gap-2 text-emerald-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 492,
                                            columnNumber: 15
                                        }, this),
                                        "Fase Liberação"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 491,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 490,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Win Chance (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: "1",
                                                max: "100",
                                                value: config.releaseWinChance ?? 65,
                                                onChange: (e)=>setConfig({
                                                        ...config,
                                                        releaseWinChance: parseFloat(e.target.value) || 0
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 499,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 497,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm text-muted-foreground mb-2 block",
                                                children: "Multiplicador Máximo"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 508,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        min: "1",
                                                        max: "1000",
                                                        value: config.releaseMaxMultiplier ?? 250,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                releaseMaxMultiplier: parseFloat(e.target.value) || 0
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                                                        children: "x"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 509,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 507,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 496,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 489,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-destructive/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "flex items-center gap-2 text-destructive",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 527,
                                            columnNumber: 15
                                        }, this),
                                        "Zona de Perigo"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg bg-destructive/10 border border-destructive/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-medium text-destructive mb-2",
                                            children: "Resetar Estatísticas"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 533,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground mb-4",
                                            children: "Isso vai zerar todas as estatísticas do pool (spins, ganhos, perdas, etc). O saldo do pool NÃO será afetado."
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 534,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "destructive",
                                            onClick: ()=>setShowResetModal(true),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                    className: "size-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 17
                                                }, this),
                                                "Resetar Estatísticas"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 538,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 532,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard/pool",
                            children: "Cancelar"
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 550,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 549,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleSave,
                        disabled: saving,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                className: "size-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 553,
                                columnNumber: 11
                            }, this),
                            saving ? 'Salvando...' : 'Salvar Configurações'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 548,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showResetModal,
                onOpenChange: setShowResetModal,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "flex items-center gap-2 text-destructive",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 15
                                        }, this),
                                        "Confirmar Reset"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 562,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Tem certeza que deseja resetar todas as estatísticas do pool?"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 566,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 561,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "text-sm text-muted-foreground space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Total de spins será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Total de apostas será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 573,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Total de pagamentos será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 574,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Maior ganho/perda será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 575,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "text-emerald-500",
                                    children: "✓ Saldo do pool será mantido"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 576,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 571,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setShowResetModal(false),
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 580,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "destructive",
                                    onClick: handleResetStats,
                                    disabled: resetting,
                                    children: resetting ? 'Resetando...' : 'Confirmar Reset'
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 583,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 579,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                    lineNumber: 560,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 559,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_s(PoolSettingsPage, "gc+rKn/6rvQKmIexgX4btIbbDSM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PoolSettingsPage;
var _c;
__turbopack_context__.k.register(_c, "PoolSettingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=agent-panel_src_15df9aa1._.js.map