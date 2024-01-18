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
    nodes() {
      return [
        {
          id: 1,
          label: 'Foods',
          children: [
            {
              id: 2,
              label: 'Fruits',
              children: [
                {
                  id: 3,
                  label: 'Banana',
                  children: [
                      {
                        id: 4,
                        label: 'mango',
                        children: [0]
                      }
                  ]
                },
                {
                  id: 5,
                  label: 'Apple',
                  children: [0]
                },
                {
                  id: 6,
                  label: 'Strawberry',
                  children: [0]
                }
              ]
            },
            {
              id: 7,
              label: 'Vegetables',
              children: [
                {
                  id: 8,
                  label: 'Carrot',
                  children: [0]
                },
                {
                  id: 9,
                  label: 'Lettuce',
                  children: [0]
                },
                {
                  id: 10,
                  label: 'Potato',
                  children: [0]
                }
              ]
            }
          ]
        },
        {
          id: 11,
          label: 'Drinks',
          children: [
            {
              id: 12,
              label: 'Beers',
              children: [
                {
                  id: 13,
                  label: 'Budweiser',
                  children: [0]
                },
                {
                  id: 14,
                  label: 'Heineken',
                  children: [0]
                }
              ]
            },
            {
              id: 15,
              label: 'Wines',
              children: [0]
            },
            {
              id: 16,
              label: 'Whiskey',
              children: [0]
            }
          ]
        }
      ]
    }
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

