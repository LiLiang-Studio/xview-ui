import createEventDirective from './eventDirective'

export const winclick = createEventDirective(window, 'click')
export const winresize = createEventDirective(window, 'resize')
export const winscroll = createEventDirective(window, 'scroll')