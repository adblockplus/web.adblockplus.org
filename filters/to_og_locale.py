og_locales = {
    'ar': 'ar_AR',
    'bg': 'bg_BG',
    'de': 'de_DE',
    'da': 'da_DK',
    'en': 'en_US',
    'es': 'es_LA',
    'es_MX': 'es_MX',
    'fr': 'fr_FR',
    'el': 'el_GR',
    'he': 'he_IL',
    'hu': 'hu_HU',
    'it': 'it_IT',
    'ms': 'ms_MY',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
    'lt': 'lt_LT',
    'nl': 'nl_NL',
    'pl': 'pl_PL',
    'pt': 'pt_PT',
    'pt_BR': 'pt_BR',
    'ru': 'ru_RU',
    'sk': 'sk_SK',
    'th': 'th_TH',
    'tr': 'tr_TR',
    'vi': 'vi_VN',
    'zh_CN': 'zh_CN',
    'zh_TW': 'zh_TW',
}

def to_og_locale(locale):
    if locale in og_locales:
        return og_locales[locale]
    else:
        return locale
