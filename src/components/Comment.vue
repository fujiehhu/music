<template>
  <div class="com">
    <wbc-nav></wbc-nav>
    <div class="main" :style="{display: this.$store.state.isshowcomment }">
      <div class="comment">
        <section v-for="(item,index) in comment" :key="index" class="list-item">
          <div class="item-image">
            <img :src="url+(index+605 ) +jpg" />
          </div>
          <div class="item-text">
            <div class="text-title">{{item.user.nickname}}</div>
            <div class="text-desc">{{item.content}}</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import nav from "../components/Nav.vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      comment: [],
      url: "https://i.picsum.photos/id/",
      jpg: "/600/400.jpg" //图像尺寸
    };
  },
  components: {
    //定义组件
    "wbc-nav": nav
  },
  methods: {
    getComments: function() {
      const that = this;
      const url = "https://autumnfish.cn/";
      
      const id = this.$store.state.commentid;  
      const commenturl = "comment/music?id=";
      //读取评论
      axios.get(url + commenturl + id + "&limit=100").then(function(resp) {
        that.comment = resp.data.comments;
      });
    }
  },
  created() {
    this.getComments();
  },
  mounted() {
    var audio = document.getElementById("audio"); //播放器
    audio.currentTime = this.$store.state.currentTime_global;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.com {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.main {
  width: 100vw;
  height: 100vh;
  perspective: 100px;
  transform-style: preserve-3d;
  overflow: auto;
  /* z-index: 99; */
}
.comment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list-item {
  background: linear-gradient(
    90deg,
    rgba(247, 104, 69, 0.2),
    rgba(247, 164, 10, 0.2),
    rgba(240, 236, 9, 0.2),
    rgba(10, 247, 10, 0.2),
    rgba(14, 213, 248, 0.2),
    rgba(18, 22, 245, 0.2),
    rgba(231, 15, 203, 0.2)
  );
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35vh;
  overflow: hidden;
  z-index: -1;
}

/* .list-item:hover {
  background-color: rgba(240, 229, 229, 0.2);
} */
.item-image {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  transform: translateZ(-50px) scale(2.4);
}
.item-image::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
.item-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-text {
  color: #ffffff;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
}
.text-title {
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 20px;
  /* color: black; */
}
.text-desc {
  font-size: 1.8rem;
  color: whitesmoke;
}

@media (max-width: 600px) {
.com {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.main {
  width: 100vw;
  height: 100vh;
  perspective: 100px;
  transform-style: preserve-3d;
  overflow: auto;
  /* z-index: 99; */
}
.comment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list-item {
  background: linear-gradient(
    90deg,
    rgba(247, 104, 69, 0.2),
    rgba(247, 164, 10, 0.2),
    rgba(240, 236, 9, 0.2),
    rgba(10, 247, 10, 0.2),
    rgba(14, 213, 248, 0.2),
    rgba(18, 22, 245, 0.2),
    rgba(231, 15, 203, 0.2)
  );
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20vh;
  overflow: hidden;
  z-index: -1;
}

/* .list-item:hover {
  background-color: rgba(240, 229, 229, 0.2);
} */
.item-image {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  transform: translateZ(-50px) scale(3.4);
}
.item-image::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
.item-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-text {
  color: #ffffff;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
}
.text-title {
  font-size: 0.7rem;
  font-weight: bolder;
  margin-bottom: 20px;
  /* color: black; */
}
.text-desc {
  font-size: 0.9rem;
  color: whitesmoke;
}
}
</style>
