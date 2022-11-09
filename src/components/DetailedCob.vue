<template>
  <q-card flat>
    <q-card-section align="left">
      <q-list dense>
        <q-item>
          <q-item-section>
            <q-item-label>TxId</q-item-label>
            <q-item-label caption lines="1">{{ cob.txid }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Chave</q-item-label>
            <q-item-label caption lines="1">{{ cob.chave }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Solicitação Pagador</q-item-label>
            <q-item-label caption lines="1">{{
                cob.solicitacaoPagador
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Data criação</q-item-label>
            <q-item-label caption lines="1">{{
                cob.calendario.criacao
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Status</q-item-label>
            <q-item-label caption lines="1">{{ cob.status }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Valor</q-item-label>
            <q-item-label caption lines="1">R$ {{ cob.valor.original }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Devedor</q-item-label>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Nome</q-item-label>
                  <q-item-label caption lines="1">{{
                      cob.devedor.nome
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Documento</q-item-label>
                  <q-item-label caption lines="1">{{
                      cob.devedor.cpf
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />
      </q-list>
    </q-card-section>

    <q-card-section align="center">
      <img :src="`${qrCode.imagemQrcode}`" />
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent, } from "vue";

export default defineComponent({
  name: "DetailedCob",
  props: {
    cob: {},
    qrCode: {},
  },
});
</script>
