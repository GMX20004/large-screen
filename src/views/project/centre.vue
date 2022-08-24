<template>
  <div class="centrePage">
    <div class="hierarchy1">
      <span class="parameters">
        <div class="instructions">书目数据</div>
        <div class="parameter">
          <span>1,699</span>
          <span>条</span>
        </div>
      </span>
      <span class="parameters">
        <div class="instructions">品种数</div>
        <div class="parameter">
          <span>1,187</span>
          <span>种</span>
        </div>
      </span>
      <span class="parameters">
        <div class="instructions">销售码洋</div>
        <div class="parameter">
          <span>7,214</span>
          <span>万元</span>
        </div>
      </span>
      <span class="parameters">
        <div class="instructions">单位数</div>
        <div class="parameter">
          <span>22</span>
          <span>位</span>
        </div>
      </span>
      <span class="parameters">
        <div class="instructions">库存码洋</div>
        <div class="parameter">
          <span>5,680</span>
          <span>万元</span>
        </div>
      </span>
    </div>
    <div class="hierarchy2">
      <div ref="map" style="width: 100%;height: 100%"/>
    </div>
    <div v-show="display.isSelected" style="position: absolute;display: flex;top: 80%;left: 27%;color: white;width: 300px;height: 100px;">
      <svg style="transform: rotate(180deg)" class="dv-border-svg-container dv-reverse" width="300" height="100"><polygon fill="transparent" points="
        285, 22 170, 22 150, 7 40, 7 28, 21 32, 24
        16, 42 16, 68 41, 93 285, 93
      "></polygon><polyline class="dv-bb4-line-1" points="145, 95 40, 95 10, 65
          10, 40 40, 5 150, 5 170, 20 285, 20" stroke="#0a79a9"></polyline>
      </svg>
      <div style="width: 80%;height: 80%;display: flex;margin-left: 20%">
        <dv-decoration-9 v-if="display.isSelected" style="width:80px;height:80px;">{{display.regionName}}</dv-decoration-9>
        <span style="width: calc(100% - 80px);height: 100%">
          <div style="width:100%;height:20px;"></div>
          <div style="width: calc(100% - 10px);height: 60px;font-size: 12px;margin-left: 10px">
            <div>上传条数：{{display.upload}}条</div>
            <div>销售码洋：{{display.sales}}万</div>
            <div>库存码洋：{{display.inventory}}万</div>
          </div>
        </span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, reactive, ref} from "vue";
