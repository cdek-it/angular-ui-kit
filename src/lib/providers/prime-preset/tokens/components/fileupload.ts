export const fileuploadCss = ({ dt }: { dt: (token: string) => string }): string => `

.p-fileupload {
  display: flex;
  flex-direction: column;
  gap: ${dt('form.gap.200')};
  border: unset;
}

.p-fileupload .p-fileupload-header {
  padding: 0;
}

.p-fileupload .p-fileupload-content {
  padding: 0;
  border: unset;
}

.p-fileupload .p-message .p-message-content {
  align-items: center;
}

/* ─── Drop zone ─── */
.fu-header {
  width: 100%;
}

.fu-dropzone {
  border: ${dt('form.borderWidth')} dashed ${dt('fileupload.extend.extContent.highlightBorderDefault')};
  border-radius: ${dt('fileupload.extend.extDragNdrop.borderRadius')};
  padding: ${dt('fileupload.extend.extDragNdrop.padding')};
  background: ${dt('fileupload.extend.extDragNdrop.background')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${dt('fileupload.content.gap')};
  cursor: pointer;
  transition: border-color ${dt('fileupload.root.transitionDuration')};
}

.fu-dropzone:hover {
  border-color: ${dt('fileupload.content.highlightBorderColor')};
}

.fu-dropzone.fu-dropzone--disabled:hover {
  border-color: ${dt('fileupload.extend.extContent.highlightBorderDefault')};
}

.fu-dropzone__icon {
  font-size: ${dt('fileupload.extend.extDragNdrop.iconSize')};
  color: ${dt('content.color')};
}

.fu-dropzone__info {
  display: flex;
  flex-direction: column;
  gap: ${dt('fileupload.extend.extDragNdrop.info.gap')};
  width: 100%;
}

.fu-dropzone__title {
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.300')};
  font-weight: ${dt('fonts.fontWeight.bold')};
  line-height: ${dt('fonts.lineHeight.500')};
  color: ${dt('content.color')};
  align-self: center;
}

.fu-dropzone__caption {
  display: flex;
  align-items: center;
  gap: ${dt('form.gap.100')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.250')};
  color: ${dt('text.mutedColor')};
  align-self: center;
}

.fu-dropzone__caption .ti {
  font-size: ${dt('fonts.fontSize.300')};
  line-height: ${dt('fonts.lineHeight.250')};
}

/* ─── Content ─── */
.fu-content {
  display: flex;
  flex-direction: column;
  gap: ${dt('fileupload.content.gap')};
}

/* ─── File list ─── */
.fu-file-list {
  display: flex;
  flex-direction: column;
  gap: ${dt('fileupload.fileList.gap')};
}

.fu-file-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${dt('fileupload.file.padding')};
  border: ${dt('form.borderWidth')} solid ${dt('fileupload.file.borderColor')};
  border-radius: ${dt('fileupload.extend.extDragNdrop.borderRadius')};
  gap: ${dt('fileupload.file.gap')};
  transition: border-color ${dt('fileupload.root.transitionDuration')};
}

.fu-file-card--uploaded {
  opacity: ${dt('opacity.500')};
  background: ${dt('surface.50')};
}

.fu-file-card__wrap {
  display: flex;
  align-items: center;
  gap: ${dt('form.gap.300')};
}

.fu-file-card__icon {
  font-size: ${dt('fileupload.extend.extFile.iconSize')};
  color: ${dt('content.color')};
  flex-shrink: 0;
}

.fu-file-card__thumbnail {
  width: ${dt('fileupload.extend.extFile.iconSize')};
  height: ${dt('fileupload.extend.extFile.iconSize')};
  object-fit: cover;
  border-radius: ${dt('fileupload.extend.extContent.borderRadius')};
  flex-shrink: 0;
}

.fu-file-card__info {
  display: flex;
  flex-direction: column;
  gap: ${dt('fileupload.file.info.gap')};
}

.fu-file-card__name {
  font-size: ${dt('fonts.fontSize.300')};
  color: ${dt('content.color')};
  line-height: ${dt('fonts.lineHeight.400')};
}

.fu-file-card__size {
  display: flex;
  align-items: center;
  gap: ${dt('form.gap.100')};
  font-size: ${dt('fonts.fontSize.200')};
  color: ${dt('text.mutedColor')};
}

.fu-file-card__size .ti {
  font-size: ${dt('fonts.fontSize.300')};
}

/* ─── Footer ─── */
.fu-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

`;
