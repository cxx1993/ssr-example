/**
 * 基础配置
 * @author：chenxin
 */
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

export const config = {
  isDev: process.env.NODE_ENV !== 'production',
  baseUrl: isDev ? `http://localhost:${port}` : ''
}
