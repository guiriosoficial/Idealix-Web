<template>
  <div class="dashboard-view">
    <div class="dashboard-view__main-cards">
      <v-card class="dashboard-view__details-card">
        <UserAvatar
          :name="currentChild.name"
          icon="person"
          :picture="currentChild.picture"
          size="md-large"
          class="dashboard-view__details-icon" />
        <div class="dashboard-view__details-text">
          <h2>{{ currentChildMasked.name }}</h2>
          <div>{{ currentChildMasked.age }} - {{ currentChildMasked.gender }}</div>
        </div>
      </v-card>

      <v-card class="dashboard-view__details-card">
        <UserAvatar
          icon="favorite"
          size="md-large"
          class="dashboard-view__details-icon"/>
        <div class="dashboard-view__details-text">
          <h2>Status Atual</h2>
          <div>{{ currentChildMasked.status }}</div>
        </div>
      </v-card>

      <v-card class="dashboard-view__details-card">
        <UserAvatar
          icon="bubble_chart"
          size="md-large"
          class="dashboard-view__details-icon"/>
        <div class="dashboard-view__details-text">
          <h2>Último marco ({{ currentChildMasked.measurementDate }})</h2>
          <div>{{ currentChildMasked.height }} - {{ currentChildMasked.weight }} ({{ currentChildMasked.imc }})</div>
        </div>
      </v-card>
    </div>

    <v-card class="dashboard-view__chart elevation">
      <v-empty-state
        v-if="!childsList.length || routerIdParam === 'home' || !currentChild.historic.length"
        :title="emptyStateData.label"
        :text="emptyStateData.description"
        :icon="emptyStateData.icon"
        :class="emptyStateData.class"
        class="dashboard-view__empty-state">
        <v-btn
          v-if="emptyStateData.showButton"
          class="md-primary md-raised"
          @click="emptyStateData.buttonAction === 'updateAddChildDialogVisibel' ? updateAddChildDialogVisibel(true) : updateAddPointDialogVisibel(true)">
          {{ emptyStateData.buttonText }}
        </v-btn>
      </v-empty-state>

      <HistoryChart
        v-else
        class="dashboard-view__history-chart"
        :current-historic="currentChild.historic"
        :styles="chartStyles"
      />
    </v-card>
  </div>
</template>

<script>
import HistoryChart from '@/components/HistoryChart.vue'
import { mapState, mapActions } from 'pinia'
import { useHistoricStore } from '@/store/historic'
import { useChildsStore } from '@/store/childs'
import { useAppStore } from '@/store'

export default {
  name: 'DashboardView',
  components: { HistoryChart },

  computed: {
    ...mapState(useHistoricStore, ['currentChild']),
    ...mapState(useChildsStore, { childsList: 'getChildsList' }),

    currentChildMasked () {
      const { name, age, gender, status, height, weight, imc, measurementDate } = this.currentChild
      if (!this.currentChild.id) return {} // Early return para evitar erros de undefined

      return {
        name: name || '-',
        age: age >= 12 ? `${~~(age / 12)} ${~~(age / 12) === 1 ? 'Ano' : 'Anos'} e ${age % 12} ${(age % 12) === 1 ? 'Mês' : 'Meses'}` : `${age || 0} Meses`,
        gender: gender === 'm' ? 'Menino' : gender === 'f' ? 'Menina' : 'Menino(a)',
        status: status || '-',
        measurementDate: measurementDate ? new Date(measurementDate).toLocaleDateString('pt-BR') : '-',
        height: `${height || '0,00'}m`.replace('.', ','),
        weight: `${weight || '0,00'}Kg`.replace('.', ','),
        imc: `IMC: ${imc || '0,00'}`.replace('.', ',')
      }
    },

    routerIdParam () { return this.$route.params.id },

    emptyStateData () {
      if (!this.childsList.length) {
        return {
          icon: 'person_add', label: 'Adicione uma criança',
          description: 'Ops, parece que você ainda não adicionou ninguém por aqui.',
          buttonText: 'Adicionar criança',
          buttonAction: 'updateAddChildDialogVisibel',
          showButton: true
        }
      } else if (this.routerIdParam === 'home') {
        return {
          icon: 'child_care',
          label: 'Bem vindo!',
          description: 'Selecione uma criança para ver seus dados.',
          showButton: false,
          class: 'md-primary'
        }
      } else if (this.currentChild && !this.currentChild.historic?.length && this.childsList.map(c => c.id).includes(this.routerIdParam)) {
        return {
          icon: 'outlined_flag',
          label: 'Adicione o primeiro marco',
          description: 'Esta criança ainda não possui nenhuma medição.',
          buttonText: 'Adicionar primeiro marco',
          buttonAction: 'updateAddPointDialogVisibel',
          showButton: true
        }
      }
      return { icon: 'cancel_presentation', label: 'Ops!', description: 'Erro ao carregar dados.', showButton: false }
    }
  },

  watch: {
    routerIdParam (currentId) {
      this.handleGetCurrentChild(currentId)
    }
  },

  beforeMount () {
    this.handleGetCurrentChild(this.routerIdParam)
  },

  methods: {
    ...mapActions(useHistoricStore, ['getCurrentChild']),
    ...mapActions(useAppStore, {
      updateAddChildDialogVisibel: 'toggleAddChildDialog',
      updateAddPointDialogVisibel: 'toggleAddPointDialog'
    }),

    handleGetCurrentChild (childId) {
      this.getCurrentChild(childId).catch(err => {
        this.$toast.error('Erro ao carregar esta criança.')
      })
    }
  }
}
</script>

<style lang="scss">
@use '../../../styles/variables' as *;

.dashboard-view {
  padding: 0px 20px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .dashboard-view__main-cards {
    display: flex;

    .dashboard-view__details-card {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 16px;
      margin-right: 20px;
      border-radius: $border-radius;
      &:last-child { margin-right: 0px; }
      &:nth-child(1) .dashboard-view__details-icon { background-color: #621ba2; }
      &:nth-child(2) .dashboard-view__details-icon { background-color: #d44eb7; }
      &:nth-child(3) .dashboard-view__details-icon { background-color: #9f64ea; }

      .dashboard-view__details-icon {
        margin-right: 16px;
        .md-icon, span { color: $white !important; }
      }

      .dashboard-view__details-text {
        h2 { font-weight: 400; margin: 0; }
      }
    }
  }

  .dashboard-view__chart {
    flex: 1;
    padding: 16px;
    margin-top: 20px;
    border-radius: $border-radius;
    display: flex;
    align-items: center;

    .dashboard-view__empty-state {
      max-width: 600px;
    }
  }
}

@media (max-width: 1080px) {
  .dashboard-view {
    .dashboard-view__main-cards {
      flex-direction: column;

      .dashboard-view__details-card {
        margin-right: 0;
        margin-bottom: 20px;
        &:last-child { margin-bottom: 0; }
      }
    }
  }
}
</style>
