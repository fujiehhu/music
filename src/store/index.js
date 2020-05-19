import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
}

export default new Vuex.Store({
    //state相当于自定义组件中的data
    state: {
        coverurl: "",//封面地址
        lyrc: "歌词",//当前正在播放的歌词
        bannerurl: [],//首页轮播图
        isshowbtn: 'none', // 显示/关闭底部菜单
        commentid: "449818741",//评论页歌曲id
        curmusiclist: [],//当前正在播放的歌曲列表
        percentage: '',//播放进度百分比
        currentTime: "0:00",//播放进度当前时间
        duration: "0:00",//播放进度总时间
        rotate: 'rotate 15s linear infinite',//封面是否旋转
        playicon: 'el-icon-video-pause',//播放按钮图标
        currentTime_global: 0.0,
        currentsong: "",//正在播放歌曲名
        musicurl: "",//正在播放歌曲链接
        currentsongid: 0,//正在播放歌曲id
        next: false,//下一首
        previous: false,//上一首
        isshowsearch: 'none',//搜索栏
        issearch: false,//是否在搜索
        isshowcomment: 'none',//搜索栏
        musiclist: [449818741, 412911436, 36024806, 233974, 30612793, 33190007,458017274],//初始歌单
    },
     
})