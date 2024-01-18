<template>
    <el-skeleton :rows="5" :loading="loading" animated :count="3" />
    <el-table v-if="tableHide" :data="tableData" style="width: 100%"  @row-dblclick="SentDataBack" @row-click="SentDataToDetail">
        <el-table-column label="" width="30">
        <template #default="scope">
            <div>
                <el-icon v-if="scope.row.icon === 'folder'" :size="size" color="#535c68"> <FolderOpened /> </el-icon>
                <el-icon v-else :size="size" color="#16a085"> <Document /> </el-icon>
            </div>
        </template>
    
        </el-table-column >
        <el-table-column class="cursor" prop="name" label="Name" width="380" />
        <el-table-column prop="date" label="Recommended reason" width="220" />
        <el-table-column prop="owner" label="Owner" width="80" />
        <el-table-column prop="address" label="Location" width="120"/>
        <el-table-column label="">
        <template #default="scope">
            <div>
                <el-icon v-if="scope.row.action === 'Action'" :size="size" :color="color"><MoreFilled /></el-icon>
            </div>
        </template>
        </el-table-column>
    </el-table>
           
</template>

<script>

export default { 
    name: 'DataTable',
    data() {
        return {
            loading : true,
            tableHide: true,
        }
    },
    props: ['tableData'],
    methods: {
        SentDataBack(e) {
            this.setLoading()
            this.$emit('SentDataBack', e.id);
        },
        SentDataToDetail(e) {
            this.$emit('SentDataToDetail', e.id);
        },
        setLoading() {
            this.tableHide = false;
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.tableHide = true;
            }, 500)
        }
    },
    mounted() {
        this.setLoading()
    }      

}
</script>

<style scoped>
h1 {
  margin: 0;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

img {
  width: 50px;
  height: 50px;
        display: block;
        margin: auto;
    }
.cursor:hover {
    cursor: pointer;
}
</style>