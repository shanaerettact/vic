<script setup>
import { reactive, inject } from "vue";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import PromotionList_sec from "@/components/Blocks/PromotionList_sec.vue"

const common = inject("common")

</script>


<template>
  <div class="activelist-wrapper">
    <HeaderCross text="優惠" />
    <PromotionList_sec />
  </div>
</template>


