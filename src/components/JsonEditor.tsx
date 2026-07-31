import { useState, useEffect } from 'react'
import './JsonEditor.css'

interface JsonEditorProps {
  value: any
  onChange: (value: any) => void
}

function JsonEditor({ value, onChange }: JsonEditorProps) {
  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState<string | null>(null)

  // 当外部 value 改变时，更新编辑器内容
  useEffect(() => {
    setJsonText(JSON.stringify(value, null, 2))
    setError(null)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setJsonText(newText)

    // 尝试解析 JSON
    try {
      const parsed = JSON.parse(newText)
      setError(null)
      onChange(parsed)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonText)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonText(formatted)
      setError(null)
      onChange(parsed)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonText)
      const minified = JSON.stringify(parsed)
      setJsonText(minified)
      setError(null)
      onChange(parsed)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonText)
      .then(() => alert('已复制到剪贴板'))
      .catch(() => alert('复制失败'))
  }

  return (
    <div className="json-editor">
      <div className="editor-toolbar">
        <button onClick={formatJson} title="格式化 JSON">
          🎨 格式化
        </button>
        <button onClick={minifyJson} title="压缩 JSON">
          📦 压缩
        </button>
        <button onClick={copyToClipboard} title="复制到剪贴板">
          📋 复制
        </button>
      </div>

      <textarea
        className={`editor-textarea ${error ? 'error' : ''}`}
        value={jsonText}
        onChange={handleChange}
        spellCheck={false}
        placeholder="输入 JSON 配置..."
      />

      {error && (
        <div className="editor-error">
          ❌ JSON 解析错误: {error}
        </div>
      )}

      <div className="editor-info">
        <span>行数: {jsonText.split('\n').length}</span>
        <span>字符数: {jsonText.length}</span>
      </div>
    </div>
  )
}

export default JsonEditor
