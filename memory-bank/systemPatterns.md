# System Patterns

## Архитектурные паттерны

### 1. Монолитный Multi-Package проект
Проект содержит несколько package.json без использования workspaces:
- ROOT - showcase приложение
- src/app/components - библиотека PrimeNG
- primeng-sass-theme - SASS темы
- builder - кастомный Angular builder
- dist-css - артефакты для публикации

**Проблема:** Нет централизованного управления зависимостями

### 2. Angular Library + Application
**Library:** src/app/components (ng-packagr)
- Собирается в dist/
- Публикуется как npm пакет
- Используется в других проектах

**Application:** src/ (showcase)
- SSR (Server-Side Rendering)
- Prerendering статических страниц
- Демонстрация компонентов

### 3. Theme System Architecture
```
SASS Variables (Figma tokens)
       ↓
Base Theme (theme-base/)
       ↓
Brand Variants (ek5/, brand/)
       ↓
SASS Compilation
       ↓
CSS Output (src/assets/components/themes/)
       ↓
Distribution (npm + S3)
```

## Design Patterns

### 1. Component Pattern
```typescript
@Component({
  selector: 'p-button',
  template: '...',
  styleUrls: ['./button.css']
})
export class Button implements OnInit {
  @Input() label: string;
  @Output() onClick = new EventEmitter();
}
```

### 2. Module Pattern
Каждый компонент - отдельный NgModule:
```typescript
@NgModule({
  imports: [CommonModule],
  declarations: [Button],
  exports: [Button]
})
export class ButtonModule {}
```

### 3. Public API Pattern
```typescript
// public_api.ts
export * from './button/public_api';
export * from './dropdown/public_api';
```

### 4. Path Aliases (tsconfig.json)
```json
{
  "paths": {
    "primeng/*": ["src/app/components/*/public_api"],
    "@pages/*": ["src/app/showcase/pages/*"],
    "@doc/*": ["src/app/showcase/doc/*"]
  }
}
```

## Build Patterns

### 1. Multi-Stage Docker Build
```dockerfile
Stage 1: Dependencies (npm ci)
Stage 2: Build (npm run build)
Stage 3: Production (nginx serve)
```

### 2. Gulp Task Pipeline
```javascript
gulp.task('build-css', ['concat', 'minify']);
gulp.task('images', ['flatten', 'copy']);
gulp.task('themes', ['copy-themes']);
```

### 3. SASS Compilation Chain
```
SASS → PostCSS → Autoprefixer → Output
```

## Publishing Patterns

### 1. Dual Publishing (CSS)
- npm registry: @cdek/primeng
- S3 bucket: ek5-common/ng-themes/

### 2. Versioning Strategy
```bash
# Development: 0.1.94-development.abc123
# Production: 0.1.94
```

### 3. CI/CD Pipeline
```
Commit → Build → Test → Publish (npm + S3) → Deploy (k8s)
```

## Anti-patterns обнаруженные

### 1. ❌ Multiple package.json без workspaces
Каждый модуль изолирован, дублирование зависимостей

### 2. ❌ strict-ssl=false
Отключена проверка SSL сертификатов (security risk)

### 3. ❌ Смешанные версии в package.json
- "latest" для некоторых eslint плагинов
- Точные версии для других пакетов

### 4. ❌ Отсутствие lock-файла в некоторых модулях
builder/, primeng-sass-theme/ не имеют собственных lock-файлов

## Best Practices применяемые

### 1. ✅ Использование ng-packagr
Стандартный инструмент для сборки Angular библиотек

### 2. ✅ SSR + Prerendering
Улучшенная производительность и SEO для showcase

### 3. ✅ Semantic Versioning
Версионирование следует semver

### 4. ✅ Code Quality Tools
ESLint + Prettier + security check

### 5. ✅ Automated Testing
Karma + Jasmine для unit тестов
