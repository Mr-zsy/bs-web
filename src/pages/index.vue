<template>
  <div class="index-wrapper">
    <First></First>
	<Second></Second>
	<Third></Third>
  </div>
</template>

<script>
import First from '../components/component1';
import Second from '../components/component2';
import Third from '../components/component3';

export default {
  name: 'index',
  data() {
    return {
		
    };
	},
	components:{
		First,
		Second,
		Third
	},
  mounted() {

  },
  methods: {
	
  }

  
}
</script>


<style scoped>
h1 {
  text-align: center;
}
</style>
