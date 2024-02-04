<script setup lang="ts">
import { ref, computed, onUnmounted, watchEffect } from 'vue';

const checkoutValue$ = ref(1);
const queues$ = ref([[1, 2, 3], [4, 5], [6], []]);
const queueWithleastItems$ = computed(() => {
  const itemsInQueues = queues$.value.map((queue) => queue.reduce((acc, curr) => acc + curr, 0));
  const leastItemsIdx = Math.min(...itemsInQueues);
  return itemsInQueues.indexOf(leastItemsIdx);
});

const onSubmit = () => {
  queues$.value[queueWithleastItems$.value].push(checkoutValue$.value);
};
const reduceItemsInterval = setInterval(() => {
  queues$.value = queues$.value.map((queue) => {
    return --queue[0] ? queue : queue.slice(1);
  });
}, 2000);

watchEffect(() => {
  queues$.value = queues$.value.map((queue, i) => {
    const random = Math.floor(1 + Math.random() * 7);
    if (!queue.length) {
      queue.push(...Array.from({ length: random }, () => Math.floor(1 + Math.random() * 7)));
    }
    return queue;
  });
});

onUnmounted(() => clearInterval(reduceItemsInterval));
</script>

<template>
  <div class="flex flex-col justify-center items-center my-24">
    <form @submit.prevent="onSubmit">
      <div class="flex gap-2 justify-center items-center">
        <input
          type="number"
          min="1"
          class="outline text-xl rounded-md h-10 pl-2"
          v-model="checkoutValue$"
        />
        <button
          :disabled="!checkoutValue$"
          class="p-2.5 outline-none bg-indigo-500 text-white hover:bg-indigo-700 rounded-md"
        >
          Checkout
        </button>
      </div>
    </form>
    <div class="flex gap-2 mt-12">
      <div v-for="(queue, queueIdx) in queues$" :key="queueIdx">
        <p
          class="w-12 h-12 border border-indigo-500 flex justify-center items-center mb-2"
          :class="[queueIdx === queueWithleastItems$ && 'bg-green-400']"
        >
          {{ queueIdx + 1 }}
        </p>
        <div
          class="flex flex-col justify-center items-center"
          v-for="(item, itemIdx) in queue"
          :key="itemIdx"
        >
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
