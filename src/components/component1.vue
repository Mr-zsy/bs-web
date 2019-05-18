<template>
    <div>
        <div class="my-charts">
            <div class="sel-wrapper">
                <label for="position">职 位：
                    <select name="position" id="position" v-model="position" @change="getData">
                        <option value="Web">web前端</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                    </select>
                </label>

                <label for="hot-city">地 区：
                    <select name="hot-city" id="hot-city" v-model="base" @change="getData">
                        <option value="北京">北京</option>
                        <option value="上海">上海</option>
                        <option value="广州">广州</option>
                        <option value="深圳">深圳</option>
                        <option value="杭州">杭州</option>
                        <option value="天津">天津</option>
                        <option value="西安">西安</option>
                        <option value="成都">成都</option>
                        <option value="武汉">武汉</option>
                    </select>
                </label>
            </div>

            <div class="my-chart" ref="myEchart1"></div>
            <div class="my-chart" ref="myEchart2"></div>
            <div class="my-chart" ref="myEchart3"></div>
        </div>
        
    </div>
</template>

<script>
import echarts from 'echarts'


export default {
    name:'First',
    data(){
        return {
            position: 'Web',
            base: '北京',
            monthData:[],
            eduBgData:[],
            positionNumArr:[]
            
        }
    },
    mounted(){
        this.getData()
        
    },
    methods:{
        setEchart1(){
            let that = this;
            let myChart1 = echarts.init(this.$refs.myEchart1);
            myChart1.setOption({
                legend: {},
                tooltip: {},
                title: {
                    text: '薪资水平及招聘职位数量变化对照图',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                dataset: {
                    source: that.monthData
                },
                xAxis: {type: 'category'},
                yAxis: {
                    name:'平均薪资/k',
                    min:0,
                    max:40

                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: '#2f4554'
                        }
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            color: '#c23531'
                        }
                    }
                ]
            })
        },

        setEchart2(){
            let that = this;
            let myChart2 = echarts.init(this.$refs.myEchart2);
            myChart2.setOption({

                title: {
                    text: '学历要求比例',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['硕士','本科','大专','学历不限']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:that.eduBgData
                    }
                ]
            })
        },

        setEchart3(){
            let that = this;
            let myChart3 = echarts.init(this.$refs.myEchart3);
            myChart3.setOption({
                xAxis: {
                    name:'月份/月',
                    type: 'category',
                    boundaryGap: false,
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                },
                yAxis: {
                    name:'数量/个',
                    type: 'value',
                    min:10,
                    max:300
                },
                series: [{
                    data: that.positionNumArr,
                    type: 'line',
                    areaStyle: {}
                }]
            })
        },

        dealMonthData(monthJson) {
            let monthDataArr = [['product', '平均最低', '平均最高']]
            let positionNumArr = [];

            for (let i in monthJson) {
                monthDataArr.push([i,monthJson[i].min,monthJson[i].max])
                positionNumArr.push(monthJson[i].positionNum)
            }
            this.monthData = monthDataArr;
            this.positionNumArr = positionNumArr;
        },

        delEduBgData(eduBgNum) {
            let resultArr = [];
            for (let i in eduBgNum){
                resultArr.push({
                    value:eduBgNum[i],
                    name:i
                })
            }
            this.eduBgData = resultArr;
        },

        getData() {
            let that = this;
            this.$axios.post(
			"/baseMsg",
			this.qs.stringify({
				position:that.position,
				base:that.base
			})
			).then(function(res){
                let data = res.data
                that.dealMonthData(data.month)
                that.delEduBgData(data.eduBgNum)
                that.setEchart1();
                that.setEchart2();
                that.setEchart3();
			})
        }
    }
}
</script>

<style>
    label{
        margin-left: 20px;
    }
    .sel-wrapper{
        margin: 20px auto;
    }
   .my-charts{
        border: 2px solid rgb(187, 184, 184);
        width: 800px;
        margin: 0 auto;
    }

    .my-chart {
        width: 600px;
        height: 400px;
        margin: 10px auto;
    } 

</style>

