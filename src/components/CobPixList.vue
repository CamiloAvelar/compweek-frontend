<template>
  <q-card class="relative-position list-card" bordered>
    <q-btn-toggle v-model="listType" spread class="list-toggle" no-caps rounded unelevated toggle-color="primary"
      color="white" text-color="primary" :options="[
        { label: 'Cobranças', value: 'cobs' },
        { label: 'Pix', value: 'pix' },
      ]" />

    <div class="q-pa-md">
      <div class="q-gutter-md row items-start justify-center">
        <span style="align-self: center">De</span>
        <q-input dense v-model="date.from">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date" mask="YYYY-MM-DD HH:mm:ss" range no-unset>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <span style="align-self: center">até</span>
        <q-input dense v-model="date.to">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date" mask="YYYY-MM-DD HH:mm:ss" range no-unset>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn color="white" text-color="gray" round icon="refresh" @click="reload" class="self-end">
          <q-tooltip>Recarregar</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-inner-loading :showing="loading" label="Carregando..." label-class="text-teal" label-style="font-size: 1.1em" />
    <q-list>
      <ListItem v-show="showList" v-for="item in items" v-bind:key="item.itemId" v-bind="item"></ListItem>
    </q-list>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import ListItem from "components/ListItem.vue";
let items = ref([]);

export default defineComponent({
  name: "CobPixList",
  components: {
    ListItem,
  },
  data() {
    const now = new Date();
    const from = this.formatDate(this.subtractMonths(now, 5));
    const to = this.formatDate(now);

    return {
      items: [],
      listType: "cobs",
      loading: true,
      showList: false,
      date: {
        from,
        to,
      },
    };
  },
  watch: {
    listType: {
      async handler() {
        this.loading = true;
        this.showList = false;

        await this.loadList();
      },
      immediate: true,
    },
    date: {
      async handler(newDate) {
        function dateIsValid(date) {
          return date instanceof Date && !isNaN(date);
        }

        if (
          dateIsValid(new Date(newDate.from)) &&
          dateIsValid(new Date(newDate.to))
        ) {
          this.loading = true;
          this.showList = false;
          await this.loadList();
        }
      },
      deep: true,
    },
  },
  methods: {
    subtractMonths(date, months) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - months);
      return newDate;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")} ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;
    },
    async reload() {
      this.loading = true;
      this.showList = false;

      const now = new Date();
      this.date = {
        from: this.formatDate(this.subtractMonths(now, 5)),
        to: this.formatDate(now),
      };
    },
    async loadList() {
      if (this.listType === "cobs") {
        await this.getCobs();
      } else if (this.listType === "pix") {
        await this.getPix();
      }
    },
    async getCobs() {
      try {
        const response = await this.$axios.get(
          "/pix/list/cob",
          {
            params: {
              inicio: new Date(this.date.from).toISOString(),
              fim: new Date(this.date.to).toISOString(),
            },
          }
        );

        this.items = response.data.cobs?.map((cob) => {
          return {
            itemDescription: cob.solicitacaoPagador,
            itemValue: cob.valor.original,
            itemId: cob.txid,
            itemStatus: cob.status,
            type: "cob",
            ...cob,
          };
        });

        this.loading = false;
        this.showList = true;
      } catch (err) {
        console.log(err);
      }
    },
    async getPix() {
      try {
        const response = await this.$axios.get(
          "/pix/list/received",
          {
            params: {
              inicio: new Date(this.date.from).toISOString(),
              fim: new Date(this.date.to).toISOString(),
            },
          }
        );

        this.items = response.data.pix?.map((pix) => {
          return {
            itemDescription: `${pix.endToEndId} ${pix.infoPagador ? ` - ${pix.infoPagador}` : ""
              }`,
            itemValue: pix.valor,
            itemId: pix.endToEndId,
            itemStatus: pix.devolucoes?.length > 0 ? "DEVOLVIDO" : "RECEBIDO",
            type: "pix",
            ...pix,
          };
        });
        this.loading = false;
        this.showList = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style>
.list-toggle {
  border: 1px solid #fab26e;
}
</style>
