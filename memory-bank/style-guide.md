# Style Guide

## Конвенции кодирования

### TypeScript
- **Отступы:** 4 пробела (согласно .editorconfig)
- **Точка с запятой:** Обязательна
- **Кавычки:** Одинарные (')
- **Naming:**
  - Classes: PascalCase
  - Variables/Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: kebab-case

### Angular Specific
- **Selector prefix:** `p-` для компонентов библиотеки
- **Component naming:** `{Name}Component`
- **Module naming:** `{Name}Module`
- **Service naming:** `{Name}Service`

### SCSS
- **Отступы:** 4 пробела
- **Naming:** BEM methodology для компонентов
- **Variables:** `$variable-name`

### Примеры

#### Component
```typescript
@Component({
    selector: 'p-button',
    templateUrl: './button.html',
    styleUrls: ['./button.css']
})
export class Button implements OnInit {
    @Input() label: string;
    @Output() onClick = new EventEmitter<any>();
    
    ngOnInit(): void {
        // implementation
    }
}
```

#### Module
```typescript
@NgModule({
    imports: [CommonModule],
    declarations: [Button],
    exports: [Button]
})
export class ButtonModule {}
```

## Форматирование

### Prettier конфигурация
```json
{
    "tabWidth": 4,
    "singleQuote": true,
    "printWidth": 200,
    "trailingComma": "none"
}
```

### ESLint правила
- @angular-eslint рекомендуемые правила
- Prettier интеграция
- No implicit any
- Prefer arrow functions

## Git Commit Messages
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- feat: новая функциональность
- fix: исправление бага
- docs: документация
- style: форматирование
- refactor: рефакторинг
- test: тесты
- chore: вспомогательные задачи

## Структура файлов

### Component Structure
```
component-name/
├── component-name.ts          # Logic
├── component-name.html        # Template
├── component-name.css         # Styles
├── component-name.spec.ts     # Tests
└── public_api.ts              # Exports
```

### Module Exports
```typescript
// public_api.ts
export * from './component-name';
export * from './component-name.module';
```

## Documentation

### TSDoc комментарии
```typescript
/**
 * Button component description
 * @example
 * <p-button label="Click me"></p-button>
 */
@Component({...})
export class Button {
    /**
     * Button label text
     * @default undefined
     */
    @Input() label: string;
}
```

## CSS Architecture

### Theme Structure
```scss
// Variables
$primary-color: #007bff;

// Base component styles
.p-button {
    // ...
}

// Modifier classes
.p-button-primary {
    // ...
}
```

### CSS Variables (Runtime theming)
```css
:root {
    --primary-color: #007bff;
    --surface-color: #ffffff;
}
```

## Testing Standards

### Unit Test Structure
```typescript
describe('Button', () => {
    let component: Button;
    let fixture: ComponentFixture<Button>;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [Button]
        });
        fixture = TestBed.createComponent(Button);
        component = fixture.componentInstance;
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
```

## Build Scripts Naming
- `build` - production build
- `build:lib` - library build
- `build:check` - pre-build validation
- `watch` - development mode
- `test` - run tests
- `test:headless` - CI tests
