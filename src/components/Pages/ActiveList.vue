<script setup>
import { reactive, inject } from "vue";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import ActiveList_sec from "@/components/Blocks/ActiveList_sec.vue"

const common = inject("common")

</script>


<template>
  <div class="activelist-wrapper">
    <HeaderCross text="公告" />
    <ActiveList_sec />
  </div>
</template>


