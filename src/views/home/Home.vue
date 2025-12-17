<template>
  <div class="main-container">
    <SideMenu
      :childsList="childsList"
      class="elevation"
      @open-add-child-dialog="openAddChildDialog"
      @open-add-point-dialog="openAddPointDialog"
    />

    <main class="main-container__content">
      <ProfileHeader :responsible-data="responsibleData" />

      <transition name="fade">
        <router-view/>
      </transition>
    </main>

    <md-dialog
      :md-active.sync="addChildDialogVisibel"
      :md-fullscreen="false"
      class="main-container__dialogs">
      <md-dialog-title>Adicionar uma criança</md-dialog-title>
      <form
        class="main-container__dialogs--form"
        novalidate
        @submit.prevent="validateUser">
        <md-field>
          <md-icon>mood</md-icon>
          <label for="name">Nome</label>
          <md-input
            v-model="newChildForm.name"
            id="name"
            name="name" />
        </md-field>
        <md-field>
          <md-icon>wc</md-icon>
          <label for="gender">Genero</label>
          <md-select
            v-model="newChildForm.gender"
            id="gender"
            name="gender">
            <md-option value="m">É um Menino</md-option>
            <md-option value="f">É uma Menina</md-option>
          </md-select>
        </md-field>
        <md-datepicker
          v-model="newChildForm.birthday"
          id="birthday"
          name="birthday">
          <label>Data de nascimento</label>
        </md-datepicker>
      </form>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="updateAddChildDialogVisibel(false)">
          Cancelar
        </md-button>
        <md-button
          class="md-primary md-raised"
          @click="handeAddChild">
          Adicionar
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog
      :md-active.sync="addPointDialogVisibel"
      :md-fullscreen="false"
      class="main-container__dialogs">
      <md-dialog-title>Adicionar um marco</md-dialog-title>
      <form
        class="main-container__dialogs--form"
        novalidate
        @submit.prevent="validateUser">
        <md-field>
          <md-icon>mood</md-icon>
          <label for="gender">Criança</label>
          <md-select
            v-model="newPointForm.childId"
            id="child"
            name="child">
            <md-option
              v-for="child in childsList"
              :key="child.id"
              :value="child.id">
              <span>
                <UserAvatar
                :name="child.name"
                size="md-small" />
                {{ child.name }}
              </span>
            </md-option>
          </md-select>
        </md-field>
        <md-field>
          <md-icon>360</md-icon>
          <label for="weight">Peso</label>
          <md-input
            v-model.lazy="newPointForm.weight"
            v-number="numberMask"
            id="weight"
            name="weight" />
          <span class="md-suffix">Kg</span>
        </md-field>
        <md-field>
          <md-icon>height</md-icon>
          <label for="height">Altura</label>
          <md-input
            v-model.lazy="newPointForm.height"
            v-number="numberMask"
            id="height"
            name="height" />
          <span class="md-suffix">m</span>
        </md-field>
        <md-datepicker
          v-model="newPointForm.measurementDate"
          id="date"
          name="date">
          <label>Data da medição</label>
        </md-datepicker>
      </form>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="updateAddPointDialogVisibel(false)">
          Cancelar
        </md-button>
        <md-button
          class="md-primary md-raised"
          @click="handleAddPoint">
          Adicionar
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target>
        <md-icon>add</md-icon>
      </md-speed-dial-target>
      <md-speed-dial-content>
        <md-button
          class="md-icon-button"
          @click="openAddChildDialog">
          <md-icon>face</md-icon>
          <md-tooltip md-direction="left">Adicionar Criança</md-tooltip>
        </md-button>
        <md-button
          class="md-icon-button"
          @click="openAddPointDialog">
          <md-icon>timeline</md-icon>
          <md-tooltip md-direction="left">Inserir Marco</md-tooltip>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import { VMoney } from 'v-money'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    ProfileHeader,
    SideMenu
  },
  data: () => ({
    newChildForm: {
      name: '',
      gender: '',
      birthday: new Date()
    },
    newPointForm: {
      childId: '',
      weight: null,
      height: null,
      measurementDate: new Date()
    },
    numberMask: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '',
      precision: 2,
      masked: false
    }
  }),
  directives: {
    number: VMoney
  },
  computed: {
    ...mapGetters({
      responsibleData: 'getResponsibleData',
      childsList: 'getChildsList',
      addChildDialogVisibel: 'addChildDialogVisibel',
      addPointDialogVisibel: 'addPointDialogVisibel'
    })
  },
  beforeMount () {
    this.getChildsList()
      .catch(err => {
        this.$toast.error('Ops! Houve uma falha ao carregar a lista de crianças.')
        console.log(err)
      })

    this.getClassification()
      .catch(err => {
        this.$toast.error('Ops! Houve uma falha ao carregar a as classificações.')
        console.log(err)
      })
  },
  methods: {
    ...mapActions([
      'getClassification',
      'getChildsList',
      'addNewChild',
      'addNewPoint',
      'updateAddChildDialogVisibel',
      'updateAddPointDialogVisibel'
    ]),

    openAddChildDialog () {
      const { newChildForm } = this

      newChildForm.name = ''
      newChildForm.gender = ''
      newChildForm.birthday = ''

      this.updateAddChildDialogVisibel(true)
    },

    handeAddChild () {
      const { name, gender, birthday } = this.newChildForm

      this.addNewChild({
        name,
        gender,
        birthday: new Date(birthday).getTime()
      })
        .then(res => {
          this.$toast.success('Criança adicionada com sucesso.')
          this.$router.push(`/dashboard/${res.id}`)
          this.updateAddChildDialogVisibel(false)
        })
        .catch(err => {
          this.$toast.error('Ops! Houve uma falha ao adicionar esta criança.')
          console.log(err)
        })
    },

    openAddPointDialog () {
      const { newPointForm } = this

      newPointForm.childId = this.$route.params.id || ''
      newPointForm.weight = null
      newPointForm.height = null
      newPointForm.measurementDate = new Date()

      this.updateAddPointDialogVisibel(true)
    },

    handleAddPoint () {
      const { childId, measurementDate, height, weight } = this.newPointForm

      this.addNewPoint({
        childId,
        height: +(height.replace(',', '.')),
        weight: +(weight.replace(',', '.')),
        measurementDate: new Date(measurementDate).getTime()
      })
        .then(res => {
          this.$toast.success('Marco adicionado com sucesso.')
          this.$router.push(`/dashboard/${res.id_child}`)
          this.updateAddPointDialogVisibel(false)
        })
        .catch(err => {
          this.$toast.error('Ops! Houve uma falha ao adicionar este marco.')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: $--background;

  .main-container__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.main-container__dialogs {
  .md-dialog-container {
    border-radius: $--border-radius;
    width: 400px;
    padding: 8px;
  }

  .md-dialog-title { padding: 24px 16px 16px; margin: 0; }
  .md-menu.md-select { margin-left: 12px !important; }
  .md-dialog-actions { padding: 16px; }
  &--form { padding: 0 16px }
}

.md-speed-dial-target {
  opacity: .5;
  &:hover { opacity: 1; }
}

@media (max-width: 1080px) {
  .main-container__content {
    overflow-y: auto;
  }
}

// @media (max-width: 880px) {
//   .main-container {
//     .main-container__main-menu {
//       position: absolute;
//       opacity: 0;
//       transform: translateX(-100%);
//     }
//   }
// }
</style>
