<template>
  <div class="nav">
    <!-- <audio
      id="audio"
      src="http://m8.music.126.net/20200518153215/6c3ca42b36dc3e4f50bfc22848a71573/ymusic/1606/426f/10a6/a01cace34f2df73c384bbcfe3e30b827.mp3"
      loop="loop"
      autoplay="true"
    ></audio>-->
    <!-- <audio id="audio" :src="this.$store.state.musicurl" loop="loop" autoplay="true"></audio> -->
    <el-popover placement="bottom-start" trigger="hover">
      <el-menu class="el-menu-demo" mode="vertical" :router="false" @select="handleSelect">
        <el-menu-item index="/home">首页</el-menu-item>
        <!-- <el-menu-item index="/comment">歌曲热评</el-menu-item> -->
        <el-menu-item index="/play">播放页</el-menu-item>
        <el-menu-item index="/isshowbtn">{{showbtn}}播放菜单</el-menu-item>
        <el-menu-item index="/isshowsearch">{{showsearch}}搜索</el-menu-item>
        <el-menu-item index="/isshowcomment">{{showcomment}}评论</el-menu-item>
        <el-menu-item index="/home" disabled>正在播放:{{this.$store.state.currentsone}}</el-menu-item>
        <el-menu-item index="/search" disabled>{{this.$store.state.lyrc}}</el-menu-item>
      </el-menu>
      <el-button slot="reference" icon="el-icon-menu"></el-button>
    </el-popover>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      showbtn: "打开",
      showsearch: "打开",
      showcomment: "打开"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      //取消elmenu的router，在这里设置页面跳转
      if (keyPath == "/home") {
        this.$router.push("/home");
      } else if (keyPath == "/play") {
        this.$router.push("/play");
      } else if (keyPath == "/isshowbtn") {
        if (this.$store.state.isshowbtn == "block") {
          this.showbtn = "显示";
          this.$store.state.isshowbtn = "none";
        } else {
          this.showbtn = "关闭";
          this.$store.state.isshowbtn = "block";
        }
      } else if (keyPath == "/isshowsearch") {
        if (this.$store.state.isshowsearch == "block") {
          this.showsearch = "打开";
          this.$store.state.isshowsearch = "none";
        } else {
          this.showsearch = "关闭";
          this.$store.state.isshowsearch = "block";
        }
      } else if (keyPath == "/isshowcomment") {
        if (this.$store.state.isshowcomment == "block") {
          this.showcomment = "打开";
          this.$store.state.isshowcomment = "none";
        } else {
          //  this.$store.state.commentid= item.id;
          this.showcomment = "关闭";
          this.$store.state.isshowcomment = "block";
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  position: absolute;
  left: 2vw;
  top: 2vh;
  z-index: 100;
  /* color: #409EFF */
}
 
</style>
