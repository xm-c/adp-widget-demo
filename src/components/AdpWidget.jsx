import React, { useEffect, useRef, useState } from 'react'

const LOCAL_SDK_PATH = '/vendor/adp-widget-sdk.js'
const APP_KEY = import.meta.env.VITE_ADP_APP_KEY || '<YOUR_APP_KEY>'
const WIDGET_ID = import.meta.env.VITE_ADP_WIDGET_ID || '<YOUR_WIDGET_ID>'

export default function AdpWidget() {
  const containerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // 如果已存在 script，直接初始化
    if (document.querySelector(`script[data-adp-local]`)) {
      setLoaded(true)
      tryInit()
      return
    }

    // 否则动态注入本地 SDK 脚本
    const script = document.createElement('script')
    script.src = LOCAL_SDK_PATH
    script.async = true
    script.setAttribute('data-adp-local', 'true')
    script.onload = () => {
      setLoaded(true)
      tryInit()
    }
    script.onerror = (e) => {
      console.error('加载本地 ADP SDK 失败，请确认 public/vendor/adp-widget-sdk.js 已存在 或 scripts/download-sdk.mjs 是否已执行', e)
    }
    document.body.appendChild(script)

    // 不在卸载时移除 script，以便 SPA 切换时复用
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function tryInit() {
    // ===== 注意：下面的初始化是占位的伪代码 =====
    // 请根据腾讯文档中的实际初始化方法替换这部分
    // 文档里通常有类似示例：
    //   const widget = new AdpWidget({ container: '#container', appKey: 'xxx', widgetId: 'yyy' })
    //   widget.render()
    // 或者 window.adp.init(...)

    if (typeof window.adp !== 'undefined' && typeof window.adp.init === 'function') {
      try {
        window.adp.init({
          container: containerRef.current,
          appKey: APP_KEY,
          widgetId: WIDGET_ID
        })
      } catch (err) {
        console.error('调用 window.adp.init 失败，请根据 SDK 文档检查参数与方法名', err)
      }
      return
    }

    // 尝试其他常见导出
    if (typeof window.AdpWidget === 'function') {
      try {
        // 如果 SDK 提供构造器
        /* eslint-disable no-new */
        new window.AdpWidget({
          container: containerRef.current,
          appKey: APP_KEY,
          widgetId: WIDGET_ID
        })
      } catch (err) {
        console.error('使用 AdpWidget 构造器初始化失败，请按 SDK 文档替换此处', err)
      }
      return
    }

    console.info('本地 ADP SDK 已加载，但未检测到预期的全局初始化方法；请按文档修改 AdpWidget 组件内的 tryInit 逻辑。')
  }

  return (
    <div>
      <div
        ref={containerRef}
        id="adp-widget-container"
        style={{ width: '100%', height: 600, border: '1px solid #ddd' }}
      >
        {loaded ? 'ADP widget 已加载，正在初始化（若空白请检查控制台）' : '正在加载本地 ADP SDK...'}
      </div>
    </div>
  )
}
