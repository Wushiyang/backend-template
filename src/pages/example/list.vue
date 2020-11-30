<template>
  <div class="container">
    <wFilter :filter="filter" :param="pageState.param" @confirm="handleFilter" />
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
          keyword: '',
          view_pattern: 'oneway',
          content_type: 'all',
          search_dimension: 'content',
          page: 1,
          per_page: 30
        }
      },
      // 页面数据
      filter: [],
      searchOption: []
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
          that.filter = data.filter
        }
      })
    }
  }
}
</script>
