<script>
import IconSvg from './iconsvg'
export default {
  name: 'asidemenu',
  data () {
    return {
    }
  },
  created () {},
  props: {
    routes: {
      type: Array
    },
    config: Object,
    'default-active': String,
    collapse: Boolean,
    permissionList: Array
  },
  components: { IconSvg },
  methods: {
    excuteHyperlink (item) {
      return (
        <a href={item.path} key={item.path} target="_blank">
          <el-menu-item
            class={
              new RegExp(`${item.path}(\\?.*)?$`).test(this['defaultActive'])
                ? 'active menu-item'
                : 'menu-item'
            }
          >
            {item.icon ? (
              <IconSvg
                icon-class={item.icon}
                class={
                  new RegExp(`${item.path}(\\?.*)?$`).test(this['defaultActive'])
                    ? 'active'
                    : ''
                }
              />
            ) : (
              ''
            )}
            <span slot="title" class="ml10">
              {item.meta.tit}
            </span>
          </el-menu-item>
        </a>
      )
    },
    excuteElItem (item) {
      return (
        <el-menu-item
          index={item.path}
          key={item.path}
          class={
            new RegExp(`${item.path}(\\?.*)?$`).test(this['defaultActive'])
              ? 'active menu-item'
              : 'menu-item'
          }
        >
          {item.icon ? (
            <IconSvg
              icon-class={item.icon}
              class={
                new RegExp(`${item.path}(\\?.*)?$`).test(this['defaultActive']) ? 'active' : ''
              }
            />
          ) : (
            ''
          )}
          <span slot="title" class="ml10">
            {item.meta.tit}
          </span>
        </el-menu-item>
      )
    },
    excuteSubItem (item) {
      const that = this
      let submenu = []
      item.children.forEach((it, ind) => {
        let subcpt
        if (item.hyperlink) {
          subcpt = that.excuteHyperlink(it)
        }
        if (item.component) {
          subcpt = that.excuteElItem(it)
        }
        submenu.push(subcpt)
      })
      return (
        <el-submenu index={item.path} key={item.path} class="menu-sub">
          <div
            slot="title"
            class={
              new RegExp(`(${item.path}/.*$)|(^${item.path}$)`).test(this['defaultActive']) ? 'active' : ''
            }
          >
            {item.icon ? <IconSvg icon-class={item.icon} /> : ''}
            <span slot="title" class="ml10">
              {item.meta.tit}
            </span>
          </div>
          {submenu}
        </el-submenu>
      )
    },
    sidebaritem (rts) {
      const that = this
      let arr = []
      rts.forEach((item, index) => {
        let cpt
        if (!item.hidden && this.permissionList.includes(item.permission)) {
          if (item.children) {
            cpt = that.excuteSubItem(item)
          } else if (item.hyperlink) {
            cpt = that.excuteHyperlink(item)
          } else if (item.component) {
            cpt = that.excuteElItem(item)
          }
        }
        arr.push(cpt)
      })
      return arr
    }
  },
  render () {
    const that = this
    const routes = this.routes
    let elMenu = <el-menu class={this.class}>{that.sidebaritem(routes)}</el-menu>
    const config = Object.assign({}, this.config, {
      defaultActive: this['defaultActive'],
      collapse: this.collapse
    })
    elMenu.componentOptions.listeners = this.$listeners
    elMenu.componentOptions.propsData = config
    return <div class="menu-container">{elMenu}</div>
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  > ul {
    height: 100%;
    border: none;
  }
  svg {
    fill: #909399;
    width: 20px;
    height: 20px;
    vertical-align: -6px;
  }
  .active {
    color: $active;
    svg {
      fill: $active;
    }
  }
}
</style>
