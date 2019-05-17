<template>
  <el-dropdown trigger="click" style="position:relative" placement="bottom-start">
    <span class="el-dropdown-link">
      <img :src="selected.icon" alt="" v-if="dropdownType !== 'list'">
      <div style="display:inline" v-if="dropdownType !== 'list'">+</div>
      <div class="shuzi" v-if="dropdownType === 'list'">
        {{selected.name}}
      </div>
      <div class="shuzi" v-else>
        {{selected.text}}
      </div>
      <i class="el-icon--right" v-if="tr">
        <img src="../image/jtt.png" alt="">
      </i>
      <i class="el-icon--right" v-if="fl"></i>
    </span>
    <el-dropdown-menu class="juz" slot="dropdown"  v-if="dropdownType === 'list'">
      <!-- <el-dropdown-item v-for="item in list" :key="item.text"  class="" command="a" @click.native="select(item)">
        <img :src="item.icon" alt="">
        <span>+{{ item.text }}</span>
      </el-dropdown-item> -->
      <el-dropdown-item v-for="item in data" :key="item.name"  class="" command="a" @click.native="select(item)">
        <span>{{ item.name }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
     <el-dropdown-menu class="juz" slot="dropdown"  v-if="dropdownType === 'default'">
      <!-- <el-dropdown-item v-for="item in list" :key="item.text"  class="" command="a" @click.native="select(item)">
        <img :src="item.icon" alt="">
        <span>+{{ item.text }}</span>
      </el-dropdown-item> -->
      <el-dropdown-item v-for="item in data" :key="item.text"  class="" command="a" @click.native="select(item)">
        <img :src="item.icon" alt="">
        <span>+{{ item.text }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<style>
.el-dropdown {
  width: 54%;
  left: .9375rem;
}
.el-dropdown img {
  vertical-align: middle;
  display: inline-block;
  width: 1.3125rem;
  height: 0.875rem;
}
.shuzi {
  width: 28%;

  /* width:.01375rem; */
  display: inline-block;
}
.el-dropdown-menu__item {
  padding: 0;
}
.el-dropdown-menu li {
  /* display: block; */
  display: flex;
    justify-content:baseline;
    align-items: center;
}
.el-dropdown-menu__item img {
  width: 2.15625rem;
  height: 1.40625rem;
  display: inline-block;
}
.el-dropdown-menu__item span {
  font-size: 1.5625rem;
  color: #999999;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-icon-picture {
  position: relative;
  right: -2px;
  /* font-size: 15px; */
  margin-left: -2px;
}
.el-icon--right {
  margin-left: -4px;
}
.el-icon--right img {
  width: 0.5rem;
  height: 0.25rem;
  display: inline-block;
}
</style>

<script>
import IMG86 from '../image/zgg.png'
import IMG020 from '../image/lww.png'

export default {
  props: {
    data: {
      type: Array
    },
    dropdownType: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      fl: false,
      tr: true,
      list: [
        { icon: IMG86, text: 86 },
        { icon: IMG020, text: 856 }
      ],
      xialaMenu: [],
      quanBu: '全部',
      selected: null
    }
  },
  // created () {
  //   console.log(this.$store)
  // },
  methods: {
    // arrowup() {
    //   // this.fl = true;
    //   // this.tr = false;
    // },
    qieHanmenu () {
      this.quanbutext = this.quanBu
    },
    select (item) {
      this.selected = item
      this.$emit('change', item.text)
    }
  },
  created () {
    this.qieHanmenu()
    this.selected = this.data[0]
    console.log(this.selected)
    this.$emit('change', this.selected.text)
  }
}
</script>
