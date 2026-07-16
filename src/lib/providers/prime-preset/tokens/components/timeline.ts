export const timelineCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Типографика ─── */
.p-timeline {
  font-family: ${dt('timeline.extend.fonts_fontFamily_base')};
  font-size: ${dt('timeline.extend.fonts_fontSize_300')};
  line-height: ${dt('timeline.extend.fonts_lineHeight_500')};
  color: ${dt('timeline.extend.text_color')};
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

/* ─── Маркер-иконка (без бордера и фона) ─── */
.p-timeline-event-marker:has(i) {
  border: none;
  background: none;
}

.p-timeline-event-marker:has(i)::before {
  display: none;
}

/* ─── Кастомный цвет маркера ─── */
timeline[style*="--timeline-marker-color"] .p-timeline-event-marker {
  border-color: var(--timeline-marker-color);
}

timeline[style*="--timeline-marker-color"] .p-timeline-event-marker i {
  color: var(--timeline-marker-color);
}
`;
