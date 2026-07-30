#!/usr/bin/env node
// downloads the SDK from the URL in ADP_SDK_URL or VITE_ADP_SDK_URL env var
// writes to public/vendor/adp-widget-sdk.js

import fs from 'fs'
import path from 'path'

const url = process.env.ADP_SDK_URL || process.env.VITE_ADP_SDK_URL
if (!url) {
  console.error('未检测到 ADP SDK URL。请设置环境变量 ADP_SDK_URL 或 VITE_ADP_SDK_URL 后再运行此脚本。')
  process.exit(0)
}

const outDir = path.resolve(process.cwd(), 'public', 'vendor')
const outFile = path.join(outDir, 'adp-widget-sdk.js')

async function download() {
  try {
    await fs.promises.mkdir(outDir, { recursive: true })
    console.log('开始下载 ADP SDK：', url)

    // 使用全局 fetch（Node 18+）。若不可用，请使用其他方法。
    if (typeof fetch === 'undefined') {
      throw new Error('当前 Node 环境不支持 fetch，请使用 Node 18+ 或手动下载 SDK 到 public/vendor/')
    }

    const res = await fetch(url)
    if (!res.ok) throw new Error(`下载失败：${res.status} ${res.statusText}`)

    const fileStream = fs.createWriteStream(outFile)
    await new Promise((resolve, reject) => {
      const reader = res.body.getReader()
      function pump() {
        reader.read().then(({ done, value }) => {
          if (done) {
            fileStream.end()
            resolve()
            return
          }
          fileStream.write(Buffer.from(value))
          pump()
        }).catch(reject)
      }
      pump()
    })

    console.log('SDK 下载完成，保存到', outFile)
  } catch (err) {
    console.error('下载 SDK 失败：', err.message || err)
    process.exit(1)
  }
}

download()
