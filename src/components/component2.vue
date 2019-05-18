<template>
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
        </div>
        <div class="my-chart" ref="myEchart1"></div>
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name:'Second',
    data(){
        return {
            position:'Web',
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
                    text: '各地热门行业薪资对照图',
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
                monthDataArr.push([list[i].base, list[i].min, list[i].max])
            }
            this.paymentData = monthDataArr
        },

        getData() {
            let that = this;
            this.$axios.post(
			"/payment1",
			this.qs.stringify({
				position:that.position,
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

