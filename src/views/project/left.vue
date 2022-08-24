<template>
  <div class="leftPage">
    <dv-border-box-4 :color="['#418caf', '#00acdb']" class="hierarchy1">
      <div style="width: 100%;height: 100%;display: flex;">
        <div class="container">
          <div style="width: 100%;color: white;height: 20%;font-size: 25px">畅销书排行</div>
          <div style="width: 100%;height: 10%;display: flex;color: #21a0c5;font-size: 20px;">
            <span style="width: 10%;"></span>
            <span style="width: 30%;">书名</span>
            <span style="width: 30%;">出版社</span>
            <span style="width: 30%;text-align: right">热销指数</span>
          </div>
          <div style="width: 100%;height: 70%;">
            <div
                v-for="(item,i) in book"
                :key="i"
                style="margin-top: 2%;cursor: pointer"
                :style="{'background-color':item['state']?'#0b3366':'','height':item['state']?'50%':'10%'}" @click="bookClick(i)">
              <div style="width: 100%;height: 20%;display: flex;font-size: 14px">
                <span style="width: 10%;color: #21a0c5;text-align: center">{{i+1}}</span>
                <span style="width: 30%;color: white">{{item['name']}}</span>
                <span style="width: 45%;color: white">{{item['press']}}</span>
                <span style="width: 15%;color: #0d599e;">{{item['index']}}</span>
              </div>
              <div v-show="item['state']" style="height: 75%;display: flex">
                <span style="width: 40%;text-align: center">
                  <img style="width: 100%; height: 100%;object-fit: scale-down;" :src="item['img']" />
                </span>
                <span style="width: calc(60% - 10px);margin-left: 10px;font-size: 12px;color: white">
                  <div>作者：{{item['author']}}</div>
                  <div>ISBN：{{item['isbn']}}</div>
                  <div>出版日期：{{item['date']}}</div>
                  <div>定价：{{item['pricing']}}元</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-4>
    <dv-border-box-8 :color="['#418caf', '#00acdb']" class="hierarchy2">
      <div style="width: 100%;height: 100%;display: flex;">
        <div class="container">
          <div style="width: 100%;color: white;height: 20%;font-size: 25px">出版社排行</div>
          <div style="width: 100%;height: 10%;display: flex;color: #21a0c5;font-size: 20px;">
            <span style="width: 10%;"></span>
            <span style="width: 65%;">出版社简称</span>
            <span style="width: 25%;text-align: right">综合热度</span>
          </div>
          <div style="width: 100%;height: 70%;">
            <vue3-seamless-scroll
                hover-stop="true"
                :list="press"
                hover="true"
                :limitMoveNum="10"
                class="scroll"
                step="0.3">
              <div v-for="(item,i) in press" :key="i" style="width: 100%;display: flex;height: 10%">
                <span style="width: 10%;color: #21a0c5;text-align: center">{{i+1}}</span>
                <span style="width: 80%;color: white">{{item['press']}}</span>
                <span style="width: 10%;color: #0d599e;text-align: center">{{item['index']}}</span>
              </div>
            </vue3-seamless-scroll>
          </div>
        </div>
      </div>
    </dv-border-box-8>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
