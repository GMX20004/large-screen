<template>
  <div class="rightPage">
    <dv-border-box-5 :color="['#418caf', '#00acdb']" :reverse="true" class="hierarchy1">
      <div style="width: 100%;height: 100%;display: flex;">
        <div class="container">
          <span>
            <div style="width: 100%;text-align: center;color: white">分类销售占比</div>
            <dv-active-ring-chart :config="hierarchy1.chart1" style="width:100%;height:100%" />
          </span>
          <span>
            <div style="width: 100%;text-align: center;color: white">分类库存占比</div>
            <dv-active-ring-chart :config="hierarchy1.chart1" style="width:100%;height:100%" />
          </span>
        </div>
      </div>
    </dv-border-box-5>
    <dv-border-box-12 class="hierarchy2">
      <div style="width: 100%;height: 100%;display: flex;">
        <div class="container">
          <div style="width: 100%;color: white;height: 20%">各地区销售码洋排行</div>
          <div style="width: 100%;height: 80%">
            <div v-for="(item,i) in hierarchy2" :key="i" style="width: 100%;display: flex;height: calc(80% / 8);margin: 1%">
              <span style="width: 5%;color: #0899d2">{{i+1}}</span>
              <span style="width: 20%;color: #0899d2">{{item['region']}}</span>
              <span style="width: 60%;">
                <div :style="{'width':item['length']}" style="height: 100%;background-image: linear-gradient(to right,#219ccf,#03f4cc);"></div>
              </span>
              <span style="width: 15%;text-align: right;color: #0899d2">{{item['amount']}}万</span>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-12>
    <dv-border-box-13 class="hierarchy3">
      <div style="width: 100%;height: 100%;display: flex;">
        <div class="container">
          <div style="width: 100%;height: 20%;color: white">全国市场图书走势图</div>
          <div style="width: 100%;height: 80%">
            <div ref="chart" style="width: 100%;height: 100%"></div>
          </div>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, reactive, ref} from "vue";
const proxy = inject("proxy");
const { $echarts } = proxy as any;
const chart = ref<any>();
const myCharts = ref<any>();
const hierarchy1 = reactive({
  chart1:{
    radius: '70%',
    activeRadius: '80%',
    data: [
      {
        name: '其他',
        value: 55
      },
      {
        name: '交通',
        value: 120
      },
      {
        name: '传记',
        value: 78
      },
      {
        name: '体育',
        value: 66
      },
      {
        name: '养生',
        value: 80
      },
      {
        name: '农林',
        value: 80
      }
    ]
  }
});
const hierarchy2 = ref<any[]>([
  {region: '浙江',amount:'761',length:'80%'},
  {region: '湖南',amount:'665',length:'71%'},
  {region: '上海',amount:'555',length:'60%'},
  {region: '江苏',amount:'497',length:'57%'},
  {region: '云南',amount:'367',length:'47%'},
  {region: '内蒙古',amount:'366',length:'46.5%'},
  {region: '江西',amount:'317',length:'43%'},
  {region: '湖北',amount:'310',length:'42%'}
]);
const hierarchy3 = reactive({
  grid: {
    // 设置图表距离顶部,左侧，右侧和底部的高度
    top: '35px',
    left: '30px',
    right: '35px',
    bottom: '20px',
  },
  legend: {
    data: ['销售码洋', '同比增长'],
    top: '0%',
    textStyle:{
      color: '#00acdb',
      fontSize: '10px'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisPointer: {
        type: 'shadow'
      },
      axisLine: {
        lineStyle: {
          color: "#00acdb"
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '码洋(/千万)',
      min: 0,
      max: 20,
      splitLine: {
        show:false
      },
      axisLine: {
        lineStyle: {
          color: "#00acdb"
        }
      }
    },
    {
      type: 'value',
      name: '同比增长(%)',
      min: 0,
      max: 100,
      splitLine: {
        show:false
      },
      axisLine: {
        lineStyle: {
          color: "#00acdb"
        }
      }
    }
  ],
  series: [
    {
      name: '销售码洋',
      type: 'bar',
      data: [
        3,5,6,4,5,9,10,8,7,11,14,15
      ]
    },
    {
      name: '同比增长',
      type: 'line',
      yAxisIndex: 1,
      data: [
        14,12,28,16,22,20,31,28,23,20,40,50
      ]
    }
  ]
});

onMounted(()=>{
  myCharts.value = $echarts.init(chart.value);
  myCharts.value.clear();
  myCharts.value.setOption(hierarchy3);
});
</script>

<style scoped lang="scss">
.rightPage{
  width: 100%;
  height: 100%;
  .hierarchy1{
    width: 100%;
    height: 33%;
    .container{
      width: 80%;
      height: 80%;
      margin: 8% 0 0 15%;
      display: flex;
      span{
        width: 50%;
        height: 100%;
      }
    }
  }
  .hierarchy2{
    width: 100%;
    height: 33%;
    margin-top: 0.5%;
    .container{
      width: 90%;
      height: 90%;
      margin: auto;
    }
  }
  .hierarchy3{
    width: 100%;
    height: 33%;
    margin-top: 0.5%;
    .container{
      width: 90%;
      height: 85%;
      margin: auto;
    }
  }
}
</style>