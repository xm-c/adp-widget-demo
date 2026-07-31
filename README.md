# ADP-Widget React 接入 Demo

基于 [腾讯云 ADP-Widget SDK](https://cloud.tencent.com/document/product/1759/129230) 的 React 接入示例。

## 环境要求

- Node.js 18+（推荐 20）

```bash
# 若使用 nvm，可切换到 Node 20
nvm use 20
```

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 项目结构

```
widget-demo/
├── public/widget/           # ADP-Widget SDK（本地部署）
│   ├── adp-widget.js        # 主包【必需】
│   ├── adp-widget-vendor.js # 依赖包【必需】
│   ├── adp-widget-markdown.js
│   └── adp-widget-chart.js
├── index.html               # 通过 script 引入 SDK
└── src/
    ├── vite-env.d.ts        # adp-widget 类型声明
    └── components/
        └── WidgetDemo.tsx   # React 集成核心示例
```

## 接入要点

1. **本地部署 SDK**：将 `lib/*.js` 放到 `public/widget/`
2. **在 index.html 引入**：

```html
<script type="module" src="/widget/adp-widget.js"></script>
```

3. **在 React 中使用 Web Component**：

```tsx
<adp-widget
  ref={widgetRef}
  widget-json={JSON.stringify(config)}
  locale="zh-CN"
/>
```

4. **监听事件**（在 `useEffect` 中）：

```tsx
widget.addEventListener("widget-action", handleAction);
widget.addEventListener("widget-rendered", handleRendered);
```

## 演示功能

- 左侧编辑 `widget-json`，右侧实时预览
- 中英文切换（`locale`）
- 全局禁用/启用（`disable`）
- `widget-action` 事件日志

## 相关文档

- 官方文档：https://cloud.tencent.com/document/product/1759/129230
- SDK 下载：https://adp-1325172457.cos.ap-guangzhou.myqcloud.com/widget_sdk/adp-widget-sdk.zip
- 本仓库内：`SDK_INTEGRATION_GUIDE.md`
