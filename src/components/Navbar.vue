<template>
  <div>
    <SubMenu v-for="node in data" :key="node.id" :node="node" />
  </div>
</template>

<script>
import SubMenu from './SubMenu.vue';
export default {
    name: 'Navbar',
    data() {
      return {
        data: []
      }
    },
    methods: {
      setData() {
        let data = [
        {
          id: 1,
          Foldername: 'Folder01',
          ParentFolder: '0',
        },
        {
          id: 2,
          Foldername: 'Folder02',
          ParentFolder: '1',
        },
        {
          id: 3,
          Foldername: 'Folder03',
          ParentFolder: '1',
        },
        {
          id: 4,
          Foldername: 'Folder04',
          ParentFolder: '2',
        },
        {
          id: 5,
          Foldername: 'Folder05',
          ParentFolder: '3',
        },
        {
          id: 6,
          Foldername: 'Folder06',
          ParentFolder: '4',
        },
        {
          id: 7,
          Foldername: 'Folder07',
          ParentFolder: '1',
        },
        {
          id: 8,
          Foldername: 'Folder08',
          ParentFolder: '7',
        },
        {
          id: 9,
          Foldername: 'Folder09',
          ParentFolder: '7',
        },
        {
          id: 10,
          Foldername: 'Folder19',
          ParentFolder: '1',
        },
        {
          id: 11,
          Foldername: 'Folder11',
          ParentFolder: '2',
        },
        {
          id: 12,
          Foldername: 'Folder12',
          ParentFolder: '2',
        },
        {
          id: 13,
          Foldername: 'Folder13',
          ParentFolder: '12',
        },
        {
          id: 14,
          Foldername: 'Folder14',
          ParentFolder: '12',
        }
      ];

      let result = {};
      let mainFolder = []; 

data.forEach(item => {
  let parentId = item.ParentFolder;
  if (parentId == 0) {
    mainFolder.push({ id: item.id ,Foldername: item.Foldername,ParentFolder: item.ParentFolder , children: [] });
  }

  if (!result[parentId]) {
    result[parentId] = { id: parentId,Foldername: item.Foldername,ParentFolder: item.ParentFolder , children: [] };
  }
  if (parentId !== '0') {
    result[parentId].children.push(item);
  }
});

mainFolder.forEach(main => {
  data.forEach(item => {
    if (main.id == item.ParentFolder) { 
      main.children.push(item);
      nestChildren(item);
    }
  });
});

console.log(mainFolder);
// Function to recursively nest children
function nestChildren(parent) {
  if (result[parent.id] && result[parent.id].children.length > 0) {
    parent.children = result[parent.id].children.map(child => {
      return { ...child, children: nestChildren(child) };
    });
  }
  return parent.children || [];
}

this.data = mainFolder;


      },
      
    },
    mounted() {
      this.setData();
    },
    components:{SubMenu},
  computed: {
   
  }
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

</style>

