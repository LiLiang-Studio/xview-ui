export { default } from '../grid/Col.vue'
import { addStylesheet } from '../../tools'

const prefix = '.x-col',
  nulls = Array.apply(null, { length: 25 }),
  getSpan = (i, val) => i ? `width:${val}` : `display:none`,
  genCol = () => nulls.map((_, i) => {
    let val = `${i / 24 * 100}%`
    return [
      `${prefix}-span-${i}{${getSpan(i, val)};}`,
      `${prefix}-order-${i}{order:${i};}`,
      `${prefix}-pull-${i}{right:${val};}`,
      `${prefix}-push-${i}{left:${val};}`,
      `${prefix}-offset-${i}{margin-left:${val};}`
    ].join('')
  }).join(''),
  genGrid = size => nulls.map((_, i) => {
    let val = `${i / 24 * 100}%`
    return [
      `${prefix}-${size}-span-${i}{${getSpan(i, val)};}`,
      `${prefix}-${size}-order-${i}{order:${i};}`,
      `${prefix}-${size}-pull-${i}{right:${val};}`,
      `${prefix}-${size}-push-${i}{left:${val};}`,
      `${prefix}-${size}-offset-${i}{margin-left:${val};}`
    ].join('')
  }).join(''),
  genGridAll = () => [
    { size: 'xs' },
    { size: 'sm', minWidth: 576 },
    { size: 'md', minWidth: 768 },
    { size: 'lg', minWidth: 992 },
    { size: 'xl', minWidth: 1200 },
    { size: 'xxl', minWidth: 1600 }
  ].map(_ => _.minWidth ? `@media (min-width:${_.minWidth}px){${genGrid(_.size)}}` : genGrid(_.size)).join('')

addStylesheet('XGridLayout', genCol() + genGridAll())