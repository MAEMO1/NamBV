/**
 * Analytics Tracking Utilities
 *
 * GA4-compatible event tracking via GTM dataLayer
 *
 * Setup required:
 * 1. Create GTM account at tagmanager.google.com
 * 2. Add GTM container snippet to layout.tsx
 * 3. Configure GA4 tag in GTM with these custom events
 */

// Ensure dataLayer exists
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// Initialize dataLayer
export function initDataLayer() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
}

// Generic event push
function pushEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, params);
    }
  }
}

// ============================================
// PAGE & NAVIGATION EVENTS
// ============================================

export function trackPageView(pageLocation: string, pageTitle: string) {
  pushEvent('page_view', {
    page_location: pageLocation,
    page_title: pageTitle,
    page_referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}

export function trackScrollDepth(percentScrolled: number, pageLocation: string) {
  pushEvent('scroll', {
    percent_scrolled: percentScrolled,
    page_location: pageLocation,
  });
}

// ============================================
// CTA & CLICK EVENTS
// ============================================

export type CTALocation =
  | 'header'
  | 'hero'
  | 'services'
  | 'projects'
  | 'cta_banner'
  | 'footer'
  | 'contact_section'
  | 'floating';

export function trackCTAClick(
  ctaText: string,
  ctaLocation: CTALocation,
  ctaDestination: string
) {
  pushEvent('cta_click', {
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  });
}

export function trackClickToCall(phoneNumber: string, clickLocation: CTALocation) {
  pushEvent('click_to_call', {
    phone_number: phoneNumber,
    click_location: clickLocation,
  });
}

export function trackClickToEmail(emailAddress: string, clickLocation: CTALocation) {
  pushEvent('click_to_email', {
    email_address: emailAddress,
    click_location: clickLocation,
  });
}

export function trackClickToWhatsApp(phoneNumber: string, clickLocation: CTALocation) {
  pushEvent('click_to_whatsapp', {
    phone_number: phoneNumber,
    click_location: clickLocation,
  });
}

export function trackOutboundLink(linkUrl: string, linkText: string) {
  pushEvent('outbound_link', {
    link_url: linkUrl,
    link_text: linkText,
  });
}

// ============================================
// FORM EVENTS
// ============================================

export type FormName = 'offerte' | 'contact' | 'afspraak' | 'newsletter';

export function trackFormStart(formName: FormName, formLocation: string) {
  pushEvent('form_start', {
    form_name: formName,
    form_location: formLocation,
  });
}

export function trackFormProgress(
  formName: FormName,
  fieldName: string,
  fieldsCompleted: number,
  totalFields: number
) {
  pushEvent('form_progress', {
    form_name: formName,
    field_name: fieldName,
    fields_completed: fieldsCompleted,
    total_fields: totalFields,
    completion_percentage: Math.round((fieldsCompleted / totalFields) * 100),
  });
}

export function trackFormSubmit(formName: FormName, formLocation: string) {
  pushEvent('form_submit', {
    form_name: formName,
    form_location: formLocation,
  });
}

export function trackFormSuccess(formName: FormName, leadId?: string) {
  pushEvent('form_success', {
    form_name: formName,
    lead_id: leadId || 'unknown',
  });
}

export function trackFormError(
  formName: FormName,
  errorType: 'validation' | 'server' | 'network',
  errorField?: string,
  errorMessage?: string
) {
  pushEvent('form_error', {
    form_name: formName,
    error_type: errorType,
    error_field: errorField,
    error_message: errorMessage,
  });
}

export function trackFormAbandonment(
  formName: FormName,
  lastFieldCompleted: string,
  fieldsCompleted: number,
  totalFields: number
) {
  pushEvent('form_abandonment', {
    form_name: formName,
    last_field_completed: lastFieldCompleted,
    fields_completed: fieldsCompleted,
    total_fields: totalFields,
    completion_percentage: Math.round((fieldsCompleted / totalFields) * 100),
  });
}

// ============================================
// ENGAGEMENT EVENTS
// ============================================

export function trackServiceView(serviceName: string, serviceCategory: string) {
  pushEvent('service_view', {
    service_name: serviceName,
    service_category: serviceCategory,
  });
}

export function trackProjectView(projectName: string, projectCategory: string) {
  pushEvent('project_view', {
    project_name: projectName,
    project_category: projectCategory,
  });
}

export function trackGalleryInteraction(
  action: 'open' | 'next' | 'prev' | 'close',
  imageIndex: number,
  projectName: string
) {
  pushEvent('gallery_interaction', {
    action,
    image_index: imageIndex,
    project_name: projectName,
  });
}

// ============================================
// BOOKING/CALENDAR EVENTS
// ============================================

export function trackCalendarView(availableSlots: number) {
  pushEvent('calendar_view', {
    available_slots: availableSlots,
  });
}

export function trackSlotSelect(date: string, time: string) {
  pushEvent('slot_select', {
    selected_date: date,
    selected_time: time,
  });
}

export function trackBookingSuccess(bookingId: string, bookingDate: string, bookingTime: string) {
  pushEvent('booking_success', {
    booking_id: bookingId,
    booking_date: bookingDate,
    booking_time: bookingTime,
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Track time on page - call on unmount
 */
export function trackTimeOnPage(pageLocation: string, timeSeconds: number) {
  pushEvent('time_on_page', {
    page_location: pageLocation,
    time_seconds: timeSeconds,
    time_bucket: timeSeconds < 10 ? '0-10s'
      : timeSeconds < 30 ? '10-30s'
      : timeSeconds < 60 ? '30-60s'
      : timeSeconds < 180 ? '1-3min'
      : '3min+',
  });
}

/**
 * Enhanced link click handler - auto-detects link type and tracks appropriately
 */
export function handleLinkClick(
  href: string,
  text: string,
  location: CTALocation
) {
  if (href.startsWith('tel:')) {
    trackClickToCall(href.replace('tel:', ''), location);
  } else if (href.startsWith('mailto:')) {
    trackClickToEmail(href.replace('mailto:', ''), location);
  } else if (href.startsWith('https://wa.me')) {
    trackClickToWhatsApp(href, location);
  } else if (href.startsWith('http') && !href.includes(window.location.hostname)) {
    trackOutboundLink(href, text);
  } else if (href === '/offerte' || href === '/afspraak' || href === '/contact') {
    trackCTAClick(text, location, href);
  }
}
