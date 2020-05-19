<template>
  <div class="footer" :style="{display: this.$store.state.isshowbtn }">
    <div class="button-group">
      <div class="button">
        <el-button @click="previous" icon="el-icon-arrow-left" circle></el-button>
        <el-button @click="bf" :icon="this.$store.state.playicon" circle></el-button>
        <el-button @click="next" icon="el-icon-arrow-right" circle></el-button>
        <div class="vLine"></div>
      </div>
    </div>
    <div class="info">
      <div class="cover" :style="{backgroundImage: 'url('+ this.$store.state.coverurl +')'}"></div>
      <div class="range">
        <div class="artist">
          <div class="lyric">
            <span>{{this.$store.state.lyrc}}</span>
          </div>

          <div class="time">
            <!-- <span>{{this.$store.state.percentage}}</span> -->
            <span>{{this.$store.state.currentTime}}/</span>
            <span>{{this.$store.state.duration}}</span>
          </div>
        </div>

        <div class="container">
          <div class="html" :style="{width:  this.$store.state.percentage+'%'  }">
            <!-- <i :class="icon"></i> -->
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    bf: function() {
      var audio = document.getElementById("audio");

      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        // alert(audio.paused);
        if (audio.paused) {
          this.$store.state.playicon = "el-icon-video-pause";
          this.$store.state.rotate = "rotate 15s linear infinite";
          audio.play(); // 播放
        } else {
          this.$store.state.playicon = "el-icon-video-play";
          this.$store.state.rotate = "";
          audio.pause(); //  暂停
        }
      }
    },
    next: function() {
      this.$store.state.next = true;
    },
    previous: function() {
      this.$store.state.previous = true;
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  position: fixed;
  bottom: 10px;
  width: 70%;
  left: 50%;
  background: rgba(150, 150, 148, 0.9);
  border-radius: 10px;
  min-width: 700px;
  transform: translate(-50%, 0);
  z-index: 9;
}

.button-group {
  float: left;
  width: 30%;
  height: 70px;
  min-width: 165px;
}
.button {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 155px;
}

.info {
  margin-left: 30%;
  height: 70px;
}

.cover {
  float: left;
  width: 10%;
  height: 70px;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  min-width: 70px;
  border-radius: 15px;
}
.range {
  margin-left: 10%;
  height: 100%;
}

.container {
  height: 8px;
  position: relative;
  width: 86%;
  min-width: 300px;
  top: 28%;
  left: 3%;
  background-color: #f8f5f5;
  border-radius: 10px;
  overflow: hidden;
}

.html {
  width: 1%;
  background: rgb(255, 217, 1);
  border-radius: 5px;
}

.vLine {
  border-left: solid 2px rgb(0, 0, 0);
  height: 40px;
  vertical-align: middle;
  display: inline-block;
  margin-left: 25px;
}

.artist {
  position: relative;
  /* left: 5%; */
  /* width: 90%; */
  padding: 10px 0 0 30px;
  /* background-color: salmon; */
  text-align: left;
  height: 20px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  display: flex;
}
.lyric {
  width: 75%;
}
@media (max-width: 600px) {
  .footer {
    z-index: 9;
  }

  .button-group {
    position: absolute;
    width: 100vw;
    height: 10vh;
    /* background: green; */
    left: 50%;
    transform: translate(-50%, -80%);
  }

  .info {
    display: none;
  }

  .vLine {
    display: none;
  }

  .artist {
    display: none;
  }
  .lyric {
    display: none;
  }
}
</style>