// 变量区
const bookNum = ref(0);
const book = ref<any[]>([
      {name:'人世间',press:'中国青年出版社',index:9.83,state: true,img:'http://101.43.88.137:9081/image/temp/1.webp',author:'梁晓声',isbn:'9787515350264',date:'2017年12月',pricing:'147.56'},
      {name:'三体',press:'重庆出版社',index:9.74,state: false,img:'http://101.43.88.137:9081/image/temp/3.webp',author:'刘慈欣',isbn:'9787229124410',date:'2008年5月',pricing:'53.94'},
      {name:'活着',press:'北京十月文艺出版社',index:9.71,state: false,img:'http://101.43.88.137:9081/image/temp/4.webp',author:'余华',isbn:'9787530215593',date:'2017年06月',pricing:'31.80'},
      {name:'遥远的救世主',press:'作家出版社',index:9.68,state: false,img:'http://101.43.88.137:9081/image/temp/2.webp',author:'豆豆',isbn:'9787506331746',date:'2005年05月',pricing:'28'},
      {name:'白夜行',press:'南海出版公司',index:9.66,state: false,img:'http://101.43.88.137:9081/image/temp/5.webp',author:'东野圭吾',isbn:'9787544291163',date:'2017年07月',pricing:'59.60'}
]);
const press = ref<any[]>([
  {press:'高等教育出版社',index:'9.8'},
  {press:'外语教学与研究出版社',index:'9.6'},
  {press:'中国建筑工业出版社',index:'9.5'},
  {press:'人民邮电出版社',index:'9.4'},
  {press:'中国社会科学出版社',index:'9.3'},
  {press:'中国科技出版传媒股份有限公司',index:'9.2'},
  {press:'化学工业出版社',index:'9.1'},
  {press:'九州出版社',index:'9.0'},
  {press:'人民交通出版社股份有限公司',index:'8.9'},
  {press:'安徽大学出版社',index:'8.8'},
  {press:'安徽教育出版社',index:'8.7'},
  {press:'安徽科学技术出版社',index:'8.6'},
  {press:'安徽美术出版社',index:'8.5'},
  {press:'安徽人民出版社',index:'8.4'},
  {press:'安徽少年儿童出版社',index:'8.3'},
  {press:'安徽文艺出版社',index:'8.2'},
  {press:'白山出版社',index:'8.1'},
  {press:'百花文艺出版社',index:'8.0'},
  {press:'百花洲文艺出版社',index:'7.9'},
  {press:'中西书局(原百家出版社)',index:'7.8'},
  {press:'北方妇女儿童出版社',index:'7.7'},
  {press:'北方文艺出版社',index:'7.6'},
  {press:'北京出版社',index:'7.5'},
  {press:'北京大学医学出版社',index:'7.4'},
  {press:'北京大学出版社',index:'7.3'},
  {press:'北京工业大学出版社',index:'7.2'},
  {press:'北京工艺美术出版社',index:'7.1'},
  {press:'北京古籍出版社',index:'7.0'},
  {press:'北京广播学院出版社',index:'6.9'},
  {press:'北京航空航天大学出版社',index:'6.8'},
  {press:'北京交通大学出版社',index:'6.7'},
  {press:'北京教育出版社',index:'6.6'},
  {press:'北京科学技术出版社',index:'6.5'},
  {press:'北京理工大学出版社',index:'6.4'},
  {press:'北京美术摄影出版社',index:'6.3'},
  {press:'北京少年儿童出版社',index:'6.2'},
  {press:'北京师范大学出版社',index:'6.1'},
  {press:'北京十月文艺出版社',index:'6.0'},
  {press:'北京体育大学出版社',index:'5.9'},
  {press:'北京图书馆出版社',index:'5.8'},
  {press:'北京燕山出版社',index:'5.7'},
  {press:'北京邮电大学出版社',index:'5.6'},
  {press:'北京语言大学出版社',index:'5.5'},
  {press:'北岳文艺出版社',index:'5.4'},
  {press:'兵器工业出版社',index:'5.3'},
  {press:'巴蜀书社',index:'5.2'},
  {press:'北京联合出版公司',index:'5.1'},
  {press:'春风文艺出版社',index:'5.0'},
  {press:'测绘出版社',index:'4.9'},
  {press:'长城出版社',index:'4.8'}
]);
// 方法区
const bookClick = (num:number) => {
  if (bookNum.value !== num){
    book.value[bookNum.value]['state'] = false;
    book.value[num]['state'] = true;
    bookNum.value = num;
  }
}
</script>

<style scoped lang="scss">
.leftPage{
  width: 100%;
  height: 100%;
  .hierarchy1{
    height: 50%;
    .container{
      width: 80%;
      height: 90%;
      margin: auto;
    }
  }
  .hierarchy2{
    height: calc(50% - 20px);
    margin-top: 20px;
    .container{
      width: 90%;
      height: 90%;
      margin: auto;
      .scroll{
        height:100%;
        overflow:hidden;
      }
    }
  }
}
</style>