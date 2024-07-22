import {
  setLocalStorage,
  getLocalStorage
} from '../../assets/js/common.ts'

export const changePageTheme = (theme: string) => {
  setLocalStorage('pageTheme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

export const getPageTheme = () => getLocalStorage('pageTheme') || 'light'

export const initPageTheme = () => changePageTheme(getPageTheme())
