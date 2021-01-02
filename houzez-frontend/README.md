# README

## System dependencies

* React.js 16.13.x

----

## Setup & Start

### 1. `.env` file

Request PIC in project to received configuration file.

### 2. Run

* `npm install`
* `npm run dev`
* Try access URL: local.airasia.com:4200

----

## Translation usage

```javascript
// Example Component
import { useTranslation } from "react-i18next"

const Example = () => {
  const { t, i18n } = useTranslation('common')

  <h1>{t('home')}</h1>
}
```
