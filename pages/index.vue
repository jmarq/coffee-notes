<template>
  <div class="container">
    <!-- <h1 class="title">coffee-notes</h1> -->
    <!-- <section class="header-image">
        <img
          class="kangaroos"
          src="https://www.darbypop.com/wp-content/uploads/2020/06/Darby-Bites-99-copy.png"
          alt="a hot cup of joseph"
          loading="lazy"
        />
      </section> -->
    <latest-batch></latest-batch>
    <batch-list :created-batch="createdBatch"></batch-list>
  </div>
</template>

<script>
import LatestBatch from '@/components/LatestBatch.vue';
import BatchList from '@/components/BatchList.vue';
export default {
  components: { LatestBatch, BatchList },
  computed: {
    createdBatch() {
      console.log(this.$route);
      return this.$route.query.newId;
    },
  },
};
</script>
