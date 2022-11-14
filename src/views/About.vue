<template>
    <section class="about-page">
        <NavBar
        />
        <!-- @togglePartySlots="togglePartySlots"
        @spliceFromParty="spliceFromParty"
        :imageUrl="imageUrl" -->
    
        <!-- <div class="wall-img-container">

        </div> -->
        <div class="about-page-container">
            <div class="my-profile-card">
                <div class="card-header">
                    <div class="my-pic">
                        <img src="@/assets/my-profile.png" alt="">
                    </div>
                    <div class="name">Paz Balter</div>
                    <div class="desc">Fullstack Developer</div>
                    <div class="sm">
                        <a href="#" class="fab fa-facebook"></a>
                        <a href="#" class="fab fa-instergram"></a>
                        <a href="#" class="fab fa-github"></a>
                        <a href="#" class="fab fa-linkdin"></a>
                    </div>
                    <a href="#" class="contact-btn">Contact Me</a>
                </div>
                <div class="card-footer">
                    <div class="numbers"></div>
                </div>
            </div>
        </div>

    </section>

</template>
<script>
import NavBar from '@/components/nav-bar.vue'
export default {
  name: 'HomeView',
  components: {
    NavBar, 
  },
  data:() => {
    return{
      imageUrl :'',
      apiUrl:'',
      pokemonUrl: '',
      showDetail: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.about-page{
    box-sizing: border-box;
    height: 100vh;
    .about-page-contaner{
        display: flex;
        align-items: center;
        justify-content: center;
        .my-pic{
            height: 20px;
        }
        .my-profile-card{
            width: 400px;
            text-align: center;
            border-radius: 8px;
        }
        .wall-img-container{
            width: 100%;
            height: 200px;
            object-fit:fill;
            // background-image: url(@/assets/wall-img.png);
        }
    }
}
</style>


