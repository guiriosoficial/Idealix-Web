<template>
  <IdxDialog v-model="modelValue" max-width="600">
    <IdxCard
      title="Termos de uso"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi purus libero, lacinia ornare nisl eu, finibus rhoncus nisl.
        Suspendisse potenti. Mauris hendrerit consequat ipsum at volutpat.
        Praesent eros ex, pharetra ac purus euismod, hendrerit faucibus justo.
        In cursus a orci ac aliquam. Proin rutrum rutrum urna sed euismod.
        Aenean mattis cursus ligula, eu condimentum urna bibendum eget.
      </p>
      <br />
      <p>
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Ut a ligula eros. Nulla euismod velit quis pellentesque euismod.
        Sed at elit efficitur, pulvinar sapien in, ornare metus.
        Nam at cursus sapien. Maecenas vel pellentesque orci, sit amet semper ante.
        Maecenas diam nunc, pharetra rutrum eleifend a, suscipit non metus.
        Pellentesque sed arcu id urna blandit lacinia eget id eros. Fusce at ultrices mauris.
      </p>
      <br />
      <p>
        Proin at semper metus, vel euismod nisi. Ut auctor nibh volutpat sapien tristique, sed convallis diam lacinia.
        Quisque cursus nec purus quis efficitur.
        Nulla commodo, ipsum et congue commodo, tortor elit blandit mi, in varius odio ligula quis lorem.
        Quisque vehicula consequat dapibus. Duis ac rutrum arcu. Vivamus sed eros mauris.
        Curabitur sit amet consequat sem, sed vestibulum magna. Cras ut enim ut eros tristique auctor.
        Maecenas lacinia id metus a congue. Nullam fringilla ipsum in ante semper accumsan.
      </p>
      <br />
      <p>
        Donec rutrum accumsan felis a ultrices. Donec fringilla erat sem, a consequat ligula convallis eu.
        Mauris hendrerit, ante sit amet ornare rhoncus, libero sapien placerat diam, efficitur vestibulum ante dolor vel ante.
        Donec eu sollicitudin nulla. Nunc a erat sit amet erat gravida cursus id sit amet magna.
        Quisque sodales mollis ligula, et tristique lacus sollicitudin nec. Quisque eu maximus enim.
        Aenean nec elit id sem blandit tristique. Phasellus eu hendrerit lorem.
        In quis nunc pharetra, molestie metus eget, vulputate tortor. Morbi vel nulla eget dolor ornare sodales sed id est.
      </p>
      <br />
      <p>
        Proin vehicula tortor nunc, vitae commodo quam pellentesque quis.
        Curabitur sed felis orci. Suspendisse sem odio, mattis vehicula justo vel, feugiat blandit ligula.
        Quisque tincidunt orci at nibh venenatis tempor. Vestibulum in scelerisque elit.
        Vivamus euismod posuere venenatis. In semper, justo eget cursus ornare, mauris enim laoreet sem, eu suscipit mauris ex sagittis orci.
        Donec leo elit, ultricies non est nec, dictum vehicula arcu. Vestibulum maximus magna et arcu varius rhoncus.
        Fusce commodo dui a odio tincidunt varius. Maecenas eros nibh, tincidunt non metus nec, elementum aliquet quam.
      </p>
      <template #actions>
        <v-spacer />

        <IdxBtn
          color="primary"
          @click="modelValue = false"
        >
          Ok
        </IdxBtn>
      </template>
    </IdxCard>
  </IdxDialog>
</template>

<script setup lang="ts">
import { IdxBtn } from "@/components/commons/IdxBtn";
import { IdxDialog } from "@/components/commons/IdxDialog";
import { IdxCard} from "@/components/commons/IdxCard";

const modelValue = defineModel<boolean | undefined>({
  required: true
})

const terms = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi purus libero, lacinia ornare nisl eu, finibus rhoncus nisl. Suspendisse potenti. Mauris hendrerit consequat ipsum at volutpat. Praesent eros ex, pharetra ac purus euismod, hendrerit faucibus justo. In cursus a orci ac aliquam. Proin rutrum rutrum urna sed euismod. Aenean mattis cursus ligula, eu condimentum urna bibendum eget.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut a ligula eros. Nulla euismod velit quis pellentesque euismod. Sed at elit efficitur, pulvinar sapien in, ornare metus. Nam at cursus sapien. Maecenas vel pellentesque orci, sit amet semper ante. Maecenas diam nunc, pharetra rutrum eleifend a, suscipit non metus. Pellentesque sed arcu id urna blandit lacinia eget id eros. Fusce at ultrices mauris.

Proin at semper metus, vel euismod nisi. Ut auctor nibh volutpat sapien tristique, sed convallis diam lacinia. Quisque cursus nec purus quis efficitur. Nulla commodo, ipsum et congue commodo, tortor elit blandit mi, in varius odio ligula quis lorem. Quisque vehicula consequat dapibus. Duis ac rutrum arcu. Vivamus sed eros mauris. Curabitur sit amet consequat sem, sed vestibulum magna. Cras ut enim ut eros tristique auctor. Maecenas lacinia id metus a congue. Nullam fringilla ipsum in ante semper accumsan.

Donec rutrum accumsan felis a ultrices. Donec fringilla erat sem, a consequat ligula convallis eu. Mauris hendrerit, ante sit amet ornare rhoncus, libero sapien placerat diam, efficitur vestibulum ante dolor vel ante. Donec eu sollicitudin nulla. Nunc a erat sit amet erat gravida cursus id sit amet magna. Quisque sodales mollis ligula, et tristique lacus sollicitudin nec. Quisque eu maximus enim. Aenean nec elit id sem blandit tristique. Phasellus eu hendrerit lorem. In quis nunc pharetra, molestie metus eget, vulputate tortor. Morbi vel nulla eget dolor ornare sodales sed id est.

Proin vehicula tortor nunc, vitae commodo quam pellentesque quis. Curabitur sed felis orci. Suspendisse sem odio, mattis vehicula justo vel, feugiat blandit ligula. Quisque tincidunt orci at nibh venenatis tempor. Vestibulum in scelerisque elit. Vivamus euismod posuere venenatis. In semper, justo eget cursus ornare, mauris enim laoreet sem, eu suscipit mauris ex sagittis orci. Donec leo elit, ultricies non est nec, dictum vehicula arcu. Vestibulum maximus magna et arcu varius rhoncus. Fusce commodo dui a odio tincidunt varius. Maecenas eros nibh, tincidunt non metus nec, elementum aliquet quam.
`
</script>