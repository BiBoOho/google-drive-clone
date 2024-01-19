<template>
    <el-row>
          <el-col :span="20">
            <el-card class="box-card">
              <el-row style="height: 80px;">
                <el-col :span="20">
                    <p v-if="displayHeaderText" class="header-text">{{ recordId }}</p>
                      <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item class="breadcrumb-text" v-for="(item, index) in dynamicItems" :key="index" @click="goTo( item, index )">
                          {{ item.text }}
                        </el-breadcrumb-item>
                      </el-breadcrumb>
                </el-col>
              </el-row>
              <el-skeleton :rows="5" :loading="loading" animated :count="3" />
            <DataTable v-if="tableHideOnMain" :tableData="tableData" @SentDataBack="SentDataBack" @SentDataToDetail="SentDataToDetail" />
          </el-card>
          </el-col>
        <el-col :span="4">
          <Detail :recordToDetail="recordToDetail"/>
        </el-col>
      </el-row>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
import DataTable from './DataTable.vue';
import Detail from './Detail.vue';

export default {
  components: { DataTable, Detail },
  data() {
    return {
      tableData : [],
      recordsData : [],
      currentPageId : '',
      recordToDetail : [],
      ArrowRight : ArrowRight,
      dynamicItems: [],
      displayHeaderText : true,
      currentPageIdCheck : '',
      loading : false,
      tableHideOnMain: true,
    }
  },
  props : ['recordId', 'records'],
  methods: {
    async SentDataToDetail(id) {
      this.recordToDetail;
      let recordIdWhenclick;
      

         // get records from kintone
      let body = {
          'app': kintone.app.getId()
      }

      let Get_recordsWhenclick = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body );
      recordIdWhenclick = Get_recordsWhenclick.records;

      recordIdWhenclick.forEach((record) => {
        if (record.$id.value == id) {
          console.log(record);
          this.recordToDetail = record;
        }
      });
    },
    async SentDataBack(id) {
      this.tableData = [];
      let recordIdWhenclick;
      let attachmentFilesWhenclick;
      let pushRecordsWhenclik = [];
      let folderBeforeclick = [];
      this.currentPageIdCheck = id;

      folderBeforeclick = this.dynamicItems;

      // get records from kintone
      let body = {
          'app': kintone.app.getId()
      }

      let Get_recordsWhenclick = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body );
      recordIdWhenclick = Get_recordsWhenclick.records;

      recordIdWhenclick.forEach((record) => {

        if (record.$id.value == id && this.dynamicItems.length == 0) {
          console.log(record);
          folderBeforeclick.push({
            id: 0,
            text: this.recordId
          });

          folderBeforeclick.push({
            id: record.$id.value,
            text: record.folderName.value
          });

        }else if (record.$id.value == id && this.dynamicItems.length > 0) {
          folderBeforeclick.push({
            id: record.$id.value,
            text: record.folderName.value
          });
        }
        if (record.parentFolderID.value == id && record.Folder_position.value == 'Sub Folder') {
          if(record.File_type.value == 'file') {
            attachmentFilesWhenclick = record.Attachment.value;
            attachmentFilesWhenclick.forEach((attachment) => {
              console.log(attachment.name);
              pushRecordsWhenclik.push({
                "id" : record.$id.value,
                "icon" : 'file',
                "name" : attachment.name,
                "date": record.Created_datetime.value,
                "owner": 'Me',
                "address": 'My drive 2',
                "action": 'Action'
              });
            });
            
          } else {
            pushRecordsWhenclik.push({
            "id" : record.$id.value,
            "icon" : 'folder',
            "name" : record.folderName.value,
            "date": record.Created_datetime.value,
            "owner": 'Me',
            "address": 'My drive',
            "action": 'Action'
          })
          }
        }
      });
        this.tableData = pushRecordsWhenclik;
        this.dynamicItems = folderBeforeclick;
        if (this.displayHeaderText = true) {
          this.displayHeaderText = !this.displayHeaderText;
        }
    },

    async getData() {
        let RecordsData;
        let pushRecords = [];
        let attachmentFiles;
        // get records from kintone
        let body = {
          'app': kintone.app.getId()
        }

        let Get_records = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body ); 
        
        RecordsData = Get_records.records; 
        this.currentPageId = this.recordId;
        this.recordsData = RecordsData

        RecordsData.forEach((record) => {
          if(record.File_type.value == 'file' && record.Folder_position.value == 'Main') {
            attachmentFiles = record.Attachment.value;
            attachmentFiles.forEach((attachment) => {
              console.log(attachment.name);
              pushRecords.push({
                "id" : record.$id.value,
                "icon" : 'file',
                "name" : attachment.name,
                "date": record.Created_datetime.value,
                "owner": 'Me',
                "address": 'My drive',
                "action": 'Action'
              });
            });
            
          } else if(record.File_type.value == 'folder' && record.Folder_position.value == 'Main') {
            pushRecords.push({
            "id" : record.$id.value,
            "icon" : 'folder',
            "name" : record.folderName.value,
            "date": record.Created_datetime.value,
            "owner": 'Me',
            "address": 'My drive',
            "action": 'Action'
          })
          }
        });

        this.tableData = pushRecords;
      },
    setLoading() {
            this.tableHideOnMain = false;
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.tableHideOnMain = true;
            }, 500)
        },
        
        goTo(path, index) {
        this.setLoading();
          let currentIndex = index;
          const GetIndex = this.dynamicItems.filter((obj, i) => i < currentIndex);

          if (path.text == this.recordId) {
            this.getData();
            this.dynamicItems = [];
            this.displayHeaderText  = !this.displayHeaderText;
          } else if(this.currentPageIdCheck != path.id) {
            this.currentPageIdCheck = path.id;
            this.dynamicItems = GetIndex;
            this.SentDataBack(path.id);
          } else if(this.currentPageIdCheck == path.id || this.currentPageIdCheck == currentPageId) {
            this.currentPageIdCheck = path.id;
          }
      
    },

  },

  mounted() {
    this.getData();
  },
  computed: {
    
  }
}

</script>


<style scoped>
.box-card {
  height: 890px;
  border-radius: 20px;
}

.breadcrumb-text {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 8px 12px;
}
.breadcrumb-text:hover {
  margin: 0;
  cursor: pointer;
  background-color: #ecf0f1;
  border-radius: 20px;
}

.header-text{
  font-size: 1.5rem;
  margin: 0;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: bold;
  color: #606266;
}

</style>