# Data Science & Analytics Architecture

## Table of Contents
1. [Overview](#overview)
2. [Data Collection Strategy](#data-collection-strategy)
3. [Analytics Pipeline](#analytics-pipeline)
4. [ML Integration Opportunities](#ml-integration-opportunities)
5. [A/B Testing Framework](#ab-testing-framework)
6. [User Insights & Metrics](#user-insights--metrics)
7. [Predictive Analytics](#predictive-analytics)
8. [Data Visualization](#data-visualization)
9. [Privacy & Ethics](#privacy--ethics)

---

## Overview

This document outlines how to transform this portfolio website into a data-driven application using modern data science and analytics practices.

### Vision

**Transform from**: Static portfolio showcase  
**Transform to**: Intelligent, data-driven platform that:
- Understands user behavior
- Optimizes user experience through A/B testing
- Provides personalized content recommendations
- Predicts user interests
- Makes data-informed decisions

### Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│            Data Science Architecture                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Data Collection Layer                               │
│     ├─ User Interactions                                │
│     ├─ Page Views                                       │
│     ├─ Contact Form Submissions                         │
│     └─ Performance Metrics                              │
│                                                          │
│  2. Data Storage Layer                                  │
│     ├─ Time-Series Database (InfluxDB)                  │
│     ├─ Relational Database (PostgreSQL)                 │
│     └─ Data Warehouse (BigQuery/Snowflake)              │
│                                                          │
│  3. Data Processing Layer                               │
│     ├─ ETL Pipelines (Apache Airflow)                   │
│     ├─ Stream Processing (Apache Kafka)                 │
│     └─ Batch Processing (Spark)                         │
│                                                          │
│  4. Analytics Layer                                     │
│     ├─ Descriptive Analytics (What happened?)           │
│     ├─ Diagnostic Analytics (Why did it happen?)        │
│     ├─ Predictive Analytics (What will happen?)         │
│     └─ Prescriptive Analytics (What should we do?)      │
│                                                          │
│  5. Machine Learning Layer                              │
│     ├─ User Behavior Prediction                         │
│     ├─ Content Recommendation Engine                    │
│     ├─ Anomaly Detection                                │
│     └─ NLP for Contact Form Analysis                    │
│                                                          │
│  6. Visualization & Reporting Layer                     │
│     ├─ Real-time Dashboards (Grafana)                   │
│     ├─ Business Intelligence (Tableau/Looker)           │
│     └─ Custom Analytics UI                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Data Collection Strategy

### 1. Frontend Event Tracking

#### User Interaction Events
```typescript
// lib/analytics.ts
interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

class Analytics {
  private sessionId: string;
  
  constructor() {
    this.sessionId = this.generateSessionId();
  }
  
  track(event: AnalyticsEvent) {
    // Send to analytics endpoint
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...event,
        sessionId: this.sessionId,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer
      })
    });
  }
  
  // Track page views
  trackPageView(page: string) {
    this.track({
      event: 'page_view',
      category: 'navigation',
      action: 'view',
      label: page
    });
  }
  
  // Track button clicks
  trackClick(element: string, action: string) {
    this.track({
      event: 'click',
      category: 'engagement',
      action: action,
      label: element
    });
  }
  
  // Track project views
  trackProjectView(projectId: number, projectTitle: string) {
    this.track({
      event: 'project_view',
      category: 'content',
      action: 'view',
      label: projectTitle,
      value: projectId
    });
  }
  
  // Track time on page
  trackTimeOnPage(page: string, duration: number) {
    this.track({
      event: 'time_on_page',
      category: 'engagement',
      action: 'duration',
      label: page,
      value: duration
    });
  }
  
  // Track scroll depth
  trackScrollDepth(depth: number) {
    this.track({
      event: 'scroll',
      category: 'engagement',
      action: 'scroll_depth',
      value: depth
    });
  }
  
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const analytics = new Analytics();
```

#### Implementation in Components
```typescript
// components/sections/Projects.tsx
'use client';

import { analytics } from '@/lib/analytics';
import { useEffect } from 'react';

export default function Projects() {
  useEffect(() => {
    analytics.trackPageView('projects');
    
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      analytics.trackTimeOnPage('projects', duration);
    };
  }, []);
  
  const handleProjectClick = (project: Project) => {
    analytics.trackProjectView(project.id, project.title);
  };
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard 
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
        />
      ))}
    </div>
  );
}
```

### 2. Backend Analytics Endpoints

```python
# app/models/analytics.py
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class AnalyticsEvent(BaseModel):
    event: str
    category: str
    action: str
    label: Optional[str] = None
    value: Optional[int] = None
    timestamp: datetime
    session_id: str
    user_agent: str
    screen_resolution: str
    referrer: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

# app/api/routes/analytics.py
from fastapi import APIRouter, Request
from app.models.analytics import AnalyticsEvent
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/track")
async def track_event(event: AnalyticsEvent, request: Request):
    """Track user analytics event"""
    
    # Enrich event data
    enriched_event = {
        **event.dict(),
        "ip_address": request.client.host,
        "country": get_country_from_ip(request.client.host),  # GeoIP lookup
    }
    
    # Store in database (PostgreSQL)
    await store_event(enriched_event)
    
    # Send to analytics service (optional)
    # await send_to_analytics_service(enriched_event)
    
    logger.info(f"Analytics event tracked: {event.event}")
    
    return {"status": "success"}

@router.get("/insights")
async def get_analytics_insights():
    """Get analytics insights and metrics"""
    
    return {
        "total_visitors": await get_total_visitors(),
        "page_views": await get_page_views(),
        "popular_projects": await get_popular_projects(),
        "conversion_rate": await get_conversion_rate(),
        "avg_time_on_site": await get_avg_time_on_site()
    }
```

---

## Analytics Pipeline

### ETL (Extract, Transform, Load) Pipeline

```python
# data_pipeline/etl.py
from datetime import datetime, timedelta
import pandas as pd
from sqlalchemy import create_engine

class AnalyticsETL:
    """ETL pipeline for analytics data"""
    
    def __init__(self, db_url: str):
        self.engine = create_engine(db_url)
    
    async def extract_raw_events(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Extract raw events from database"""
        query = f"""
        SELECT *
        FROM analytics_events
        WHERE timestamp >= '{start_date}'
          AND timestamp < '{end_date}'
        """
        return pd.read_sql(query, self.engine)
    
    def transform_events(self, df: pd.DataFrame) -> pd.DataFrame:
        """Transform raw events into analytics-ready format"""
        
        # Parse timestamp
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df['date'] = df['timestamp'].dt.date
        df['hour'] = df['timestamp'].dt.hour
        df['day_of_week'] = df['timestamp'].dt.day_name()
        
        # Calculate session metrics
        df = df.sort_values(['session_id', 'timestamp'])
        df['session_duration'] = df.groupby('session_id')['timestamp'].transform(
            lambda x: (x.max() - x.min()).total_seconds()
        )
        
        # Flag bounce sessions (single page view)
        df['is_bounce'] = df.groupby('session_id')['event'].transform('count') == 1
        
        # Extract device type from user agent
        df['device_type'] = df['user_agent'].apply(self.parse_device_type)
        
        # Calculate scroll engagement
        df['engaged'] = (df['value'] > 50) & (df['event'] == 'scroll')
        
        return df
    
    async def load_to_warehouse(self, df: pd.DataFrame, table: str):
        """Load transformed data to data warehouse"""
        df.to_sql(table, self.engine, if_exists='append', index=False)
    
    async def run_daily_pipeline(self):
        """Run daily ETL pipeline"""
        yesterday = datetime.now() - timedelta(days=1)
        start_date = yesterday.replace(hour=0, minute=0, second=0)
        end_date = yesterday.replace(hour=23, minute=59, second=59)
        
        # Extract
        raw_events = await self.extract_raw_events(start_date, end_date)
        
        # Transform
        transformed_events = self.transform_events(raw_events)
        
        # Load
        await self.load_to_warehouse(transformed_events, 'analytics_processed')
        
        # Generate daily aggregates
        daily_aggregates = self.generate_daily_aggregates(transformed_events)
        await self.load_to_warehouse(daily_aggregates, 'analytics_daily')
    
    def generate_daily_aggregates(self, df: pd.DataFrame) -> pd.DataFrame:
        """Generate daily aggregate metrics"""
        
        aggregates = df.groupby('date').agg({
            'session_id': 'nunique',  # Unique sessions
            'event': 'count',          # Total events
            'is_bounce': 'sum',        # Bounce count
            'session_duration': 'mean', # Avg session duration
            'engaged': 'sum'           # Engaged sessions
        }).reset_index()
        
        aggregates.columns = [
            'date', 'sessions', 'events', 'bounces', 
            'avg_session_duration', 'engaged_sessions'
        ]
        
        # Calculate metrics
        aggregates['bounce_rate'] = aggregates['bounces'] / aggregates['sessions']
        aggregates['engagement_rate'] = aggregates['engaged_sessions'] / aggregates['sessions']
        
        return aggregates
    
    @staticmethod
    def parse_device_type(user_agent: str) -> str:
        """Parse device type from user agent"""
        ua = user_agent.lower()
        if 'mobile' in ua or 'android' in ua or 'iphone' in ua:
            return 'mobile'
        elif 'tablet' in ua or 'ipad' in ua:
            return 'tablet'
        else:
            return 'desktop'
```

---

## ML Integration Opportunities

### 1. Project Recommendation Engine

```python
# ml/recommendation_engine.py
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class ProjectRecommender:
    """Content-based recommendation engine for projects"""
    
    def __init__(self, projects: List[Project]):
        self.projects = projects
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.similarity_matrix = None
        self._fit()
    
    def _fit(self):
        """Fit the recommendation model"""
        # Combine project features into text
        project_texts = [
            f"{p.title} {p.description} {' '.join(p.tech_stack)} {p.category}"
            for p in self.projects
        ]
        
        # Create TF-IDF matrix
        tfidf_matrix = self.vectorizer.fit_transform(project_texts)
        
        # Compute cosine similarity
        self.similarity_matrix = cosine_similarity(tfidf_matrix)
    
    def recommend(self, project_id: int, n: int = 3) -> List[int]:
        """Recommend similar projects"""
        project_idx = next(
            i for i, p in enumerate(self.projects) if p.id == project_id
        )
        
        # Get similarity scores
        scores = self.similarity_matrix[project_idx]
        
        # Get top N similar projects (excluding self)
        similar_indices = np.argsort(scores)[::-1][1:n+1]
        
        return [self.projects[i].id for i in similar_indices]

# API endpoint
@router.get("/projects/{project_id}/recommendations")
async def get_project_recommendations(project_id: int):
    """Get recommended projects based on similarity"""
    recommender = ProjectRecommender(PROJECTS)
    recommended_ids = recommender.recommend(project_id, n=3)
    
    recommended_projects = [
        p for p in PROJECTS if p.id in recommended_ids
    ]
    
    return recommended_projects
```

### 2. User Interest Prediction

```python
# ml/user_interest_predictor.py
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

class UserInterestPredictor:
    """Predict user interests based on behavior"""
    
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100)
        self.feature_columns = [
            'time_on_projects_page',
            'projects_viewed_count',
            'scroll_depth_avg',
            'device_type_mobile',
            'device_type_desktop',
            'hour_of_day',
            'day_of_week'
        ]
    
    def prepare_features(self, session_data: pd.DataFrame) -> pd.DataFrame:
        """Prepare features from session data"""
        features = pd.DataFrame()
        
        features['time_on_projects_page'] = session_data[
            session_data['page'] == 'projects'
        ]['duration'].sum()
        
        features['projects_viewed_count'] = session_data[
            session_data['event'] == 'project_view'
        ].shape[0]
        
        features['scroll_depth_avg'] = session_data[
            session_data['event'] == 'scroll'
        ]['value'].mean()
        
        # One-hot encode device type
        features['device_type_mobile'] = (
            session_data['device_type'] == 'mobile'
        ).any()
        features['device_type_desktop'] = (
            session_data['device_type'] == 'desktop'
        ).any()
        
        # Time features
        features['hour_of_day'] = session_data['timestamp'].dt.hour.mode()[0]
        features['day_of_week'] = session_data['timestamp'].dt.dayofweek.mode()[0]
        
        return features
    
    def predict_interest_category(self, session_data: pd.DataFrame) -> str:
        """Predict user's primary interest category"""
        features = self.prepare_features(session_data)
        prediction = self.model.predict(features[self.feature_columns])
        
        categories = ['machine-learning', 'security', 'computer-vision', 'backend']
        return categories[prediction[0]]
```

### 3. Anomaly Detection for Security

```python
# ml/anomaly_detector.py
from sklearn.ensemble import IsolationForest

class SecurityAnomalyDetector:
    """Detect anomalous behavior patterns"""
    
    def __init__(self):
        self.model = IsolationForest(contamination=0.1, random_state=42)
    
    def detect_anomalies(self, user_events: pd.DataFrame) -> pd.DataFrame:
        """Detect anomalous user behavior"""
        
        # Feature engineering
        features = pd.DataFrame()
        features['events_per_minute'] = user_events.groupby(
            pd.Grouper(key='timestamp', freq='1min')
        ).size()
        features['unique_pages'] = user_events.groupby(
            pd.Grouper(key='timestamp', freq='5min')
        )['page'].nunique()
        features['rapid_clicks'] = (
            user_events['event'] == 'click'
        ).rolling(window=10).sum()
        
        # Detect anomalies
        predictions = self.model.fit_predict(features)
        
        # Flag anomalous sessions
        anomalies = features[predictions == -1]
        
        return anomalies
```

---

## A/B Testing Framework

```python
# ab_testing/framework.py
from enum import Enum
from typing import Optional
import random

class Variant(Enum):
    CONTROL = "control"
    VARIANT_A = "variant_a"
    VARIANT_B = "variant_b"

class ABTest:
    """A/B testing framework"""
    
    def __init__(self, test_name: str, variants: List[Variant], allocation: List[float]):
        self.test_name = test_name
        self.variants = variants
        self.allocation = allocation  # e.g., [0.5, 0.25, 0.25]
    
    def assign_variant(self, user_id: str) -> Variant:
        """Assign user to variant (deterministic based on user_id)"""
        # Hash user_id to get consistent assignment
        import hashlib
        hash_value = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
        random.seed(hash_value)
        
        return random.choices(self.variants, weights=self.allocation)[0]
    
    def track_conversion(self, user_id: str, variant: Variant, converted: bool):
        """Track conversion for A/B test"""
        # Store in database
        pass
    
    def analyze_results(self) -> Dict:
        """Analyze A/B test results"""
        from scipy import stats
        
        # Get conversion rates for each variant
        results = {}
        for variant in self.variants:
            conversions = self.get_conversions(variant)
            total = self.get_total_users(variant)
            results[variant.value] = {
                'conversion_rate': conversions / total,
                'conversions': conversions,
                'total': total
            }
        
        # Statistical significance test
        control = results[Variant.CONTROL.value]
        variant_a = results[Variant.VARIANT_A.value]
        
        # Chi-square test
        observed = [
            [control['conversions'], control['total'] - control['conversions']],
            [variant_a['conversions'], variant_a['total'] - variant_a['conversions']]
        ]
        chi2, p_value = stats.chi2_contingency(observed)[:2]
        
        results['statistical_significance'] = p_value < 0.05
        results['p_value'] = p_value
        
        return results

# Example A/B test: Hero section CTA button text
hero_cta_test = ABTest(
    test_name="hero_cta_text",
    variants=[Variant.CONTROL, Variant.VARIANT_A],
    allocation=[0.5, 0.5]
)

# In component
variant = hero_cta_test.assign_variant(session_id)
cta_text = "View Projects" if variant == Variant.CONTROL else "Explore My Work"
```

---

## User Insights & Metrics

### Key Performance Indicators (KPIs)

```python
# analytics/kpis.py
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class PortfolioKPIs:
    """Portfolio website KPIs"""
    
    # Traffic Metrics
    total_visitors: int
    unique_visitors: int
    page_views: int
    avg_session_duration: float
    bounce_rate: float
    
    # Engagement Metrics
    projects_viewed: int
    avg_projects_per_session: float
    contact_form_views: int
    contact_form_submissions: int
    
    # Conversion Metrics
    conversion_rate: float  # Contact form submission rate
    time_to_conversion: float  # Avg time before submission
    
    # Content Performance
    most_viewed_project: str
    most_shared_project: str
    avg_time_on_projects: float
    
    # Technical Metrics
    avg_page_load_time: float
    error_rate: float

async def calculate_kpis(start_date: datetime, end_date: datetime) -> PortfolioKPIs:
    """Calculate KPIs for date range"""
    # Query analytics database
    events = await get_events(start_date, end_date)
    
    return PortfolioKPIs(
        total_visitors=events['session_id'].nunique(),
        unique_visitors=events['user_id'].nunique(),
        page_views=len(events[events['event'] == 'page_view']),
        avg_session_duration=calculate_avg_session_duration(events),
        bounce_rate=calculate_bounce_rate(events),
        projects_viewed=len(events[events['event'] == 'project_view']),
        avg_projects_per_session=calculate_avg_projects_per_session(events),
        contact_form_views=len(events[events['page'] == 'contact']),
        contact_form_submissions=len(events[events['event'] == 'form_submit']),
        conversion_rate=calculate_conversion_rate(events),
        time_to_conversion=calculate_time_to_conversion(events),
        most_viewed_project=get_most_viewed_project(events),
        most_shared_project=get_most_shared_project(events),
        avg_time_on_projects=calculate_avg_time_on_projects(events),
        avg_page_load_time=calculate_avg_page_load_time(events),
        error_rate=calculate_error_rate(events)
    )
```

---

## Data Visualization

### Analytics Dashboard Component

```typescript
// components/admin/AnalyticsDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';

interface DashboardData {
  visitors: TimeSeriesData[];
  topProjects: ProjectMetric[];
  deviceBreakdown: DeviceMetric[];
  conversionFunnel: FunnelData[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  
  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <Loading />;
  
  return (
    <div className="dashboard">
      <h1>Analytics Dashboard</h1>
      
      {/* Visitor Trend */}
      <section>
        <h2>Visitor Trend (Last 30 Days)</h2>
        <Line
          data={{
            labels: data.visitors.map(v => v.date),
            datasets: [{
              label: 'Visitors',
              data: data.visitors.map(v => v.count),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }}
        />
      </section>
      
      {/* Top Projects */}
      <section>
        <h2>Most Viewed Projects</h2>
        <Bar
          data={{
            labels: data.topProjects.map(p => p.name),
            datasets: [{
              label: 'Views',
              data: data.topProjects.map(p => p.views),
              backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
          }}
        />
      </section>
      
      {/* Device Breakdown */}
      <section>
        <h2>Device Breakdown</h2>
        <Pie
          data={{
            labels: data.deviceBreakdown.map(d => d.device),
            datasets: [{
              data: data.deviceBreakdown.map(d => d.percentage),
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
              ]
            }]
          }}
        />
      </section>
      
      {/* Conversion Funnel */}
      <section>
        <h2>Conversion Funnel</h2>
        <FunnelChart data={data.conversionFunnel} />
      </section>
    </div>
  );
}
```

---

## Privacy & Ethics

### Data Privacy Principles

1. **Transparency**: Clear privacy policy
2. **Minimal Collection**: Only collect necessary data
3. **User Control**: Allow opt-out
4. **Data Security**: Encrypt and protect data
5. **Compliance**: GDPR, CCPA compliance

### Privacy Implementation

```typescript
// lib/privacy.ts
class PrivacyManager {
  hasConsent(): boolean {
    return localStorage.getItem('analytics_consent') === 'true';
  }
  
  requestConsent(): Promise<boolean> {
    return new Promise((resolve) => {
      // Show consent banner
      const consent = confirm('This site uses analytics to improve user experience. Allow?');
      localStorage.setItem('analytics_consent', consent.toString());
      resolve(consent);
    });
  }
  
  optOut() {
    localStorage.setItem('analytics_consent', 'false');
    // Clear any existing tracking data
  }
}

// Only track if user consents
if (privacyManager.hasConsent()) {
  analytics.track(event);
}
```

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintained By**: Dhanraj Bhosale
