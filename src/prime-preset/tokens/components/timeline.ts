export const timelineCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Типографика ─── */
.p-timeline {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  line-height: ${dt('fonts.lineHeight.500')};
}

/* ─── Event gap ─── */
.p-timeline-event {
  gap: ${dt('timeline.extend.extEvent.gap')};
}

/* ─── Маркер ─── */
.p-timeline-event-marker {
  border-width: ${dt('timeline.eventMarker.borderWidth')};
}

/* ─── Коннектор ─── */
.p-timeline-event-connector {
  background: ${dt('timeline.eventConnector.color')};
}
`;
