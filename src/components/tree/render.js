export default {
  functional: true,
  render: (h, ctx) => ctx.props.render(h, {
    root: ctx.props.node[0],
    node: ctx.props.node[1],
    data: ctx.props.data
  })
}