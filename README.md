# ADP Widget React Demo

这个分支演示了如何在 React 应用中把腾讯 ADP widget SDK 下载到项目并作为本地脚本引入。

主要点：
- 使用 Vite + React
- 提供一个脚本（scripts/download-sdk.mjs）用于从指定的 URL 下载 SDK 到 public/vendor/adp-widget-sdk.js
- AdpWidget 组件在运行时从本地 /vendor/adp-widget-sdk.js 初始化 widget（适配文档中的初始化代码）

快速开始：

1. 克隆并切到演示分支：

```bash
git clone https://github.com/xm-c/adp-widget-demo.git
cd adp-widget-demo
git checkout adp-react-demo
```

2. 配置 SDK 源（在运行前设置环境变量或者把 URL 写到命令行）：

在本地先把示例 .env 文件复制并编辑（可选）：

```bash
cp .env.example .env.local
# 编辑 .env.local 把 VITE_ADP_SDK_URL 设置为腾讯提供的 SDK URL
```

3. 下载 SDK 到项目（可选，postinstall 也会尝试运行）：

```bash
npm run download-sdk
# 或者在安装依赖后自动运行： npm install
```

4. 启动开发服务器：

```bash
npm install
npm run dev
```

5. 在浏览器打开 http://localhost:5173 并查看 ADP Widget 区域。

注意：SDK 的初始化参数（appKey、widgetId 等）需要根据腾讯文档调整，组件内有明显位置提示需要替换为文档示例代码。
