// Enhanced tracking utilities for Omnibug
export const trackEvent = (eventName: string, parameters: any = {}) => {
  // Track with gtag
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
  
  // Push to dataLayer for GTM/Omnibug tracking
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...parameters
    });
  }
};

// Track page views
export const trackPageView = (pageName: string, path: string) => {
  trackEvent('page_view', {
    event_category: 'navigation',
    page_title: `TeaVault - ${pageName}`,
    page_location: window.location.origin + path,
    page_path: path
  });
};

// Track form interactions
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', {
    event_category: 'engagement',
    form_name: formName,
    event_label: 'form_interaction_start'
  });
};

export const trackFormSubmit = (formName: string, formData: any) => {
  trackEvent('form_submit', {
    event_category: 'engagement',
    form_name: formName,
    event_label: 'form_completed',
    form_fields_filled: Object.keys(formData).length
  });
};

// Track downloads
export const trackDownloadStart = (fileName: string, fileType: string) => {
  trackEvent('file_download_start', {
    event_category: 'engagement',
    event_label: 'download_initiated',
    file_name: fileName,
    file_extension: fileType,
    download_method: 'direct_link'
  });
};

export const trackDownloadComplete = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: 'download_completed',
    file_name: fileName,
    file_extension: fileType
  });
};

// Track outbound links
export const trackOutboundClick = (platform: string, url: string) => {
  trackEvent('click', {
    event_category: 'outbound_link',
    event_label: platform,
    link_url: url,
    link_domain: new URL(url).hostname,
    link_type: 'external'
  });
};

// Track e-commerce events
export const trackAddToCart = (product: any) => {
  trackEvent('add_to_cart', {
    event_category: 'ecommerce',
    event_label: product.name,
    value: product.price,
    currency: 'USD',
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      category: 'Tea',
      quantity: 1,
      price: product.price
    }]
  });
};

// Track navigation clicks
export const trackNavigation = (destination: string, method: string = 'menu') => {
  trackEvent('navigation_click', {
    event_category: 'navigation',
    event_label: destination,
    navigation_method: method,
    destination_page: destination
  });
};

// Track video events
export const trackVideoPlay = (videoTitle: string, videoId: string, currentTime: number = 0) => {
  trackEvent('video_play', {
    event_category: 'video',
    event_label: videoTitle,
    video_id: videoId,
    video_title: videoTitle,
    video_current_time: Math.round(currentTime),
    engagement_time_msec: Math.round(currentTime * 1000)
  });
};

export const trackVideoPause = (videoTitle: string, videoId: string, currentTime: number, duration: number) => {
  const percentComplete = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
  
  trackEvent('video_pause', {
    event_category: 'video',
    event_label: videoTitle,
    video_id: videoId,
    video_title: videoTitle,
    video_current_time: Math.round(currentTime),
    video_duration: Math.round(duration),
    video_percent: percentComplete,
    engagement_time_msec: Math.round(currentTime * 1000)
  });
};

export const trackVideoProgress = (videoTitle: string, videoId: string, currentTime: number, duration: number, milestone: number) => {
  trackEvent('video_progress', {
    event_category: 'video',
    event_label: `${videoTitle} - ${milestone}% complete`,
    video_id: videoId,
    video_title: videoTitle,
    video_current_time: Math.round(currentTime),
    video_duration: Math.round(duration),
    video_percent: milestone,
    progress_milestone: milestone,
    engagement_time_msec: Math.round(currentTime * 1000)
  });
};

export const trackVideoComplete = (videoTitle: string, videoId: string, duration: number) => {
  trackEvent('video_complete', {
    event_category: 'video',
    event_label: videoTitle,
    video_id: videoId,
    video_title: videoTitle,
    video_duration: Math.round(duration),
    video_percent: 100,
    engagement_time_msec: Math.round(duration * 1000)
  });
};

export const trackVideoSeek = (videoTitle: string, videoId: string, fromTime: number, toTime: number) => {
  trackEvent('video_seek', {
    event_category: 'video',
    event_label: videoTitle,
    video_id: videoId,
    video_title: videoTitle,
    video_current_time: Math.round(toTime),
    seek_from_time: Math.round(fromTime),
    seek_to_time: Math.round(toTime)
  });
};