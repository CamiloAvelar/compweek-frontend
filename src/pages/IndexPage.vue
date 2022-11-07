<template>
  <div id="q-app" style="min-height: 900vh">
    <div class="q-pa-md row q-gutter-md" style="max-width: 650px">
      <CobPixList></CobPixList>
      <PixCobForm></PixCobForm>
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
