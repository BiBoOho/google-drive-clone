<template>
  <div class="sidebar-menu">
    <!-- <div class="toggle-btn">
      <i class="fa fa-angle-right"></i>
    </div> -->
    <div class="button" @click="openModal">
      <i class="fa-solid fa-plus"></i>
      <p>New</p>
    </div>
    <section class="modal hidden">
      <h2>New Folder</h2>
      <input type="text" id="email" placeholder="Folder name" />
      <div class="button-container">
        <button class="btn" @click="closeModal">Cancel</button>
        <button class="btn">Create</button>
      </div>
    </section>
    <div class="overlay hidden" @click="closeModal"></div>
    <div class="sidebar">
      <div class="links">
        <div class="link">
          <a @click="changeActiveMenu" id="home">
            <!-- <i class="fa-solid fa-house"></i> -->
            <el-icon><House /></el-icon>
            Home
          </a>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="my-drive">
            <i @click.prevent="showSubmenu" class="fa-solid fa-angle-right"></i>
            <!-- <el-icon @click.prevent="showSubmenu"><ArrowRight  class="arrow"/></el-icon> -->
            <!-- <i class="fa-solid fa-hard-drive"></i> -->
            <el-icon><Cellphone /></el-icon>
            My Drive
          </a>
          <div class="sub-menu">
            <!-- <a @click="changeActiveMenu">Kintone</a>
            <a @click="changeActiveMenu">dfszb</a>
            <a @click="changeActiveMenu">fcgn</a>
            <a @click="changeActiveMenu">cvncn</a> -->
            <SubMenu
              v-for="node in nodes"
              :key="node.id"
              :node="node"
              @subActive="changeSubActive"
            />
          </div>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="computers">
            <i @click.prevent="showSubmenu" class="fa-solid fa-angle-right"></i>
            <!-- <el-icon @click.prevent="showSubmenu"><ArrowRight class="arrow" /></el-icon> -->
            <!-- <i class="fa-solid fa-computer"></i> -->
            <el-icon><Monitor /></el-icon>
            Computers
          </a>
          <div class="sub-menu">
            <a @click="changeActiveMenu">
              <el-icon><Folder /></el-icon>
              Kintone</a
            >
            <a @click="changeActiveMenu">
              <el-icon><Folder /></el-icon>
              dfszb</a
            >
            <a @click="changeActiveMenu">
              <el-icon><Folder /></el-icon>
              fcgn</a
            >
            <a @click="changeActiveMenu">
              <el-icon><Folder /></el-icon>
              cvncn</a
            >
          </div>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="share-with-me">
            <!-- <i class="fa-solid fa-user-group"></i> -->
            <el-icon><User /></el-icon>
            Share with me
          </a>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="recent">
            <!-- <i class="fa-solid fa-clock"></i> -->
            <el-icon><Timer /></el-icon>
            Recent
          </a>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="starred">
            <!-- <i class="fa-solid fa-star"></i> -->
            <el-icon><CollectionTag /></el-icon>
            Pepsi
          </a>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="spam">
            <!-- <i class="fa-solid fa-circle-exclamation"></i> -->
            <el-icon><Warning /></el-icon>
            Spam
          </a>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="sponsor">
            <i class="fa-solid fa-circle-exclamation"></i>
            <el-icon><Warning /></el-icon>
            sponsor2
          </a>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="trash">
            <i class="fa-solid fa-trash-can"></i>
            <el-icon><Delete /></el-icon>
            Trash
          </a>
        </div>

        <div class="link">
          <a @click="changeActiveMenu" id="storage">
            <!-- <i class="fa-solid fa-cloud"></i> -->
            <el-icon><MostlyCloudy /></el-icon>
            Storage
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import SubMenu from "./SubMenu.vue";

