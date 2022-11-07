<template>
  <q-card class="list-card" bordered>
    <q-inner-loading
      :showing="loading"
      label="Carregando..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <q-card-section>
      <div class="text-h6">Criar cobrança Pix</div>
      <div class="q-pa-md" style="max-width: 650px">
        <q-form
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
import { useQuasar } from "quasar";
import axios from "axios";

export default defineComponent({
  name: "PixCobForm",
  setup() {
    const $q = useQuasar();

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

      async onSubmit() {
        try {
          loading.value = true;
          showForm.value = false;

          const response = await axios.post(
            "https://k5iwoig99f.execute-api.sa-east-1.amazonaws.com/testing/pix/cob",
            {
              cpf: cpfDevedor.value,
              nome: nomeDevedor.value,
              valor: (+valor.value).toFixed(2),
              solicitacaoPagador: solicitacaoPagador.value,
            }
          );

          loading.value = false;
          showForm.value = true;

          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });

          nomeDevedor.value = null;
          cpfDevedor.value = null;
          valor.value = null;
          solicitacaoPagador.value = null;
        } catch (err) {
          console.log(err);
          loading.value = false;
          showForm.value = true;
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Erro na criação da cobrança.",
          });
        }
      },

      onReset() {
        nomeDevedor.value = null;
        cpfDevedor.value = null;
        valor.value = null;
        solicitacaoPagador.value = null;
      },
    };
  },
});
</script>
