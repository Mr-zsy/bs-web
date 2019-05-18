<template>
    <div class="my-charts">
        <div class="sel-wrapper">
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
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name:'Third',
    data(){
        return {
            base:'北京',
            paymentData:[]
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
                title: {
                    text: '各行业热门城市薪资对照图',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                legend: {},
                tooltip: {},
                dataset: {
                    source: that.paymentData
                },
                xAxis: {type: 'category'},
                yAxis: {
                    name:'薪资/k',
                    min:0,
                    max:50

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

        dealPaymentData(list){
            let monthDataArr = [['product', '平均最低', '平均最高']];
            for (let i=0; i<list.length; i++){
                monthDataArr.push([list[i].position, list[i].min, list[i].max])
            }
            this.paymentData = monthDataArr
        },

        getData() {
            let that = this;
            this.$axios.post(
			"/payment2",
			this.qs.stringify({
				base:that.base,
			})
			).then(function(res){
                let data = res.data
                that.dealPaymentData(data.list);
                that.setEchart1();

			})
        }
    }
}
</script>

<style>
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

