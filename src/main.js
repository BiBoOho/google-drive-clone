import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'     //Our .vue startup file
import './static/global.css'    //Import css files as modules
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


//Will mount the vue app inside a HTML element which id equals to "app" (div into templetes/index.html file)
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)


kintone.events.on('app.record.index.show', (event) => {
    if (event.viewId !== 5987422) return event; // 作成したカスタマイズビューのIDを指定

    app.mount('#app');
    return event;
  });

