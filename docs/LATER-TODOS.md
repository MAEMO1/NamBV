# Google Tag Manager Setup Gids

Deze gids beschrijft de complete GTM & GA4 setup voor NAM Construction website.

---

## 1. Account & Container Setup

### GTM Account aanmaken
1. Ga naar [tagmanager.google.com](https://tagmanager.google.com)
2. Klik op "Account maken"
3. Vul in:
   - Account naam: `NAM Construction`
   - Land: `België`
4. Container maken:
   - Container naam: `namconstruction.be`
   - Target platform: `Web`
5. Accepteer de servicevoorwaarden

### Container ID configureren
1. Kopieer de Container ID (format: `GTM-XXXXXXX`)
2. Voeg toe aan `.env.local`:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```
3. Herstart de development server

---

## 2. GA4 Property Setup

### GA4 Property aanmaken
1. Ga naar [analytics.google.com](https://analytics.google.com)
2. Klik op "Admin" (tandwiel icoon)
3. Klik op "Create Property"
4. Vul in:
   - Property naam: `NAM Construction`
   - Reporting time zone: `Belgium`
   - Currency: `Euro (€)`
5. Klik op "Create"

### Data Stream aanmaken
1. Ga naar "Data Streams" onder de property
2. Klik op "Add stream" → "Web"
3. Vul in:
   - Website URL: `https://namconstruction.be`
   - Stream naam: `NAM Construction Website`
4. Kopieer de **Measurement ID** (format: `G-XXXXXXXXXX`)

---

## 3. GTM Tags Configureren

### 3.1 GA4 Configuration Tag

**Tag naam:** `GA4 - Configuration`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Configuration |
| Measurement ID | `G-XXXXXXXXXX` |
| Send page view | ✓ Enabled |

**Trigger:** All Pages

---

### 3.2 CTA Click Tag

**Tag naam:** `GA4 - CTA Click`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `cta_click` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| cta_text | `{{DLV - cta_text}}` |
| cta_location | `{{DLV - cta_location}}` |
| cta_destination | `{{DLV - cta_destination}}` |

**Trigger:** Custom Event - `cta_click`

---

### 3.3 Form Start Tag

**Tag naam:** `GA4 - Form Start`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `form_start` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| form_name | `{{DLV - form_name}}` |
| form_location | `{{DLV - form_location}}` |

**Trigger:** Custom Event - `form_start`

---

### 3.4 Form Progress Tag

**Tag naam:** `GA4 - Form Progress`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `form_progress` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| form_name | `{{DLV - form_name}}` |
| field_name | `{{DLV - field_name}}` |
| fields_completed | `{{DLV - fields_completed}}` |
| total_fields | `{{DLV - total_fields}}` |
| completion_percentage | `{{DLV - completion_percentage}}` |

**Trigger:** Custom Event - `form_progress`

---

### 3.5 Form Submit Tag

**Tag naam:** `GA4 - Form Submit`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `form_submit` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| form_name | `{{DLV - form_name}}` |
| form_location | `{{DLV - form_location}}` |

**Trigger:** Custom Event - `form_submit`

---

### 3.6 Form Success Tag (Conversion)

**Tag naam:** `GA4 - Form Success (Conversion)`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `generate_lead` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| form_name | `{{DLV - form_name}}` |
| lead_id | `{{DLV - lead_id}}` |

**Trigger:** Custom Event - `form_success`

> **Belangrijk:** Markeer deze event als conversie in GA4!

---

### 3.7 Form Error Tag

**Tag naam:** `GA4 - Form Error`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `form_error` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| form_name | `{{DLV - form_name}}` |
| error_type | `{{DLV - error_type}}` |
| error_field | `{{DLV - error_field}}` |

**Trigger:** Custom Event - `form_error`

---

### 3.8 Scroll Depth Tag

**Tag naam:** `GA4 - Scroll Depth`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `scroll` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| percent_scrolled | `{{DLV - percent_scrolled}}` |
| page_location | `{{DLV - page_location}}` |

**Trigger:** Custom Event - `scroll_depth`

---

### 3.9 Click to Call Tag

**Tag naam:** `GA4 - Click to Call`

| Veld | Waarde |
|------|--------|
| Tag Type | Google Analytics: GA4 Event |
| Configuration Tag | GA4 - Configuration |
| Event Name | `click_to_call` |

**Event Parameters:**
| Parameter | Value |
|-----------|-------|
| phone_number | `{{DLV - phone_number}}` |
| click_location | `{{DLV - click_location}}` |

**Trigger:** Custom Event - `click_to_call`

---

## 4. Data Layer Variables

Maak de volgende Data Layer Variables aan in GTM:

| Variable Naam | Data Layer Variable Name |
|---------------|-------------------------|
| DLV - cta_text | cta_text |
| DLV - cta_location | cta_location |
| DLV - cta_destination | cta_destination |
| DLV - form_name | form_name |
| DLV - form_location | form_location |
| DLV - field_name | field_name |
| DLV - fields_completed | fields_completed |
| DLV - total_fields | total_fields |
| DLV - completion_percentage | completion_percentage |
| DLV - lead_id | lead_id |
| DLV - error_type | error_type |
| DLV - error_field | error_field |
| DLV - percent_scrolled | percent_scrolled |
| DLV - page_location | page_location |
| DLV - phone_number | phone_number |
| DLV - click_location | click_location |

---

## 5. Custom Event Triggers

Maak de volgende Custom Event triggers aan:

| Trigger Naam | Event Name |
|--------------|------------|
| CE - CTA Click | cta_click |
| CE - Form Start | form_start |
| CE - Form Progress | form_progress |
| CE - Form Submit | form_submit |
| CE - Form Success | form_success |
| CE - Form Error | form_error |
| CE - Scroll Depth | scroll_depth |
| CE - Click to Call | click_to_call |

---

## 6. GA4 Conversies Configureren

In GA4, markeer deze events als conversies:

1. Ga naar Admin → Events
2. Toggle "Mark as conversion" voor:
   - `generate_lead` (form success)
   - `click_to_call`

---

## 7. QA Checklist

### Pre-Launch Testing

- [ ] **GTM Preview Mode**
  - [ ] Alle tags firen correct
  - [ ] Data Layer bevat juiste parameters
  - [ ] Geen JavaScript errors

- [ ] **GA4 DebugView**
  - [ ] Events komen binnen
  - [ ] Parameters zijn correct
  - [ ] User ID tracking werkt (indien geïmplementeerd)

### Event Testing

- [ ] **Page Views**
  - [ ] Homepage laadt page_view
  - [ ] Navigatie tussen pagina's tracked

- [ ] **CTA Clicks**
  - [ ] Hero CTA tracked met location="hero"
  - [ ] Footer CTA tracked met location="footer"
  - [ ] Alle CTAs hebben juiste destination

- [ ] **Form Tracking**
  - [ ] form_start bij eerste veld interactie
  - [ ] form_progress bij stap wisseling
  - [ ] form_submit bij verzenden
  - [ ] form_success/form_error na response

- [ ] **Scroll Tracking**
  - [ ] 25%, 50%, 75%, 90% thresholds werken
  - [ ] Geen duplicate events

- [ ] **Click to Call**
  - [ ] Tel: links tracken correct
  - [ ] Location parameter klopt

### Cross-Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari
- [ ] Chrome Android

---

## 8. Implemented Events Reference

De volgende events zijn geïmplementeerd in de codebase:

```typescript
// src/lib/analytics.ts

// CTA Tracking
trackCTAClick(ctaText, ctaLocation, ctaDestination)
// Locations: 'hero' | 'header' | 'footer' | 'cta-section' | 'sidebar' | 'floating' | 'inline'

// Form Tracking
trackFormStart(formName, formLocation)
trackFormProgress(formName, fieldName, fieldsCompleted, totalFields)
trackFormSubmit(formName, formLocation)
trackFormSuccess(formName, leadId?)
trackFormError(formName, errorType, errorField?)
// Form names: 'offerte' | 'contact' | 'afspraak' | 'newsletter'

// Scroll Tracking
trackScrollDepth(percentScrolled, pageLocation)
// Thresholds: 25, 50, 75, 90

// Phone Tracking
trackClickToCall(phoneNumber, clickLocation)
```

---

## 9. Troubleshooting

### Events komen niet binnen in GA4

1. Check of GTM container ID correct is in `.env.local`
2. Verify dat de site herbuild is na env change
3. Open browser DevTools → Console → type `dataLayer`
4. Check of events in de array staan

### Duplicate events

1. Check of useEffect dependencies correct zijn
2. Verify dat tracking functions niet dubbel worden aangeroepen
3. Check React StrictMode (dubbele renders in development)

### Parameters ontbreken

1. Check spelling in Data Layer Variable configuratie
2. Verify dat de dataLayer.push het juiste object format heeft
3. Test met GTM Preview mode

---

## 10. Volgende Stappen (Optioneel)

### Enhanced E-commerce (indien relevant)
- Product impressions
- Add to cart tracking
- Checkout funnel

### User ID Tracking
- Cross-device tracking
- Authenticated user sessions

### Custom Dimensions
- Klant segment
- Project type
- Regio

### Remarketing
- Google Ads remarketing tag
- Facebook Pixel
- LinkedIn Insight Tag

---

**Document versie:** 1.0
**Laatst bijgewerkt:** Januari 2025
**Auteur:** Claude Code
