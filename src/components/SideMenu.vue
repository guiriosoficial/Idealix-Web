<template>
  <div class="sidemenu-component">
    <input
      id="menu-hamburguer"
      type="checkbox"
      class="sidemenu-component__checkbox" />
    <label
      for="menu-hamburguer"
      class="sidemenu-component__label">
      <span class="sidemenu-component__hamburguer" />
    </label>
    <div class="sidemenu-component__container elevation">
      <h1 class="sidemenu-component__title">iDealix</h1>
      <v-list class="sidemenu-component__menu-items">
        <v-list-subheader inset>Ações</v-list-subheader>
        <v-list-item title="Adicionar Criança" prepend-icon="mdi-baby-face-outline" @click="$emit('open-add-child-dialog')" />
        <v-list-item title="Inserir Marco" prepend-icon="mdi-chart-timeline-variant" @click="$emit('open-add-point-dialog')" />
        <v-list-subheader inset>Crianças</v-list-subheader>
        <v-list-item
          v-for="child in childsList"
          :key="child.id"
          :to="`/dashboard/${child.id}`">
          <template v-slot:prepend>
            <UserAvatar :name="child.name" />
          </template>
          <span class="md-list-item-text">{{ child.name }}</span>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ISideMeniProps {
  childsList: []
}

const { childsList = [] } = defineProps()
</script>

<style lang="scss">
@use '../styles/variables' as *;

.sidemenu-component {
  display: flex;

  .sidemenu-component__checkbox,
  .sidemenu-component__hamburguer {
    display: none;
  }

  .sidemenu-component__container {
    z-index: 10;
    width: 300px;
    background: linear-gradient(to right bottom, $primary-color, $secondary-color);

    .sidemenu-component__title {
      height: 24px;
      display: flex;
      align-items: center;
      margin: 30px 16px;
      font-weight: 400;
      color: $white;
    }

    .sidemenu-component__menu-items {
      overflow: auto;
      height: calc(100% - 80px);
      max-height: calc(100% - 80px);
      background-color: transparent !important;

      .md-list {
        &-item-content * {color: $white !important;}
        &-item-text {display: block; text-overflow: ellipsis; text-transform: capitalize;}
      }

      .md-subheader {color: $white; opacity: 0.5;}
      &::-webkit-scrollbar {width: 8px; background: transparent;}
      &::-webkit-scrollbar-thumb {border-radius: 4px; background-color: #FAFAFA20;}
    }
  }
}

@media (max-width: 880px) {
  .sidemenu-component__checkbox {
    position: absolute;
    display: none;
    top: 20px;
    left: 20px;
    z-index: 99;

    &:checked {
     & ~ label .sidemenu-component__hamburguer {
        transform: rotate(45deg);
        background: #fff;
        opacity: .5;

        &:before { top: 0; }
        &:after { bottom: 0; }
        &:before, &:after {
          transform: rotate(90deg);
          background: #fff;
          opacity: .5;
        }
      }

      & ~ .sidemenu-component__container {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  .sidemenu-component__label {
    position: absolute;

    .sidemenu-component__hamburguer {
      cursor: pointer;
      position: relative;
      display: block;
      width: 30px;
      height: 2px;
      top: 28px;
      left: 20px;
      z-index: 99;
      border-radius: 12px;
      background: rgb(0, 0, 0, 0.54);
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
      transition: .4s ease-in-out;

      &:before, &:after {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 1.5px;
        background: rgb(0, 0, 0, 0.54);
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        transition: .4s ease-in-out;

      }
      &:before { top: -10px; }
      &:after { bottom: -10px; }
    }
  }

  .sidemenu-component {
    .sidemenu-component__container {
      transition: .4s ease-out transform;
      position: absolute;
      height: 100%;
      opacity: 0;
      transform: translateX(-100%);

      .sidemenu-component__title {
        text-align: right !important;
        display: block;
        margin: 20px;
        height: 20px
      }
    }
  }
}
</style>
