<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const common = inject("common");

const router = useRouter();

const hostname = window.location.hostname;

const init = async () => {
  common.loading = true;
  let form = {
    gp_code: router.currentRoute.value.query.code,
    back_url: hostname,
  };
  try {
    const res = await common.baseAjax(
      "POST",
      router.currentRoute.value.query.url,
      form
    );
    if (res.code == 1) {
      location.href = res.data.login_url;
    } else {
      common.loading = false;
      common.alert("fail", res.msg);
      setTimeout(() => {
        window.close();
      },1500)
    }
  } catch (error) {
    console.log(error);
  }
};

init();
</script>

<template>
  <div></div>
</template>
