import { useState, useEffect, useRef } from "react";
import JsonEditor from "./JsonEditor";
import "./WidgetDemo.css";

interface ActionLog {
  timestamp: string;
  action: any;
}

const DEFAULT_CONFIG = {
  type: "Card",
  children: [
    { type: "Title", value: "React 集成示例" },
    { type: "Text", value: "这是一个通过 widget-json 动态渲染的卡片" },
    {
      type: "Input",
      name: "username",
      label: "用户名",
      placeholder: "请输入用户名",
    },
    {
      type: "Button",
      label: "点击我",
      onClickAction: { type: "button.click", payload: { source: "demo" } },
    },
    {
      type: "Button",
      label: "查看帮助",
      onClickAction: { type: "help.show", alwaysEnabled: true },
    },
  ],
};

function WidgetDemo() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<"zh-CN" | "en-US">(
    "zh-CN"
  );
  const widgetRef = useRef<HTMLElement>(null);

  // 监听 widget-action 事件
  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const handleAction = (e: Event) => {
      const customEvent = e as CustomEvent;
      const action = customEvent.detail.action;

      // 添加到日志
      const log: ActionLog = {
        timestamp: new Date().toLocaleTimeString(),
        action,
      };
      setActionLogs((prev) => [log, ...prev].slice(0, 10)); // 只保留最近10条
    };

    widget.addEventListener("widget-action", handleAction);

    // 监听 widget-rendered 事件
    const handleRendered = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { success, config, error, timestamp } = customEvent.detail;
      console.log("[widget-rendered]", { success, config, error, timestamp });
    };
    widget.addEventListener("widget-rendered", handleRendered);

    return () => {
      widget.removeEventListener("widget-action", handleAction);
      widget.removeEventListener("widget-rendered", handleRendered);
    };
  }, []);

  const handleConfigChange = (newConfig: any) => {
    setConfig(newConfig);
  };

  const clearLogs = () => {
    setActionLogs([]);
  };

  const toggleDisable = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <div className="widget-demo">
      <div className="demo-header">
        <h2>📝 Widget 演示</h2>
        <p>在左侧编辑 JSON 配置，右侧实时查看 Widget 渲染效果</p>
      </div>

      <div className="demo-content">
        {/* 左侧：JSON 编辑器 */}
        <div className="editor-panel">
          <div className="panel-header">
            <h3>⚙️ 配置编辑器</h3>
          </div>
          <JsonEditor value={config} onChange={handleConfigChange} />
        </div>

        {/* 右侧：Widget 预览和事件日志 */}
        <div className="preview-panel">
          {/* Widget 预览 */}
          <div className="widget-preview">
            <div className="panel-header">
              <h3>👁️ Widget 预览</h3>
              <div className="header-actions">
                <select
                  value={currentLocale}
                  onChange={(e) =>
                    setCurrentLocale(e.target.value as "zh-CN" | "en-US")
                  }
                  className="locale-select"
                >
                  <option value="zh-CN">🌐 中文</option>
                  <option value="en-US">🌐 English</option>
                </select>
                <button
                  onClick={toggleDisable}
                  className={`disable-btn ${isDisabled ? "active" : ""}`}
                >
                  {isDisabled ? "🔓 启用表单" : "🔒 禁用表单"}
                </button>
              </div>
            </div>
            <div className="widget-container">
              <adp-widget
                ref={widgetRef}
                widget-json={JSON.stringify(config)}
                disable={isDisabled}
                locale={currentLocale}
              />
            </div>
          </div>

          {/* 事件日志 */}
          <div className="event-logs">
            <div className="panel-header">
              <h3>📡 事件日志</h3>
              <button onClick={clearLogs} className="clear-btn">
                清空
              </button>
            </div>
            <div className="logs-container">
              {actionLogs.length === 0 ? (
                <div className="empty-logs">
                  暂无事件。点击 Widget 中的按钮触发事件。
                </div>
              ) : (
                actionLogs.map((log, index) => (
                  <div key={index} className="log-item">
                    <div className="log-time">{log.timestamp}</div>
                    <div className="log-content">
                      <pre>{JSON.stringify(log.action, null, 2)}</pre>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetDemo;
