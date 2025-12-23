<script>
import { Line } from 'vue-chartjs'
import { mapState } from 'pinia'
import { useHistoricStore } from '@/store/historic'

export default {
  extends: Line,
  props: {
    currentHistoric: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(useHistoricStore, {
      classification: 'getClassification',
      currentChild: 'getCurrentChild'
    }),

    options () {
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    },

    filteredClassification () {
      return this.classification[this.currentChild.gender].filter(c =>
        this.currentHistoric
          .map(h => h.age > 24 && h.age % 12 ? h.age - (h.age % 12) : h.age)
          .includes(c.age)
      )
    },

    historic () {
      return {
        labels: this.currentHistoric.map(h => h.age),
        datasets: [
          {
            fill: 'end',
            label: 'Acima do peso',
            borderColor: '#d44eb798',
            backgroundColor: '#d44eb798',
            data: this.filteredClassification
              .filter(c => c.reference === 'max')
              .map(c => c.imc)
          },
          {
            fill: 'start',
            label: 'Abaixo do peso',
            borderColor: '#9f64ea98',
            backgroundColor: '#9f64ea98',
            data: this.filteredClassification
              .filter(c => c.reference === 'min')
              .map(c => c.imc)
          },
          {
            label: 'Atual',
            borderColor: '#621ba298',
            data: this.currentHistoric.map(h => h.imc)
          }
        ]
      }
    }
  },
  watch: {
    'currentChild.id' (_current) {
      this.fetchChart()
    },
    'currentChild.historic' (_current) {
      this.fetchChart()
    }
  },
  mounted () {
    this.fetchChart()
  },
  methods: {
    fetchChart () {
      this.renderChart(this.historic, this.options)
    }
  }
}
</script>
