<template>
    <el-row>
        <el-col :span="24"><div class="grid-content ep-bg-purple-dark" /><Header /></el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content ep-bg-purple" />
            <Navbar @changeMenu="setMainContent" /></el-col>
        <el-col :span="20"><div class="grid-content ep-bg-purple" />
            <MainContent 
            :recordId="recordId" 
            :records="records" />
        </el-col>
    </el-row>

  

</template>

<script>

import { defineComponent } from 'vue'; 
// import Sidebar from './components/Sidebar.vue'; 
import MainContent from './components/MainContent.vue';
import Header from './components/Header.vue';
import Navbar from './components/Navbar.vue'; 

export default defineComponent({
    name: 'App',
        data() {
        return {
            recordId: 'home',
            records: [] // Initialize with an empty array or fetch data from Kintone
        };
    },
    components: {
        Navbar,
        MainContent,
        Header,
  },
  methods:{
    setMainContent(id,records){
        console.log(id);
        let recs = records.records;
        if(id == this.recordId) return;
        this.recordId = id;
        this.records = recs
    }
  }
});

</script>

<style scoped>
    h1 {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
</style>