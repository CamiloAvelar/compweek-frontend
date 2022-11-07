<template>
  <q-expansion-item
    switch-toggle-side
    expand-icon-toggle
    expand-separator
    @show="openItem(txid)"
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
      <q-card-section v-show="showData">
        <ul>
          <li>TxId: {{ item.cob.txid }}</li>
          <li>Chave: {{ item.cob.chave }}</li>
          <li>Solicitação Pagador: {{ item.cob.solicitacaoPagador }}</li>
          <li>Status: {{ item.cob.status }}</li>
          <li>Valor: {{ item.cob.valor.original }}</li>
          <li>
            Devedor:
            <ul>
              <li>Nome: {{ item.cob.devedor.nome }}</li>
              <li>Documento: {{ item.cob.devedor.cpf }}</li>
            </ul>
          </li>
        </ul>

        <img :src="`${item.qrCode.imagemQrcode}`" />
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
import axios from "axios";

export default defineComponent({
  name: "ListItem",
  data() {
    return {
      item: {
        cob: {
          devedor: {},
          valor: {},
        },
        qrCode: {
          imageQrcode: "",
        },
      },
    };
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
    txid: {
      type: String,
      default: "#",
    },
    location: {
      type: String,
      default: "#",
    },
    solicitacaoPagador: {
      type: String,
      default: "#",
    },
    status: {
      type: String,
      default: "#",
    },
    valor: {
      original: {
        type: Number,
        default: 0,
      },
    },
  },
  setup() {
    const loading = ref(false);
    const showData = ref(false);

    return {
      loading,
      showData,
      async openItem(param) {
        try {
          showData.value = false;
          loading.value = true;

          const response = await axios.get(
            `https://k5iwoig99f.execute-api.sa-east-1.amazonaws.com/testing/pix/cob/${param}`
          );

          loading.value = false;
          showData.value = true;

          this.item = response.data;
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
  height: 590px;
}
</style>
