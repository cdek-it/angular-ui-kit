export const timelineCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Типографика ─── */
.p-timeline {
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  line-height: ${dt('fonts.lineHeight.500')};
  color: ${dt('text.color')};
}

/* ─── Маркер ─── */
.p-timeline-event-marker {
  border-width: ${dt('timeline.eventMarker.borderWidth')};
  background: ${dt('timeline.eventMarker.background')};
  border-color: ${dt('timeline.eventMarker.borderColor')};
}

.p-timeline-event-marker::before {
  background: ${dt('timeline.eventMarker.content.background')};
}

/* ─── Коннектор ─── */
.p-timeline-event-connector {
  background: ${dt('timeline.eventConnector.color')};
}

/* ─── Стиль линии ─── */
timeline[data-line="dashed"] .p-timeline-event-connector {
  background: none;
  border-left: ${dt('timeline.eventConnector.size')} dashed ${dt('timeline.eventConnector.color')};
}

timeline[data-line="dotted"] .p-timeline-event-connector {
  background: none;
  border-left: ${dt('timeline.eventConnector.size')} dotted ${dt('timeline.eventConnector.color')};
}

timeline[data-line="none"] .p-timeline-event-connector {
  background: none;
}

/* Горизонтальная ориентация линии */
timeline[data-line="dashed"] .p-timeline-horizontal .p-timeline-event-connector {
  border-left: none;
  border-top: ${dt('timeline.eventConnector.size')} dashed ${dt('timeline.eventConnector.color')};
}

timeline[data-line="dotted"] .p-timeline-horizontal .p-timeline-event-connector {
  border-left: none;
  border-top: ${dt('timeline.eventConnector.size')} dotted ${dt('timeline.eventConnector.color')};
}
`;
