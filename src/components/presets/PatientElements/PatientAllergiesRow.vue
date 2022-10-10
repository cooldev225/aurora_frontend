<template>
  <tr
    @mouseover="showButtons = true"
    @mouseleave="
      () => {
        showButtons = false;
        editing = false;
      }
    "
    class="border-bottom h-40px"
  >
    <td>
      <el-input
        v-if="editing"
        v-model="formData.name"
        type="text"
        placeholder="Allergy Name"
      />
      <span v-else> {{ allergy.name }}</span>
    </td>
    <td>
      <el-select v-if="editing" class="w-100" v-model="formData.severity">
        <el-option value="MILD" label="Mild" />
        <el-option value="MODERATE" label="Moderate" />
        <el-option value="SEVERE" label="Severe" />
      </el-select>
      <span v-else> {{ allergy.severity }}</span>
    </td>
    <td>
      <el-input
        v-if="editing"
        v-model="formData.symptoms"
        type="text"
        placeholder="Symptoms"
      />
      <span v-else> {{ allergy.symptoms }}</span>
    </td>
    <td class="w-80px">
      <button
        v-if="showButtons && !editing"
        @click="editing = !editing"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
      >
        <span class="svg-icon svg-icon-3">
          <InlineSVG icon="pencil" />
        </span>
      </button>

      <button
        v-if="showButtons && editing"
        @click="save()"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
      >
        <span class="svg-icon svg-icon-3">
          <InlineSVG icon="save" />
        </span>
      </button>

      <button
        v-if="showButtons"
        @click="handleDelete(item)"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
      >
        <span class="svg-icon svg-icon-3">
          <InlineSVG icon="bin" />
        </span>
      </button>
    </td>
  </tr>
</template>
<script lang="ts">
import { ref } from "vue";
export default {
  data: function () {
    return {
      showButtons: false,
      editing: false,
    };
  },
  props: {
    allergy: { required: true, type: Object },
  },
  setup(props) {
    const formData = ref({
      name: props.allergy.name,
      severity: props.allergy.severity,
      symptoms: props.allergy.symptoms,
    });
    return { formData };
  },
};
</script>
