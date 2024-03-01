<template>
  <!--begin::Pagination-->
  <div class="d-flex flex-stack flex-wrap pt-10">
    <div class="fs-6 fw-bold text-gray-700">
      <div v-if="size * getPage() < total">
        Showing {{ size * (getPage() - 1) + 1 }} to {{ size * getPage() }} of
        {{ total }} entries
      </div>
      <div v-else>
        Showing {{ size * (getPage() - 1) + 1 }} to {{ total }} of
        {{ total }} entries
      </div>
    </div>

    <!--begin::Pages-->
    <ul class="pagination">
      <li class="page-item previous">
        <a href="#" class="page-link" v-on:click="nextPage($event, i)"
          ><i class="previous"></i
        ></a>
      </li>

      <!--v-bind:class="{ active: i == getPage() }"-->
      <li
        v-for="i in getPageCount()"
        :key="i"
        class="page-item"
        v-bind:class="{ active: i == getPage() }"
      >
        <a href="#" class="page-link" v-on:click="setPage($event, i)">{{
          i
        }}</a>
      </li>

      <li class="page-item next">
        <a href="#" class="page-link" v-on:click="nextPage($event, i)"
          ><i class="next"></i
        ></a>
      </li>
    </ul>
    <!--end::Pages-->
  </div>
  <!--end::Pagination-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    page: Number,
    size: Number,
    total: Number,
  },
  setup(props, context) {
    console.log("Pagination", props);

    const getPage = () => props.page || 1;

    const getPageCount = () => {
      const total = props.total || 0;
      const size = props.size || 1;
      return Math.ceil(total / size);
    };

    const setPage = (event: Event, page: number) => {
      event.preventDefault();
      updatePage(page);
    };

    const prevPage = (event: Event) => {
      event.preventDefault();
      updatePage(Math.max(1, getPage() - 1));
    };

    const nextPage = (event: Event) => {
      event.preventDefault();
      updatePage(Math.min(getPageCount(), getPage() + 1));
    };

    const updatePage = (page: number) => {
      context.emit("update", page);
    };

    return {
      getPage,
      getPageCount,
      prevPage,
      nextPage,
      setPage,
    };
  },
});
</script>
