import Vue from 'vue'

// Filters
import ButtonFilter from '~/components/ButtonFilter.vue'

// Logo (file name = reference id in store/references.js)
import LogoDassaultsystemes from '~/components/institutes/dassaultsystemes.vue'
import LogoLeroymerlin from '~/components/institutes/leroymerlin.vue'
import LogoStrate from '~/components/institutes/strate.vue'
import LogoGuken from '~/components/institutes/guken.vue'

// Icons (file name = reference id in store/references.js)
import IconAbleton from '~/components/tools/ableton.vue'
import IconAftereffects from '~/components/tools/aftereffects.vue'
import IconArduino from '~/components/tools/arduino.vue'
import IconCatia from '~/components/tools/catia.vue'
import IconCsharp from '~/components/tools/csharp.vue'
import IconIllustrator from '~/components/tools/illustrator.vue'
import IconIndesign from '~/components/tools/indesign.vue'
import IconMatlab from '~/components/tools/matlab.vue'
import IconMax from '~/components/tools/max.vue'
import IconNuxt from '~/components/tools/nuxt.vue'
import IconPhotoshop from '~/components/tools/photoshop.vue'
import IconPixate from '~/components/tools/pixate.vue'
import IconPremiere from '~/components/tools/premiere.vue'
import IconProcessing from '~/components/tools/processing.vue'
import IconPuredata from '~/components/tools/puredata.vue'
import IconPython from '~/components/tools/python.vue'
import IconUnity3d from '~/components/tools/unity3d.vue'

// Project pages
import WhooshingMachine from '~/components/projects/WhooshingMachine.vue'
import Austerlitz1805 from '~/components/projects/Austerlitz1805.vue'
import Boxylab from '~/components/projects/Boxylab.vue'

// ------------------------------------------------------------------------------

// Filters
Vue.component('button-filter', ButtonFilter)

// Logo
Vue.component('logo-dassaultsystemes', LogoDassaultsystemes)
Vue.component('logo-leroymerlin', LogoLeroymerlin)
Vue.component('logo-strate', LogoStrate)
Vue.component('logo-guken', LogoGuken)

// Icons
Vue.component('icon-ableton', IconAbleton)
Vue.component('icon-aftereffects', IconAftereffects)
Vue.component('icon-arduino', IconArduino)
Vue.component('icon-catia', IconCatia)
Vue.component('icon-csharp', IconCsharp)
Vue.component('icon-illustrator', IconIllustrator)
Vue.component('icon-indesign', IconIndesign)
Vue.component('icon-matlab', IconMatlab)
Vue.component('icon-max', IconMax)
Vue.component('icon-nuxt', IconNuxt)
Vue.component('icon-photoshop', IconPhotoshop)
Vue.component('icon-pixate', IconPixate)
Vue.component('icon-premiere', IconPremiere)
Vue.component('icon-processing', IconProcessing)
Vue.component('icon-puredate', IconPuredata)
Vue.component('icon-python', IconPython)
Vue.component('icon-unity3d', IconUnity3d)

// Project pages
Vue.component('whooshing-machine', WhooshingMachine)
Vue.component('austerlitz-1805', Austerlitz1805)
Vue.component('boxylab', Boxylab)
