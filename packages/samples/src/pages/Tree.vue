<template>
  <div style="padding-bottom:200px;">
    <div class="page-title">Tree 树形控件</div>
    <p>
      文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。
      使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。
    </p>

    <div class="page-sub-title">基础用法</div>
    <p>最简单的用法，展示可选中，默认展开功能。</p>
    <br>
    <Tree :data="data1"></Tree>

    <div class="page-sub-title">可勾选</div>
    <p>设置属性 show-checkbox 可以对节点进行勾选。</p>
    <b></b>
    <Tree :data="data2" check-directly show-checkbox></Tree>

    <div class="page-sub-title">异步加载子节点</div>
    <p>
      使用 load-data 属性可以异步加载子节点，需要给数据增加 loading 来标识当前是否在加载中。
      <br>load-data 第一个参数为当前节点信息；执行 load-data 的第二个参数，将需要添加的数据传入。
      <br>如果某节点不包含 loading 和 children 字段，则不会应用异步加载效果。
    </p>
    <br>
    <Tree :data="data3" :load-data="loadData" show-checkbox></Tree>

    <div class="page-sub-title">默认展开、选中、勾选和禁用</div>
    <p>
      给节点设置 expand、selected、checked 和 disabled 可以将节点设置为展开、选中、勾选和禁用。
      <br>设置属性 multiple 可进行多选。</p>
    <br>
    <Tree :data="data4" show-checkbox multiple></Tree>

    <div class="page-sub-title">自定义节点内容</div>
    <p>
      使用强大的 Render 函数可以自定义节点显示内容和交互，比如添加图标，按钮等。
      <br>Render 函数的第二个参数，包含两个字段：
    </p>
    <ul style="padding-left:3em;line-height:2;">
      <li><strong>为了减少不必要的的更新和状态维护，以提供更好的性能，这里与iview不同，不需要node参数</strong></li>
      <li><strong>如果你不需要使用node和root参数，则与iview用法完全一致</strong></li>
      <li>root {Array}：根节点树形数据打平后的一维数组（<strong>此处与iview不同</strong>）</li>
      <li>data {Object}：当前节点的数据</li>
    </ul>
    <p>
      通过合理地使用 root 和 data 可以实现各种效果，
      <br>每个节点都设置了一个 nodeKey 字段，用来标识节点的 id。
      <br>Render 函数分两种，一种是给当前树的每个节点都设置同样的渲染内容，此 render 通过 Tree 组件的属性 render 传递；
      另一种是单独给某个节点设置，在该节点的 render 字段内设置；同时设置时，会优先使用当前节点的 Render 函数。
    </p>
    <br>
    <p><b>删除节点代码如下：</b></p>
    <pre>
      <code>
        remove(root, data) {
          const parent = root.find(_ => _.children && _.children.includes(data))
          parent.children.splice(parent.children.indexOf(data), 1)
        }
      </code>
    </pre>
    <Tree :data="data5" :render="renderContent"></Tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ],
      data2: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ],
      data3: [
        {
          title: "parent",
          loading: false,
          children: []
        }
      ],
      data4: [
        {
          title: "parent 1",
          expand: true,
          selected: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                  disabled: true
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                  checked: true
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ],
      data5: [
        {
          title: "parent 1",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [
                  h("Icon", {
                    props: {
                      type: "ios-folder-outline"
                    },
                    style: {
                      marginRight: "8px"
                    }
                  }),
                  h("span", data.title)
                ]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "ios-plus-empty",
                        type: "primary"
                      }),
                      style: {
                        width: "72px"
                      },
                      on: {
                        click: () => {
                          this.append(data);
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: [
            {
              title: "child 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                  expand: true
                },
                {
                  title: "leaf 1-1-2",
                  expand: true
                }
              ]
            },
            {
              title: "child 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                  expand: true
                },
                {
                  title: "leaf 1-2-1",
                  expand: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        size: "small"
      }
    };
  },
  methods: {
    loadData(item, callback) {
      setTimeout(() => {
        const data = [
          {
            title: "children",
            loading: false,
            children: []
          },
          {
            title: "children",
            loading: false,
            children: []
          }
        ];
        callback(data);
      }, 1000);
    },
    renderContent(h, { root, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-plus-empty"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-minus-empty"
                }),
                on: {
                  click: () => {
                    this.remove(root, data);
                  }
                }
              })
            ]
          )
        ]
      );
    },
    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    remove(root, data) {
      const parent = root.find(_ => _.children && _ !== data && _.children.includes(data))
      parent.children.splice(parent.children.indexOf(data), 1)
    }
  }
};
</script>
<style lang="less">
</style>