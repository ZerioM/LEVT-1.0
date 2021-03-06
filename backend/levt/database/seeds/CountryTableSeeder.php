<?php

use Illuminate\Database\Seeder;

class CountryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = [
            ['countryName' => 'Afghanistan', 'countryID' => 'AF'],
            ['countryName' => 'Åland Islands', 'countryID' => 'AX'],
            ['countryName' => 'Albania', 'countryID' => 'AL'],
            ['countryName' => 'Algeria', 'countryID' => 'DZ'],
            ['countryName' => 'American Samoa', 'countryID' => 'AS'],
            ['countryName' => 'Andorra', 'countryID' => 'AD'],
            ['countryName' => 'Angola', 'countryID' => 'AO'],
            ['countryName' => 'Anguilla', 'countryID' => 'AI'],
            ['countryName' => 'Antarctica', 'countryID' => 'AQ'],
            ['countryName' => 'Antigua and Barbuda', 'countryID' => 'AG'],
            ['countryName' => 'Argentina', 'countryID' => 'AR'],
            ['countryName' => 'Armenia', 'countryID' => 'AM'],
            ['countryName' => 'Aruba', 'countryID' => 'AW'],
            ['countryName' => 'Australia', 'countryID' => 'AU'],
            ['countryName' => 'Austria', 'countryID' => 'AT'],
            ['countryName' => 'Azerbaijan', 'countryID' => 'AZ'],
            ['countryName' => 'Bahamas', 'countryID' => 'BS'],
            ['countryName' => 'Bahrain', 'countryID' => 'BH'],
            ['countryName' => 'Bangladesh', 'countryID' => 'BD'],
            ['countryName' => 'Barbados', 'countryID' => 'BB'],
            ['countryName' => 'Belarus', 'countryID' => 'BY'],
            ['countryName' => 'Belgium', 'countryID' => 'BE'],
            ['countryName' => 'Belize', 'countryID' => 'BZ'],
            ['countryName' => 'Benin', 'countryID' => 'BJ'],
            ['countryName' => 'Bermuda', 'countryID' => 'BM'],
            ['countryName' => 'Bhutan', 'countryID' => 'BT'],
            ['countryName' => 'Bolivia', 'countryID' => 'BO'],
            ['countryName' => 'Caribbean Netherlands', 'countryID' => 'BQ'],
            ['countryName' => 'Bosnia and Herzegovina', 'countryID' => 'BA'],
            ['countryName' => 'Botswana', 'countryID' => 'BW'],
            ['countryName' => 'Bouvet Island', 'countryID' => 'BV'],
            ['countryName' => 'Brazil', 'countryID' => 'BR'],
            ['countryName' => 'British Indian Ocean Territory', 'countryID' => 'IO'],
            ['countryName' => 'Brunei', 'countryID' => 'BN'],
            ['countryName' => 'Bulgaria', 'countryID' => 'BG'],
            ['countryName' => 'Burkina Faso', 'countryID' => 'BF'],
            ['countryName' => 'Burundi', 'countryID' => 'BI'],
            ['countryName' => 'Cambodia', 'countryID' => 'KH'],
            ['countryName' => 'Cameroon', 'countryID' => 'CM'],
            ['countryName' => 'Canada', 'countryID' => 'CA'],
            ['countryName' => 'Cape Verde', 'countryID' => 'CV'],
            ['countryName' => 'Cayman Islands', 'countryID' => 'KY'],
            ['countryName' => 'Central African Republic', 'countryID' => 'CF'],
            ['countryName' => 'Chad', 'countryID' => 'TD'],
            ['countryName' => 'Chile', 'countryID' => 'CL'],
            ['countryName' => 'China', 'countryID' => 'CN'],
            ['countryName' => 'Christmas Island', 'countryID' => 'CX'],
            ['countryName' => 'Cocos (Keeling) Islands', 'countryID' => 'CC'],
            ['countryName' => 'Colombia', 'countryID' => 'CO'],
            ['countryName' => 'Comoros', 'countryID' => 'KM'],
            ['countryName' => 'Congo', 'countryID' => 'CG'],
            ['countryName' => 'Congo, the Democratic Republic of the', 'countryID' => 'CD'],
            ['countryName' => 'Cook Islands', 'countryID' => 'CK'],
            ['countryName' => 'Costa Rica', 'countryID' => 'CR'],
            ['countryName' => 'Côte d\'Ivoire', 'countryID' => 'CI'],
            ['countryName' => 'Croatia', 'countryID' => 'HR'],
            ['countryName' => 'Cuba', 'countryID' => 'CU'],
            ['countryName' => 'Curaçao', 'countryID' => 'CW'],
            ['countryName' => 'Cyprus', 'countryID' => 'CY'],
            ['countryName' => 'Czech Republic', 'countryID' => 'CZ'],
            ['countryName' => 'Denmark', 'countryID' => 'DK'],
            ['countryName' => 'Djibouti', 'countryID' => 'DJ'],
            ['countryName' => 'Dominica', 'countryID' => 'DM'],
            ['countryName' => 'Dominican Republic', 'countryID' => 'DO'],
            ['countryName' => 'Ecuador', 'countryID' => 'EC'],
            ['countryName' => 'Egypt', 'countryID' => 'EG'],
            ['countryName' => 'El Salvador', 'countryID' => 'SV'],
            ['countryName' => 'Equatorial Guinea', 'countryID' => 'GQ'],
            ['countryName' => 'Eritrea', 'countryID' => 'ER'],
            ['countryName' => 'Estonia', 'countryID' => 'EE'],
            ['countryName' => 'Ethiopia', 'countryID' => 'ET'],
            ['countryName' => 'Falkland Islands (Islas Malvinas)', 'countryID' => 'FK'],
            ['countryName' => 'Faroe Islands', 'countryID' => 'FO'],
            ['countryName' => 'Fiji', 'countryID' => 'FJ'],
            ['countryName' => 'Finland', 'countryID' => 'FI'],
            ['countryName' => 'France', 'countryID' => 'FR'],
            ['countryName' => 'French Guiana', 'countryID' => 'GF'],
            ['countryName' => 'French Polynesia', 'countryID' => 'PF'],
            ['countryName' => 'French Southern and Antarctic Lands', 'countryID' => 'TF'],
            ['countryName' => 'Gabon', 'countryID' => 'GA'],
            ['countryName' => 'Gambia', 'countryID' => 'GM'],
            ['countryName' => 'Georgia', 'countryID' => 'GE'],
            ['countryName' => 'Germany', 'countryID' => 'DE'],
            ['countryName' => 'Ghana', 'countryID' => 'GH'],
            ['countryName' => 'Gibraltar', 'countryID' => 'GI'],
            ['countryName' => 'Greece', 'countryID' => 'GR'],
            ['countryName' => 'Greenland', 'countryID' => 'GL'],
            ['countryName' => 'Grenada', 'countryID' => 'GD'],
            ['countryName' => 'Guadeloupe', 'countryID' => 'GP'],
            ['countryName' => 'Guam', 'countryID' => 'GU'],
            ['countryName' => 'Guatemala', 'countryID' => 'GT'],
            ['countryName' => 'Guernsey', 'countryID' => 'GG'],
            ['countryName' => 'Guinea', 'countryID' => 'GN'],
            ['countryName' => 'Guinea-Bissau', 'countryID' => 'GW'],
            ['countryName' => 'Guyana', 'countryID' => 'GY'],
            ['countryName' => 'Haiti', 'countryID' => 'HT'],
            ['countryName' => 'Heard Island and McDonald Islands', 'countryID' => 'HM'],
            ['countryName' => '00120 Vatican City', 'countryID' => 'VA'],
            ['countryName' => 'Honduras', 'countryID' => 'HN'],
            ['countryName' => 'Hong Kong', 'countryID' => 'HK'],
            ['countryName' => 'Hungary', 'countryID' => 'HU'],
            ['countryName' => 'Iceland', 'countryID' => 'IS'],
            ['countryName' => 'India', 'countryID' => 'IN'],
            ['countryName' => 'Indonesia', 'countryID' => 'ID'],
            ['countryName' => 'Iran', 'countryID' => 'IR'],
            ['countryName' => 'Iraq', 'countryID' => 'IQ'],
            ['countryName' => 'Ireland', 'countryID' => 'IE'],
            ['countryName' => 'Isle of Man', 'countryID' => 'IM'],
            ['countryName' => 'Israel', 'countryID' => 'IL'],
            ['countryName' => 'Italy', 'countryID' => 'IT'],
            ['countryName' => 'Jamaica', 'countryID' => 'JM'],
            ['countryName' => 'Japan', 'countryID' => 'JP'],
            ['countryName' => 'Jersey', 'countryID' => 'JE'],
            ['countryName' => 'Jordan', 'countryID' => 'JO'],
            ['countryName' => 'Kazakhstan', 'countryID' => 'KZ'],
            ['countryName' => 'Kenya', 'countryID' => 'KE'],
            ['countryName' => 'Kiribati', 'countryID' => 'KI'],
            ['countryName' => 'North Korea', 'countryID' => 'KP'],
            ['countryName' => 'South Korea', 'countryID' => 'KR'],
            ['countryName' => 'Kuwait', 'countryID' => 'KW'],
            ['countryName' => 'Kyrgyzstan', 'countryID' => 'KG'],
            ['countryName' => 'Laos', 'countryID' => 'LA'],
            ['countryName' => 'Latvia', 'countryID' => 'LV'],
            ['countryName' => 'Lebanon', 'countryID' => 'LB'],
            ['countryName' => 'Lesotho', 'countryID' => 'LS'],
            ['countryName' => 'Liberia', 'countryID' => 'LR'],
            ['countryName' => 'Libya', 'countryID' => 'LY'],
            ['countryName' => 'Liechtenstein', 'countryID' => 'LI'],
            ['countryName' => 'Lithuania', 'countryID' => 'LT'],
            ['countryName' => 'Luxembourg', 'countryID' => 'LU'],
            ['countryName' => 'Macao', 'countryID' => 'MO'],
            ['countryName' => 'North Macedonia', 'countryID' => 'MK'],
            ['countryName' => 'Madagascar', 'countryID' => 'MG'],
            ['countryName' => 'Malawi', 'countryID' => 'MW'],
            ['countryName' => 'Malaysia', 'countryID' => 'MY'],
            ['countryName' => 'Maldives', 'countryID' => 'MV'],
            ['countryName' => 'Mali', 'countryID' => 'ML'],
            ['countryName' => 'Malta', 'countryID' => 'MT'],
            ['countryName' => 'Marshall Islands', 'countryID' => 'MH'],
            ['countryName' => 'Martinique', 'countryID' => 'MQ'],
            ['countryName' => 'Mauritania', 'countryID' => 'MR'],
            ['countryName' => 'Mauritius', 'countryID' => 'MU'],
            ['countryName' => 'Mayotte', 'countryID' => 'YT'],
            ['countryName' => 'Mexico', 'countryID' => 'MX'],
            ['countryName' => 'Federated States of Micronesia', 'countryID' => 'FM'],
            ['countryName' => 'Moldova', 'countryID' => 'MD'],
            ['countryName' => 'Monaco', 'countryID' => 'MC'],
            ['countryName' => 'Mongolia', 'countryID' => 'MN'],
            ['countryName' => 'Montenegro', 'countryID' => 'ME'],
            ['countryName' => 'Montserrat', 'countryID' => 'MS'],
            ['countryName' => 'Morocco', 'countryID' => 'MA'],
            ['countryName' => 'Mozambique', 'countryID' => 'MZ'],
            ['countryName' => 'Myanmar', 'countryID' => 'MM'],
            ['countryName' => 'Namibia', 'countryID' => 'NA'],
            ['countryName' => 'Nauru', 'countryID' => 'NR'],
            ['countryName' => 'Nepal', 'countryID' => 'NP'],
            ['countryName' => 'Netherlands', 'countryID' => 'NL'],
            ['countryName' => 'New Caledonia', 'countryID' => 'NC'],
            ['countryName' => 'New Zealand', 'countryID' => 'NZ'],
            ['countryName' => 'Nicaragua', 'countryID' => 'NI'],
            ['countryName' => 'Niger', 'countryID' => 'NE'],
            ['countryName' => 'Nigeria', 'countryID' => 'NG'],
            ['countryName' => 'Niue', 'countryID' => 'NU'],
            ['countryName' => 'Norfolk Island', 'countryID' => 'NF'],
            ['countryName' => 'Northern Mariana Islands', 'countryID' => 'MP'],
            ['countryName' => 'Norway', 'countryID' => 'NO'],
            ['countryName' => 'Oman', 'countryID' => 'OM'],
            ['countryName' => 'Pakistan', 'countryID' => 'PK'],
            ['countryName' => 'Palau', 'countryID' => 'PW'],
            ['countryName' => 'Palestine, State of', 'countryID' => 'PS'],
            ['countryName' => 'Panama', 'countryID' => 'PA'],
            ['countryName' => 'Papua New Guinea', 'countryID' => 'PG'],
            ['countryName' => 'Paraguay', 'countryID' => 'PY'],
            ['countryName' => 'Peru', 'countryID' => 'PE'],
            ['countryName' => 'Philippines', 'countryID' => 'PH'],
            ['countryName' => 'Pitcairn', 'countryID' => 'PN'],
            ['countryName' => 'Poland', 'countryID' => 'PL'],
            ['countryName' => 'Portugal', 'countryID' => 'PT'],
            ['countryName' => 'Puerto Rico', 'countryID' => 'PR'],
            ['countryName' => 'Qatar', 'countryID' => 'QA'],
            ['countryName' => 'Réunion', 'countryID' => 'RE'],
            ['countryName' => 'Romania', 'countryID' => 'RO'],
            ['countryName' => 'Russia', 'countryID' => 'RU'],
            ['countryName' => 'Rwanda', 'countryID' => 'RW'],
            ['countryName' => 'Saint Barthélemy', 'countryID' => 'BL'],
            ['countryName' => 'Ascension and Tristan da Cunha', 'countryID' => 'SH'],
            ['countryName' => 'Saint Kitts & Nevis', 'countryID' => 'KN'],
            ['countryName' => 'Saint Lucia', 'countryID' => 'LC'],
            ['countryName' => 'St Martin', 'countryID' => 'MF'],
            ['countryName' => 'Saint Pierre and Miquelon', 'countryID' => 'PM'],
            ['countryName' => 'Saint Vincent and the Grenadines', 'countryID' => 'VC'],
            ['countryName' => 'Samoa', 'countryID' => 'WS'],
            ['countryName' => 'San Marino', 'countryID' => 'SM'],
            ['countryName' => 'São Tomé and Príncipe', 'countryID' => 'ST'],
            ['countryName' => 'Saudi Arabia', 'countryID' => 'SA'],
            ['countryName' => 'Senegal', 'countryID' => 'SN'],
            ['countryName' => 'Serbia', 'countryID' => 'RS'],
            ['countryName' => 'Seychelles', 'countryID' => 'SC'],
            ['countryName' => 'Sierra Leone', 'countryID' => 'SL'],
            ['countryName' => 'Singapore', 'countryID' => 'SG'],
            ['countryName' => 'Sint Maarten', 'countryID' => 'SX'],
            ['countryName' => 'Slovakia', 'countryID' => 'SK'],
            ['countryName' => 'Slovenia', 'countryID' => 'SI'],
            ['countryName' => 'Solomon Islands', 'countryID' => 'SB'],
            ['countryName' => 'Somalia', 'countryID' => 'SO'],
            ['countryName' => 'South Africa', 'countryID' => 'ZA'],
            ['countryName' => 'South Georgia and the South Sandwich Islands', 'countryID' => 'GS'],
            ['countryName' => 'South Sudan', 'countryID' => 'SS'],
            ['countryName' => 'Spain', 'countryID' => 'ES'],
            ['countryName' => 'Sri Lanka', 'countryID' => 'LK'],
            ['countryName' => 'Sudan', 'countryID' => 'SD'],
            ['countryName' => 'Suriname', 'countryID' => 'SR'],
            ['countryName' => 'Svalbard and Jan Mayen', 'countryID' => 'SJ'],
            ['countryName' => 'Swaziland', 'countryID' => 'SZ'],
            ['countryName' => 'Sweden', 'countryID' => 'SE'],
            ['countryName' => 'Switzerland', 'countryID' => 'CH'],
            ['countryName' => 'Syria', 'countryID' => 'SY'],
            ['countryName' => 'Taiwan', 'countryID' => 'TW'],
            ['countryName' => 'Tajikistan', 'countryID' => 'TJ'],
            ['countryName' => 'Tanzania', 'countryID' => 'TZ'],
            ['countryName' => 'Thailand', 'countryID' => 'TH'],
            ['countryName' => 'Timor-Leste', 'countryID' => 'TL'],
            ['countryName' => 'Togo', 'countryID' => 'TG'],
            ['countryName' => 'Tokelau', 'countryID' => 'TK'],
            ['countryName' => 'Tonga', 'countryID' => 'TO'],
            ['countryName' => 'Trinidad and Tobago', 'countryID' => 'TT'],
            ['countryName' => 'Tunisia', 'countryID' => 'TN'],
            ['countryName' => 'Turkey', 'countryID' => 'TR'],
            ['countryName' => 'Turkmenistan', 'countryID' => 'TM'],
            ['countryName' => 'Turks and Caicos Islands', 'countryID' => 'TC'],
            ['countryName' => 'Tuvalu', 'countryID' => 'TV'],
            ['countryName' => 'Uganda', 'countryID' => 'UG'],
            ['countryName' => 'Ukraine', 'countryID' => 'UA'],
            ['countryName' => 'United Arab Emirates', 'countryID' => 'AE'],
            ['countryName' => 'United Kingdom', 'countryID' => 'GB'],
            ['countryName' => 'USA', 'countryID' => 'US'],
            ['countryName' => 'United States Minor Outlying Islands', 'countryID' => 'UM'],
            ['countryName' => 'Uruguay', 'countryID' => 'UY'],
            ['countryName' => 'Uzbekistan', 'countryID' => 'UZ'],
            ['countryName' => 'Vanuatu', 'countryID' => 'VU'],
            ['countryName' => 'Venezuela, Bolivarian Republic of', 'countryID' => 'VE'],
            ['countryName' => 'Viet Nam', 'countryID' => 'VN'],
            ['countryName' => 'British Virgin Islands', 'countryID' => 'VG'],
            ['countryName' => 'U.S. Virgin Islands.', 'countryID' => 'VI'],
            ['countryName' => 'Wallis and Futuna', 'countryID' => 'WF'],
            ['countryName' => 'Western Sahara', 'countryID' => 'EH'],
            ['countryName' => 'Yemen', 'countryID' => 'YE'],
            ['countryName' => 'Zambia', 'countryID' => 'ZM'],
            ['countryName' => 'Zimbabwe', 'countryID' => 'ZW'],
        ];
        DB::table('countries')->insert($countries);
    }
}
