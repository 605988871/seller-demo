<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- keep-alive用来缓存组件,避免多次加载相应的组件,减少性能消耗 -->
    <keep-alive><router-view :seller="seller"></router-view></keep-alive>
  </div>
</template>

<script>
import { urlParse } from "@/common/js/until";
import header from "@/components/goods/header/header";
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get("/api/seller?id=" + this.seller.id).then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象
        //const target = { a: 1, b: 1 };
        // const source1 = { b: 2, c: 2 };
        // const source2 = { c: 3 };
        // Object.assign(target, source1, source2);
        // target  {a:1, b:2, c:3}
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
  },
  components: {
    "v-header": header
  }
};
</script>
//router-link默认渲染成a标签
//css规范：布局》宽高》其他杂项
//c1，c2{x}:&1和&2都拥有x属性
//c1.important{x}:两个元素的class都为important,但只希望c1的有x样式
//a[href]{x}:拥有href属性的a有x样式
//nav>ul比nav ul限定更严格，必须后面的元素只比前面的低一个级别。
<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
</style>
