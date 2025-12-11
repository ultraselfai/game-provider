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
;
var _s = __turbopack_context__.k.signature();
'use client';
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
                // Preencher form com dados atuais (com fallbacks para evitar undefined)
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
        // Validações
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
    function handleLogout() {
        localStorage.removeItem('agentToken');
        localStorage.removeItem('agentData');
        router.push('/');
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-blue-600 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl",
                                            children: "🎰"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-lg font-bold text-white",
                                                children: agent?.name
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: agent?.email
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 bg-slate-700/50 rounded-xl px-6 py-3 border border-slate-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: "🏦"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: "Saldo do Pool"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-2xl font-bold ${(pool?.balance || 0) > 0 ? 'text-emerald-400' : 'text-red-400'}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(pool?.balance || 0)
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-red-600/20 hover:text-red-400 border border-slate-600 hover:border-red-500/50 px-4 py-2 text-sm text-slate-300 transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🚪"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this),
                                    "Sair"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "border-b border-slate-700/50 bg-slate-800/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                className: "px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition",
                                children: "📊 Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/pool",
                                className: "px-4 py-3 text-sm font-medium text-emerald-400 border-b-2 border-emerald-400",
                                children: "🏦 Pool"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/games",
                                className: "px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition",
                                children: "🎮 Jogos"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/transactions",
                                className: "px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition",
                                children: "📋 Transações"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/integration",
                                className: "px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition",
                                children: "🔗 Integração"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/settings",
                                className: "px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition",
                                children: "⚙️ Configurações"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-6 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard/pool",
                            className: "text-slate-400 hover:text-white transition",
                            children: "🏦 Pool"
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-slate-600",
                            children: "/"
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white",
                            children: "Configurações"
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto max-w-6xl px-6 pb-8",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this),
                    success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300",
                        children: success
                    }, void 0, false, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 rounded-xl border border-blue-500/30 bg-linear-to-br from-blue-900/20 via-slate-800/50 to-purple-900/20 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowExplanation(!showExplanation),
                                className: "w-full flex items-center justify-between px-6 py-4 hover:bg-blue-500/10 transition group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "📚"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-white",
                                                children: "Entenda o Pool"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-xl text-blue-400 transition-transform duration-300 ${showExplanation ? 'rotate-180' : ''}`,
                                        children: "▼"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `transition-all duration-300 ease-in-out overflow-hidden ${showExplanation ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-t border-blue-500/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6 p-4 rounded-lg bg-slate-800/80 border border-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-white font-semibold mb-2 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center",
                                                            children: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 17
                                                        }, this),
                                                        "O que é o Pool?"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-300 text-sm leading-relaxed",
                                                    children: [
                                                        "O Pool é o ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-emerald-400",
                                                            children: "seu caixa de reserva"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 28
                                                        }, this),
                                                        " para pagar os prêmios dos jogadores. Ele se alimenta automaticamente das ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-red-400",
                                                            children: "perdas dos jogadores"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 53
                                                        }, this),
                                                        " e paga os",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-green-400",
                                                            children: " ganhos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 269,
                                                            columnNumber: 17
                                                        }, this),
                                                        ". Quanto maior o pool, mais prêmios você pode liberar!"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 grid grid-cols-3 gap-2 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2 rounded bg-red-500/10 border border-red-500/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-red-400 text-lg font-bold",
                                                                    children: "Jogador Perde"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 273,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: "Pool recebe R$"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 274,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2 rounded bg-slate-700 flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl",
                                                                children: "↔️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2 rounded bg-green-500/10 border border-green-500/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-green-400 text-lg font-bold",
                                                                    children: "Jogador Ganha"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 280,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: "Pool paga R$"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 281,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6 p-4 rounded-lg bg-slate-800/80 border border-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-white font-semibold mb-3 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center",
                                                            children: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 289,
                                                            columnNumber: 17
                                                        }, this),
                                                        "As 3 Fases do Pool"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 15
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
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl",
                                                                            children: "🔴"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 295,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-red-400",
                                                                            children: "Retenção"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 296,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 294,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-300 mb-2",
                                                                    children: "Pool baixo - precisa crescer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "text-xs text-slate-400 space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: [
                                                                                "• WinChance: ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-red-400",
                                                                                    children: "5-15%"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                                    lineNumber: 300,
                                                                                    columnNumber: 38
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 300,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "• Prêmios: Pequenos (3x-10x)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 301,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "• Objetivo: Acumular saldo"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 302,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 299,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl",
                                                                            children: "🟡"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 307,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-yellow-400",
                                                                            children: "Normal"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 308,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 306,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-300 mb-2",
                                                                    children: "Pool saudável - operação padrão"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 310,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "text-xs text-slate-400 space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: [
                                                                                "• WinChance: ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-yellow-400",
                                                                                    children: "25-40%"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                                    lineNumber: 312,
                                                                                    columnNumber: 38
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 312,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "• Prêmios: Médios (até 50x)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 313,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "• Objetivo: Manter equilíbrio"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 314,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 311,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-3 rounded-lg bg-green-500/10 border border-green-500/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl",
                                                                            children: "🟢"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 319,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-green-400",
                                                                            children: "Liberação"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 320,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-300 mb-2",
                                                                    children: "Pool alto - hora de pagar!"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "text-xs text-slate-400 space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: [
                                                                                "• WinChance: ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-green-400",
                                                                                    children: "45-60%"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                                    lineNumber: 324,
                                                                                    columnNumber: 38
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 324,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "• Prêmios: Grandes (até 500x)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 325,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "• Objetivo: Distribuir lucros"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 326,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 323,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-white font-semibold mb-3 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center",
                                                            children: "3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 17
                                                        }, this),
                                                        "💡 Exemplo Prático"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-900/50 rounded-lg p-4 font-mono text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-slate-400 mb-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-slate-500",
                                                                            children: "Threshold Retenção:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 341,
                                                                            columnNumber: 22
                                                                        }, this),
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-400",
                                                                            children: "R$ 1.000"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 341,
                                                                            columnNumber: 82
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 341,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-slate-500",
                                                                            children: "Threshold Liberação:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 342,
                                                                            columnNumber: 22
                                                                        }, this),
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-green-400",
                                                                            children: "R$ 10.000"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 342,
                                                                            columnNumber: 83
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 342,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-t border-slate-700 my-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-400",
                                                                            children: "●"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 347,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        " Pool = R$ 500 → ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-400",
                                                                            children: "RETENÇÃO"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 347,
                                                                            columnNumber: 77
                                                                        }, this),
                                                                        " (abaixo de R$ 1.000)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-yellow-400",
                                                                            children: "●"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 350,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        " Pool = R$ 5.000 → ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-yellow-400",
                                                                            children: "NORMAL"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 350,
                                                                            columnNumber: 82
                                                                        }, this),
                                                                        " (entre R$ 1.000 e R$ 10.000)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 349,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-green-400",
                                                                            children: "●"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 353,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        " Pool = R$ 15.000 → ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-green-400",
                                                                            children: "LIBERAÇÃO"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                            lineNumber: 353,
                                                                            columnNumber: 82
                                                                        }, this),
                                                                        " (acima de R$ 10.000)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 352,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 333,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-lg bg-amber-500/10 border border-amber-500/30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-amber-400 font-semibold mb-2 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "⚠️"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 363,
                                                                    columnNumber: 19
                                                                }, this),
                                                                " Risco Máximo por Payout"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-300 leading-relaxed",
                                                            children: [
                                                                "Define o ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "máximo que um único prêmio pode pagar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 366,
                                                                    columnNumber: 28
                                                                }, this),
                                                                " como % do pool. Ex: Se o pool tem R$ 10.000 e o risco é 10%, o prêmio máximo será R$ 1.000."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-2 rounded bg-slate-800/50 text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: "Pool R$ 10.000 × 10% = "
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-amber-400 font-bold",
                                                                    children: "R$ 1.000 máx"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 371,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-cyan-400 font-semibold mb-2 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "🔄"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 376,
                                                                    columnNumber: 19
                                                                }, this),
                                                                " Fase Automática"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 375,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-300 leading-relaxed",
                                                            children: [
                                                                "Quando ativada, o sistema ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "muda de fase sozinho"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                    lineNumber: 379,
                                                                    columnNumber: 45
                                                                }, this),
                                                                " baseado no saldo do pool. Você não precisa intervir manualmente - é o modo recomendado!"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-2 rounded bg-slate-800/50 text-xs text-cyan-300",
                                                            children: "✓ Recomendado para operação 24/7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 382,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 360,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 p-4 rounded-lg bg-slate-800/80 border border-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-white font-semibold mb-2 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "🎯"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 391,
                                                            columnNumber: 17
                                                        }, this),
                                                        " Pool começa em R$ 0 - E agora?"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-300 leading-relaxed",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-emerald-400",
                                                            children: "Não precisa depositar nada!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 394,
                                                            columnNumber: 17
                                                        }, this),
                                                        " Quando o pool está zerado, o sistema entra automaticamente em ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-400",
                                                            children: "modo retenção máxima"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 395,
                                                            columnNumber: 52
                                                        }, this),
                                                        " (winChance 0%). Os jogadores vão jogar e perder naturalmente, e essas perdas vão ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "construindo o pool automaticamente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 82
                                                        }, this),
                                                        ". Conforme o pool cresce, o sistema libera mais prêmios."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 lg:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-slate-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-white",
                                            children: "⚙️ Configurações Gerais"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 408,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-medium text-white",
                                                                children: "Fase Automática"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-slate-400",
                                                                children: "Muda fase automaticamente baseado no saldo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setConfig({
                                                                ...config,
                                                                isAutoPhase: !config.isAutoPhase
                                                            }),
                                                        className: `relative w-14 h-8 rounded-full transition ${config.isAutoPhase ? 'bg-emerald-600' : 'bg-slate-600'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${config.isAutoPhase ? 'left-7' : 'left-1'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 412,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Risco Máximo por Payout (% do saldo)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 17
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
                                                                lineNumber: 437,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-16 text-right text-white font-semibold",
                                                                children: [
                                                                    config.maxRiskPercent ?? 30,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500 mt-1",
                                                        children: "Define o valor máximo que um único prêmio pode representar do saldo do pool"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-slate-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-white",
                                            children: "📊 Thresholds de Fase"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 459,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Threshold de Retenção (abaixo deste valor)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 463,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400",
                                                                children: "R$"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 467,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: config.retentionThreshold ?? 1000,
                                                                onChange: (e)=>setConfig({
                                                                        ...config,
                                                                        retentionThreshold: parseFloat(e.target.value) || 0
                                                                    }),
                                                                className: "w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-red-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 468,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 466,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-400 mt-1",
                                                        children: [
                                                            "Quando saldo < ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.retentionThreshold || 0),
                                                            " → Fase Retenção"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Threshold de Liberação (acima deste valor)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400",
                                                                children: "R$"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 485,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: config.releaseThreshold ?? 10000,
                                                                onChange: (e)=>setConfig({
                                                                        ...config,
                                                                        releaseThreshold: parseFloat(e.target.value) || 0
                                                                    }),
                                                                className: "w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-emerald-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-emerald-400 mt-1",
                                                        children: [
                                                            "Quando saldo > ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.releaseThreshold || 0),
                                                            " → Fase Liberação"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-yellow-300",
                                                    children: [
                                                        "⚖️ ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Fase Normal:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                            lineNumber: 500,
                                                            columnNumber: 22
                                                        }, this),
                                                        " Quando saldo está entre ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.retentionThreshold || 0),
                                                        " e ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$src$2f$lib$2f$pool$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(config.releaseThreshold || 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 461,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-red-500/30 bg-red-500/5 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-red-500/30 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: "🔒"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 509,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-red-400",
                                                children: "Fase Retenção"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 510,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 508,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Win Chance (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "1",
                                                        max: "100",
                                                        value: config.retentionWinChance ?? 10,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                retentionWinChance: parseFloat(e.target.value) || 0
                                                            }),
                                                        className: "w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-red-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Multiplicador Máximo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "1",
                                                                max: "1000",
                                                                value: config.retentionMaxMultiplier ?? 30,
                                                                onChange: (e)=>setConfig({
                                                                        ...config,
                                                                        retentionMaxMultiplier: parseFloat(e.target.value) || 0
                                                                    }),
                                                                className: "w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-red-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 527,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                                                                children: "x"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 526,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 524,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 512,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 507,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-yellow-500/30 bg-yellow-500/5 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-yellow-500/30 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: "⚖️"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 544,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-yellow-400",
                                                children: "Fase Normal"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 545,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 543,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Win Chance (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "1",
                                                        max: "100",
                                                        value: config.normalWinChance ?? 35,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                normalWinChance: parseFloat(e.target.value) || 0
                                                            }),
                                                        className: "w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-yellow-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 548,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Multiplicador Máximo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "1",
                                                                max: "1000",
                                                                value: config.normalMaxMultiplier ?? 100,
                                                                onChange: (e)=>setConfig({
                                                                        ...config,
                                                                        normalMaxMultiplier: parseFloat(e.target.value) || 0
                                                                    }),
                                                                className: "w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-yellow-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 562,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                                                                children: "x"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 570,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 559,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 542,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-emerald-500/30 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: "💰"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 579,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-emerald-400",
                                                children: "Fase Liberação"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 580,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 578,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Win Chance (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "1",
                                                        max: "100",
                                                        value: config.releaseWinChance ?? 65,
                                                        onChange: (e)=>setConfig({
                                                                ...config,
                                                                releaseWinChance: parseFloat(e.target.value) || 0
                                                            }),
                                                        className: "w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-emerald-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 583,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm text-slate-400 mb-2",
                                                        children: "Multiplicador Máximo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "1",
                                                                max: "1000",
                                                                value: config.releaseMaxMultiplier ?? 250,
                                                                onChange: (e)=>setConfig({
                                                                        ...config,
                                                                        releaseMaxMultiplier: parseFloat(e.target.value) || 0
                                                                    }),
                                                                className: "w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-emerald-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                                                                children: "x"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                                lineNumber: 605,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                lineNumber: 594,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 582,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 577,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-red-500/30 bg-red-500/5 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-red-500/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-red-400",
                                            children: "⚠️ Zona de Perigo"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 614,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 613,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-lg bg-red-500/10 border border-red-500/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-medium text-red-300 mb-2",
                                                    children: "Resetar Estatísticas"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-red-200/70 mb-4",
                                                    children: "Isso vai zerar todas as estatísticas do pool (spins, ganhos, perdas, etc). O saldo do pool NÃO será afetado."
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowResetModal(true),
                                                    className: "px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition",
                                                    children: "Resetar Estatísticas"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                            lineNumber: 617,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                        lineNumber: 616,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 612,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex justify-end gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/pool",
                                className: "px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition",
                                children: "Cancelar"
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 636,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                disabled: saving,
                                className: "px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition disabled:opacity-50",
                                children: saving ? 'Salvando...' : '💾 Salvar Configurações'
                            }, void 0, false, {
                                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                lineNumber: 642,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                        lineNumber: 635,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            showResetModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-800 rounded-xl border border-red-500/50 p-6 w-full max-w-md mx-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-red-400 mb-4",
                            children: "⚠️ Confirmar Reset"
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 656,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-300 mb-4",
                            children: "Tem certeza que deseja resetar todas as estatísticas do pool?"
                        }, void 0, false, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 658,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "text-sm text-slate-400 mb-6 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Total de spins será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 663,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Total de apostas será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 664,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Total de pagamentos será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 665,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "• Maior ganho/perda será zerado"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 666,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "text-emerald-400",
                                    children: "✓ Saldo do pool será mantido"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 667,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 662,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowResetModal(false),
                                    className: "flex-1 px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 671,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$panel$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleResetStats,
                                    disabled: resetting,
                                    className: "flex-1 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition disabled:opacity-50",
                                    children: resetting ? 'Resetando...' : 'Confirmar Reset'
                                }, void 0, false, {
                                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                                    lineNumber: 677,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                            lineNumber: 670,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                    lineNumber: 655,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
                lineNumber: 654,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-panel/src/app/dashboard/pool/settings/page.tsx",
        lineNumber: 157,
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

//# sourceMappingURL=agent-panel_src_03bf7630._.js.map