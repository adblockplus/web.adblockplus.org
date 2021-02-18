TEST_EMAIL = 'testing@eyeotesting.com'
TEST_CARD_NUMBER = '4242424242424242'
TEST_CARD_EXPIRY = '0725'
TEST_CVC = '705'
TEST_ZIP = '70205'


MONTHLY_AMOUNT_UNDER_MINIMUM = '0.99'
ONE_TIME_AMOUNT_UNDER_MINIMUM = '4.99'
MONTHLY_AMOUNT_UNDER_MINIMUM_ERROR = \
      'Oops! To help cover fees, the minimum monthly donation amount is $1.'
ONE_TIME_AMOUNT_UNDER_MINIMUM_ERROR = \
      'Oops! To help cover fees, the minimum one-time donation amount is $5.'


ONE_TIME_CUSTOM_DONATION = [(
      'Lowest accepted value - 5',
      '5',
      'Donate $5',
), (
      'High value - 10000',
      '10000',
      'Donate $10000',
)]


MONTHLY_CUSTOM_DONATION = [(
      'Lowest accepted value - 1',
      '1',
      'Donate $1 / month',
), (
      'High value - 5000',
      '5000',
      'Donate $5000 / month',
)]


ONE_TIME_PAYMENT_OPTIONS = [(
      'One time 10',
      'Donate $10',
), (
      'One time 15',
      'Donate $15',
), (
      'One time 20',
      'Donate $20',
), (
      'One time 35',
      'Donate $35',
), (
      'One time 50',
      'Donate $50',
)]


MONTHLY_PAYMENT_OPTIONS = [(
      'Monthly 1.99',
      'Donate $1.99 / month',
), (
      'Monthly 2.99',
      'Donate $2.99 / month',
), (
      'Monthly 3.99',
      'Donate $3.99 / month',
), (
      'Monthly 4.99',
      'Donate $4.99 / month',
), (
      'Monthly 9.99',
      'Donate $9.99 / month',
)]


US_CARD_TYPES = [(
      'Visa',
      '4242424242424242',
), (
      'Visa debit',
      '4000056655665556',
), (
      'Mastercard',
      '5555555555554444',
), (
      'Mastercard 2 series',
      '2223003122003222',
), (
      'Mastercard debit',
      '5200828282828210',
), (
      'Mastercard prepaid',
      '5105105105105100',
), (
      'American Express',
      '378282246310005',
)]


INTERNATIONAL_CARDS = [(
      'Brazil',
      '4000000760000002',
), (
      'Canada',
      '4000001240000000',
), (
      'Mexico',
      '4000004840008001',
), (
      'Austria',
      '4000000400000008',
), (
      'Belgium',
      '4000000560000004',
), (
      'Czech_Republic',
      '4000002030000002',
), (
      'Denmark',
      '4000002080000001',
), (
      'Estonia',
      '4000002330000009',
), (
      'Finland',
      '4000002460000001',
), (
      'France',
      '4000002500000003',
), (
      'Germany',
      '4000002760000016',
), (
      'Greece',
      '4000003000000030',
), (
      'Ireland',
      '4000003720000005',
), (
      'Italy',
      '4000003800000008',
), (
      'Latvia',
      '4000004280000005',
), (
      'Lithuania',
      '4000004400000000',
), (
      'Luxembourg',
      '4000004420000006',
), (
      'Netherlands',
      '4000005280000002',
), (
      'Norway',
      '4000005780000007',
), (
      'Poland',
      '4000006160000005',
), (
      'Portugal',
      '4000006200000007',
), (
      'Russian_Federation',
      '4000006430000009',
), (
      'Spain',
      '4000007240000007',
), (
      'Sweden',
      '4000007520000008',
), (
      'Switzerland',
      '4000007560000009',
), (
      'United_Kingdom',
      '4000008260000000',
), (
      'Australia',
      '4000000360000006',
), (
      'China',
      '4000001560000002',
), (
      'Hong_Kong',
      '4000003440000004',
), (
      'Malaysia',
      '4000004580000002',
), (
      'New Zealand',
      '4000005540000008',
), (
      'Singapore',
      '4000007020000003',
)]


SPECIFIC_RESPONSES_CARDS_POSITIVE = [(
      'Charge succeeds - funds added',
      '4000000000000077',
), (
      'Charge succeeds - domestic pricing',
      '4000000000000093',
), (
      'Charge succeeds - refunding a captured charge fails asynchronously - failure_reason of expired_or_canceled_card',
      '4000000000005126',
), (
      'Results in a charge with a risk_level of elevated',
      '4000000000009235',
)]


SPECIFIC_RESPONSES_CARDS_NEGATIVE = [(
      'If a CVC number is provided, the cvc_check fails',
      '4000000000000101',
      "Your card's security code is incorrect.",
), (
      'Attaching this card to a Customer object succeeds, but attempts to charge the customer fail',
      '4000000000000341',
      'Your card was declined.',
), (
      'Results in a charge with a risk_level of highest',
      '4100000000000019',
      'Your card has been declined.',
), (
      'Charge is declined with a card_declined code',
      '4000000000000002',
      'Your card was declined.',
), (
      'Card declined - insufficient_funds',
      '4000000000009995',
      'Your card has insufficient funds.',
), (
      'Card declined - lost_card',
      '4000000000009987',
      'Your card has been declined.',
), (
      'Card declined - stolen_card',
      '4000000000009979',
      'Your card has been declined.',
), (
      'Card declined - expired_card',
      '4000000000000069',
      'Your card has expired.',
), (
      'Card declined - incorrect_cvc',
      '4000000000000127',
      "Your card's security code is incorrect.",
), (
      'Card declined - processing_error',
      '4000000000000119',
      'An error occurred while processing your card. Try again in a little bit.',
), (
      'Card declined - incorrect_number',
      '4242424242424241',
      'Your card number is invalid.',
)]

