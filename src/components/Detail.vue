<template>
 <div>
    <p>Detail</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    <p>phiong</p>
    {{ data }}
 </div>
</template>

<script>

export default {
    name: 'Detail',
    data() {
        return {
            data: {}
        }
    },
    props: ['recordToDetail'],
    components: {  },
    methods: {
        showData() {
            if (this.recordToDetail) {
                this.data = this.recordToDetail;
            }
        }

    },
    watch:{
        recordToDetail: {
                    deep: true,
                    handler(newVal) {
                        this.showData();
                    }
        }
    },

    mounted() {
        
    }
}
</script>