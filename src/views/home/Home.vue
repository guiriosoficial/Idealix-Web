<template>
  <div class="main-container">
    <SideMenu
      :childsList="childsList"
      class="elevation"
      @open-add-child-dialog="openAddChildDialog"
      @open-add-point-dialog="openAddPointDialog"
    />

    <main class="main-container__content">
      <ProfileHeader :responsible-data="responsibleData.name" />

      <transition name="fade">
        <router-view/>
      </transition>

      <v-speed-dial location="top center" transition="fade-transition">
        <template v-slot:activator="{ props: activatorProps }">
          <v-fab class="main-container__speed-dial" size="large" v-bind="activatorProps" icon="mdi-plus" />
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
    </main>

    <IdxDialog
      v-model="addChildDialogVisibel"
      max-width="500"
    >
      <IdxCard title="Adicionar uma criança">
        <IdxForm
            class="main-container__dialogs--form"
            @submit.prevent="handeAddChild">
          <v-card-text>
            <IdxTextField
              label="Nome"
              append-icon="mood"
              v-model="newChildForm.name"
            />
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
            <IdxTextField
                label="Data de nascimento"
                type="date"
                v-model="newChildForm.birthday"
                id="birthday"
                name="birthday"
            />
          </v-card-text>
          <v-card-actions>
            <IdxBtn
                class="md-primary"
                @click="updateAddChildDialogVisibel(false)"
            >
              Cancelar
            </IdxBtn>
            <IdxBtn
              class="md-primary md-raised"
              type="submit"
            >
              Adicionar
            </IdxBtn>
          </v-card-actions>
        </IdxForm>
      </IdxCard>
    </IdxDialog>

    <IdxDialog
      v-model="addPointDialogVisibel"
      max-width="500"
    >
      <IdxCard title="Adicionar um marco">
        <IdxForm
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
          <IdxTextField
              type="date"
              label="Data da medição"
              v-model="newPointForm.measurementDate"
              id="date"
              name="date"
          />
          <template #text></template>
          <template #actions>
            <IdxBtn @click="updateAddPointDialogVisibel(false)">
              Cancelar
            </IdxBtn>
            <IdxBtn type="submit">
              Adicionar
            </IdxBtn>
          </template>
        </IdxForm>
      </IdxCard>
    </IdxDialog>
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
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import IdxDialog from "@/components/commons/IdxDialog.vue";
import IdxCard from "@/components/commons/IdxCard.vue";
import IdxForm from "@/components/commons/IdxForm.vue";
import IdxBtn from "@/components/commons/IdxBtn.vue";
import IdxTextField from "@/components/commons/IdxTextField.vue";

const newChildForm = reactive({ name: '', gender: '', birthday: new Date() })
const newPointForm = reactive({ childId: '', weight: null, height: null, measurementDate: new Date() })
const numberMask = reactive({ decimal: ',', thousands: '.', prefix: '', suffix: '', precision: 2, masked: false })

const number = VMoney
const toast = useToast()
const router = useRouter()
const route = useRoute()

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
  Object.assign(newChildForm, { name: '', gender: '', birthday: '' })
  updateAddChildDialogVisibel(true)
}

function handeAddChild () {
  const { name, gender, birthday } = newChildForm
  addNewChild({ name, gender, birthday: new Date(birthday).getTime() })
    .then((res) => {
      toast.success('Criança adicionada com sucesso.')
      router.push(`/dashboard/${res.id}`)
      updateAddChildDialogVisibel(false)
    })
    .catch(() => toast.error('Erro ao adicionar criança.'))
}

function openAddPointDialog () {
  Object.assign(newPointForm, {
    childId: route.params.id || '',
    weight: null,
    height: null,
    measurementDate: new Date()
  })
  updateAddPointDialogVisibel(true)
}

function  handleAddPoint () {
  const { childId, measurementDate, height, weight } = newPointForm
  addNewPoint({
    childId,
    height: +(String(height).replace(',', '.')),
    weight: +(String(weight).replace(',', '.')),
    measurementDate: new Date(measurementDate).getTime()
  })
    .then((res) => {
      toast.success('Marco adicionado com sucesso.')
      router.push(`/dashboard/${res.id_child}`)
      updateAddPointDialogVisibel(false)
    })
    .catch(() => toast.error('Erro ao adicionar marco.'))
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

    .main-container__speed-dial {
      position: absolute;
      bottom: 32px;
      right: 32px;
    }
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
