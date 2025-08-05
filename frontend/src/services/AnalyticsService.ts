// Type declarations for external analytics libraries
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    mixpanel: any;
  }
}

declare const gtag: (...args: any[]) => void;
declare const mixpanel: any;

// Comprehensive Analytics Service
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  context?: Record<string, any>;
}

export interface ErrorEvent {
  error: Error;
  context: Record<string, any>;
  userId?: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;
  private userId?: string;
  private sessionId: string;
  private eventQueue: AnalyticsEvent[] = [];
  private performanceQueue: PerformanceMetric[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializePerformanceMonitoring();
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Initialize analytics
  async initialize(userId?: string): Promise<void> {
    this.userId = userId;
    this.isInitialized = true;

    // Initialize third-party analytics
    await this.initializeGoogleAnalytics();
    await this.initializeHotjar();
    await this.initializeMixpanel();

    // Send queued events
    await this.flushEventQueue();

    console.log('Analytics initialized for user:', userId);
  }

  // Track user events
  track(event: Omit<AnalyticsEvent, 'userId'>): void {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      userId: this.userId
    };

    if (this.isInitialized) {
      this.sendEvent(analyticsEvent);
    } else {
      this.eventQueue.push(analyticsEvent);
    }
  }

  // Track page views
  trackPageView(page: string, title?: string): void {
    this.track({
      event: 'page_view',
      category: 'navigation',
      action: 'view',
      label: page,
      metadata: {
        title,
        timestamp: new Date(),
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }
    });

    // Track with Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID!, {
        page_title: title,
        page_location: window.location.href
      });
    }
  }

  // Track user actions
  trackAction(action: string, category: string, label?: string, value?: number): void {
    this.track({
      event: 'user_action',
      category,
      action,
      label,
      value,
      metadata: {
        timestamp: new Date(),
        sessionId: this.sessionId
      }
    });
  }

  // Track business metrics
  trackBusinessMetric(metric: string, value: number, unit: string, context?: Record<string, any>): void {
    this.track({
      event: 'business_metric',
      category: 'business',
      action: metric,
      value,
      metadata: {
        unit,
        context,
        timestamp: new Date()
      }
    });
  }

  // Track performance metrics
  trackPerformance(metric: PerformanceMetric): void {
    this.performanceQueue.push(metric);

    // Send performance data periodically
    if (this.performanceQueue.length >= 10) {
      this.sendPerformanceData();
    }
  }

  // Track errors
  trackError(error: Error, context: Record<string, any> = {}, severity: ErrorEvent['severity'] = 'medium'): void {
    const errorEvent: ErrorEvent = {
      error,
      context: {
        ...context,
        sessionId: this.sessionId,
        url: window.location.href,
        userAgent: navigator.userAgent
      },
      userId: this.userId,
      timestamp: new Date(),
      severity
    };

    // Send to error tracking service
    this.sendErrorData(errorEvent);

    // Also track as analytics event
    this.track({
      event: 'error',
      category: 'error',
      action: error.name,
      label: error.message,
      metadata: {
        stack: error.stack,
        context,
        severity
      }
    });
  }

  // Track conversion events
  trackConversion(conversionType: string, value?: number): void {
    this.track({
      event: 'conversion',
      category: 'conversion',
      action: conversionType,
      value,
      metadata: {
        timestamp: new Date(),
        sessionId: this.sessionId
      }
    });

    // Send to conversion tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: process.env.REACT_APP_GA_CONVERSION_ID,
        value: value,
        currency: 'USD'
      });
    }
  }

  // Track e-waste specific metrics
  trackEWasteMetric(action: string, deviceType?: string, weight?: number, value?: number): void {
    this.track({
      event: 'ewaste_action',
      category: 'ewaste',
      action,
      label: deviceType,
      value,
      metadata: {
        deviceType,
        weight,
        monetaryValue: value,
        timestamp: new Date()
      }
    });
  }

  // Track user engagement
  trackEngagement(action: string, timeSpent?: number): void {
    this.track({
      event: 'engagement',
      category: 'engagement',
      action,
      value: timeSpent,
      metadata: {
        timestamp: new Date(),
        sessionId: this.sessionId
      }
    });
  }

  // Private methods
  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Send to your analytics API
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });

      // Send to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value
        });
      }

      // Send to Mixpanel
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track(event.event, {
          category: event.category,
          action: event.action,
          label: event.label,
          value: event.value,
          ...event.metadata
        });
      }
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  private async sendPerformanceData(): Promise<void> {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          userId: this.userId,
          metrics: this.performanceQueue
        })
      });

      this.performanceQueue = [];
    } catch (error) {
      console.error('Failed to send performance data:', error);
    }
  }

  private async sendErrorData(errorEvent: ErrorEvent): Promise<void> {
    try {
      await fetch('/api/analytics/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorEvent)
      });
    } catch (error) {
      console.error('Failed to send error data:', error);
    }
  }

  private async flushEventQueue(): Promise<void> {
    for (const event of this.eventQueue) {
      await this.sendEvent(event);
    }
    this.eventQueue = [];
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeGoogleAnalytics(): Promise<void> {
    if (!process.env.REACT_APP_GA_MEASUREMENT_ID) return;

    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
      user_id: this.userId,
      custom_map: { custom_dimension_1: 'session_id' }
    });
  }

  private async initializeHotjar(): Promise<void> {
    if (!process.env.REACT_APP_HOTJAR_ID) return;

    // Load Hotjar
    (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = { hjid: process.env.REACT_APP_HOTJAR_ID, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script'); r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }

  private async initializeMixpanel(): Promise<void> {
    if (!process.env.REACT_APP_MIXPANEL_TOKEN) return;

    // Load Mixpanel (simplified)
    // In production, use the official Mixpanel library
  }

  private initializePerformanceMonitoring(): void {
    // Monitor Core Web Vitals
    this.monitorCoreWebVitals();
    
    // Monitor custom performance metrics
    this.monitorCustomMetrics();
  }

  private monitorCoreWebVitals(): void {
    // Monitor Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.trackPerformance({
          name: 'LCP',
          value: entry.startTime,
          unit: 'ms',
          timestamp: new Date()
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.trackPerformance({
          name: 'FID',
          value: (entry as any).processingStart - entry.startTime,
          unit: 'ms',
          timestamp: new Date()
        });
      }
    }).observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift (CLS)
    let cls = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cls += (entry as any).value;
        }
      }
      this.trackPerformance({
        name: 'CLS',
        value: cls,
        unit: 'score',
        timestamp: new Date()
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private monitorCustomMetrics(): void {
    // Monitor API response times
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - start;
        
        this.trackPerformance({
          name: 'API_Response_Time',
          value: duration,
          unit: 'ms',
          timestamp: new Date(),
          context: {
            url: args[0],
            status: response.status
          }
        });
        
        return response;
      } catch (error) {
        const duration = performance.now() - start;
        this.trackPerformance({
          name: 'API_Error_Time',
          value: duration,
          unit: 'ms',
          timestamp: new Date(),
          context: {
            url: args[0],
            error: (error as Error).message
          }
        });
        throw error;
      }
    };
  }
}

export default AnalyticsService;
