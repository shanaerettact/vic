<script setup>
import { inject, reactive, computed } from 'vue'
import VIP1_001 from "@/assets/img/HeadShot-VIP1/VIP1-001.png"
import VIP1_002 from "@/assets/img/HeadShot-VIP1/VIP1-002.png"
import VIP1_003 from "@/assets/img/HeadShot-VIP1/VIP1-003.png"
import VIP1_004 from "@/assets/img/HeadShot-VIP1/VIP1-004.png"
import VIP1_005 from "@/assets/img/HeadShot-VIP1/VIP1-005.png"

import VIP2_001 from "@/assets/img/HeadShot-VIP2/VIP2-001.png"
import VIP2_002 from "@/assets/img/HeadShot-VIP2/VIP2-002.png"
import VIP2_003 from "@/assets/img/HeadShot-VIP2/VIP2-003.png"
import VIP2_004 from "@/assets/img/HeadShot-VIP2/VIP2-004.png"
import VIP2_005 from "@/assets/img/HeadShot-VIP2/VIP2-005.png"

import VIP3_001 from "@/assets/img/HeadShot-VIP3/VIP3-001.png"
import VIP3_002 from "@/assets/img/HeadShot-VIP3/VIP3-002.png"
import VIP3_003 from "@/assets/img/HeadShot-VIP3/VIP3-003.png"
import VIP3_004 from "@/assets/img/HeadShot-VIP3/VIP3-004.png"
import VIP3_005 from "@/assets/img/HeadShot-VIP3/VIP3-005.png"

import VIP4_001 from "@/assets/img/HeadShot-VIP4/VIP4-001.png"
import VIP4_002 from "@/assets/img/HeadShot-VIP4/VIP4-002.png"
import VIP4_003 from "@/assets/img/HeadShot-VIP4/VIP4-003.png"
import VIP4_004 from "@/assets/img/HeadShot-VIP4/VIP4-004.png"
import VIP4_005 from "@/assets/img/HeadShot-VIP4/VIP4-005.png"

import VIP5_001 from "@/assets/img/HeadShot-VIP5/VIP5-001.png"
import VIP5_002 from "@/assets/img/HeadShot-VIP5/VIP5-002.png"
import VIP5_003 from "@/assets/img/HeadShot-VIP5/VIP5-003.png"
import VIP5_004 from "@/assets/img/HeadShot-VIP5/VIP5-004.png"
import VIP5_005 from "@/assets/img/HeadShot-VIP5/VIP5-005.png"

import VIP6_001 from "@/assets/img/HeadShot-VIP6/VIP6-001.png"
import VIP6_002 from "@/assets/img/HeadShot-VIP6/VIP6-002.png"
import VIP6_003 from "@/assets/img/HeadShot-VIP6/VIP6-003.png"
import VIP6_004 from "@/assets/img/HeadShot-VIP6/VIP6-004.png"
import VIP6_005 from "@/assets/img/HeadShot-VIP6/VIP6-005.png"

const common = inject("common")

const state = reactive({
  
})

const props = defineProps({
  level: Number,    // VIP number
  userId: Number,   // user id
})

const imageMap = {
  VIP1_001, VIP1_002, VIP1_003, VIP1_004, VIP1_005,
  VIP2_001, VIP2_002, VIP2_003, VIP2_004, VIP2_005,
  VIP3_001, VIP3_002, VIP3_003, VIP3_004, VIP3_005,
  VIP4_001, VIP4_002, VIP4_003, VIP4_004, VIP4_005,
  VIP5_001, VIP5_002, VIP5_003, VIP5_004, VIP5_005,
  VIP6_001, VIP6_002, VIP6_003, VIP6_004, VIP6_005,
}

const currentImage = computed(() => {
  let order = props.userId % 5    
  if(order == 0) order++  
  const key = `VIP${props.level}_00${order}`
  return imageMap[key]
})

</script>


<template>
  <img :src="currentImage" />
</template>

<style lang="scss" scoped>
img {
  border-radius: 50%;
}
</style>