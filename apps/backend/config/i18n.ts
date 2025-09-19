import app from '@adonisjs/core/services/app'
import { defineConfig, formatters, loaders } from '@adonisjs/i18n'

const i18nConfig = defineConfig({
  defaultLocale: 'fr',
  formatter: formatters.icu(),
  fallbackLocales: {
    ca: 'en'
  },
  supportedLocales: ['en', 'fr'],
  loaders: [
    /**
     * The fs loader will read translations from the
     * "resources/lang" directory.
     *
     * Each subdirectory represents a locale. For example:
     *   - "resources/lang/en"
     *   - "resources/lang/fr"
     */
    loaders.fs({
      location: app.languageFilesPath()
    }),
  ],
})

export default i18nConfig
