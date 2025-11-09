// 运行时兜底：如果构建阶段未编译 definePage 宏，避免 iOS WebView 报错
if (typeof (globalThis as any).definePage !== 'function') {
  (globalThis as any).definePage = (_meta: any) => {}
}
