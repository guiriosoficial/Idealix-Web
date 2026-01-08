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

    <v-dialog
      v-model="addChildDialogVisibel"
      max-width="500"
    >
      <v-card title="Adicionar uma criança">
        <v-form
            class="main-container__dialogs--form"
            @submit.prevent="handeAddChild">
          <v-card-text>
            <v-text-field label="Nome" append-icon="mood" v-model="newChildForm.name" />
            <v-select
                v-model="newChildForm.gender"
                :items="[{ value: 'm', label: 'É um Menino' }, { value: 'f', label: 'É uma Menina' }]"
                id="gender"
                name="gender"
                item-title="label"
                item-value="value"
                label="Genero"
                prepend-inner-icon="mdi-gender-male-female"
            />
            <v-text-field
                label="Data de nascimento"
                type="date"
                v-model="newChildForm.birthday"
                id="birthday"
                name="birthday">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
                class="md-primary"
                @click="updateAddChildDialogVisibel(false)">
              Cancelar
            </v-btn>
            <v-btn
                class="md-primary md-raised"
                type="submit"
            >
              Adicionar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="addPointDialogVisibel"
      max-width="500"
    >
      <v-card title="Adicionar um marco">
        <v-form
            class="main-container__dialogs--form"
            @submit.prevent="handleAddPoint">

          <v-select
              v-model="newPointForm.childId"
              id="child"
              :items="childsList"
              item-value="id"
              item-title="name"
              label="Criança"
              name="child">
            <!--            <md-option-->
            <!--              v-for="child in childsList"-->
            <!--              :key="child.id"-->
            <!--              :value="child.id">-->
            <!--              <span>-->
            <!--                <UserAvatar-->
            <!--                :name="child.name"-->
            <!--                size="md-small" />-->
            <!--                {{ child.name }}-->
            <!--              </span>-->
            <!--            </md-option>-->
          </v-select>
          <v-text-field
              label="Peso"
              suffix="Kg"
              prepend-inner-icon="mdi-scale-unbalanced"
              v-model.lazy="newPointForm.weight"
              v-number="numberMask"
              id="weight"
              name="weight" />
          <v-text-field
              label="Altura"
              prepend-inner-icon="mdi-human-male-height"
              suffix="m"
              v-model.lazy="newPointForm.height"
              v-number="numberMask"
              id="height"
              name="height" />
          <v-text-field
              type="date"
              label="Data da medição"
              v-model="newPointForm.measurementDate"
              id="date"
              name="date"
          />
          <v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-btn
                @click="updateAddPointDialogVisibel(false)">
              Cancelar
            </v-btn>
            <v-btn
                type="submit">
              Adicionar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-speed-dial location="top center" transition="fade-transition">
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab size="large" v-bind="activatorProps" icon="mdi-plus" />
      </template>

<!--      child care-->
      <v-btn
          icon="mdi-baby-face-outline"
          key="chield"
          v-tooltip:left="'Adicionar Criança'"
          @click="openAddChildDialog"
      />
      <v-btn
          icon="mdi-chart-timeline-variant"
          key="point"
          v-tooltip:left="'Inserir Marco'"
          @click="openAddPointDialog"
      />
    </v-speed-dial>
  </div>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import { VMoney } from 'v-money3'
import { useAccountStore } from '@/store/account'
import { useChildsStore } from '@/store/childs'
import { useAppStore } from '@/store'
import { useHistoricStore } from '@/store/historic'
import { reactive, onBeforeMount } from 'vue'


const newChildForm = reactive({ name: '', gender: '', birthday: new Date() })
const newPointForm = reactive({ childId: '', weight: null, height: null, measurementDate: new Date() })
const numberMask = reactive({ decimal: ',', thousands: '.', prefix: '', suffix: '', precision: 2, masked: false })

const number = VMoney

const historicStore = useHistoricStore()
const {
  addNewPoint: addNewPoint,
  fetchClassification: getClassification
} = historicStore

const accountStore = useAccountStore()
const { getResponsibleData: responsibleData } = accountStore

const childsStore = useChildsStore()
const {
  getChildsList: childsList,
  addNewChild: addNewChild,
  fetchChildsList: getChildsList
} = childsStore

const appStore = useAppStore()
const {
  addChildDialogVisible: addChildDialogVisibel,
  addPointDialogVisible: addPointDialogVisibel,
  toggleAddChildDialog: updateAddChildDialogVisibel,
  toggleAddPointDialog: updateAddPointDialogVisibel
} = appStore

onBeforeMount(() => {
  getChildsList().catch(err => console.error(err))
  getClassification().catch(err => console.error(err))
})



function openAddChildDialog () {
  this.newChildForm = { name: '', gender: '', birthday: '' }
  this.updateAddChildDialogVisibel(true)
}

function handeAddChild () {
  const { name, gender, birthday } = this.newChildForm
  this.addNewChild({ name, gender, birthday: new Date(birthday).getTime() })
    .then(res => {
      this.$toast.success('Criança adicionada com sucesso.')
      this.$router.push(`/dashboard/${res.id}`)
      this.updateAddChildDialogVisibel(false)
    })
    .catch(() => this.$toast.error('Erro ao adicionar criança.'))
}

function openAddPointDialog () {
  this.newPointForm = {
    childId: this.$route.params.id || '',
    weight: null,
    height: null,
    measurementDate: new Date()
  }
  this.updateAddPointDialogVisibel(true)
}

function  handleAddPoint () {
  const { childId, measurementDate, height, weight } = this.newPointForm
  this.addNewPoint({
    childId,
    height: +(height.toString().replace(',', '.')),
    weight: +(weight.toString().replace(',', '.')),
    measurementDate: new Date(measurementDate).getTime()
  })
    .then(res => {
      this.$toast.success('Marco adicionado com sucesso.')
      this.$router.push(`/dashboard/${res.id_child}`)
      this.updateAddPointDialogVisibel(false)
    })
    .catch(() => this.$toast.error('Erro ao adicionar marco.'))
}
</script>

<style lang="scss">
@use '../../styles/variables' as *;

.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: $background;

  .main-container__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.main-container__dialogs {
  .md-dialog-container {
    border-radius: $border-radius;
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
