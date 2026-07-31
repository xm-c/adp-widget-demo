# ADP-Widget SDK 接入指南

> **版本**: 1.2.1  
> **更新日期**: 2025-03-10  
> **目标读者**: 前端开发者、产品集成工程师

## 📖 目录

- [1. 概述](#1-概述)
- [2. 环境准备](#2-环境准备)
- [3. SDK 引入方式](#3-sdk-引入方式)
- [4. 快速开始](#4-快速开始)
- [5. 核心 API](#5-核心-api)
- [6. 事件处理](#6-事件处理)
- [7. 配置详解](#7-配置详解)
- [8. 高级功能](#8-高级功能)
- [9. 常见错误处理](#9-常见错误处理)
- [10. 最佳实践](#10-最佳实践)

---

## 1. 概述

### 1.1 什么是 ADP-Widget?

ADP-Widget 是一个基于 **Web Components** 标准开发的跨框架 UI 组件 SDK,支持通过 JSON 配置动态渲染完整的用户界面。

### 1.2 核心特性

- ✅ **跨框架兼容**: 支持 React、Vue、原生 HTML
- ✅ **JSON 驱动**: 通过配置对象渲染完整的 UI
- ✅ **零 CSS 引入**: 样式完全内联到 Shadow DOM
- ✅ **按需加载**: Markdown 和 Chart 组件动态加载
- ✅ **国际化支持**: 内置中文/英文切换
- ✅ **类型安全**: 完整的 TypeScript 类型定义

### 1.3 适用场景

- 🎯 动态表单渲染
- 🎯 对话式 UI 卡片
- 🎯 数据可视化面板 (基于 Recharts)
- 🎯 配置化页面生成
- 🎯 ChatKit Widget JSON 协议渲染

---

## 2. 环境准备

### 2.1 浏览器要求

| 浏览器  | 最低版本 |
| ------- | -------- |
| Chrome  | 67+      |
| Firefox | 63+      |
| Safari  | 12.1+    |
| Edge    | 79+      |

> **注意**: 不支持 IE 浏览器

### 2.2 技术栈要求

#### 原生 HTML 项目

- 无特殊要求,支持 ES Module 即可

#### React 项目

- React 16.8+ (推荐 React 18+)
- TypeScript 4.0+ (可选)

#### Vue 项目

- Vue 2.x / Vue 3.x (均支持)
- TypeScript 4.0+ (可选)

> **说明**: ADP-Widget 基于 Web Components 标准,与框架版本无关,理论上支持所有主流框架

---

## 3. SDK 引入方式

### 下载 SDK 文件包

从发布渠道获取完整的 SDK 文件包,解压后包含:

```
lib/
├── adp-widget.js           (366KB) - 主包【必需】
├── adp-widget-vendor.js    (342KB) - 依赖包【必需】
├── adp-widget-markdown.js  (600KB) - Markdown 组件【按需加载】
└── adp-widget-chart.js     (790KB) - 图表组件【按需加载】
```

### 3.1 方式一: CDN 部署

#### 步骤 1: 获取 CDN 链接

将解压后lib文件夹中的所有js文件部署在同一个CDN地址下，如:

```
https://cdn.example.com/adp-widget/v1.2.1/adp-widget.js
https://cdn.example.com/adp-widget/v1.2.1/adp-widget-vendor.js
https://cdn.example.com/adp-widget/v1.2.1/adp-widget-markdown.js
https://cdn.example.com/adp-widget/v1.2.1/adp-widget-chart.js
```

#### 步骤 2: 在 HTML 中引入

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>ADP-Widget 示例</title>

    <!-- 引入 ADP-Widget SDK，只需引入adp-widget.js即可 -->
    <script
      type="module"
      src="https://cdn.example.com/adp-widget/v1.2.1/adp-widget.js"
    ></script>
  </head>
  <body>
    <adp-widget id="my-widget"></adp-widget>

    <script type="module">
      const widget = document.getElementById("my-widget");

      widget.setAttribute(
        "widget-json",
        JSON.stringify({
          type: "Card",
          children: [
            { type: "Title", value: "欢迎使用 ADP-Widget" },
            { type: "Text", value: "这是一个动态渲染的卡片" },
          ],
        })
      );

      // 监听事件
      widget.addEventListener("widget-action", (e) => {
        console.log("Action:", e.detail.action);
      });
    </script>
  </body>
</html>
```

---

### 3.2 方式二: 本地部署

#### 步骤 1: 部署到项目

将解压后lib文件夹中的所有js文件放置到项目的静态资源目录,例如:

```
项目根目录/
├── public/
│   └── widget/
│       ├── adp-widget.js
│       ├── adp-widget-vendor.js
│       ├── adp-widget-markdown.js
│       └── adp-widget-chart.js
└── index.html
```

#### 步骤 2: 在 HTML 中引入

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>ADP-Widget 示例</title>

    <!-- 引入本地 SDK 文件 -->
    <script type="module" src="/widget/adp-widget.js"></script>
  </head>
  <body>
    <adp-widget id="my-widget"></adp-widget>

    <script type="module">
      const widget = document.getElementById("my-widget");

      widget.setAttribute(
        "widget-json",
        JSON.stringify({
          type: "Card",
          children: [
            { type: "Title", value: "欢迎使用 ADP-Widget" },
            { type: "Text", value: "这是一个动态渲染的卡片" },
          ],
        })
      );
    </script>
  </body>
</html>
```

---

### 3.3 在前端框架中使用

无论使用 CDN 还是本地部署,ADP-Widget 都可以在任何前端框架中使用。以下是常见框架的集成方法。

#### 3.3.1 React 项目集成

**步骤 1: 在 `index.html` 中引入 SDK**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <!-- 方式一: 使用 CDN -->
    <script
      type="module"
      src="https://cdn.example.com/adp-widget/v1.0.0/adp-widget.js"
    ></script>

    <!-- 方式二: 使用本地文件 -->
    <!-- <script type="module" src="/widget/adp-widget.js"></script> -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**步骤 2: 添加 TypeScript 类型声明 (可选)**

> **适用场景**:
>
> - ✅ 项目使用 TypeScript 开发
> - ✅ 需要编辑器代码提示和类型检查
> - ❌ 纯 JavaScript 项目可跳过此步骤

如果使用 TypeScript，创建 `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "adp-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "widget-json"?: string;
        disable?: boolean;
        locale?: string;
        ref?: React.Ref<HTMLElement>;
      },
      HTMLElement
    >;
  }
}
```

**步骤 3: 在组件中使用**

```tsx
import { useEffect, useRef, useState } from "react";

function WidgetDemo() {
  const widgetRef = useRef<HTMLElement>(null);
  const [config, setConfig] = useState({
    type: "Card",
    children: [
      { type: "Title", value: "React 集成示例" },
      {
        type: "Button",
        label: "点击我",
        onClickAction: { type: "button.click" },
      },
    ],
  });

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const handleAction = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log("Action:", customEvent.detail.action);
    };

    widget.addEventListener("widget-action", handleAction);
    return () => {
      widget.removeEventListener("widget-action", handleAction);
    };
  }, []);

  return (
    <adp-widget
      ref={widgetRef}
      widget-json={JSON.stringify(config)}
      locale="zh-CN"
    />
  );
}

export default WidgetDemo;
```

---

#### 3.3.2 Vue 项目集成

**步骤 1: 在 `index.html` 中引入 SDK**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <!-- 方式一: 使用 CDN -->
    <script
      type="module"
      src="https://cdn.example.com/adp-widget/v1.0.0/adp-widget.js"
    ></script>

    <!-- 方式二: 使用本地文件 -->
    <!-- <script type="module" src="/widget/adp-widget.js"></script> -->
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

**步骤 2: 添加 TypeScript 类型声明 (可选)**

> **适用场景**:
>
> - ✅ 项目使用 TypeScript 开发
> - ✅ 需要编辑器代码提示和类型检查
> - ❌ 纯 JavaScript 项目可跳过此步骤

如果使用 TypeScript，创建 `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

declare module "vue" {
  export interface GlobalComponents {
    "adp-widget": {
      "widget-json"?: string;
      disable?: boolean;
      locale?: string;
    };
  }
}
```

**步骤 3: 在组件中使用**

```vue
<template>
  <div class="widget-container">
    <adp-widget
      ref="widgetRef"
      :widget-json="JSON.stringify(config)"
      :locale="locale"
      :disable="isDisabled"
      @widget-action="handleAction"
      @widget-rendered="handleRendered"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const widgetRef = ref<HTMLElement>();
const locale = ref<"zh-CN" | "en-US">("zh-CN");
const isDisabled = ref(false);

const config = ref({
  type: "Card",
  children: [
    { type: "Title", value: "Vue 集成示例" },
    {
      type: "Button",
      label: "点击我",
      onClickAction: { type: "button.click" },
    },
  ],
});

const handleAction = (e: Event) => {
  const customEvent = e as CustomEvent;
  console.log("Action:", customEvent.detail.action);
};

const handleRendered = (e: Event) => {
  const customEvent = e as CustomEvent;
  console.log("Rendered:", customEvent.detail);
};
</script>
```

---

## 4. 核心 API

### 4.1 HTML 属性 (Attributes)

#### `widget-json` (必需)

- **类型**: `string`
- **说明**: JSON 字符串格式的配置对象
- **示例**:

```html
<adp-widget widget-json='{"type":"Button","label":"按钮"}'></adp-widget>
```

**在 JavaScript 中动态设置**:

```javascript
const config = { type: "Button", label: "按钮" };
widget.setAttribute("widget-json", JSON.stringify(config));
```

#### `disable` (可选)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 全局禁用所有表单输入和按钮 (除了设置 `alwaysEnabled: true` 的按钮)
- **示例**:

```html
<!-- 禁用 -->
<adp-widget widget-json="..." disable></adp-widget>

<!-- 启用 -->
<adp-widget widget-json="..."></adp-widget>
```

**动态控制**:

```javascript
// 禁用
widget.setAttribute("disable", "");

// 启用
widget.removeAttribute("disable");
```

#### `locale` (可选)

- **类型**: `string`
- **默认值**: `'zh-CN'`
- **支持值**:
  - 中文: `'zh-CN'`, `'zh'`, `'chinese'`
  - 英文: `'en-US'`, `'en'`, `'english'`
- **说明**: 设置界面语言
- **示例**:

```html
<!-- 中文 -->
<adp-widget widget-json="..." locale="zh-CN"></adp-widget>

<!-- 英文 -->
<adp-widget widget-json="..." locale="en-US"></adp-widget>
```

---

## 5. 事件处理

### 5.1 widget-action 事件

#### 事件详情

```typescript
interface WidgetActionEvent extends CustomEvent {
  detail: {
    action: {
      type: string; // 动作类型
      payload?: Record<string, unknown>; // 动作数据
    };
  };
}
```

#### HTML 原生 JavaScript

```html
<!doctype html>
<html>
  <head>
    <script type="module" src="/widget/adp-widget.js"></script>
  </head>
  <body>
    <adp-widget id="demo"></adp-widget>

    <script type="module">
      const widget = document.getElementById("demo");

      // 监听 widget-action 事件
      widget.addEventListener("widget-action", (e) => {
        console.log("widget-action 事件:", e.detail.action);
      });

      // 监听 widget-rendered 事件
      widget.addEventListener("widget-rendered", (e) => {
        console.log("widget-rendered 事件:", e.detail);
      });
    </script>
  </body>
</html>
```

#### React 项目

```tsx
import { useEffect, useRef } from "react";

function WidgetWrapper() {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const handleAction = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log("widget-action 事件:", customEvent.detail.action);
    };

    const handleRendered = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log("widget-rendered 事件:", customEvent.detail);
    };

    widget.addEventListener("widget-action", handleAction);
    widget.addEventListener("widget-rendered", handleRendered);

    return () => {
      widget.removeEventListener("widget-action", handleAction);
      widget.removeEventListener("widget-rendered", handleRendered);
    };
  }, []);

  return <adp-widget ref={widgetRef} widget-json={JSON.stringify(config)} />;
}
```

#### Vue 3 项目

```vue
<template>
  <adp-widget
    :widget-json="JSON.stringify(config)"
    @widget-action="handleAction"
    @widget-rendered="handleRendered"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const config = ref({ type: "Button", label: "点击我" });

const handleAction = (e: Event) => {
  const customEvent = e as CustomEvent;
  console.log("widget-action 事件:", customEvent.detail.action);
};

const handleRendered = (e: Event) => {
  const customEvent = e as CustomEvent;
  console.log("widget-rendered 事件:", customEvent.detail);
};
</script>
```

---

## 6. 高级功能

### 6.1 全局禁用功能

#### 基本用法

```html
<!-- 禁用整个表单 -->
<adp-widget widget-json="..." disable></adp-widget>
```

#### 动态切换

```javascript
const widget = document.querySelector("adp-widget");

// 禁用
widget.setAttribute("disable", "true");
// 或者
widget.disable = true;

// 启用
widget.removeAttribute("disable");
// 或者
widget.disable = false;
```

#### alwaysEnabled 特性

即使表单禁用,某些按钮也可以点击:

```json
{
  "type": "Button",
  "label": "查看帮助",
  "onClickAction": {
    "type": "help.show",
    "alwaysEnabled": true // 🔥 忽略全局 disable
  }
}
```

**适用场景**:

- 帮助按钮
- 取消按钮
- 导航按钮

---

### 6.2 国际化功能

#### 切换语言

```html
<!-- 中文 -->
<adp-widget widget-json="..." locale="zh-CN"></adp-widget>

<!-- 英文 -->
<adp-widget widget-json="..." locale="en-US"></adp-widget>
```

#### 动态切换

```javascript
const widget = document.querySelector("adp-widget");

// 切换到英文
widget.setAttribute("locale", "en-US");

// 切换到中文
widget.setAttribute("locale", "zh-CN");
```

#### 支持的语言别名

| 语言 | 标准值  | 别名            |
| ---- | ------- | --------------- |
| 中文 | `zh-CN` | `zh`, `chinese` |
| 英文 | `en-US` | `en`, `english` |

---

## 7. 常见错误处理

### 7.1 配置错误

#### 错误示例 1: JSON 格式错误

```javascript
// ❌ 错误: 单引号不是合法的 JSON
widget.setAttribute("widget-json", "{'type':'Button'}");

// ✅ 正确: 使用 JSON.stringify
widget.setAttribute("widget-json", JSON.stringify({ type: "Button" }));
```

#### 错误示例 2: 缺少必需字段

```json
// ❌ 错误: Input 必须有 name 字段
{
  "type": "Input",
  "placeholder": "请输入"
}

// ✅ 正确
{
  "type": "Input",
  "name": "username",
  "placeholder": "请输入"
}
```

#### 监听渲染错误

```javascript
widget.addEventListener("widget-rendered", (e) => {
  if (!e.detail.success) {
    const error = e.detail.error;
    console.error("渲染失败:", error.message);

    // 显示友好提示
    alert(`配置错误: ${error.message}`);
  }
});
```

---

### 7.2 事件监听错误

#### 错误示例 1: ref 为 null

```tsx
// ❌ 错误: 可能在组件挂载前访问 ref
const widgetRef = useRef<HTMLElement>(null);
widgetRef.current.addEventListener("widget-action", handler); // 报错!

// ✅ 正确: 在 useEffect 中监听
useEffect(() => {
  const widget = widgetRef.current;
  if (!widget) return;

  widget.addEventListener("widget-action", handler);
  return () => widget.removeEventListener("widget-action", handler);
}, []);
```

#### 错误示例 2: 忘记移除监听器

```javascript
// ❌ 错误: 内存泄漏
function setupWidget() {
  widget.addEventListener("widget-action", (e) => {
    console.log(e.detail);
  });
}

// ✅ 正确: 保存引用并在清理时移除
function setupWidget() {
  const handler = (e) => console.log(e.detail);
  widget.addEventListener("widget-action", handler);

  return () => {
    widget.removeEventListener("widget-action", handler);
  };
}
```

---

### 7.3 属性传递错误

#### Vue 中的常见错误

```vue
<!-- ❌ 错误: disable 是布尔属性,需要 v-bind -->
<adp-widget disable="false"></adp-widget>

<!-- ✅ 正确 -->
<adp-widget :disable="false"></adp-widget>

<!-- ❌ 错误: widget-json 应该是字符串 -->
<adp-widget :widget-json="config"></adp-widget>

<!-- ✅ 正确 -->
<adp-widget :widget-json="JSON.stringify(config)"></adp-widget>
```

---

### 7.4 加载错误

#### 错误: 找不到 adp-widget 标签

```html
<!-- ❌ 错误: 在 SDK 加载前使用 -->
<script>
  const widget = document.querySelector("adp-widget"); // null!
</script>
<script type="module" src="/widget/adp-widget.js"></script>

<!-- ✅ 正确: 确保 SDK 先加载 -->
<script type="module" src="/widget/adp-widget.js"></script>
<script type="module">
  // 等待 DOM 就绪
  document.addEventListener("DOMContentLoaded", () => {
    const widget = document.querySelector("adp-widget");
  });
</script>
```

---

## 附录 A: 完整示例项目

### React 示例

```bash
# 克隆示例项目
git clone https://github.com/example/adp-widget-examples.git
cd adp-widget-examples/react-example

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### Vue 示例

```bash
cd ad p-widget-examples/vue-example
npm install
npm run dev
```

---

## 附录 B: 更新日志

### 1.0.0 (2025-02-09)

- ✨ 初始发布
- ✅ 支持 React、Vue、原生 HTML
- ✅ 完整的 TypeScript 类型定义
- ✅ 国际化支持
- ✅ 按需加载 Markdown 和 Chart 组件
