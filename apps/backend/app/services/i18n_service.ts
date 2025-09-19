import i18nManager from '@adonisjs/i18n/services/main'

class I18nService {
  private defaultLocale = "fr"

  public get(locale?: string) {
    return i18nManager.locale(locale || this.defaultLocale)
  }
}

export default new I18nService()
