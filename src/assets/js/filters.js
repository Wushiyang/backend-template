import Vue from 'vue'
import { jumpImgs, timeFormat } from './utils'
const filters = {
  jumpImgs,
  timeFormat
}
// 过滤器集合
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
