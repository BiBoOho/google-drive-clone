<template>
    <div class="sidebar-menu">
      <!-- <div class="toggle-btn">
        <i class="fa fa-angle-right"></i>
      </div> -->
      <div class="sidebar">
        <div class="links">
          <div class="link">
            <a @click="changeActiveMenu" id="home">
              <i class="fa-solid fa-house"></i>
              Home
            </a>
          </div>
  
          <div class="link" >
            <a @click="changeActiveMenu" id="my-drive">
              <i @click.prevent="showSubmenu" class="fa-solid fa-caret-right"></i>
              <i class="fa-solid fa-hard-drive"></i>
              My Drive
            </a>
            <div class="sub-menu">
              <a @click="changeActiveMenu">Kintone</a>
              <a @click="changeActiveMenu">dfszb</a>
              <a @click="changeActiveMenu">fcgn</a>
              <a @click="changeActiveMenu">cvncn</a>
            </div>
          </div>
  
          <div class="link">
            <a @click="changeActiveMenu" id="computers">
              <i @click.prevent="showSubmenu" class="fa-solid fa-caret-right"></i>
              <i class="fa-solid fa-computer"></i>
              Computers
            </a>
            <div class="sub-menu">
              <a @click="changeActiveMenu">Kintone</a>
              <a @click="changeActiveMenu">dfszb</a>
              <a @click="changeActiveMenu">fcgn</a>
              <a @click="changeActiveMenu">cvncn</a>
            </div>
          </div>
  
          <div class="link">
            <a @click="changeActiveMenu" id="share-with-me">
              <i class="fa-solid fa-user-group"></i>
              Share with me
            </a>
          </div>
  
          <div class="link">
            <a @click="changeActiveMenu" id="recent">
              <i class="fa-solid fa-clock"></i>
              Recent
            </a>
          </div>
  
          <div class="link">
            <a @click="changeActiveMenu" id="starred">
              <i class="fa-solid fa-star"></i>
              Starred
            </a>
          </div>
  
          <div class="link">
            <a @click="changeActiveMenu" id="spam">
              <i class="fa-solid fa-circle-exclamation"></i>
              Spam
            </a>
          </div>
  
          <div class="link">
            <a @click="changeActiveMenu" id="trash">
              <i class="fa-solid fa-trash-can"></i>
              Trash
            </a>
          </div>
  
          <div class="link">
            <a @click="changeActiveMenu" id="storage">
              <i class="fa-solid fa-cloud"></i>
              Storage
            </a>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
    
  
   export default {
    data() {
      return {
          records:[],
          recordId: 0
      };
    },
    methods: {
      toggleSubmenu(menu) {
          this.activeMenu = (this.activeMenu === menu) ? null : menu;
      },
      async setFolders(getRecords){
        console.log('setFolders',getRecords);
        console.log(document.querySelector('#my-drive'));
      },
      showSubmenu(e) {
        console.log(e.target.tagName);
        e.target.parentNode.parentNode.classList.toggle('active');
        e.target.classList.toggle('fa-caret-down')
      },
      changeActiveMenu(e) {
        console.log(e.target.tagName);
        if(document.querySelectorAll('.sidebar-menu .sidebar .links .link a.active').length>0){
          if(e.target.tagName.toUpperCase() == 'A'){
            document.querySelector('.sidebar-menu .sidebar .links .link a.active').classList.remove('active');
            e.target.classList.add('active');
            console.log(e.target.id);
            let id = e.target.id;
            this.$emit("changeMenu", id, this.records);
          }
        }
        
        
      },
      async setDefault(){
        document.querySelector('#home').classList.add('active');
        this.recordId = -1;
        let getRecords = await kintone.api('/k/v1/records', 'GET', {app: kintone.app.getId()});
        console.log(getRecords);
        this.records = getRecords;
        await this.setFolders(getRecords);
      }
    },
    async mounted() {
      await this.setDefault();
    }
  }
  
  </script>
  
  <style scoped>
    .sidebar-menu{
      /* position: fixed; */
      top: 0px;
      left: 0px;
      width: 250px;
      height: 100%;
    }
    .sidebar-menu .sidebar{
      /* position: absolute; */
      top: 0px;
      left: 0px;
      width: 250px;
      height: 100%;
      background: #FFF;
      padding: 10px;
      padding-left: 20px;
      z-index: 5;
      
    }
    .sidebar-menu .sidebar .links .link{
      margin: 2px 0px;
    }
    .sidebar-menu .sidebar .links > .link:nth-child(3),
    .sidebar-menu .sidebar .links > .link:nth-child(6){
      margin-bottom: 15px;
    }
    .sidebar-menu .sidebar .links .link a{
      text-decoration: none;
      display: block;
      padding: 5px 5px;
      color: #555;
      border-radius: 25px;
      width: 150px;
      display: flex;
      align-items: center;
      font-size: 12px;
      gap: 10px;
    }
    .sidebar-menu .sidebar .links .link a i.fa-caret-right{
      cursor: default;
    }
    .sidebar-menu .sidebar .links .link > a i.fa{
      font-size: 16px;
      width: 20px;
      text-align: center;
    }
    .sidebar-menu .sidebar .links .link .sub-menu{
      margin-left: 5px;
      padding-left: 10px;
      max-height: 0px;
      overflow: hidden;
      transition: max-height 300ms ease-in-out;
    }
    .sidebar-menu .sidebar .links .link.active > .sub-menu{
      max-height: 500px;
    }
    .sidebar-menu .sidebar .links .link .sub-menu a{
      text-decoration: none;
      display: block;
      /* padding: 5px; */
      margin: 2px 0px;
      color: #222;
      cursor: pointer;
    }
    /* .sidebar-menu .sidebar .links .link.active > a,  */
    .sidebar-menu .sidebar a.active{
      background: #eeeded;
    }
    .sidebar-menu .sidebar .links .link > a:hover,
    .sidebar-menu .sidebar a:hover{
      background: #eeeded;
    }
  </style>