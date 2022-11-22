<template>
  <LargeIconButton @click="printTestLabel" heading="PRINT TEST LABEL" />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import * as shajs from "sha.js";
import * as qz from "qz-tray";
export default defineComponent({
  name: "patient-label-print-settings",

  components: {},

  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Patient Label Print Settings");
    });

    const printTestLabel = () => {
      qz.api.setSha256Type(function (data) {
        return shajs("sha256").update(data).digest("hex");
      });
      qz.api.setPromiseType(function (resolver) {
        return new Promise(resolver);
      });
      qz.websocket
        .connect()
        .then(function () {
          // Pass the printer name into the next Promise
          return qz.printers.find("ZDesigner GK420d");
        })
        .then(function (printer) {
          // Create a default config for the found printer
          var config = qz.configs.create(printer);

          let lastname = "Herrmann";
          let firstname = "Kaylee";
          let address = "19 Hollywood Blv";
          let suburb = "Mildura";
          let postcode = "3500";
          let state = "VIC";

          // Raw ZPL
          var data = [
            "^XA^MMT^PW312^LL0200^LS24" +
              "^FT40,27^A0N,20,19^FH^FD" +
              lastname +
              "^FS" +
              "^FT40,49^A0N,20,19^FH^FD" +
              firstname +
              "^FS" +
              "^FT40,71^A0N,20,19^FH^FD" +
              address +
              "^FS" +
              "^FT40,92^A0N,20,19^FH^FD" +
              suburb +
              ", " +
              postcode +
              ", " +
              state +
              "^FS" +
              "^FT40,116^A0N,20,19^FH^FDRef Doc: Dr man person^FS" +
              "^FT40,139^A0N,20,19^FH^FDreffering doc address^FS" +
              "^FT40,165^A0N,20,19^FH^FDM/C#: 5623 6546 8448 4663 - 3^FS" +
              "^FT40,191^A0N,20,19^FH^FD(H)-0384582146 (M) - 0484562155 ^FS" +
              "^FT217,47^A0N,20,24^FB85,1,0,R^FH^FDpatientid^FS" +
              "^FT148,26^A0N,14,19^FB156,1,0,R^FH^FDDOB: DD/MM/YYYY^FS^PQ1,0,1,Y^XZ",
          ];

          return qz.print(config, data);
        })
        .catch(function (e) {
          console.error(e);
        });
    };

    return { printTestLabel };
  },
});
</script>
