import React from 'react';

export default class ErrorBoundary extends React.Component {
  state: { hasError: boolean; error?: Error };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red' }}>
          <h3>Something went wrong.</h3>
          <p data-testid="eid">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
