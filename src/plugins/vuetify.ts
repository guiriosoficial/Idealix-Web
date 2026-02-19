import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const idxTheme = {
  dark: false,
  colors: {
    background: '#fafafa',
    surface: '#ffffff',
    primary: '#591ea3',
    secondary: '#7f169f',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    // Cores de texto para uso em componentes específicos
    'on-surface': '#000000de',
    'on-background': '#000000de'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'idxTheme',
    themes: { idxTheme }
  }
  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     mdi
  //   }
  // }
})
