<template>
  <q-card class="list-card" bordered>
    <q-inner-loading
      :showing="loading"
      label="Criando cobrança..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <q-card-section>
      <div class="text-h6">Criar cobrança Pix</div>
      <div class="q-pa-md" style="max-width: 650px">
        <q-form
          ref="form"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          v-show="showForm"
        >
          <q-input
            filled
            v-model="nomeDevedor"
            label="Nome devedor *"
            hint="Nome do devedor"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, digite algo.',
            ]"
          />

          <q-input
            filled
            v-model="cpfDevedor"
            label="CPF devedor *"
            hint="CPF do devedor"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Por favor, digite o CPF.',
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="valor"
            label="Valor da cobrança *"
            hint="Valor"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val > 0) || 'Por favor, digite o Valor.',
            ]"
          />

          <q-input
            filled
            v-model="solicitacaoPagador"
            label="Solicitação ao Pagador *"
            hint="Solicitação ao Pagador"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor, digite a Solicitação.',
            ]"
          />

          <div>
            <q-btn label="Criar" type="submit" color="primary" />
            <q-btn
              label="Resetar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import DetailedCobModal from "components/DetailedCobModal.vue";

export default defineComponent({
  name: "PixCobForm",
  methods: {
    async onSubmit() {
        try {
          this.loading = true;
          this.showForm = false;

          const createdResponse = await this.$axios.post(
            "/pix/cob",
            {
              cpf: this.cpfDevedor,
              nome: this.nomeDevedor,
              valor: (+this.valor).toFixed(2),
              solicitacaoPagador: this.solicitacaoPagador,
            }
          );

          const cobResponse = await this.$axios.get(
            `/pix/cob/${createdResponse.data.txid}`
          );

          this.loading = false;
          this.showForm = true;

          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Cobrança criada com sucesso.",
          });

          this.$q.dialog({
            component: DetailedCobModal,
            componentProps: cobResponse.data,
          })
            .onOk(() => {
              console.log("OK");
            })
            .onCancel(() => {
              console.log("Cancel");
            })
            .onDismiss(() => {
              console.log("Called on OK or Cancel");
            });

        } catch (err) {
          console.log(err);
          this.loading = false;
          this.showForm = true;
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Erro na criação da cobrança.",
          });
        }
      },
    onReset() {
      this.nomeDevedor = null;
      this.cpfDevedor = null;
      this.valor = null;
      this.solicitacaoPagador = null;
    },
  },
  data() {
    const nomeDevedor = ref(null);
    const cpfDevedor = ref(null);
    const valor = ref(null);
    const solicitacaoPagador = ref(null);
    const loading = ref(false);
    const showForm = ref(true);

    return {
      nomeDevedor,
      cpfDevedor,
      valor,
      solicitacaoPagador,
      loading,
      showForm,
    };
  },
});
</script>
