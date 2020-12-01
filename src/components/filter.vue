<template>
  <div class="filter-container">
    <ul>
      <li v-for="(item, index) in filter" :key="index">
        <dl>
          <dt>{{ item.label }}</dt>
          <dd>
            <!-- 如果有插槽组件name同该项field则显示该插槽组件，否则显示筛选按钮 -->
            <slot :name="typeof item.field === 'string' ? item.field : item.field[0]">
              <!-- 因为后端的数据不严格判断，所以这里都用变成字符串判断(it.value + '') === (filter[item.field] + '') -->
              <a
                href="javascript:void(0);"
                v-for="(it, ind) in item.option"
                :key="ind"
                @click="onClick(item.field, it.value)"
                :class="{ current: it.value + '' === param[item.field] + '' }"
              >
                {{ it.label }}
              </a>
            </slot>
          </dd>
        </dl>
      </li>
    </ul>
    <div>
      <el-button size="small" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </div>
  </div>
</template>
<script>
// filter 过滤器的结构对象,用来渲染filter组件
// {
//   field: 'view_pattern', // field是字符串
//   label: '查看方式',
//   option: [
//     {
//       label: '单向',
//       value: 'oneway'
//     },
//     {
//       label: '双向',
//       value: 'bothway'
//     }
//   ]
// },
// {
//   field: ['send_user_nickname', 'received_user_nickname'], // field也可是数组，然后将v-slot:send_user_nickname的组件通过插槽的方式传进filter组件
//   label: '聊天双方'
// },
// param 过滤器的过滤参数,处理数据传入filter组件
// 会在第一次渲染filter后取当前param结构里filter渲染所用到的值作为默认值
// confirm 过滤器点击重置、确定的触发函数
export default {
  name: 'WFilter',
  props: ['filter', 'param'],
  data () {
    return {
      defaultVal: {}
    }
  },
  beforeMount () {
    this.init()
  },
  watch: {
    filter () {
      this.init()
    }
  },
  methods: {
    onClick (field, value) {
      // debugger
      this.param[field] = value
    },
    // 初始化允许取前端页面的param作为默认值，如果param里没有默认值则取后端返回字段数组的首个选项作为默认值，必须有默认值，清空要使用默认值
    // 这么做是为了支持filter里嵌入表单组件，清空表单组件的使用默认值后端可能不返回，需在前端页面param里标明默认值
    init () {
      const that = this
      if (Object.keys(that.defaultVal).length === 0) {
        this.filter.forEach(function (item) {
          const field = item.field
          if (typeof field === 'string') {
            if (that.param[field] != null) {
              // 如果param[field]不为空则设置默认值field项的值为param[field] （设初始值为默认值）
              that.$set(that.defaultVal, field, JSON.parse(JSON.stringify(that.param[field])))
            } else {
              // 如果param[field]为空则设置默认值field项的值为option[0].value,初始化param[field]为option[0].value （设可选项第一项为默认值）
              that.$set(that.defaultVal, field, JSON.parse(JSON.stringify(item.option[0].value)))
              that.param[field] = item.option[0].value
            }
          }
          if (field instanceof Array) {
            field.forEach((key) => {
              // if (that.data.param[key] != null) {
              //   that.$set(that.defaultVal, key, JSON.parse(JSON.stringify(that.data.param[key])))
              // }
              // 设置默认值field项的值为param[field] （设初始值为默认值）
              that.$set(that.defaultVal, key, JSON.parse(JSON.stringify(that.param[key])))
            })
          }
        })
      }
    },
    reset () {
      for (let key in this.defaultVal) {
        this.param[key] = JSON.parse(JSON.stringify(this.defaultVal[key]))
      }
      this.$emit('confirm')
    },
    submit () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  background: #f2f2f2;
  padding: 10px;
  ul {
    margin-bottom: 20px;
    li {
      margin-bottom: 10px;
      dl {
        dt {
          float: left;
          width: 4em;
          height: 30px;
          line-height: 30px;
          font-weight: 700;
          font-size: 15px;
          margin-right: 20px;
        }
        dd {
          margin-left: 5em;
          font-size: 14px;
          &:after {
            content: '';
            clear: both;
            display: block;
            height: 0;
          }
          a {
            float: left;
            margin-right: 20px;
            color: $black;
            padding: 4px 15px;
            border-radius: 4px;
            line-height: 22px;
          }
          a.current {
            color: #fff;
            background: $blue;
          }
        }
      }
    }
  }
}
</style>
