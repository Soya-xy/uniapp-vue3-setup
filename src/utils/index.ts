import dayjs from 'dayjs'

const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatTime(t: Date, fmt: string = DEFAULT_TIME_FORMAT) {
  return t ? dayjs(t).format(fmt) : ''
}

export const timeInterval = (val: Date) => {
  return dayjs(val).valueOf() - dayjs().valueOf()
}

// export const TM = (uni as any).$uni.$tm.u.u
// 脱敏
export function addr(str: string) {
  if (!str)
    return ''

  // 取前4位
  const q4 = str.substring(0, 4)
  // 后4位
  const l = str.length
  const h4 = str.substring(l - 4, l)
  return `${q4}****${h4}`
}
/**
 * opt  object | string
 * to_url object | string
 * 例:
 * Tips({title:'提示'},'/pages/test/test'); 提示并跳转
 * Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值table上
 * tab=1 一定时间后跳转至 table上
 * tab=2 一定时间后跳转至非 table上
 * tab=3 一定时间后返回上页面
 * tab=4 关闭所有页面，打开到应用内的某个页面
 * tab=5 关闭当前页面，跳转到应用内的某个页面
 */
interface TipsOptions {
  title?: string
  icon?: 'none' | 'success' | 'loading' | 'error' | undefined
  duration?: number
  mask?: boolean
  success?: () => void
  fail?: () => void
  complete?: () => void
}
export const tips = (opt: TipsOptions, to_url?: any) => {
  const title = opt.title || ''
  const icon = opt.icon || 'none'
  const duration = opt.duration || 1500
  const success = opt.success
  if (title) {
    uni.showToast({
      title,
      icon,
      duration,
      success,
    })
  }
  if (to_url !== undefined) {
    if (typeof to_url == 'object') {
      const tab = to_url.tab || 1
      const url = to_url.url || ''
      switch (tab) {
        case 1:
          // 一定时间后跳转至 table
          setTimeout(() => {
            uni.navigateTo({
              url,
            })
          }, duration)
          break
        case 2:
          // 跳转至非table页面
          setTimeout(() => {
            uni.navigateTo({
              url,
            })
          }, duration)
          break
        case 3:
          // 返回上页面
          setTimeout(() => {
            // #ifndef H5
            uni.navigateBack({
              delta: parseInt(url),
            })
            // #endif
            // #ifdef H5
            history.back()
            // #endif
          }, duration)
          break
        case 4:
          // 关闭所有页面，打开到应用内的某个页面
          setTimeout(() => {
            uni.reLaunch({
              url,
            })
          }, duration)
          break
        case 5:
          // 关闭当前页面，跳转到应用内的某个页面
          setTimeout(() => {
            uni.redirectTo({
              url,
            })
          }, duration)
          break
      }
    }
    else if (typeof to_url == 'function') {
      setTimeout(() => {
        to_url && to_url()
      }, duration)
    }
    else {
      // 没有提示时跳转不延迟
      setTimeout(() => {
        uni.navigateTo({
          url: to_url,
        })
      }, title ? duration : 0)
    }
  }
}
export const go = (url: string) => {
  uni.navigateTo({
    url,
  })
}

export const redirect = (url: string) => {
  uni.redirectTo({
    url,
  })
}
export const back = (delta = 1) => {
  uni.navigateBack({
    delta,
  })
}
