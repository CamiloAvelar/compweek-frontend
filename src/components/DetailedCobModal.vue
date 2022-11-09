<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Cobrança criada</div>
      </q-card-section>

      <q-card-section>
        <DetailedCob :cob="cob" :qrCode="qrCode"></DetailedCob>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useDialogPluginComponent } from "quasar";

import DetailedCob from "components/DetailedCob.vue";

export default defineComponent({
  name: "DetailedCobModal",
  components: {
    DetailedCob,
  },
  props: {
    cob: {},
    qrCode: {},
  },

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK();
      },
      onCancelClick: onDialogCancel,
    };
  },
});
</script>
