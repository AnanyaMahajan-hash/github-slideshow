import { LightningElement, track } from 'lwc';

const BUNDLES_BY_SEGMENT = {
  Varun: ['Varun Core Bundle', 'Varun Premium Bundle'],
  Corporate: ['Corporate Starter', 'Corporate Enterprise'],
  SMB: ['SMB Lite', 'SMB Growth']
};

export default class CpqFrontEndExperience extends LightningElement {
  @track serviceSegment = 'Varun';
  @track quoteCensus = 150;
  @track breakfastCensus;
  @track lunchCensus;
  @track statusMessage = 'Waiting for sync.';

  segmentOptions = [
    { label: 'Varun', value: 'Varun' },
    { label: 'Corporate', value: 'Corporate' },
    { label: 'SMB', value: 'SMB' }
  ];

  connectedCallback() {
    this.syncCensusToOptions();
  }

  get visibleBundles() {
    const bundles = BUNDLES_BY_SEGMENT[this.serviceSegment] || [];

    return bundles.map((bundle, index) => ({
      label: bundle,
      value: `${this.serviceSegment}-${bundle}`,
      isRecommended: index === 0,
      className: `bundle-pill ${index === 0 ? 'recommended' : ''}`
    }));
  }

  handleSegmentChange(event) {
    this.serviceSegment = event.detail.value;
  }

  handleCensusChange(event) {
    this.quoteCensus = Number(event.detail.value);
  }

  syncCensusToOptions() {
    if (!this.quoteCensus || this.quoteCensus < 1) {
      this.statusMessage = 'Please provide a valid Census value.';
      return;
    }

    this.breakfastCensus = this.quoteCensus;
    this.lunchCensus = this.quoteCensus;
    this.statusMessage = `Census synced successfully (${new Date().toLocaleTimeString()}).`;
  }
}
