<template>
  <div :style="nodeMargin">
      <span class="main-menu" @click="toggleChildren"
        v-if="hasChildren"
        :class="toggleChildrenIcon"
        @keypress="toggleChildren"
        >
        <span>{{ node.Foldername }}</span>
      </span>
        
    <div v-if="hasChildren" v-show="showChildren" class="sub-menu">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :spacing="spacing + 10"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    spacing: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showChildren: false
    }
  },
  computed: {
    nodeMargin() {
      return {
        'margin-left': `${this.spacing}px`
      }
    },
    hasChildren() {
      const { children } = this.node
      return children && children.length >= 0
    },
    toggleChildrenIcon() {
      return this.showChildren ? 'fas fa-angle-down' : 'fas fa-angle-right'
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    }
  }
}
</script>

<style lang="css" scoped>

.main-menu {
  display: inline-block;
  width: 220px;
  padding: 3px 20px;
  background-color: #ccc;
  border-radius: 50px;
  margin-bottom : 5px;
}
</style>