<template>
   <div id="loadingBox">
      <div class="dots">
         <div></div>
         <div></div>
         <div></div>
      </div>
   </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
@mixin size($w, $h:$w) {
   width: $w;
   height: $h;
}

#loadingBox {
   position: fixed;
   left: 0;
   top: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   @include size(100%);
   background-color: rgba(black, 0.5);
   color: white;
   z-index: 1000000000;
   >.dots {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: row nowrap;
      >div {
         @include size(20px);
         margin-right: 15px;
         border-radius: 50%;
         background-color: #fff;
         animation: fade 0.8s ease-in-out alternate infinite;
         &:nth-child(1) {
            animation-delay: -0.4s;
         }
         &:nth-child(2) {
            animation-delay: -0.2s;
         }
      }
   }
}

@keyframes fade {
   from {
      opacity: 1;
   }
   to {
      opacity: 0;
   }
}

</style>
