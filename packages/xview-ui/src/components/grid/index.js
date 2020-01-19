
export { default as Row } from './Row.vue'
export { default as Col } from './Col.vue'
import { addStylesheet } from '../../tools'

const prefix = '.ui-col'

const genCol = () => {
  return Array.apply(null, { length: 24 }).map((_, i) => {
    let num = i + 1
    let val = `${num / 24 * 100}%`
    return `
      ${prefix}-span-${num} {
        width: ${val};
      }
      ${prefix}-order-${num} {
        order: ${num};
      }
      ${prefix}-pull-${num} {
        right: ${val};
      }
      ${prefix}-push-${num} {
        left: ${val};
      }
      ${prefix}-offset-${num} {
        margin-left: ${val};
      }
    `
  }).join('')
}

const genGrid = (size) => {
  return Array.apply(null, { length: 25 }).map((_, i) => {
    let val = `${i / 24 * 100}%`
    return i === 0 ? `
      ${prefix}-${size}-span-${i} {
        display: none;
      }
    ` : `
      ${prefix}-${size}-span-${i} {
        width: ${val};
      }
      ${prefix}-${size}-order-${i} {
        order: ${i};
      }
      ${prefix}-${size}-pull-${i} {
        right: ${val};
      }
      ${prefix}-${size}-push-${i} {
        left: ${val};
      }
      ${prefix}-${size}-offset-${i} {
        margin-left: ${val};
      }
    `
  }).join('')
}

const genGridAll = () => {
  return [
    { size: 'xs' },
    { size: 'sm', minWidth: 768 },
    { size: 'md', minWidth: 992 },
    { size: 'lg', minWidth: 1200 }
  ].map(_ => {
    return _.minWidth ? `
      @media (min-width: ${_.minWidth}px) {
        ${genGrid(_.size)}
      }
    ` : genGrid(_.size)
  }).join('')
}

addStylesheet('uiGridLayout', genCol() + genGridAll())