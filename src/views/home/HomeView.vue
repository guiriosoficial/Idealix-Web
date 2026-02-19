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

    <NewChildDialog v-model="addChildDialogVisibel" />

    <NewPointDialog v-model="addPointDialogVisibel" />
  </div>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import { useAccountStore } from '@/store/account'
import { useChildsStore } from '@/store/childs'
import { useAppStore } from '@/store'
import { useHistoricStore } from '@/store/historic'
import { reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import NewPointDialog from "@/views/home/partials/NewPointDialog.vue";
import NewChildDialog from "@/views/home/partials/NewChildDialog.vue";

const newChildForm = reactive({ name: '', gender: '', birthday: new Date() })
const newPointForm = reactive({ childId: '', weight: null, height: null, measurementDate: new Date() })

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

async function handeAddChild () {
  const { name, gender, birthday } = newChildForm
  try {
    const res = await addNewChild({ name, gender, birthday: new Date(birthday).getTime() })
    toast.success('Criança adicionada com sucesso.')
    router.push(`/dashboard/${res.id}`)
    updateAddChildDialogVisibel(false)
  } catch {
    toast.error('Erro ao adicionar criança.')
  }
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

async function  handleAddPoint () {
  const { childId, measurementDate, height, weight } = newPointForm
  try {
    const res = await addNewPoint({
      childId,
      height: +(String(height).replace(',', '.')),
      weight: +(String(weight).replace(',', '.')),
      measurementDate: new Date(measurementDate).getTime()
    })
    toast.success('Marco adicionado com sucesso.')
    await router.push(`/dashboard/${res.id_child}`)
    updateAddPointDialogVisibel(false)
  } catch {
    toast.error('Erro ao adicionar marco.')
  }
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
