# Automation Exercise: pruebas E2E y de API con Playwright

[![Playwright Tests](https://github.com/joaquinfriass/automation-exercise-integral-testing/actions/workflows/playwright.yml/badge.svg)](https://github.com/joaquinfriass/automation-exercise-integral-testing/actions/workflows/playwright.yml)

Framework de automatización con **Playwright y TypeScript** para probar [Automation Exercise](https://automationexercise.com), un sitio de comercio electrónico pensado para practicar. Cubre pruebas de interfaz (E2E) y de API.

> **Estado: en construcción.** El framework base y el pipeline de CI están listos. Los casos de prueba se van automatizando de a uno (ver [Avance](#avance)).

## Tecnologías

- Playwright (`@playwright/test`) y TypeScript
- GitHub Actions para la integración continua
- ESLint y Prettier para la calidad del código
- Jira para la planificación de los casos

## Cómo está organizado

```
src/
├── config/      Lectura de variables de entorno (env.ts)
├── pages/       Page Object Model: una clase por pantalla
├── fixtures/    El `test` extendido con las pages ya preparadas
├── components/  Bloques de interfaz reutilizables (a medida que se necesiten)
├── data/        Datos y factories de prueba (a medida que se necesiten)
├── api/         Cliente y servicios de API (a medida que se necesiten)
└── utils/       Funciones auxiliares
tests/
└── ui/          Tests de interfaz, un archivo por funcionalidad
```

Las reglas del diseño:

- Las **pages** tienen locators y acciones, no verificaciones.
- Los **tests** cuentan la historia y contienen los `expect`.
- Las **URLs y credenciales** viven en archivos `.env`, nunca en el código.
- Los tests importan `test` y `expect` desde `@fixtures`.

## Cómo ejecutarlo

Requisitos: Node.js 22 o superior.

```bash
npm ci
npx playwright install chromium
```

Crea tu archivo de entorno a partir del molde:

```bash
cp .env.example .env.qa
```

(En Windows PowerShell: `Copy-Item .env.example .env.qa`.)

| Variable                      | Para qué sirve                         |
| ----------------------------- | -------------------------------------- |
| `BASE_URL`                    | Dirección del sitio                    |
| `API_URL`                     | Dirección de la API                    |
| `USER_EMAIL`, `USER_PASSWORD` | Usuario de prueba (opcional por ahora) |

Se elige el entorno con la variable `ENV` (por defecto `qa`), que carga el archivo `.env.<ENV>`.

## Comandos

| Comando              | Qué hace                                    |
| -------------------- | ------------------------------------------- |
| `npm test`           | Ejecuta todos los tests                     |
| `npm run test:ui`    | Solo los tests de interfaz                  |
| `npm run test:smoke` | Solo los casos críticos (`@smoke`)          |
| `npm run report`     | Abre el reporte HTML de la última ejecución |
| `npm run typecheck`  | Revisa los tipos de TypeScript              |
| `npm run lint`       | Revisa el código con ESLint                 |
| `npm run format`     | Da formato al código con Prettier           |

## Pruebas y etiquetas

Cada test lleva el ID de su caso en el título (por ejemplo `PRD-01`) y una etiqueta:

- `@smoke`: casos críticos y rápidos
- `@regression`: el resto de los casos

## Integración continua

Con cada `push` a `main`, GitHub Actions instala las dependencias, revisa tipos y lint, ejecuta los tests de interfaz y guarda el reporte HTML como archivo descargable.

## Flujo de trabajo

- Cada caso de prueba está planificado como subtarea en Jira.
- Los commits incluyen la clave del ticket, por ejemplo `test: add PRD-03 [QE-16]`.
- Antes de cada commit: `npm run format`, `npm run lint` y `npm run typecheck`.

## Avance

| Área                          | Casos  | Automatizados |
| ----------------------------- | ------ | ------------- |
| Productos (UI)                | 7      | 2             |
| API de productos y marcas     | 6      | 0             |
| API de cuentas                | 9      | 0             |
| Registro, login y logout (UI) | 7      | 0             |
| Carrito (UI)                  | 6      | 0             |
| Checkout y pago (UI)          | 5      | 0             |
| Contacto (UI)                 | 4      | 0             |
| **Total**                     | **44** | **2**         |

## Autor

Joaquín Frías · QA Automation en formación
