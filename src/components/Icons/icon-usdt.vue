<script setup>
import { primeCoinIcon } from '@/components/Images/base64'
</script>
<template>
    <!-- <svg
        aria-hidden="true"
        width="20px"
        height="20px"
        class="za-svg-icon icon-usdt"
    >
        <use xlink:href="#icon-usdt"></use>
    </svg> -->
    <div class="balance">
        <img :src="primeCoinIcon" />
    </div>
</template>
<style scoped lang="scss">
.balance {
    width: 20px;
    height: 20px;
}
</style>