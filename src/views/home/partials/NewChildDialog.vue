<template>
  <IdxDialog
      v-model="modelValue"
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
              :items="genderOptions"
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
</template>

<script setup lang="ts">

import {IdxBtn} from "@/components/commons/IdxBtn";
import {IdxTextField} from "@/components/commons/IdxTextField";
import {IdxDialog} from "@/components/commons/IdxDialog";
import {IdxForm} from "@/components/commons/IdxForm";
import {IdxCard} from "@/components/commons/IdxCard";
import {reactive} from "vue";

// TODO: Move this to Type File
class ChildForm {
  name = ''
  gender = ''
  birthday = new Date()
}

const modelValue = defineModel<boolean | undefined>({
  required: true
})

const newChildForm = reactive(createChildForm())

function createChildForm () {
  return new ChildForm()
}

const genderOptions = [
  { value: 'm', label: 'É um Menino' },
  { value: 'f', label: 'É uma Menina' }
]
</script>


<style scoped lang="scss">

</style>