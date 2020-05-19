<template>
  <div class="home">
    <wbc-nav></wbc-nav>

    <div class="banner">
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in bannerurl" :key="index">
          <div class="image" :style="{backgroundImage: 'url('+ item.imageUrl +')'}"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="topsong">
      <div class="topsong-title">华语新歌速递</div>
      <div class="topsong-list">
        <!-- <ul>
              <li v-for="(item,index) in tableData" :key="index">
                  歌曲{{item.name }}专辑{{item.album.name}}歌手{{item.artists[0].name}}
              </li>
        </ul>-->
        <el-table :data="tableData" stripe height="380" :show-header="false" style="width: 100%">
          <el-table-column prop="name"></el-table-column>
          <el-table-column prop="album.name"></el-table-column>
          <el-table-column prop="artists[0].name"></el-table-column>
          <el-table-column prop="album.company"></el-table-column>
          <el-table-column prop="album.subType"></el-table-column>
        </el-table>
      </div>
    </div>
    <wbc-footer></wbc-footer>
  </div>
</template>

<script>
import nav from "../components/Nav.vue";
import footer from "../components/Footer.vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      bannerurl: [],
      topsond: [],
      tableData: []
    };
  },
  components: {
    //定义组件
    "wbc-nav": nav,
    "wbc-footer": footer
  },
  methods: {
    getBanner: function() {
      const that = this;
      const url = "https://autumnfish.cn/";
      const banner = "banner";

      axios
        .get(url + banner, {
          params: {
            withCredentials: true
          }
        })
        .then(function(resp) {
          that.bannerurl = resp.data.banners;
        });
    },
    getTopsong: function() {
      const that = this;
      const url = "https://autumnfish.cn/";
      const topsondurl = "top/song?type=7";

      axios.get(url + topsondurl).then(function(resp) {
        // console.log(resp.data.data);
        that.tableData = resp.data.data;
      });
    }
  },

  created() {
    this.getBanner();
    this.getTopsong();
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #efefef;
}

.banner {
  /* background: rgb(223, 153, 153); */
  /* margin-top: 5vh; */
  width: 80vw;
  transform: translate(10vw, 0);
}

.topsong-title {
  /* background: rgb(206, 194, 194); */
  flex: 1 1 auto;
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  /* text-indent: -60%; */
}
.topsong-list {
  width: 80%;
  /* background: rgb(197, 70, 70); */
  height: 100%;
  flex: 1 1 auto;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  margin-bottom: 15vh;
  overflow: hidden;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.image {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
}

@media (max-width: 600px) {
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #969595;
}

.banner {
  /* background: rgb(223, 153, 153); */
  /* margin-top: 5vh; */
  width: 100vw;
  /* transform: translate(10vw, 0); */
}

.topsong-title {
  /* background: rgb(206, 194, 194); */
 
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  /* text-indent: -60%; */
}
.topsong-list {
  width: 80%;
  /* background: rgb(197, 70, 70); */
  height: 80%;
  z-index: 100;
 
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 10px;
  opacity: 0.75;
  line-height: 100px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.image {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
}

}
</style>
