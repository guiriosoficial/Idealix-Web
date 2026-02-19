<template>
  <IdxDialog
      v-model="modelValue"
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
</template>

<script setup lang="ts">
import {IdxBtn} from "@/components/commons/IdxBtn"
import {IdxTextField} from "@/components/commons/IdxTextField"
import {IdxDialog} from "@/components/commons/IdxDialog";
import {IdxForm} from "@/components/commons/IdxForm"
import {IdxCard} from "@/components/commons/IdxCard"
import {reactive} from "vue"
import {VMoney} from "v-money3"

// TODO: Move this to Type File
class PointForm {
  childId = ''
  weight = null
  height = null
  measurementDate = new Date()
}

const modelValue = defineModel<boolean | undefined>({
  required:true
})

const newPointForm = reactive(createPointForm())
// TODO: This this config global
const numberMask = reactive({ decimal: ',', thousands: '.', prefix: '', suffix: '', precision: 2, masked: false })
const number = VMoney

function createPointForm () {
  return new PointForm()
}
</script>

<style scoped lang="scss">

</style>