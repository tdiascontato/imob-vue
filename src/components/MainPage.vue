<!--src/components/MainPage.vue-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/components/models/navbar/Header.vue';
import Menu from '@/components/actions/Menu.vue';
import Mall from '@/components/Mall.vue'

const isLoggedIn = ref(false);
const isModalVisible = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const updateModalState = () => {
  isModalVisible.value = JSON.parse(localStorage.getItem('menuModal') || 'false');
};

onMounted(() => {
  checkLoginStatus();
  updateModalState();
  window.addEventListener('storage', checkLoginStatus);
  window.addEventListener('toggle-modal', updateModalState);
});
onUnmounted(() => {
  window.removeEventListener('storage', updateModalState);
  window.removeEventListener('toggle-modal', updateModalState);
});
</script>

<template>
  <main class="container">
    <Header />
    <div class="content-wrapper">
      <Menu v-if="isModalVisible" />
      <!--      Componente show     -->
      <Mall v-if="!isModalVisible" :class="{ blur: isModalVisible }" />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1800' height='700' preserveAspectRatio='none' viewBox='0 0 1800 700'%3e%3cg clip-path='url(%26quot%3b%23SvgjsClipPath1344%26quot%3b)' fill='none'%3e%3ccircle r='17.965' cx='458.95' cy='618.58' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3ccircle r='24.465' cx='400.09' cy='416.28' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='49.63' cx='223.87' cy='577.72' fill='url(%26quot%3b%23SvgjsLinearGradient1345%26quot%3b)'%3e%3c/circle%3e%3ccircle r='36.565' cx='1782.72' cy='565.72' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='28.47' cx='763.75' cy='574.09' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='65.72' cx='743.02' cy='564.04' fill='url(%26quot%3b%23SvgjsLinearGradient1346%26quot%3b)'%3e%3c/circle%3e%3ccircle r='68.685' cx='530.85' cy='512.66' fill='rgba(245%2c 119%2c 50%2c 1)'%3e%3c/circle%3e%3ccircle r='68.725' cx='770.72' cy='474' fill='url(%26quot%3b%23SvgjsLinearGradient1347%26quot%3b)'%3e%3c/circle%3e%3ccircle r='55.1' cx='1394.61' cy='624.18' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3ccircle r='23.44' cx='914.7' cy='545.7' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3ccircle r='41.03' cx='169.95' cy='379.89' fill='url(%26quot%3b%23SvgjsLinearGradient1348%26quot%3b)'%3e%3c/circle%3e%3ccircle r='62.845' cx='1658.12' cy='384.87' fill='rgba(249%2c 200%2c 173%2c 1)'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cclipPath id='SvgjsClipPath1344'%3e%3crect width='1800' height='700' x='0' y='0'%3e%3c/rect%3e%3c/clipPath%3e%3clinearGradient x1='124.61' y1='577.72' x2='323.13' y2='577.72' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1345'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='611.5799999999999' y1='564.04' x2='874.4599999999999' y2='564.04' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1346'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='633.27' y1='474' x2='908.17' y2='474' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1347'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='87.88999999999999' y1='379.89' x2='252.01' y2='379.89' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1348'%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(245%2c 119%2c 50%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");

}
.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
