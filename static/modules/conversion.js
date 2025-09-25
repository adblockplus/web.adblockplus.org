export function fireGAConversionEvent(frequency, currency, value) {
  if (typeof gtag == "function") {
    const send_to = frequency == "yearly" ? "AW-998912317/zT75CIDd0eszEL3iqNwD"
      : frequency == "monthly" ? "AW-998912317/Q6WWCM-R0uszEL3iqNwD" : false;
    const transition_id = "";
    const transport_type = 'beacon';
    if (send_to && currency && value) {
      gtag('event', 'conversion', { send_to, value, currency, transition_id, transport_type });
    }
  }
}
