<template>
  <div>
    <div class="page-title">Card 卡片</div>
    <div class="page-sub-title">自定义标题、额外操作和主体内容，可以完全自由控制各个部分，也可以结合其它组件一起使用，较为灵活。</div>
    <Card>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>Classic film
      </p>
      <a href="#" slot="extra" @click.prevent="changeLimit">Change</a>
      <ul>
        <li v-for="item in randomMovieList" :key="item.name">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
          <span>
            <Icon type="ios-star" v-for="n in 4" :key="n"></Icon>
            <Icon type="ios-star" v-if="item.rate >= 9.5"></Icon>
            <Icon type="ios-star-half" v-else></Icon>
            {{ item.rate }}
          </span>
        </li>
      </ul>
    </Card>

    <div class="page-sub-title">通过设置属性bordered为 false ，可以不添加边框，建议在灰色背景下使用。</div>
    <div style="background:#eee;padding: 20px">
      <Card :bordered="false">
        <p slot="title">No border title</p>
        <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type.</p>
      </Card>
    </div>

    <div class="page-sub-title">通过设置属性dis-hover来禁用鼠标悬停显示阴影的效果。</div>
    <Card dis-hover title="The standard card">
      <p>Content of card</p>
      <p>Content of card</p>
      <p>Content of card</p>
    </Card>

    <div class="page-sub-title">通过设置属性shadow来显示卡片阴影，使用该属性后，bordered和dis-hover将无效，建议在灰色背景下使用。</div>
    <dir style="background: rgb(238, 238, 238); padding: 20px;">
      <Card shadow>
        <p slot="title">Use a card with a shadow effect</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
    </dir>

    <div class="page-sub-title">只包含内容区域，没有标题。</div>
    <Card style="width:320px">
      <div style="text-align:center">
        <img src="http://v2.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png">
        <h3>A high quality UI Toolkit based on Vue.js</h3>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movieList: [
        {
          name: "The Shawshank Redemption",
          url: "https://movie.douban.com/subject/1292052/",
          rate: 9.6
        },
        {
          name: "Leon:The Professional",
          url: "https://movie.douban.com/subject/1295644/",
          rate: 9.4
        },
        {
          name: "Farewell to My Concubine",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5
        },
        {
          name: "Forrest Gump",
          url: "https://movie.douban.com/subject/1292720/",
          rate: 9.4
        },
        {
          name: "Life Is Beautiful",
          url: "https://movie.douban.com/subject/1292063/",
          rate: 9.5
        },
        {
          name: "Spirited Away",
          url: "https://movie.douban.com/subject/1291561/",
          rate: 9.2
        },
        {
          name: "Schindler's List",
          url: "https://movie.douban.com/subject/1295124/",
          rate: 9.4
        },
        {
          name: "The Legend of 1900",
          url: "https://movie.douban.com/subject/1292001/",
          rate: 9.2
        },
        {
          name: "WALL·E",
          url: "https://movie.douban.com/subject/2131459/",
          rate: 9.3
        },
        {
          name: "Inception",
          url: "https://movie.douban.com/subject/3541415/",
          rate: 9.2
        }
      ],
      randomMovieList: []
    };
  },
  methods: {
    changeLimit() {
      function getArrayItems(arr, num) {
        const temp_array = [];
        for (let index in arr) {
          temp_array.push(arr[index]);
        }
        const return_array = [];
        for (let i = 0; i < num; i++) {
          if (temp_array.length > 0) {
            const arrIndex = Math.floor(Math.random() * temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
          } else {
            break;
          }
        }
        return return_array;
      }
      this.randomMovieList = getArrayItems(this.movieList, 5);
    }
  },
  mounted() {
    this.changeLimit();
  }
};
</script>