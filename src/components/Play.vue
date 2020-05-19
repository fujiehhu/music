<template>
  <div>
    <wbc-nav></wbc-nav>
    <wbc-search></wbc-search>
    <wbc-comment></wbc-comment>
    <div class="music-bgimg" :style="{backgroundImage: 'url('+  coverurl +')'}"></div>

    <!-- <div class="music-cover" :style="{backgroundImage: 'url('+ coverurl +')'}" ></div> -->
    <div id="music-cover" :style="{animation:this.$store.state.rotate}">
      <img :src="coverurl" />
    </div>
    <audio id="audio" :src="musicurl" autoplay="true"></audio>
    <textarea
      v-model="lyric"
      id="lrc_content"
      name="textfield"
      cols="70"
      rows="10"
      style="display:none;"
    ></textarea>
    <!-- 歌词 -->
    <div class="lyric">{{this.$store.state.lyrc}}</div>

    <wbc-footer></wbc-footer>
  </div>
</template>

<script>
import nav from "../components/Nav.vue";
import footer from "../components/Footer.vue";
import search from "../components/Search.vue";
import comment from "../components/Comment.vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      musicurl: "",
      lyric: "歌词",
      lineNo: 0, //当前行
      oLRC: {
        ti: "", //歌曲名
        ar: "", //演唱者
        al: "", //专辑名
        by: "", //歌词制作人
        offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] //歌词数组{t:时间,c:歌词}
      },
      coverurl: ""
    };
  },
  components: {
    //定义组件
    "wbc-nav": nav,
    "wbc-footer": footer,
    "wbc-search": search,
    "wbc-comment": comment
  },
  methods: {
    createLrcObj: function(lrc) {
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组
      // console.log(lrc);
      for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(
          lrcs[i].indexOf("[") + 1,
          lrcs[i].indexOf("]")
        ); //取[]间的内容
        var s = t.split(":"); //分离:前后文字

        if (isNaN(parseInt(s[0]))) {
          //不是数值
          for (var i in this.oLRC) {
            if (i != "ms" && i == s[0].toLowerCase()) {
              this.oLRC[i] = s[1];
            }
          }
        } else {
          //是数值
          var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
          var start = 0;
          for (var k in arr) {
            start += arr[k].length; //计算歌词位置
          }
          var content = lrcs[i].substring(start); //获取歌词内容
          for (var k in arr) {
            var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
            var s = t.split(":"); //分离:前后文字
            this.oLRC.ms.push({
              //对象{t:时间,c:歌词}加入ms数组
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content
            });
          }
        }
      }
      this.oLRC.ms.sort(function(a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });

      //   for (var i in this.oLRC) {
      //     //查看解析结果
      //     console.log(i, ":", this.oLRC[i]);
      //   }
    },

    //滚回到开头，用于播放结束时
    goback: function() {
      var ul = document.getElementById("lyric"); //歌词容器列表
      //   document.querySelector("#lyric.lineHigh").removeAttribute("class");
      //   ul.style.transform = "translateY(0)";
      this.lineNo = 0;
    },

    getlyric: function(id) {
      const that = this;
      const url = "https://autumnfish.cn/";
      const lyricurl = "lyric?id=";

      //读取数据
      axios
        .get(url + lyricurl + id, {
          params: {
            withCredentials: true
          }
        })
        .then(function(resp) {
          that.oLRC.ms.length = 0;
          that.lyric = resp.data.lrc.lyric;
          that.createLrcObj(that.lyric);
        });
    },
    getCover: function(id) {
      const that = this;
      const url = "https://autumnfish.cn/";
      const detail = "song/detail?ids=";

      //读取数据
      axios
        .get(url + detail + id, {
          params: {
            withCredentials: true
          }
        })
        .then(function(resp) {
          that.coverurl = resp.data.songs[0].al.picUrl;
          that.$store.state.coverurl = resp.data.songs[0].al.picUrl;
          that.$store.state.currentsone = resp.data.songs[0].al.name;
          //  console.log(resp.data.songs[0].al.name);
        });
    },
    getSong: function(id) {
      //   console.log(id);
      const that = this;
      const url = "https://autumnfish.cn/";
      const musicurl = "song/url?id=";
      //读取歌曲
      axios
        .get(url + musicurl + id, {
          params: {
            withCredentials: true
          }
        })
        .then(function(resp) {
          that.musicurl = resp.data.data[0].url;
          that.$store.state.musicurl = resp.data.data[0].url;
          //  console.log( resp.data);
        });
    }
  },

  created() {},
  mounted() {
    var audio = document.getElementById("audio");
    audio.currentTime = 0;
    const id = this.$store.state.musiclist[
      parseInt(Math.random() * 100) % this.$store.state.musiclist.length
    ];
    // const id = this.$store.state.currentsongid;
    this.getCover(id);
    this.getSong(id);
    this.getlyric(id);
    const that = this;

    // audio.currentTime = this.$store.state.currentTime_global;
    //监听播放器的timeupdate事件，实现文字与音频播放同步
    audio.ontimeupdate = function() {
      //下一首
      if (that.$store.state.next == true) {
        that.$store.state.next = false;
        // console.log(that.$store.state.next);
        var index = that.$store.state.musiclist.indexOf(
          that.$store.state.currentsongid
        );

        if (index == that.$store.state.musiclist.length - 1) {
          that.$store.state.currentsongid = that.$store.state.musiclist[0];
          that.getSong(that.$store.state.musiclist[0]);
          that.getlyric(that.$store.state.musiclist[0]);
          that.getCover(that.$store.state.musiclist[0]);
        } else {
          //   console.log("取下一首歌");
          that.$store.state.currentsongid =
            that.$store.state.musiclist[index + 1];
          that.getSong(that.$store.state.musiclist[index + 1]);
          that.getlyric(that.$store.state.musiclist[index + 1]);
          that.getCover(that.$store.state.musiclist[index + 1]);
        }
      }
      //上一首
      if (that.$store.state.previous == true) {
        that.$store.state.previous = false;
        // console.log(that.$store.state.next);
        var index = that.$store.state.musiclist.indexOf(
          that.$store.state.currentsongid
        );

        if (index == 0) {
          that.$store.state.currentsongid =
            that.$store.state.musiclist[that.$store.state.musiclist.length - 1];
          that.getSong(
            that.$store.state.musiclist[that.$store.state.musiclist.length - 1]
          );
          that.getlyric(
            that.$store.state.musiclist[that.$store.state.musiclist.length - 1]
          );
          that.getCover(
            that.$store.state.musiclist[that.$store.state.musiclist.length - 1]
          );
        } else {
          that.$store.state.currentsongid =
            that.$store.state.musiclist[index - 1];
          that.getSong(that.$store.state.musiclist[index - 1]);
          that.getlyric(that.$store.state.musiclist[index - 1]);
          that.getCover(that.$store.state.musiclist[index - 1]);
        }
      }
      // 搜索
      if (that.$store.state.issearch == true) {
        that.$store.state.issearch == false;
        that.getSong(that.$store.state.currentsongid);
        that.getlyric(that.$store.state.currentsongid);
        that.getCover(that.$store.state.currentsongid);
      }
      that.$store.state.currentTime_global = audio.currentTime;

      if (that.lineNo == that.oLRC.ms.length) {
        that.lineNo = 0;
      }
      var curTime = audio.currentTime;
      //播放进度
      that.$store.state.percentage = Math.round(
        (parseInt(audio.currentTime) / parseInt(audio.duration)) * 100
      );

      //播放时间显示
      var currentTime_min = Math.floor(parseInt(audio.currentTime) / 60);
      var currentTime_sec =
        (parseInt(audio.currentTime) - currentTime_min * 60) % 60;

      var duration_min = Math.floor(parseInt(audio.duration) / 60);
      var duration_sec = (parseInt(audio.duration) - duration_min * 60) % 60;

      if (currentTime_sec < 10) {
        currentTime_sec = "0" + currentTime_sec;
      }
      if (duration_sec < 10) {
        duration_sec = "0" + duration_sec;
      }

      that.$store.state.currentTime = currentTime_min + ":" + currentTime_sec;
      that.$store.state.duration = duration_min + ":" + duration_sec;

      //快进、后退 修改歌词
      while (curTime - parseFloat(that.oLRC.ms[that.lineNo].t) > 3.0) {
        that.lineNo = that.lineNo + 2;
      }
      if (parseFloat(that.oLRC.ms[that.lineNo].t) <= curTime) {
        // that.msg = that.oLRC.ms[that.lineNo].c;
        that.$store.state.lyrc = that.oLRC.ms[that.lineNo].c;

        that.lineNo++;
      }

      while (
        that.lineNo > 0 &&
        parseFloat(that.oLRC.ms[that.lineNo - 1].t) - curTime >= 3.0
      ) {
        that.$store.state.lyrc = "";
        that.lineNo -= 3;
      }
    };
    //监听播放器的ended事件，播放结束时回滚歌词
    //loop时不触发
    audio.onended = function() {
      var index = that.$store.state.musiclist.indexOf(
        that.$store.state.currentsongid
      );

      if (index == that.$store.state.musiclist.length - 1) {
        that.$store.state.currentsongid = that.$store.state.musiclist[0];
        that.getSong(that.$store.state.musiclist[0]);
        that.getlyric(that.$store.state.musiclist[0]);
        that.getCover(that.$store.state.musiclist[0]);
        // alert("yes");
        //取第一首歌
      } else {
        console.log("取下一首歌");
        that.$store.state.currentsongid =
          that.$store.state.musiclist[index + 1];
        that.getSong(that.$store.state.musiclist[index + 1]);
        that.getlyric(that.$store.state.musiclist[index + 1]);
        that.getCover(that.$store.state.musiclist[index + 1]);
      }

      that.$store.state.lyrc = "";
      that.$store.state.percentage = 0;
      that.$store.state.currentTime = 0;
      that.$store.state.duration = 0;
      that.lineNo = 0;
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lyric {
  position: absolute;
  width: 500px;
  height: 100px;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -40%);
  color: blue;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 30px;
  /* background: #000; */
}
.music-bgimg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  filter: blur(20px);
}

#music-cover {
  position: absolute;
  width: 300px;
  height: 300px;
  left: 50%;
  top: 25%;
  margin-left: -150px;

  overflow: hidden;
  border-radius: 150px;
}
img {
  width: 300px;
  height: 300px;
}
@media (max-width: 600px) {
  .lyric {
    position: absolute;
    width: 98vw;
    height: 20px;
    left: 50%;
    top: 75vh;
    transform: translate(-50%, -40%);
    color: rgb(35, 35, 36);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 18px;
  }
  .music-bgimg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center 50%;
    background-repeat: no-repeat;
    filter: blur(20px);
  }

  #music-cover {
    width: 200px;
    height: 200px;
    background: green;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
