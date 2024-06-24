<template>
  <div class="hello">
    <div>
      <h3>当前第 {{ index + 1 }} 张</h3>
      <p>
        <img :src="images[index]" alt="">
      </p>
      <a-input v-model:value="value" @keyup.enter="submit" placeholder="验证码" style="width: 200px;" maxlength="4" />
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <div v-if="index > 0">
      <h2>上一次结果</h2>
      <p>
        <img :src="images[index - 1]" alt="">
      </p>
      <p>result: {{ getResult(images[index - 1]) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const images = ref([]);
const index = ref(124);
const value = ref('');
const result = ref({});

axios.get('/api/').then(res => {
  images.value = [...res.data];
});

const getResult = (imagePath) => {
  const imageName = imagePath.split('/').pop();
  return result.value[imageName] || '';
};

const submit = () => {
  if(String(value.value).length === 4) {
    const imageName = images.value[index.value].split('/').pop();
    result.value[imageName] = value.value;
    index.value++;
    value.value = '';
    localStorage.setItem("index", JSON.stringify(index.value));
    localStorage.setItem("result", JSON.stringify(result.value));
  }
};

onMounted(() => {
  index.value = JSON.parse(localStorage.getItem("index")) || 124
  result.value = JSON.parse(localStorage.getItem("result")) || {};
})
</script>
