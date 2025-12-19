import buttonCss from './components/css/button';
import avatarCss from './components/css/avatar';
import breadcrumbCss from './components/css/breadcrumb';
import checkboxCss from './components/css/checkbox';
import confirmdialogCss from './components/css/confirmdialog';
import dialogCss from './components/css/dialog';
import dividerCss from './components/css/divider';

const css = ({ dt }: any) => `
  ${buttonCss({ dt })}
  ${avatarCss({ dt })}
  ${breadcrumbCss({ dt })}
  ${checkboxCss({ dt })}
  ${confirmdialogCss({ dt })}
  ${dialogCss({ dt })}
  ${dividerCss({ dt })}
  
  .p-disabled, .p-component:disabled {
    mix-blend-mode: luminosity;
  }
  
  [class*="menu"].p-component {
    border: none;
  }
  
  [class*="menu"][class*="item"]:not(:has([class*="icon"])) [class*="item-content"] > [class*="item"] {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
  }
`;

export default css;
