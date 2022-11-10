<template>
  <div id="q-app">
    <div class="q-pa-md row q-gutter-md justify-around">
      <div class="col-3">
        <PixCobForm></PixCobForm>
      </div>
      <div class="col-6">
        <CobPixList></CobPixList>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CobPixList from "components/CobPixList.vue";
import PixCobForm from "components/PixCobForm.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CobPixList,
    PixCobForm,
  },
});
</script>

<style>
.list-card {
  min-width: 288px;
  min-height: 290px;
}
</style>
