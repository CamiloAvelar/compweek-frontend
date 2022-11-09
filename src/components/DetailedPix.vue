<template>
  <q-card flat>
    <q-card-section align="left">
      <q-list dense>
        <q-item>
          <q-item-section>
            <q-item-label>Chave</q-item-label>
            <q-item-label caption lines="1">{{ chave }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Info Pagador</q-item-label>
            <q-item-label caption lines="1">{{ infoPagador }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>EndToEndId</q-item-label>
            <q-item-label caption lines="1">{{ endToEndId }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Valor</q-item-label>
            <q-item-label caption lines="1">{{ valor }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Horário</q-item-label>
            <q-item-label caption lines="1">{{ horario }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DetailedPix",
  props: {
    chave: {
      type: String,
      default: "",
    },
    infoPagador: {
      type: String,
      default: "",
    },
    endToEndId: {
      type: String,
      default: "",
    },
    valor: {
      type: String,
      default: "",
    },
    horario: {
      type: String,
      default: "",
    },
  },
});
</script>
