<template>
  <header :class="{ 'scrolled-nav' : scrolledNav }">
      <nav>
        <div class="header-logo">
          <router-link :to="{ name: 'home' }"><img src="@/assets/logo.png" alt=""></router-link>
        </div>
        
        <ul v-show="!mobile" class="navigation">
          <li>
            <PokeParty
            @randomPokeMoves="randomPokeMoves"
            @popFromParty="popFromParty"
            @closeParty="closeParty"
            :imageUrl="imageUrl"
             />
            <!-- :key="partyReload" -->
          </li>
          <li><router-link class="link" :to="{ name: 'home' }">Pokedex</router-link></li>
          <li><router-link class="link" :to="{ name: 'arena' }">Arena</router-link></li>
          <li><router-link class="link" :to="{ name: 'about' }">About us</router-link></li>
        </ul>
        <div class="hamburger-icon">
            <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars material-symbols-outlined" :class="{'icon-active': mobileNav}">menu</i>
        </div>
        <transition name="mobile-nav">
          <ul v-show="mobileNav" class="dropdown-nav">
            <li><router-link class="link" :to="{ name: 'home' }">Pokedex</router-link></li>
            <li><router-link class="link" :to="{ name: 'arena' }">Arena</router-link></li>
            <li><router-link class="link" :to="{ name: 'about' }">About us</router-link></li>
          </ul>
        </transition>
      </nav>
  </header>
</template>
<script>
import PokeSearch from '@/components/poke-search.vue'
import PokeParty from '@/components/poke-party.vue'

 export default {
  props:[
    "imageUrl",
  ],
  components:{
     PokeSearch,
     PokeParty,
  },
  data() {
    return {
      scrolledNav: null,
      mobile:null,
      mobileNav:null,
      windowWidth: null,
      partyReload:0,  
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen)
    this.checkScreen()
  },
  mounted(){
    // window.addEventListener("scroll", this.updateScroll)

  },
  methods:{
    toggleMobileNav(){
      this.mobileNav = !this.mobileNav
    },
    partyCmpReload(){
      this.partyReload++
    },
    updateScroll(){
      const scrollPosition = window.scrollY
      if(scrollPosition > 50){
        this.scrolledNav = true;
        return;
      }
      this.scrolledNav = false;
    },
    checkScreen(){
      this.windowWidth = window.innerWidth
      if(this.windowWidth <= 750){
        this.mobile = true
        return
      }
      this.mobile= false
      this.mobileNav = false
      return
    },
    closeParty(slots){
      this.$emit('togglePartySlots',slots);
    },
    popFromParty(index){
      this.$emit('spliceFromParty',index);
      console.log('nav-bar-pop',index)
    },
    randomPokeMoves(pokeIdAndMoves){
      this.$emit('randomPokeMoves',pokeIdAndMoves);
    },

  }
 };
 </script>

<style lang="scss" scoped>
header{
  background-color: rgb(251, 89, 89);
  width: 100%;
  transition: 0.5s ease all;
  color: #fff;
  z-index: 10;
  position: fixed;
  margin-bottom: 5%;

  nav{
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px){
      max-width: 1140px;
    }

    ul,
    .link{
      font-weight: 500;
      color: #fff;
      list-style: none;
      text-decoration: none;
    }

    li{
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }
      .nav-search{
        .fade-enter-active,
        .fade-leave-active {
        transition: opacity .5s
        }
        
      }

    .link {
      font-size: 14px;
      transition: .5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent
    }
    .link:hover {
      color: #fff;
      border-color: #fff;
    }

    .header-logo{
      display: flex;
      align-items: center;

      img{
        width:70px;
        transition: .5s ease all;
      }
    }

    .navigation{
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .hamburger-icon{
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      
      i{
        cursor: pointer;
        font-size: 24px;
        transition: .8s ease all;
      }
    }


    .icon-active{
      transform: rotate(180deg);
    }
    .dropdown-nav{
      display: flex;
      flex-direction: column;
      position: fixed;
      width:100%;
      max-width: 250px;
      height: 100%;
      background-color: #fff;
      top: 0;
      left: 0;

      li{
        margin-left: 0;
        .link{
          color:#000
        }
      }
    }
    .mobile-nav-enter-active,
    .mobile-nav-leave-active{
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to{
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to{
      transform: translateX(0);
    }
  
  }
}

.scrolled-nav{
  // background-color: rgb(251, 89, 89);
  box-shadow: 0 4x 6px -1px rgba(0,0,0,0.1), 0 4x 6px -1px rgba(0,0,0,0.06);

  nav {
    padding: 8px 0;
    
    .header-logo{
      img{
        width: 60px;
        box-shadow: 0 4x 6px -1px rgba(0,0,0,0.1), 0 4x 6px -1px rgba(0,0,0,0.06);
      }
    }
  }
}
</style>