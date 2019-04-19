/**
 * 表单验证模块
 */

import { getType } from '../../utils'

// 是否假值
const isFalse = value => [undefined, null, ''].indexOf(value) !== -1
// 是否类型错误
const isTypeError = (value, type) => getType(value) !== type
// 是否数值
const isNumber = value => typeof value === 'number'
// 是否数组
const isArray = value => value instanceof Array

/**
 * 验证器
 * @param {Object} schema 
 * @param {any} value 
 */
export function validate(schema, value) {
  let { required, message, type, min, max, validator } = schema
  return new Promise((resolve, reject) => {
    // 验证非空
    if (required) {
      if (isFalse(value)) reject(new Error(message || '该项为必填项'))
    // 检查类型
    } else if (type && isTypeError(value, type)) {
      reject(new Error(message || '该项类型错误'))
    // 检查最小值
    } else if (min !== undefined) {
      if (isNumber(value) && value < min) {
        reject(new Error(message || `该项值不能小于${min}`))
      } else if (isArray(value) && value.length < min) {
        reject(new Error(message || `请至少选择${min}项`))
      }
    // 检查最大值
    } else if (max !== undefined) {
      if (isNumber(value) && value > max) {
        reject(new Error(message || `该项值不能大于${max}`))
      } else if (isArray(value) && value.length > max) {
        reject(new Error(message || `请最多选择${max}项`))
      }
    // 自定义验证
    } else if (validator) {
      validator(schema, value, error => {
        if (error) reject(error)
      })
    } else {
      resolve()
    }
  })
}