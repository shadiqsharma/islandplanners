<template>
    <div class="section" id="carousel">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12">
                    <el-carousel height="500px" >
                        <el-carousel-item class="carousel-item">
                            <img class="d-block" src="img/bghome.png" alt="First slide">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Public Lepak Area</h5>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item class="carousel-item">
                            <img class="d-block" src="img/bghome3.png" alt="Second slide">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Night Life</h5>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item class="carousel-item">
                            <img class="d-block" src="img/bghome2.png" alt="Third slide">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Botaks Area</h5>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
  import { Carousel, CarouselItem } from 'element-ui'

  export default {
    components: {
      [Carousel.name]: Carousel,
      [CarouselItem.name]: CarouselItem
    }
  }
</script>
<style>
</style>
