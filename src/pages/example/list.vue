<template>
  <div class="container">
    <wFilter :filter="filter" :param="pageState.param" @confirm="handleFilter" class="mb10">
      <template v-slot:send_user_nickname>
        <el-input class="w100 mr10" size="mini" v-model="pageState.param.send_user_nickname" />
        <el-input class="w100" size="mini" v-model="pageState.param.received_user_nickname" />
      </template>
      <template v-slot:start_time>
        <el-date-picker
          :value="[pageState.param.start_time, pageState.param.end_time]"
          size="mini"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="~"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @input="
            (val) => {
              pageState.param.start_time = val[0]
              pageState.param.end_time = val[1]
            }
          "
        >
        </el-date-picker>
      </template>
    </wFilter>
    <div class="mb10 clearfix">
      <div class="fl">
        <el-button type="warning">保存排序</el-button>
        <el-button type="primary">添加</el-button>
      </div>
      <div class="fr">
        <el-input v-model="pageState.param.keyword" class="w500">
          <el-select v-model="pageState.param.search_dimension" placeholder="请选择" slot="prepend" class="w150">
            <el-option v-for="(item, index) in searchOption" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div slot="append">
            <el-button @click="getDirectMessageList()">
              <i class="el-icon-search"></i>
            </el-button>
          </div>
        </el-input>
        <el-button @click="pageState.param.keyword = ''">
          清除
        </el-button>
      </div>
    </div>
    <el-table></el-table>
  </div>
</template>
<script>
import wFilter from '@/components/filter'
export default {
  name: 'List',
  components: {
    wFilter
  },
  data () {
    return {
      // 页面状态
      pageState: {
        param: {
          // 本来推荐param的所有属性的值为null，然后后端设定默认值则读默认值不设则读选项的第一项，但是后端貌似不好管理
          keyword: '',
          send_user_nickname: '',
          received_user_nickname: '',
          start_time: '',
          end_time: '',
          view_pattern: 'oneway',
          content_type: 'all',
          search_dimension: 'content',
          page: 1,
          per_page: 30
        }
      },
      // 页面数据
      filter: [],
      searchOption: [],
      pickerOptions: {
        // 时间快捷面板
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近七天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近三十天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleFilter () {
      this.getList()
    },
    getList () {
      const that = this
      this.$API.getExampleList(this.pageState.param, { isLoading: true }).then((res) => {
        const { code, data } = res
        if (code === 0) {
          const ind = data.filter.findIndex((_) => _.field === 'search_dimension')
          that.searchOption = data.filter.splice(ind, 1)[0].option
          that.filter = [
            ...[
              {
                field: ['send_user_nickname', 'received_user_nickname'],
                label: '聊天双方'
              },
              {
                field: ['start_time', 'end_time'],
                label: '时间范围'
              }
            ],
            ...data.filter
          ]
        }
      })
    }
  }
}
</script>
