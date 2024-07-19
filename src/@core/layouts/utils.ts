// ** Types
import moment from 'moment'
import { NextRouter } from 'next/router'

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */

const format = 'YYYY-MM-DD HH:mm:ss'

export const handleURLQueries = (router: NextRouter, path: string | undefined): boolean => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query)

    return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]] as string) && path !== '/'
  }

  return false
}

export function isNumber(input: any) {
  const regex = /^\d+$/
  const regexWithDotEnd = /^\d+.$/
  const regexFloatNumber = /^\d+.\d+$/

  return regex.test(input) || regexWithDotEnd.test(input) || regexFloatNumber.test(input)
}

export function isInteger(input: any) {
  if (input.indexOf('.') >= 0) return false

  const regex = /^\d+$/

  return regex.test(input)
}

export const formatDateYYYY_MM_DDHHMMSS = (value: any) => moment(`${value}`).format(format)

export const formatMoney = (value: any) => new Intl.NumberFormat().format(+`${value}`)