import chinaJSON from "@/assets/json/china.json";
interface displayInterface{
  name: string,
  isSelected: boolean,
  regionName: string,
  upload: string,
  sales: string,
  inventory: string
}
const proxy = inject("proxy");
const { $echarts } = proxy as any;
const myChart = ref<any>();
const map = ref<any>();
const focusData = ref<any>({'params':'','data':''});
const myDate = [
  [114.502461,38.045474],[117.707088,39.576036],[119.162552,40.600228],//河北
  [112.549248,37.857014],[113.165151,35.412845],[113.712721,36.129533],//山西
  [123.429096,41.796767],[124.435609,42.880831],//辽宁
  [125.3245,43.886841],[130.603625,42.819405],[130.110873,43.852735],//吉林
  [126.642464,45.756967],[128.962763,43.53903],//黑龙江
  [118.767413,32.041544],[118.411106,32.715828],[119.152697,32.557582],//江苏
  [120.153576,30.287459],[119.129907,27.475289],[119.606028,27.674749],//浙江
  [117.283042,31.86119],[115.313547,33.376994],[114.966158,33.147304],//安徽
  [119.306239,26.075302],[119.864107,26.671174],//福建
  [115.892151,28.676493],[116.467818,29.896347],//江西
  [117.000923,36.675807],[120.712255,36.126632],//山东
  [113.665412,34.757975],[115.389924,31.450241],//河南
  [114.298572,30.584355],[109.943788,30.878746],//湖北
  [111.711649,27.629216],[113.949242,26.192616],[114.008988,28.955498],//湖南
  [113.280637,23.125178],[115.154635,22.80161],[116.395137,24.877746],//广东
  [110.33119,20.031971],//海南
  [104.065735,30.659462],[103.080992,27.396679],[104.230951,28.635579],//四川
  [106.713478,26.578343],[106.56105,28.719062],//贵州
  [113.665412,34.757975],[115.851878,31.786593],[113.304353,35.426989],//河南
  [108.948024,34.263161],[111.125776,39.366297],//陕西
  [103.823557,36.058039],[105.03968,37.007187],[99.904593,39.785601],//甘肃
  [101.778916,36.623178],[97.58127,39.052364],//青海
  [121.509062,25.044332],//台湾
  [111.670801,40.818311],[103.841062,37.64725],[106.511774,39.272311],//内蒙古
  [108.320004,22.82402],[107.308184,25.432988],[105.70551,24.768569],//广西
  [91.132212,29.660361],//西藏
  [106.278179,38.46637],[105.128991,36.996194],//宁夏
  [87.617733,43.792818],[82.788872,46.677784],//新疆
  [116.405285,39.904989],//北京
  [117.190182,39.125596],//天津
  [121.472644,31.231706],//上海
  [106.504962,29.533155],[108.604736,28.590922],[108.504338,29.707836],//重庆
  [114.173355,22.320048],//香港
  [113.54909,22.198951],//澳门
];
const option = reactive({
  title: {
    text: '交换书目数据地图',
    top: '150',
    left: 'center',
    textStyle:{
      fontSize: '20',
      color: '#fff'
    }
  },
  layoutCenter: ['50%', '70%'],//距离左右，上下距离的百分比
  layoutSize:'110%',//map百分比大小
  geo: {
    map: 'china',
    roam: false,
    label: {
      normal: {
        show: false, // 是否显示对应地名
      },
      emphasis: {
        show : false,// 获取焦点时是否显示对应地名
        textStyle : {
          color : 'rgba(0,0,0,1)'
        }
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#0b122e',
        shadowBlur: 1,
        borderWidth: 0.5,//设置外层边框
        borderColor: '#232652',//轮廓颜色
        shadowColor: '#a9c5c5'//轮廓阴影颜色
      },
      emphasis: {
        areaColor: '#1af9e5',
        shadowBlur: 10,
      }
    },
    selectedMode: 'multiple',
    select: {
      itemStyle: {
        color: '#1af9e5'
      },
      label: {
        show: false,
        textBorderWidth: 2
      }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params:any) {
      if (focusData.value['params'] !== params.name){
        focusData.value['params'] = params.name;
         address(params.name, (data: any ) => {
          focusData.value['data'] = data['warehouse'];
        });
      }
      return (
          '<div>'+params.name+'</div>'+'<div>仓库点：'+focusData.value['data']+'个</div>'
      );
    }
  },
  series: [{
    type: 'map',
    geoIndex: 0,
    zlevel: 1
  },{
    show:false,
    type:'effectScatter',
    rippleEffect:{   // 涟漪特效相关配置。
      color: '#0a79a9',
      scale:3    // 控制涟漪大小
    },
    tooltip: {
      show: false,
    },
    coordinateSystem: 'geo', // series坐标系类型
    data:myDate  //散点的坐标，自己定义一个var即可
  }],
});
const display = reactive<displayInterface>({
  name: '',
  isSelected: false,
  regionName: '',
  upload: '',
  sales: '',
  inventory: ''
});
const address = (val:string,callBack: (data: any) => void) => {
  switch (val) {
    case '河北省':
      callBack({name:'河北',warehouse: 3,upload: '63115',sales:'145.6',inventory: '18.1'});
      break;
    case '山西省':
      callBack({name:'山西',warehouse: 3,upload: '45214',sales:'105.6',inventory: '11.7'});
      break;
    case '辽宁省':
      callBack({name:'辽宁',warehouse: 2,upload: '24712',sales:'112.6',inventory: '16.6'});
      break;
    case '吉林省':
      callBack({name:'吉林',warehouse: 3,upload: '34213',sales:'234.6',inventory: '17.4'});
      break;
    case '黑龙江省':
      callBack({name:'黑龙江',warehouse: 2,upload: '36341',sales:'423.6',inventory: '17.2'});
      break;
    case '江苏省':
      callBack({name:'江苏',warehouse: 3,upload: '43115',sales:'497',inventory: '17.6'});
      break;
    case '浙江省':
      callBack({name:'浙江',warehouse: 3,upload: '73715',sales:'761',inventory: '23.1'});
      break;
    case '安徽省':
      callBack({name:'安徽',warehouse: 3,upload: '63115',sales:'145.6',inventory: '18.1'});
      break;
    case '福建省':
      callBack({name:'福建',warehouse: 2,upload: '63115',sales:'145.6',inventory: '18.1'});
      break;
    case '江西省':
      callBack({name:'江西',warehouse: 2,upload: '36497',sales:'317',inventory: '12.5'});
      break;
    case '山东省':
      callBack({name:'山东',warehouse: 2,upload: '35711',sales:'264.5',inventory: '11.5'});
      break;
    case '河南省':
      callBack({name:'河南',warehouse: 2,upload: '45341',sales:'284.5',inventory: '17.5'});
      break;
    case '湖北省':
      callBack({name:'湖北',warehouse: 2,upload: '35147',sales:'310',inventory: '16.3'});
      break;
    case '湖南省':
      callBack({name:'湖南',warehouse: 3,upload: '47965',sales:'665',inventory: '13.6'});
      break;
    case '广东省':
      callBack({name:'广东',warehouse: 3,upload: '53104',sales:'294',inventory: '16.5'});
      break;
    case '海南省':
      callBack({name:'海南',warehouse: 1,upload: '35687',sales:'264',inventory: '16.3'});
      break;
    case '四川省':
      callBack({name:'四川',warehouse: 3,upload: '42351',sales:'294.5',inventory: '19.6'});
      break;
    case '贵州省':
      callBack({name:'贵州',warehouse: 2,upload: '12741',sales:'264.5',inventory: '17.5'});
      break;
    case '云南省':
      callBack({name:'河南',warehouse: 3,upload: '48371',sales:'367',inventory: '17.9'});
      break;
    case '陕西省':
      callBack({name:'陕西',warehouse: 2,upload: '45341',sales:'284.5',inventory: '17.5'});
      break;
    case '甘肃省':
      callBack({name:'甘肃',warehouse: 3,upload: '46341',sales:'296',inventory: '13.7'});
      break;
    case '青海省':
      callBack({name:'青海',warehouse: 2,upload: '34341',sales:'254.5',inventory: '16.5'});
      break;
    case '台湾省':
      callBack({name:'台湾',warehouse: 1,upload: '53147',sales:'240',inventory: '13.8'});
      break;
    case '内蒙古自治区':
      callBack({name:'内蒙古',warehouse: 3,upload: '48341',sales:'366',inventory: '17.5'});
      break;
    case '广西壮族自治区':
      callBack({name:'广西',warehouse: 3,upload: '44241',sales:'194.5',inventory: '16.8'});
      break;
    case '西藏自治区':
      callBack({name:'西藏',warehouse: 1,upload: '43341',sales:'254.8',inventory: '14.5'});
      break;
    case '宁夏回族自治区':
      callBack({name:'宁夏',warehouse: 2,upload: '30341',sales:'214.6',inventory: '16.5'});
      break;
    case '新疆维吾尔自治区':
      callBack({name:'新疆',warehouse: 2,upload: '40351',sales:'284.7',inventory: '13.6'});
      break;
    case '北京市':
      callBack({name:'北京',warehouse: 1,upload: '42341',sales:'308.7',inventory: '15.1'});
      break;
    case '天津市':
      callBack({name:'天津',warehouse: 1,upload: '39123',sales:'244.6',inventory: '11.6'});
      break;
    case '上海市':
      callBack({name:'上海',warehouse: 1,upload: '45341',sales:'555',inventory: '16.1'});
      break;
    case '重庆市':
      callBack({name:'重庆',warehouse: 3,upload: '25341',sales:'294.5',inventory: '18.3'});
      break;
    case '香港特别行政区':
      callBack({name:'香港',warehouse: 1,upload: '45341',sales:'304.5',inventory: '16.5'});
      break;
    case '澳门特别行政区':
      callBack({name:'澳门',warehouse: 1,upload: '13541',sales:'184.5',inventory: '16.5'});
      break;
    case '南海诸岛':
      callBack({name:'南海诸岛',warehouse: 0,upload: '0',sales:'0',inventory: '0'});
      break;
    default:
      callBack({name:val,warehouse: 0,upload: '0',sales:'0',inventory: '0'});
      break;
  }
}
onMounted(()=>{
  myChart.value = $echarts.init(map.value);
  $echarts.registerMap('china', chinaJSON);
  myChart.value.setOption(option);
  myChart.value.on('click', function (params:any) {
    if (params['componentIndex']===0){
      if (display.name===params.name){
        display.isSelected = !display.isSelected
      }else{
        display.isSelected = true;
      }
      display.name = params.name;
      address(params.name, (data: any ) => {
        display.regionName = data['name'];
        display.upload = data['upload'];
        display.sales = data['sales'];
        display.inventory = data['inventory'];
      });
    }
  });
});
</script>

<style scoped lang="scss">
@import url('../../assets/font/log.css');
.centrePage{
  width: 100%;
  height: 100%;
  .hierarchy1{
    width: 100%;
    height: 10%;
    display: flex;
    .parameters{
      width: 20%;
      height: 100%;
      border-left: 1px solid #0a79a9;
      .instructions{
        color: #0a79a9;
        font-size: 20px;
        margin-left: 5%;
        height: 50%;
      }
      .parameter{
        height: 50%;
        color: white;
        margin-left: 5%;
        display: flex;
        span:first-child{
          font-size: 20px;
          font-family: 'calculator';
          height: 100%;
        }
        span:last-child{
          font-size: 20px;
          height: 100%;
          transform:scale(0.5);
        }
      }
    }
  }
  .hierarchy2{
    width: 100%;
    height: 90%;
  }
}
</style>