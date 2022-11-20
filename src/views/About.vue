<template>
    <section class="about-page">
        <NavBar 
        :imageUrl="imageUrl" 
        />
      
        <div class="about-page-container">
            <div class="card-shell">
                <div class="top-card-background">
                    <div class="top-dark-bg"></div>
                </div>
                <div class="my-profile-card">
                    <div class="card-header">
                        <div class="my-pic">
                            <img src="@/assets/my-profile-face2.png" alt="">
                        </div>
                        <div class="my-name">Paz Balter</div>
                        <div class="desc">Fullstack Developer</div>
                        <div class="sm">
                            <!-- <a href="https://www.facebook.com/paz.balter" class="fab fa-facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 96.124 96.123" style="enable-background:new 0 0 96.124 96.123;" xml:space="preserve">
                                    <g>
                                        <path d="M72.089,0.02L59.624,0C45.62,0,36.57,9.285,36.57,23.656v10.907H24.037c-1.083,0-1.96,0.878-1.96,1.961v15.803   c0,1.083,0.878,1.96,1.96,1.96h12.533v39.876c0,1.083,0.877,1.96,1.96,1.96h16.352c1.083,0,1.96-0.878,1.96-1.96V54.287h14.654   c1.083,0,1.96-0.877,1.96-1.96l0.006-15.803c0-0.52-0.207-1.018-0.574-1.386c-0.367-0.368-0.867-0.575-1.387-0.575H56.842v-9.246   c0-4.444,1.059-6.7,6.848-6.7l8.397-0.003c1.082,0,1.959-0.878,1.959-1.96V1.98C74.046,0.899,73.17,0.022,72.089,0.02z"/>
                                    </g>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/paz_balter" class="fab fa-instergram">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 169.063 169.063" style="enable-background:new 0 0 169.063 169.063;" xml:space="preserve">
                                    <g>
                                        <path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752   c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407   c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752   c17.455,0,31.656,14.201,31.656,31.655V122.407z"/>
                                        <path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561   C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561   c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"/>
                                        <path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78   c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78   C135.661,29.421,132.821,28.251,129.921,28.251z"/>
                                    </g>
                                </svg>
                            </a> -->
                            <a href="https://github.com/PazBalter" class="fab fa-github">
                                <svg height="30" color="#f2f2f2" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="30" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
                                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/paz-balter" class="fab fa-linkdin">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="30" height="30" focusable="false">
                                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                                </svg>
                            </a>
                        </div>
                        
                        <a href="mailto:pazbalterpb@gmail.com" class="contact-btn">Contact Me 
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="28" height="28" viewBox="0 0 256 256" xml:space="preserve">
                                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;  opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                    <path d="M 86.17 11.255 H 3.83 c -2.115 0 -3.83 1.715 -3.83 3.83 v 59.83 c 0 2.115 1.715 3.83 3.83 3.83 h 82.34 c 2.115 0 3.83 -1.715 3.83 -3.83 v -59.83 C 90 12.97 88.285 11.255 86.17 11.255 z M 84.55 69.598 c 0 1.739 -1.498 3.149 -3.346 3.149 h -3.792 V 26.717 L 45.016 54.692 L 12.843 26.91 v 45.836 H 9.051 c -1.848 0 -3.346 -1.41 -3.346 -3.149 V 20.403 c 0 -1.739 1.498 -3.149 3.346 -3.149 h 1.535 h 2.209 h 0.048 v 0.041 l 32.173 27.782 l 32.221 -27.823 h 2.209 l 0 0 h 1.757 c 1.848 0 3.346 1.41 3.346 3.149 V 69.598 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;   opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <!-- <div class="few-words">
                Hello and welcome to my app
            </div> -->
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
  data() {
    return{
      apiUrl:'',
      pokemonUrl: '',
      showDetail: false,
    }
  },
  computed:{
    imageUrl(){
        return this.$store.getters.getPokeImageUrl;
    },
  }
 
  
}
</script>
<style lang="scss" scoped>
.about-page{
   
    box-sizing: border-box;
    height: 100vh;
    text-decoration: none;
 
    .about-page-container{
       margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        .card-shell{
            padding: 5px;
            background: #f2f2f2;
            // background: #2c3a47;
            border: 3px solid #2c3a47;
            border-radius: 8px;
            // border-top-left-radius: 100%;
        }
        // .top-card-background{
        //     height: 20px;
        //     background: #2c3a47;
        //     display: flex;
        //     border-top-right-radius: 8px;
          
            
        //     .top-dark-bg{
        //         height: 100%;
        //         width: 40%;
        //         background: #f2f2f2;
        //         border-radius: 0px 0px 100% 0px;
        //     }
        // }
        .my-profile-card{
            
            width: 400px;
            text-align: center;
            border-radius: 8px;
            
            overflow: hidden;

            .card-header{
                background: #2c3a47;
                padding: 40px 60px;

               .my-name{
                        color: #f2f2f2;
                        font-size: 29px;
                        font-weight:600;
                        margin: 10px 0;
                }
                .desc{
                    font-size: 18px;
                    color: #e66767;
                }
                .sm{
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    margin:20px 0;
                    a{
                        svg{
                            fill:#f2f2f2;
                            transition: .2s linear;
                            &:hover{
                                fill: #e66767;
                            }
                        }
                        text-decoration: none;
                      
                        width: 56px;
                        transition: .2s linear;
                        &:hover{
                            color: #e66767;
                        }
                    }
                }
                .contact-btn{
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    align-items: center;
                    padding: 12px 50px;
                    color: #e66767;
                    border: 2px solid #e66767;
                    border-radius: 6px;
                    margin-top: 16px;
                    transition: .2s linear;
                    svg{
                        margin-left:5px;
                        transition: .2s linear;
                        fill:#e66767;
                    }
                    &:hover{
                        background: #e66767;
                        color: #f2f2f2;
                        svg{

                            fill:#f2f2f2;
                        }
                    }
                }
                .my-pic{
                    display: inline-block;
                    padding: 8px;
                    background: linear-gradient(130deg,#74b9ff,#e66767);
                    background-size: 200% 200%;
                    border-radius: 50%;
                    animation: animated-gradient 7s linear infinite;
                    img{
                        display: block;
                        width: 180px;
                        height: 180px;
                        border-radius: 50%;
                    }
                 
                    @keyframes animated-gradient {
                        25%{
                            background-position: left bottom;
                        }
                        50%{
                            background-position: right bottom;
                        }
                        75%{
                            background-position: right top;
                        }
                        100%{
                            background-position: left top;
                        }
                    }
                }
            }
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


