import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import print from "vue3-print-nb";
// import VuePdf from "vue3-pdfjs";

import HeadingText from "./components/presets/GeneralElements/HeadingText.vue";
import CardSection from "./components/presets/GeneralElements/CardSection.vue";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import ModalWrapper from "@/components/presets/GeneralElements/ModalWrapper.vue";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import InlineSVG from "@/components/presets/GeneralElements/InlineSVG.vue";
import LargeIconButton from "@/components/presets/GeneralElements/LargeIconButton.vue";
import "@/core/plugins/prismjs";
import "bootstrap";
import VueSignaturePad from "vue-signature-pad";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(print);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDCDe_kzdqziechOJ53yViPLc6hLQbhX1o",
    libraries: "places",
  },
});
app.use(VueSignaturePad);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app
  .component("HeadingText", HeadingText)
  .component("CardSection", CardSection)
  .component("InputWrapper", InputWrapper)
  .component("ModalWrapper", ModalWrapper)
  .component("InfoSection", InfoSection)
  .component("InlineSVG", InlineSVG)
  .component("IconButton", IconButton)
  .component("LargeIconButton", LargeIconButton);

app.use(i18n);

app.mount("#app");
