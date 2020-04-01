<template>
<input 
   type="text" 
   class="form-control" 
   placeholder="輸入藥局名稱"
   @input="inputHandler"
   :value="keyword">
</template>

<script>
import { mapMutations } from 'vuex';
export default {
   props: {
      text: {
         type: String,
         required: true
      }
   },
   computed: {
      keyword: {
         get() {
            return this.text;
         },
         set(val) {
            this.$emit('update:text', val);
         }
      }
   },
   methods: {
      inputHandler(evt) {
         this.keyword = evt.target.value;
      }
   }
}
</script>

<style lang="scss">

</style>