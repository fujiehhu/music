<template>
  <div class="search" :style="{display: this.$store.state.isshowsearch }">
    <div>
      <el-input
        v-model="query"
        @change="searchMusic"
        placeholder="知足"
        prefix-icon="el-icon-search"
        autocomplete="on"
      />
    </div>
    <div class="dropdown-content" :style="{display:dropdown_content }">
      <p v-for="(item,index) in musiclist" :key="index" @click="handleCommand(item)">
        <span>{{index+1}}:</span>
        <span>{{item.name}}</span>
        <span style="float:right">{{item.artists[0].name}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      query: "",
      musiclist: [],
      dropdown_content: "none"
    };
  },
  methods: {
    handleCommand(item) {
      this.$store.state.issearch = true;
      this.$store.state.currentsongid = item.id;
      this.$store.state.musiclist.push(item.id);
    },
    searchMusic: function(item) {
      // console.log(item);

      this.dropdown_content = "block";
      const that = this;
      const url = "https://autumnfish.cn/search?keywords=";
      //搜索歌曲
      axios.get(url + item + "&limit=30").then(function(resp) {
        that.musiclist = resp.data.result.songs;
      });
    }
  },
  created() {},
  mounted() {
    const that = this;
    var audio = document.getElementById("audio"); //播放器
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  position: fixed;
  top: 8vh;
  width: 40vw;
  left: 50%;
  background: rgba(223, 224, 224, 0.699);
  border-radius: 10px;
  min-width: 20vw;
  transform: translate(-50%, 0);
  /* color: aliceblue; */
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dropdown-content {
  text-align: left;
  border-radius: 15px;

  height: 40vh;
  line-height: 30px;
  overflow-y: scroll;
}
p {
  padding: 2px 5px 1px 5px;
}
/* 隐藏滚动条 */
p:hover {
  color: midnightblue;
  font-weight: bold;
}
.dropdown-content::-webkit-scrollbar {
  display: none;
}
@media (max-width: 600px) {
  .search {
    position: fixed;
    top: 15vh;
    width: 65vw;
    left: 50%;
    background: rgba(223, 224, 224, 0.699);
    border-radius: 10px;
    min-width: 20vw;
    transform: translate(-50%, 0);
    /* color: aliceblue; */
    z-index: 10;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .dropdown-content {
    text-align: left;
    border-radius: 15px;

    height: 40vh;
    line-height: 25px;
    overflow-y: scroll;
  }
  p {
    padding: 1px 3px 1px 3px;
  }
  /* 隐藏滚动条 */
  p:hover {
    color: midnightblue;
    font-weight: bold;
  }
  .dropdown-content::-webkit-scrollbar {
    display: none;
  }
}
</style>
