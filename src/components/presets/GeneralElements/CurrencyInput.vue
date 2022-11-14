<template>
  <input class="currency-input" ref="inputRef" type="text" />
</template>

<style lang="scss">
.currency-input {
  height: 40px;
  padding-left: 15px;
  color: #606266;
  border-color: #dcdfe6;
  border-radius: 4px;
  background-color: #ffffff;
  border-width: 1px;
  &:hover {
    border-color: #409eff;
  }
  &:focus {
    border-width: 1px;
    outline: 0;
    border-color: #409eff;
  }
}
</style>
<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number, // Vue 2: value
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);
    return { inputRef };
  },
};
</script>
