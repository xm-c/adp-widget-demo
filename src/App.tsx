import WidgetDemo from "./components/WidgetDemo";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 adp-widget React 集成示例</h1>
        <p>演示如何在 React 项目中使用 adp-widget Web Component</p>
      </header>

      <main className="main-content">
        <WidgetDemo />
      </main>
    </div>
  );
}

export default App;
