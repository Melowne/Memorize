<script setup lang="ts">
import { onMounted } from 'vue';
import Memorize from './Memorize';

onMounted(() => {
  Memorize.resetAll();
})
</script>

<template>
  <div class="root">
    <div style="margin-top: 15px; font-size: xx-large;">Memorize</div>
    <div class="row">
      <h3>Fails: {{ Memorize.fails.value }}</h3>
      <h3 style="color:green">Best Run: {{ Memorize.bestRun.value }}</h3>
    </div>
    <div class="container">
      <div class="content">
        <div class="row" v-for="(row, rowIndex) in Memorize.fields.value" :key="rowIndex">
          <div @click="Memorize.checkField(rowIndex, colIndex)" v-for="(field, colIndex) in row" :key="colIndex"
            :class="field.class" class="field"
            :style="`height:${80 / Memorize.fields.value.length}vh;width:${55 / row.length}vw;`">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.root {
  height: 100vh;
  width: 100vw;
  text-align: center;

}

.container {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.content {

  height: 80vh;
  width: 55vw;

}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.field {
  border: solid red 1px;

}

.active {
  background-color: red;
}

.active-clicked {
  background-color: green;
}
</style>