export default {
  data() {
    return {
      records: [],
      nodes: [],
    };
  },
  components: {
    SubMenu,
  },
  // props:['records'],
  methods: {
    toggleSubmenu(menu) {
      this.activeMenu = this.activeMenu === menu ? null : menu;
    },
    async setFolders() {
      console.log("setFolders", this.records);
      console.log($("#my-drive"));
      let record = [];
      this.records.records.forEach(function (item) {
        record.push({
          id: item.Record_number.value,
          folder_name: item.folder_name.value,
          parent_folder: item.parent_folder.value,
          children: [],
        });
      });
      console.log("record", record);
      await this.transformData(record);
      console.log("nodes", this.nodes);
      // let myDrive = $("#my-drive");
      // $.each(record, (index, item) => {
      //   console.log(index, item);
      // });
    },
    async showSubmenu(e) {
      console.log(e.target.tagName);
      if (e.target.tagName.toUpperCase() != "I") return;
      $(e.target).parent().parent().toggleClass("active");
      $(e.target).toggleClass("fa-angle-down");
    },
    changeActiveMenu(e) {
      
      if (e.target.tagName.toUpperCase() != "A") return;
      let id = e.target.id;
      if ($(".sidebar-menu .sidebar .links .link a.active").length > 0) {
        $(".sidebar-menu .sidebar .links .link a.active").removeClass("active");
      }
      $(e.target).addClass("active");

      this.$emit("changeMenu", id);
    },
    async setDefault() {
      $("#home").addClass("active");
      await this.setFolders();
    },
    async transformData(data) {
      let result = {};
      let mainFolder = [];

      data.forEach((item) => {
        let parentId = item.parent_folder;
        if (parentId == 0) {
          mainFolder.push({
            id: item.id,
            folder_name: item.folder_name,
            parent_folder: item.parent_folder,
            children: [],
          });
        }

        if (!result[parentId]) {
          result[parentId] = {
            id: parentId,
            folder_name: item.folder_name,
            parent_folder: item.parent_folder,
            children: [],
          };
        }
        if (parentId !== "0") {
          result[parentId].children.push(item);
        }
      });

      mainFolder.forEach((main) => {
        data.forEach((item) => {
          if (main.id == item.parent_folder) {
            main.children.push(item);
            nestChildren(item);
          }
        });
      });

      console.log("mainFolder", mainFolder);
      // Function to recursively nest children
      function nestChildren(parent) {
        if (result[parent.id] && result[parent.id].children.length > 0) {
          parent.children = result[parent.id].children.map((child) => {
            return { ...child, children: nestChildren(child) };
          });
        }
        return parent.children || [];
      }

      this.nodes = mainFolder;
    },
    changeSubActive(id) {
      // console.log(id);
      this.$emit("changeMenu", id);
    },
    openModal(){
      $('.modal').removeClass('hidden');
      $('.overlay').removeClass('hidden');
    },
    closeModal(){
      $('.modal').addClass('hidden');
      $('.overlay').addClass('hidden');
    }
  },
  async mounted() {
    this.records = await kintone.api("/k/v1/records", "GET", {
      app: kintone.app.getId(),
    });
    await this.setDefault();
  },
};
</script>

<style>
.sidebar-menu {
  /* position: fixed; */
  top: 0px;
  left: 0px;
  width: 250px;
  height: 100%;
}
.sidebar-menu .sidebar {
  /* position: absolute; */
  top: 0px;
  left: 0px;
  width: 250px;
  height: 100%;
  background: #fff;
  padding: 10px;
  padding-left: 20px;
  z-index: 5;
}
.sidebar-menu .sidebar .links .link {
  margin: 2px 0px;
}
.sidebar-menu .sidebar .links > .link:nth-child(3),
.sidebar-menu .sidebar .links > .link:nth-child(6) {
  margin-bottom: 15px;
}
.sidebar-menu .sidebar .links .link a {
  text-decoration: none;
  display: block;
  padding: 5px 5px;
  color: #555;
  border-radius: 25px;
  width: 150px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  gap: 10px;
}
.sidebar-menu .sidebar .links .link a i.fa-angle-right {
  cursor: default;
}

.sidebar-menu .sidebar .links .link > a i.fa {
  font-size: 16px;
  width: 20px;
  text-align: center;
  /* cursor: default; */
}
.sidebar-menu .sidebar .links .link .sub-menu {
  margin-left: 5px;
  padding-left: 10px;
  max-height: 0px;
  overflow: hidden;
  transition: max-height 300ms ease-in-out;
}
.sidebar-menu .sidebar .links .link.active > .sub-menu {
  max-height: 500px;
}
.sidebar-menu .sidebar .links .link .sub-menu a {
  text-decoration: none;
  display: flex;
  /* padding: 5px; */
  margin: 2px -5px;
  color: #222;
  cursor: pointer;
  gap: 10px;
}
/* .sidebar-menu .sidebar .links .link.active > a,  */
.sidebar-menu .sidebar a.active {
  background: #eeeded;
}
.sidebar-menu .sidebar .links .link > a:hover,
.sidebar-menu .sidebar a:hover {
  background: #eeeded;
}
.sidebar-menu .button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  margin-bottom: 1rem;
  width: 5rem;
  padding: 15px 15px;
  color: black;
  font-weight: 600;
  text-align: center;
  gap: 10px;
  background: white;
  border: none;
  border-radius: 12px;
  -webkit-box-shadow: 0px 1px 3px 0.1px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 1px 3px 0.1px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 1px 3px 0.1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
.sidebar-menu .button p {
  margin: 0;
}
section{
  position: fixed;
  margin-left: 33.3%;
  margin-top: -12rem;
}
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  width: 450px;
  padding: 1.3rem;
  min-height: 200px;
  position: absolute;
  top: 20%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 15px;
  z-index: 2;
}

.modal h2{
  margin-left: 0.1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.modal input {
  padding: 0.7rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9em;
}


.modal button {
  cursor: pointer;
  border: none;
  font-weight: 500;
  color: rgb(90, 165, 235);
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: 700;
  color: white;
  background: none;
  border-radius: 25px;
  text-align: center;
  font-size: 1em;
}
.btn:hover {
  background-color: #eeeded;
}
.button-container {
  display: flex;
  align-items: right;
  justify-content: right;
  margin-top: 1rem;
  /* gap: 10px; */
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  /* backdrop-filter: blur(3px); */
  z-index: 1;
}
.hidden {
  display: none;
}
</style>