<template>
  <header class="header">
    <div class="topnav" id="topnav">
      <div class="top">
        <div class="logo">
          <router-link :to="'/'" alt="logo">
            <GetImages :img="logoImg" class="logoImg" alt="logo"/>
          </router-link>
        </div>
        <div class="boxRight">
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" class="soc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1135 0H6.88647C3.08318 0 0 3.08318 0 6.88647V17.1135C0 20.9168 3.08318 24 6.88647 24H17.1135C20.9168 24 24 20.9168 24 17.1135V6.88647C24 3.08318 20.9168 0 17.1135 0Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7698 16.0314H12.5132C12.6388 16.017 12.7571 15.965 12.8526 15.8822C12.9208 15.7866 12.9567 15.6717 12.9549 15.5543C12.9549 15.5543 12.9401 14.5505 13.4035 14.4029C13.86 14.257 14.4463 15.3729 15.0674 15.8018C15.3007 15.9886 15.5965 16.0793 15.8944 16.0553L17.556 16.032C17.556 16.032 18.425 15.9783 18.0128 15.2906C17.98 15.2345 17.7728 14.7823 16.7775 13.853C15.7357 12.8803 15.8754 13.0378 17.1304 11.3552C17.8944 10.3304 18.2001 9.70503 18.1046 9.43711C18.0135 9.18166 17.4514 9.24921 17.4514 9.24921L15.5806 9.26069C15.4977 9.25095 15.4137 9.26589 15.3392 9.30364C15.2685 9.35614 15.2121 9.42561 15.1753 9.50564C14.9816 10.0111 14.7507 10.5015 14.4843 10.9728C13.6514 12.3957 13.3182 12.4711 13.1821 12.3829C12.8654 12.1769 12.9444 11.5555 12.9444 11.1141C12.9444 9.73683 13.1523 9.16034 12.5397 9.01146C12.254 8.94228 11.9602 8.91293 11.6665 8.92424C10.9988 8.91735 10.4341 8.9262 10.114 9.08394C9.90122 9.18887 9.73726 9.42236 9.83727 9.4358C10.0501 9.45507 10.2475 9.55489 10.3892 9.71486C10.5189 9.97992 10.5823 10.2725 10.5741 10.5675C10.5741 10.5675 10.6843 12.1907 10.317 12.3924C10.0649 12.5304 9.71889 12.2481 8.97647 10.9574C8.72416 10.5082 8.50103 10.0432 8.30848 9.56533C8.27429 9.48424 8.22149 9.41235 8.15435 9.35546C8.06747 9.29753 7.96975 9.25781 7.86709 9.23871L6.0894 9.25052C5.95743 9.25099 5.82925 9.29464 5.72442 9.37481C5.701 9.42443 5.68829 9.47843 5.6871 9.53328C5.68592 9.58814 5.69628 9.64263 5.71753 9.69322C5.71753 9.69322 7.10925 12.9686 8.68494 14.619C9.07478 15.0534 9.54981 15.4029 10.0805 15.6459C10.6112 15.8889 11.1862 16.0201 11.7698 16.0314Z" fill="white"/>
              </svg>
            </a>
            <a href="https://fb.com" target="_blank" rel="noopener noreferrer" class="soc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1135 0H6.88646C3.08317 0 0 3.08318 0 6.88647V17.1135C0 20.9168 3.08317 24 6.88646 24H17.1135C20.9168 24 24 20.9168 24 17.1135V6.88647C24 3.08318 20.9168 0 17.1135 0Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1379 7.00159C14.5942 6.87014 14.0376 6.79931 13.4783 6.79041C11.6983 6.79041 10.989 7.63547 10.989 9.14394V10.2451H9.87402V12.0254H10.989V17.4415H13.1615V12.0254H14.7457L14.8965 10.2451H13.1615V9.3853C13.1615 8.90259 13.2067 8.60089 13.9006 8.60089C14.225 8.60859 14.5481 8.64393 14.8664 8.70649L15.1379 7.00159Z" fill="white"/>
              </svg>
            </a>
            <a href="https://Instagram.com" target="_blank" rel="noopener noreferrer" class="soc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                  <path d="M17.1135 0H6.88646C3.08317 0 0 3.08318 0 6.88647V17.1135C0 20.9168 3.08317 24 6.88646 24H17.1135C20.9168 24 24 20.9168 24 17.1135V6.88647C24 3.08318 20.9168 0 17.1135 0Z" fill="black"/>
                  <rect x="4" y="4" width="16" height="16" fill="white"/>
                  <path d="M19.8674 22.5H4.12491C3.7775 22.5115 3.43148 22.4508 3.10874 22.3217C2.786 22.1926 2.49356 21.9979 2.24991 21.75C2.00388 21.5081 1.81031 21.2181 1.68128 20.8981C1.55224 20.5781 1.4905 20.2349 1.49991 19.89V4.12503C1.48842 3.77762 1.54914 3.4316 1.67824 3.10886C1.80733 2.78612 2.00199 2.49368 2.24991 2.25003C2.49356 2.00212 2.786 1.80746 3.10874 1.67836C3.43148 1.54926 3.7775 1.48854 4.12491 1.50003H19.8749C20.2223 1.48854 20.5683 1.54926 20.8911 1.67836C21.2138 1.80746 21.5063 2.00212 21.7499 2.25003C21.9978 2.49368 22.1925 2.78612 22.3216 3.10886C22.4507 3.4316 22.5114 3.77762 22.4999 4.12503V19.875C22.496 20.5713 22.2171 21.2378 21.724 21.7295C21.231 22.2211 20.5637 22.4981 19.8674 22.5ZM18.5549 7.92003C18.5589 7.57582 18.4942 7.23426 18.3645 6.91538C18.2349 6.59649 18.0429 6.30668 17.7998 6.06292C17.5568 5.81916 17.2675 5.62635 16.949 5.49578C16.6305 5.36521 16.2891 5.29951 15.9449 5.30253H8.03241C7.68875 5.30153 7.34829 5.36861 7.03069 5.49989C6.71309 5.63118 6.42464 5.82406 6.18198 6.06742C5.93932 6.31077 5.74727 6.59978 5.6169 6.91775C5.48653 7.23573 5.42043 7.57637 5.42241 7.92003V15.825C5.4184 16.1692 5.48312 16.5108 5.61278 16.8297C5.74243 17.1486 5.93441 17.4384 6.17747 17.6821C6.42053 17.9259 6.70979 18.1187 7.02831 18.2493C7.34682 18.3798 7.68819 18.4455 8.03241 18.4425H15.9449C16.2897 18.4476 16.632 18.3833 16.9514 18.2535C17.2709 18.1236 17.561 17.9309 17.8044 17.6867C18.0479 17.4426 18.2398 17.1519 18.3687 16.8321C18.4977 16.5123 18.561 16.1698 18.5549 15.825V7.92003ZM12.0074 8.59503C11.6546 8.59507 11.3045 8.65596 10.9724 8.77503C10.6432 8.89147 10.3306 9.05031 10.0424 9.24753H6.74991V8.59503C6.74378 8.33594 6.79017 8.0783 6.88628 7.83762C6.98239 7.59694 7.12623 7.37821 7.30913 7.19461C7.49204 7.011 7.71022 6.86633 7.95053 6.7693C8.19083 6.67227 8.4483 6.6249 8.70741 6.63003H15.2699C15.5317 6.62502 15.7919 6.67217 16.0352 6.76875C16.2786 6.86532 16.5003 7.00938 16.6874 7.19253C16.8741 7.37393 17.0206 7.59249 17.1175 7.83408C17.2144 8.07567 17.2595 8.33491 17.2499 8.59503V9.24753H13.9499C13.6635 9.05632 13.3566 8.89782 13.0349 8.77503C12.7037 8.65258 12.353 8.59158 11.9999 8.59503H12.0074ZM15.2699 17.1525H8.70741C8.44688 17.1582 8.18807 17.109 7.94775 17.0082C7.70744 16.9075 7.49098 16.7573 7.31241 16.5675C7.13084 16.3855 6.98754 16.1689 6.89094 15.9306C6.79433 15.6923 6.74638 15.4371 6.74991 15.18V9.93003H9.36741C9.17168 10.2164 9.01292 10.5264 8.89491 10.8525C8.76723 11.1877 8.70363 11.5439 8.70741 11.9025C8.71648 12.3383 8.81609 12.7674 8.99991 13.1625C9.17223 13.5467 9.40803 13.8992 9.69741 14.205C9.99651 14.51 10.3535 14.7523 10.7474 14.9175C11.1544 15.0941 11.5938 15.1835 12.0374 15.18C12.4681 15.1804 12.8945 15.0943 13.2913 14.9268C13.6881 14.7593 14.0472 14.5139 14.3474 14.205C14.6208 13.8958 14.8413 13.5436 14.9999 13.1625C15.1744 12.7628 15.2638 12.3312 15.2624 11.895C15.2662 11.5364 15.2026 11.1802 15.0749 10.845C14.9585 10.5223 14.8076 10.213 14.6249 9.92253H17.2499V15.1725C17.2527 15.4315 17.2022 15.6884 17.1016 15.9271C17.0009 16.1657 16.8523 16.3812 16.6649 16.56C16.4845 16.7479 16.2679 16.8973 16.0281 16.9991C15.7883 17.101 15.5304 17.1532 15.2699 17.1525ZM11.9999 9.92253C12.2571 9.91815 12.5126 9.96571 12.751 10.0624C12.9894 10.159 13.2059 10.3028 13.3874 10.485C13.5729 10.6685 13.7202 10.8869 13.8207 11.1276C13.9212 11.3684 13.9729 11.6267 13.9729 11.8875C13.9729 12.1484 13.9212 12.4067 13.8207 12.6474C13.7202 12.8882 13.5729 13.1066 13.3874 13.29C13.2059 13.4723 12.9894 13.616 12.751 13.7127C12.5126 13.8093 12.2571 13.8569 11.9999 13.8525C11.7369 13.8585 11.4753 13.8119 11.2306 13.7153C10.9858 13.6187 10.7629 13.4741 10.5749 13.29C10.2058 12.9166 9.99872 12.4126 9.99872 11.8875C9.99872 11.3624 10.2058 10.8585 10.5749 10.485C10.7629 10.301 10.9858 10.1564 11.2306 10.0598C11.4753 9.96318 11.7369 9.91651 11.9999 9.92253ZM14.6249 8.59503H15.9374V7.28253H14.6324L14.6249 8.59503Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
            
          <svg @click.prevent="Humburger()" class="ham" viewBox="0 0 100 100" width="40">
            <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
            <path class="line middle" d="m 70,50 h -40" />
            <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
          </svg>
        </div>
      </div>

      <ul id="humburg">
        <li v-for="linck in filterActive" :key="linck.id" :class="{submeL: linck.subMenu}" @click="Humburger()">
          <router-link :to="linck.path" :class="{'router-link-exact-active': linck.active}">
            {{ linck.title }}
          </router-link>

          <ul v-if="linck.subMenu" class="subme">
            <li v-for="(item, index) in linck.subMenu" :key="index">
              <router-link :to="item.path">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="topMenu">
      <div class="logo">
        <router-link :to="'/'" alt="logo">
          <GetImages :img="logoImg" class="logoImg" alt="logo"/>
        </router-link>
      </div>
      <ul @mouseleave="submeHover(null)">
        <li v-for="linck in filterActive" :key="linck.id" @mouseenter="submeHover(linck.id)">
          <router-link :to="linck.path" :class="{'router-link-exact-active': linck.active}">
            {{ linck.title }}
          </router-link>
          <hr>

          <ul v-if="linck.subMenu" class="subme" :class="{submeHover: linck.hover}" @mouseenter="submeHover(linck.id)" @mouseleave="submeHover(null)">
            <li v-for="(item, index) in linck.subMenu" :key="index">
              <router-link :to="item.path">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages,
  },
  data() {
    return {
      routerLink: [],
      logoImg: '',
    }
  },
  computed: {
    ...mapGetters({
      GET_LOGOS: 'header/GET_LOGOS',
      GET_ROUTER_LINK: 'header/GET_ROUTER_LINK',
    }),
    filterActive(){
      return this.routerLink.filter(i => i.use)
    }
  },
  methods: {
    Humburger(){
      let x = document.querySelector("#humburg"),
          a = document.querySelector("#topnav")

        a.style.position = (a.style.position === "fixed")? "relative" : "fixed"
        x.style.display = (x.style.display === "flex")? "none" : "flex"
        document.body.style.overflow = (x.style.display === "flex")?'hidden':'auto'
        document.querySelector(".ham").classList.toggle('active')
        document.querySelector("header").scrollIntoView(true)
    },
    submeHover(hoverId){
      this.routerLink.forEach(item => {
        item.hover = (item.id === hoverId ? true: false)
      })
    },
    subIsActive(){
      if(typeof this.routerLink !== 'undefined') {
        this.routerLink.forEach(item => {
          item.active = false
          if(isNaN(item.subMenu))
            item.subMenu.forEach(it => item.active = (this.$route.path === it.path?true:false))
          if(typeof this.$route.matched[1] !== 'undefined')
            item.active = ((this.$route.matched[0].path === item.path)?true:false)
        })
      } else
        setTimeout(() => this.subIsActive(), 1000)
    },
  },
  watch: {
    GET_ROUTER_LINK(newD, lastD){
      this.routerLink = newD
    },
    GET_LOGOS(newD, lastD){
      this.logoImg = newD
    },
    '$route.path': function(newD, lastD){
      this.subIsActive()
    }
  },
  created() {
    this.routerLink = this.GET_ROUTER_LINK
    this.logoImg = this.GET_LOGOS
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/component/header.scss";
.logoImg{
  width: 65px;
  height: 76px;
  position: relative;
}
</style>
