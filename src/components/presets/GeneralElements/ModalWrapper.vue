<template>
  <div
    class="modal fade"
    :id="'modal_' + modalId"
    tabindex="-1"
    aria-hidden="true"
    :ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div
          class="modal-header d-flex flex-row"
          :id="'kt_modal_' + modalId + '_header'"
        >
          <HeadingText :text="title" />
          <div class="d-flex flex-row justify-content-end">
            <slot name="header-actions"></slot>
            <div
              :id="'kt_modal_' + modalId + '_close'"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: { type: String, required: true },
    modalId: { type: String, required: true },
    modalRef: { type: Object, required: true },
  },
};
</script>
