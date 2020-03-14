<template>
  <div>
    <div class="page-title">List 列表</div>
    <p>最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。</p>

    <div class="page-sub-title">基础用法</div>
    <p>设置属性 size 可以显示三种不同尺寸的列表。可以设置 header 或 footer 来自定义列表头部或尾部。</p>
    <br />
    <div>
      <strong>Default Size:</strong>
      <br />
      <br />
      <List header="Header" footer="Footer" border>
        <ListItem>这是一段文本。</ListItem>
        <ListItem>这是一段文本。</ListItem>
        <ListItem>这是一段文本。</ListItem>
      </List>
      <br />
      <strong>Small Size:</strong>
      <br />
      <br />
      <List header="Header" footer="Footer" border size="small">
        <ListItem>这是一段文本。</ListItem>
        <ListItem>这是一段文本。</ListItem>
        <ListItem>这是一段文本。</ListItem>
      </List>
      <br />
      <strong>Large Size:</strong>
      <br />
      <br />
      <List header="Header" footer="Footer" border size="large">
        <ListItem>这是一段文本。</ListItem>
        <ListItem>这是一段文本。</ListItem>
        <ListItem>这是一段文本。</ListItem>
      </List>
    </div>

    <div class="page-sub-title">基础列表</div>
    <p>带有图标、标题、描述的基础列表。也可以带有列表操作组。</p>
    <br />
    <List>
      <ListItem>
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          title="这是标题"
          description="这是描述信息，这是描述信息，这是描述信息。"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          title="这是标题"
          description="这是描述信息，这是描述信息，这是描述信息。"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          title="这是标题"
          description="这是描述信息，这是描述信息，这是描述信息。"
        />
        <template slot="action">
          <li>
            <a href>Edit</a>
          </li>
          <li>
            <a href>More</a>
          </li>
        </template>
      </ListItem>
      <ListItem>
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          title="这是标题"
          description="这是描述信息，这是描述信息，这是描述信息。"
        />
        <template slot="action">
          <li>
            <a href>Edit</a>
          </li>
          <li>
            <a href>More</a>
          </li>
        </template>
      </ListItem>
    </List>

    <div class="page-sub-title">竖排列表样式</div>
    <p>设置属性 item-layout 为 vertical 可实现竖排列表样式。</p>
    <br />
    <List item-layout="vertical">
      <ListItem v-for="item in data" :key="item.title">
        <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
        {{ item.content }}
        <template slot="action">
          <li>
            <Icon type="ios-star-outline" />123
          </li>
          <li>
            <Icon type="ios-thumbs-up-outline" />234
          </li>
          <li>
            <Icon type="ios-chatbubbles-outline" />345
          </li>
        </template>
        <template slot="extra">
          <img
            src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
            style="width: 280px"
          />
        </template>
      </ListItem>
    </List>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          title: "这是标题 1",
          description:
            "这是描述信息，这是描述信息，这是描述信息。",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容"
        },
        {
          title: "这是标题 2",
          description:
            "这是描述信息，这是描述信息，这是描述信息。",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容"
        },
        {
          title: "这是标题 3",
          description:
            "这是描述信息，这是描述信息，这是描述信息。",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容，这是列表的文本内容"
        }
      ]
    };
  }
};
</script>