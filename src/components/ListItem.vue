<template>
  <q-expansion-item
    switch-toggle-side
    expand-icon-toggle
    expand-separator
    @show="openItem(itemId)"
  >
    <template v-slot:header>
      <q-item-section>
        {{ itemDescription }}
      </q-item-section>

      <q-item-section side>
        <div class="row items-center">R$ {{ itemValue }}</div>
      </q-item-section>
    </template>
    <q-separator></q-separator>
    <q-card class="card-example">
      <q-card-section v-if="showData">
        <DetailedCob v-if="type === 'cob'" v-bind="item"></DetailedCob>
        <DetailedPix v-if="type === 'pix'" v-bind="item"></DetailedPix>
      </q-card-section>
      <q-inner-loading
        :showing="loading"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card>
  </q-expansion-item>
</template>

<script>
import { defineComponent, ref } from "vue";
import DetailedCob from "components/DetailedCob.vue";
import DetailedPix from "components/DetailedPix.vue";

export default defineComponent({
  name: "ListItem",
  components: {
    DetailedCob,
    DetailedPix,
  },
  props: {
    itemValue: {
      type: String,
      default: "#",
    },
    itemDescription: {
      type: String,
      default: "#",
    },
    itemId: {
      type: String,
      default: "#",
    },
    type: {
      type: String,
      default: "#",
    },
  },
  setup(props) {
    const loading = ref(false);
    const showData = ref(false);
    const item = ref(null);

    return {
      loading,
      showData,
      item,
      async openItem(param) {
        try {
          showData.value = false;
          loading.value = true;
          if (props.type === "cob") {
            var response = await this.$axios.get(
              `/pix/cob/${param}`
            );
          } else if (props.type === "pix") {
            var response = await this.$axios.get(
              `/pix/received/${param}`
            );
          }

          loading.value = false;
          showData.value = true;

          item.value = response.data;
        } catch (err) {
          console.log(err);
        }
      },
    };
  },
});
</script>

<style scoped>
.card-example {
  max-width: 650px;
  min-height: 190px;
}
</style>
