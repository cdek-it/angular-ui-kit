const css = ({ dt }: any) => `

/* Дополнительная обертка для контента с иконками */
.p-divider-content > div {
  display: flex;
  align-items: center;
  gap: ${dt('spacing.gap.gap-2')};
}

/* Сброс margin для всех иконок внутри divider-content */
.p-divider-content i {
  margin: 0;
}
`;

export default css;
